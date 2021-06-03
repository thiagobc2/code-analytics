import PropTypes from 'prop-types';

import EventCard from '../EventCard';
import { Grid } from '@material-ui/core';

const EventList = ({ events }) => {
	const eventsMap = events.map(event => (
		<Grid item md={4} sm={6} xs={12} key={event.event_id}>
			<EventCard event={event} />
		</Grid>
	));

	return (
		<Grid container spacing={2}>
			{eventsMap}
		</Grid>
	);
};

EventList.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number
		})
	).isRequired
};

export default EventList;
