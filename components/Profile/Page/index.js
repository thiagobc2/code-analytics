import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaUserCircle, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Grid, Button, Modal, Typography, Fade } from '@material-ui/core';

import Error from '~/components/Error';
import Loading from '~/components/Loading';
import CarouselInterests from '~/components/Profile/Interests';
import { imageUrl } from '~/helpers/images';
import { user as UserApi } from '~/services/Api';
import Auth from '~/services/Auth';
import User from '~/services/User';

import Events from '~/components/Profile/Events';
import FriendList from '~/components/Profile/Friends';
import styles from './styles';

const PageProfile = ({ isFriend }) => {
	const classes = styles();
	const [indexPhoto, setIndexPhoto] = useState(0);
	const [showModalPhotos, setShowModalPhotos] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showItens, setShowItens] = useState(false);
	const [error, setError] = useState(false);
	const [sendingRequest, setSendingRequest] = useState(false);
	const [user, setUser] = useState({});
	const router = useRouter();
	const { friendId } = router.query;
	const auth = useSelector(state => state.auth);
	const isLoggedIn = Auth.isLoggedIn();

	const fetchUserData = useCallback(async () => {
		const userId = isFriend ? friendId : auth.user?.id;
		if (!userId) return;
		const resp = friendId ? await UserApi.byID(friendId) : await UserApi.byID(userId, auth.access_token);
		if (resp === false) {
			setError(true);
			setLoading(false);
		} else {
			setUser(resp.data.data.user);
			setLoading(false);
		}
	}, [auth, friendId, isFriend]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const handleModal = e => {
		setShowModalPhotos(true);
	};

	const requestFriends = async () => {
		setSendingRequest(true);

		const resp = await User.friendRequest(friendId);

		if (resp.status !== false) {
			setSendingRequest(false);
			setUser({ ...user, relationship: user.account_type === 'business' ? 'friend' : 'requested' });
		}
	};

	const acceptFriends = async () => {
		setSendingRequest(true);

		const resp = await User.friendRequest(friendId);

		if (resp.status !== false) {
			setSendingRequest(false);
			setUser({ ...user, relationship: 'friend' });
		}
	};

	const unfriendRequest = async () => {
		setSendingRequest(true);
		setShowItens(false);

		const resp = await User.unfriendRequest(friendId);

		if (resp.status !== false) {
			setSendingRequest(false);
			setUser({ ...user, relationship: null });
		}
	};

	const prevPhoto = () => {
		const userPhotoLength = user.profile_images.length - 1;
		if (indexPhoto > 0) {
			setIndexPhoto(prev => prev - 1);
			return false;
		}
		setIndexPhoto(userPhotoLength);
	};

	const nextPhoto = () => {
		const userPhotoLength = user.profile_images.length - 1;
		if (indexPhoto < userPhotoLength) {
			setIndexPhoto(prev => prev + 1);
			return false;
		}
		setIndexPhoto(0);
	};

	const edit = () => {
		if (!friendId || friendId === auth.user?.id) {
			return (
				<a href="/profile/edit" className={classes.editPhoto}>
					<FaUserCircle className={classes.iconUser} />
					<h4>Edit profile</h4>
				</a>
			);
		}
		return '';
	};

	const defaultButton = () => {
		if (isFriend && friendId && friendId !== auth.user?.id) {
			if (
				user.relationship !== 'requested' &&
				user.relationship !== 'friend' &&
				user.relationship !== 'waiting'
			) {
				return (
					<Button
						disableElevation
						variant={'contained'}
						color={'primary'}
						className={`applyBtn ${sendingRequest && 'disabled'}`}
						onClick={() => {
							requestFriends();
						}}
						disabled={sendingRequest}
					>
						{sendingRequest ? 'Loading' : user.account_type === 'business' ? 'Follow' : 'Add Friend'}
					</Button>
				);
			}

			if (user.relationship === 'requested') {
				return (
					<Button variant="contained" color={'primary'} disabled className={classes.buttonProfile}>
						Request pending
					</Button>
				);
			}

			if (user.relationship === 'waiting') {
				return (
					<Button
						disableElevation
						variant={'contained'}
						color={'primary'}
						className={`applyBtn ${sendingRequest && 'disabled'}`}
						onClick={() => {
							acceptFriends();
						}}
						disabled={sendingRequest}
					>
						{sendingRequest ? 'Loading' : 'Accept'}
					</Button>
				);
			}

			if (user.relationship === 'friend') {
				return (
					<Link href={`/chat/friend/${friendId}`}>
						<Button variant="contained" color="primary" disabled={sendingRequest}>
							Send message
						</Button>
					</Link>
				);
			}
		} else {
			return '';
		}
	};

	const content = () => {
		if (error === true) {
			return <Error />;
		}
		const photoUser =
			user.profile_images && user.profile_images.length > 0
				? imageUrl(user.profile_images[0].thumb_image_path)
				: '/assets/images/placeholder.png';

		const showEvents =
			user.relationship === 'friend' || user.id === auth.user?.id || user.account_type === 'business';

		return (
			<Grid container>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={showModalPhotos}
					onClose={() => setShowModalPhotos(false)}
					closeAfterTransition
					BackdropProps={{
						timeout: 500
					}}
				>
					<Fade in={showModalPhotos}>
						<div className={classes.paper}>
							<Grid className={classes.header}>
								<Typography variant="h4" component="h3">
									Photos
								</Typography>
								<FaTimes
									className={classes.closeButton}
									onClick={() => {
										setShowModalPhotos(false);
									}}
								/>
							</Grid>
							<Grid item className={classes.body}>
								<Button onClick={prevPhoto}>
									<FaChevronLeft className="icon" />
								</Button>
								<div className="photo">
									{user.profile_images && user.profile_images.length > 0 ? (
										<img src={imageUrl(user.profile_images[indexPhoto].thumb_image_path)} alt="" />
									) : (
										<img src={photoUser} alt="" />
									)}
									<div className="contentSpan">
										{user.profile_images.map((item, index) => (
											<button
												type="button"
												onClick={() => {
													setIndexPhoto(index);
												}}
												key={item.id}
												className={`span ${indexPhoto === index && 'selected'}`}
											></button>
										))}
									</div>
								</div>
								<Button onClick={nextPhoto}>
									<FaChevronRight className="icon" />
								</Button>
							</Grid>
						</div>
					</Fade>
				</Modal>
				<Grid item lg="12" className={classes.about}>
					<div className={classes.cover}>
						{/* {edit()} */}
						{user.cover_images && user.cover_images.length > 0 && (
							<img
								className={`${classes.background} modal-button`}
								onClick={handleModal}
								data-target="#modalCover"
								src={imageUrl(user.cover_images[0].main_image_path)}
								aria-hidden="true"
								alt=""
							/>
						)}

						{user.relationship === 'friend' && isLoggedIn && (
							<button type="button" className="btnItens" onClick={() => setShowItens(!showItens)}>
								<span className="round" />
								<span className="round" />
								<span className="round" />
							</button>
						)}

						{user.relationship === 'friend' && isLoggedIn && showItens && (
							<Grid container className={classes.containerDropdown}>
								<Grid item className="header">
									<button className="closeBtn" onClick={() => setShowItens(false)}>
										<MdClose />
									</button>
									<Typography className="title">Privacy Option</Typography>
								</Grid>
								<Grid item className="body">
									<Button
										disableElevation
										variant={'contained'}
										color={'secondary'}
										className={`applyBtn ${sendingRequest && 'disabled'}`}
										onClick={() => {
											unfriendRequest();
										}}
									>
										{sendingRequest
											? 'Loading'
											: user.account_type === 'business'
											? 'Unfollow'
											: 'Unfriend'}
									</Button>
								</Grid>
							</Grid>
						)}
					</div>
					<div className={classes.usePhoto}>
						<img
							className={`${classes.photo} modal-button`}
							onClick={handleModal}
							data-target="#modalProfile"
							src={photoUser}
							alt=""
							aria-hidden="true"
						/>
						{/* {edit()} */}
					</div>

					{edit()}
					<div className={classes.userInfo}>
						<h3 className={classes.name}>
							{user.account_type !== 'business' ? `${user.name}, ${user.age}` : user.name}
						</h3>
					</div>

					{isLoggedIn ? defaultButton() : null}
				</Grid>

				<div className={classes.container}>
					{user.account_type === 'business' && (
						<div className={classes.bio}>
							<h5>Bio</h5>
							<div className="subtitle">
								<span>{user.descriptions}</span>
							</div>
						</div>
					)}
					<div className={classes.friends}>
						{user.account_type === 'personal' ? <h5>Friends</h5> : <h5>Followers</h5>}
						<div className="subtitle">
							<span>
								<strong>{user.total_friends}</strong>
								{user.account_type === 'personal' ? ' Friends' : ' Followers'}
							</span>
							{isLoggedIn && user.account_type === 'personal' && (
								<span>
									<strong>{user.mutual_friends}</strong> Mutual
								</span>
							)}
						</div>

						{user.total_friends > 0 && <FriendList userId={user.id} />}
					</div>

					{user.account_type !== 'personal' && <div className={classes.marginBotton} />}

					{showEvents && (
						<div className="content-event">
							<Events userId={friendId || auth.user?.id} userType={user.account_type} />
						</div>
					)}

					{user.interests && user.account_type === 'personal' && (
						<div>
							<h5 className={classes.title}>Interests</h5>
							<CarouselInterests data={user.interests} />
						</div>
					)}
				</div>
			</Grid>
		);
	};
	return <div>{loading ? <Loading heightLoading="100" /> : content()}</div>;
};

export default PageProfile;
