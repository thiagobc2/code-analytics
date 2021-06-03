import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';

import events from '~/services/Api/events';
import styles from './styles';

const GuestList = ({ eventId }) => {
	const [guests, setGuests] = useState(false);
	const [total, setTotal] = useState(0);
	const classes = styles();

	const guestList = () =>
		guests.user_guests.map(guest => {
			return (
				<Link href={`/profile/${guest.id}`} key={guest.id}>
					<Avatar src={guest.thumb_image_path} />
				</Link>
			);
		});

	const fetchGuests = useCallback(async () => {
		const response = await events.guests(eventId);

		if (response.status === false) {
			return;
		}

		const totalUsers = response.user_guests.length;
		const remainGuests = response.total_guests - totalUsers;

		if (remainGuests > 0) {
			setTotal(remainGuests);
		}

		setGuests(response);
	}, [eventId]);

	useEffect(() => {
		fetchGuests();
	}, [fetchGuests]);

	return (
		guests && (
			<>
				{guests.user_guests.length > 0 && guestList()}
				{total > 0 && <span className={classes.guestNumber}>+{total} Going</span>}
			</>
		)
	);
};

GuestList.propTypes = {
	eventId: PropTypes.number.isRequired
};

export default GuestList;
