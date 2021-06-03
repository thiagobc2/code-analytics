import { useState, useEffect } from 'react';
import { FaEdit, FaExternalLinkSquareAlt } from 'react-icons/fa';
import { Grid, Button, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useSelector } from 'react-redux';
import cookie from 'cookie';
import Alert from '@material-ui/lab/Alert';

import TagList from '~/components/Events/TagList';
import ReplyEvent from '~/components/Events/ReplyEvent';
import ShareButton from '~/components/Events/ShareButton';
import SettingsEvent from '~/components/Events/SettingsButton';
import ReportModal from '~/components/Events/ReportModal';
import DateBox from '~/components/Events/DateBox';
import Info from '~/components/Events/Info';
import Loading from '~/components/Loading';
import Map from '~/components/Map';
import { imageUrl } from '~/helpers/images';
import { events } from '~/services/Api';
import styles from '~/styles/event';
import AnalyticsModal from '~/components/Events/AnalyticsModal';
import TicketJourneyModal from '~/components/Events/TicketJourneyModal';
import DonationModal from '~/components/Events/DonationModal';
import { user as UserApi } from '~/services/Api';
import Auth from '~/services/Auth';

const EventDetails = (props): JSX.Element => {
	const classes = styles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isLoggedIn = Auth.isLoggedIn();
	const { event, slug, slug_default } = props;
	const { user } = useSelector(state => state.auth);
	const router = useRouter();
	const { tid } = router.query;
	const [statusReplyEvent, setStatusReplyEvent] = useState();
	const [showReportModal, setShowReportModal] = useState(false);
	const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
	const [showTicketJourneyModal, setShowTicketJourneyModal] = useState(false);
	const [showDonationModal, setShowDonationModal] = useState(false);

	const handleReportModal = () => {
		setShowReportModal(!showReportModal);
	};

	const handleAnalyticsModal = () => {
		setShowAnalyticsModal(!showAnalyticsModal);
	};

	const handleTicketJourneyModal = () => {
		setShowTicketJourneyModal(!showTicketJourneyModal);
	};

	const handleDonationModal = () => {
		setShowDonationModal(!showDonationModal);
	};

	useEffect(() => {
		if (event && event !== false) {
			if (event.event_attending_status === 'interested') {
				event.event_attending_status = 'going';
			}
			if (event.slug !== slug_default) router.push(`/event/${event.slug}-${event.id}`);
			setStatusReplyEvent(event.event_attending_status);
		}
	}, [event, slug_default, router]);

	return !event ? (
		<>
			<Typography variant="h2" align="center">
				Event not found
			</Typography>
			<Typography variant="body1" align="center">
				Sorry. That event doesn't exist.
			</Typography>
		</>
	) : (
		<Grid item className={classes.container}>
			{event.user_tickets?.length > 0 && isLoggedIn && (
				<Alert
					severity="info"
					className={classes.alertWarning}
					action={
						<Link href={event.event_url}>
							<Button variant="contained" color="primary" startIcon={<FaExternalLinkSquareAlt />}>
								Acess Event
							</Button>
						</Link>
					}
				>
					<Grid container direction="row" justify="space-between" alignItems="center">
						you already bought an event ticket
						{/* You last bought this product on March 25, 2021 */}
					</Grid>
				</Alert>
			)}

			<Grid container spacing={3}>
				<NextSeo
					title={event.title}
					description={event.descriptions}
					openGraph={{
						title: event.title,
						description: event.descriptions,
						images: [
							{
								url: imageUrl(event.image),
								width: 1200,
								height: 800,
								alt: event.title
							}
						]
					}}
				/>
				<Grid item md={7} xs={12}>
					{event.image && (
						<figure className={classes.imageContainer}>
							<img src={imageUrl(event.image)} alt={event.title} className={classes.image} />
						</figure>
					)}
					<DateBox date={event.dates.start_date} />
					{!isMobile && (
						<>
							<Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
								{event.descriptions}
							</Typography>
							<TagList eventCategories={event.categories} />
						</>
					)}
				</Grid>
				<Grid item md={5} xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Info event={event} statusReply={statusReplyEvent} />
						</Grid>
						{user && event.owner.id === user.id ? (
							<Grid item xs={12}>
								<Link href={`/event/${slug}/edit`} passHref>
									<Button variant="contained" color="secondary" startIcon={<FaEdit />} fullWidth>
										Edit Event
									</Button>
								</Link>
							</Grid>
						) : (
							<Grid item xs={12}>
								<ReplyEvent
									eventId={event.id}
									optionSelected={event.event_attending_status || null}
									statusReply={value => setStatusReplyEvent(value)}
								/>
							</Grid>
						)}

						{event.event_url && (
							<Grid item md={4} sm={6} xs={12}>
								{event.is_ticket === 1 && event.tickets ? (
									<>
										<Button
											component="a"
											onClick={handleTicketJourneyModal}
											className={classes.ticketButton}
											variant="contained"
											color="primary"
											fullWidth
											target="_blank"
										>
											Tickets
										</Button>
										<TicketJourneyModal
											event={event}
											showTicketJourneyModal={showTicketJourneyModal}
											handleTicketJourneyModal={handleTicketJourneyModal}
										/>
									</>
								) : (
									<Link href={event.event_url} passHref>
										<Button
											component="a"
											className={classes.ticketButton}
											variant="contained"
											color="primary"
											fullWidth
											target="_blank"
										>
											{`Tickets /${
												event.event_type && event.event_type === '2' ? 'Join' : ' Info'
											}`}
										</Button>
									</Link>
								)}
							</Grid>
						)}

						{event.is_ticket === 1 && event.tickets && (
							<Grid item md={3} sm={6} xs={12}>
								<Button
									component="a"
									onClick={handleDonationModal}
									className={classes.donationButton}
									variant="contained"
									color="primary"
									fullWidth
									target="_blank"
								>
									Donate
								</Button>
								<DonationModal
									event={event}
									showDonationModal={showDonationModal}
									handleDonationModal={handleDonationModal}
								/>
							</Grid>
						)}

						<Grid item md={3} sm={8} xs={12}>
							<ShareButton eventId={event.id} />
						</Grid>

						<Grid item md={2} sm={4} xs={12}>
							<SettingsEvent handleReportModal={handleReportModal} />
						</Grid>

						{user && event.owner.id === user.id && event.is_ticket === 1 && (
							<Grid item xs={12}>
								<Button
									component="a"
									onClick={handleAnalyticsModal}
									className={classes.ticketButton}
									variant="contained"
									color="primary"
									fullWidth
									target="_blank"
								>
									{'Analytics'}
								</Button>
								<AnalyticsModal
									event={event}
									showAnalyticsModal={showAnalyticsModal}
									handleAnalyticsModal={handleAnalyticsModal}
								/>
							</Grid>
						)}

						{isMobile && (
							<Grid item xs={12}>
								<Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
									{event.descriptions}
								</Typography>
								<TagList eventCategories={event.categories} />
							</Grid>
						)}
					</Grid>
				</Grid>
				{event.event_type && event.event_type !== '2' && (
					<Grid item xs={12}>
						<Map
							initialCoords={{
								lat: parseFloat(event.address.lat),
								lng: parseFloat(event.address.lng)
							}}
							detailEvent
						/>
					</Grid>
				)}
				<ReportModal
					handleReportModal={handleReportModal}
					showReportModal={showReportModal}
					eventId={event.id}
				/>
			</Grid>
		</Grid>
	);
};

