import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

import PropTypes from 'prop-types';

import { imageUrl } from '~/helpers/images';
import User from '~/services/User';

import styles from './styles';

export default function Friends({ userId }) {
	const classes = styles();
	const [userFriends, setUserFriends] = useState([]);

	const fetchUserFriends = useCallback(async () => {
		const resp = await User.friends(userId);

		if (resp.status !== false) {
			setUserFriends(resp.data.friends);
		}
	}, [userId]);

	useEffect(() => {
		fetchUserFriends();
	}, [fetchUserFriends]);

	return (
		<div className={classes.friendList}>
			{userFriends.length > 0 &&
				userFriends.slice(0, 4).map(friend => {
					return (
						<Link key={friend.id} href={`/profile/${friend.id}`} className="friend">
							<div className="friend-container">
								<picture className="friend-image">
									<img
										src={imageUrl(friend.profile_thumb) || '/assets/images/placeholder.png'}
										alt={friend.name}
										title={friend.name}
									/>
								</picture>

								<div className="friend-name">{friend.name}</div>
							</div>
						</Link>
					);
				})}
		</div>
	);
}

Friends.propTypes = {
	userId: PropTypes.number.isRequired
};
