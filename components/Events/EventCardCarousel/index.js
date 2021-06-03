import { Typography } from '@material-ui/core';
import { Card, CardMedia, CardContent, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';

import { toCalendar } from '~/services/Date';
import Link from 'next/link';
import styles from './styles';

const EventCardCarousel = ({ event }) => {
	const classes = styles();
	let eventImage = '';
	const categoryImage =
		event.event_categories && event.event_categories.event_image ? event.event_categories.event_image : '';

	if (event.event_images_all) {
		eventImage =
			event.event_images_all && event.event_images_all.length > 0
				? event.event_images_all[0].thumb_image_path
				: categoryImage;
	}

	if (event.event_images) {
		eventImage =
			event.event_images && event.event_images.length > 0
				? event.event_images[0].thumb_image_path
				: categoryImage;
	}

	const date = toCalendar(event.starting_utc_date_time);

	return (
		<Link href={`/event/${event.slug}-${event.event_id}`} passHref>
			<Card component="a" className={classes.card}>
				<div className={classes.contentImg}>
					<CardMedia
						image={`${process.env.REACT_APP_IMAGES_BASE}${eventImage}`}
						alt={event.title}
						className={classes.image}
					/>
				</div>
				<Tooltip title={event.title} placement="bottom-start" popper>
					<Typography variant="h5" className={classes.title}>
						{event.title}
					</Typography>
          		</Tooltip>
				<Typography variant="h6" component="p" className={classes.date}>
					<time dateTime={event.starting_utc_date_time}>{`${date.month} ${date.day}`}</time>
					<br />
					{event.event_type && event.event_type === '1' ? event.address : 'Online'}
					<br />
					Host:
					{event.event_owner_name}
				</Typography>
			</Card>
		</Link>
	);
};

EventCardCarousel.propTypes = {
	event: PropTypes.shape({
		event_id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		starting_utc_date_time: PropTypes.string.isRequired,
		event_owner_name: PropTypes.string.isRequired,
		address: PropTypes.string,
		event_images_all: PropTypes.any,
		event_categories: PropTypes.any.isRequired
	}).isRequired
};

export default EventCardCarousel;