export async function getServerSideProps(context) {
	const { slug, token, uid, tid } = context.query;
	const cookieData = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : null;
	const userInfo = cookieData?.datainfo ? JSON.parse(cookieData.datainfo) : null;
	const slug_array = slug.toString().split('-');
	const id = slug_array[slug_array.length - 1];
	const slug_default = slug.toString().replace(`-${id}`, '');
	const event = await events.detail(id, userInfo ? userInfo.access_token : null);
	const isLoggedIn = userInfo ? true : false;

	if (uid) {
		if (isLoggedIn) {
			if (Number(uid) !== userInfo.user.id) {
				context.res.statusCode = 302;
				context.res.setHeader(
					'Location',
					`/signout-redirect?redirect=${process.env.BASE_PATH}/event/${slug}&tid=${tid}&token=${token}&uid=${uid}`
				);
				return { props: {} };
			}
		} else {
			const user = await UserApi.byID(uid);
			const status = user ? user.data.data.user.status : user;
			if (status && status === 'deactive') {
				context.res.statusCode = 302;
				context.res.setHeader(
					'Location',
					`/create-password?token=${token}&uid=${uid}&tid=${tid}=&redirect=${process.env.BASE_PATH}/event/${slug}`
				);
				return { props: {} };
			} else {
				context.res.statusCode = 302;
				context.res.setHeader('Location', `/signin?redirect=${process.env.BASE_PATH}/event/${slug}&tid=${tid}`);
				return { props: {} };
			}
		}
	}

	return {
		props: {
			event,
			slug,
			slug_default
		} // will be passed to the page component as props
	};
}

export default EventDetails;
