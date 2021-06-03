import { useCallback, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

import Carousel from '~/components/Carousel';
import { events as eventsApi } from '~/services/Api';

import styles from './styles';

function Events({ userId, userType }) {
	const classes = styles();
	const [events, setEvents] = useState([]);
	const [type, setType] = useState('going');
	const userLocation = useSelector(state => state.events);
	const auth = useSelector(state => state.auth);

	const fetchEvents = useCallback(async () => {
		const accessToken = typeof auth.access_token !== 'undefined' ? auth.access_token : null;
		const resp = await eventsApi.userEvents(
			1,
			accessToken,
			userLocation.period,
			userLocation.friends,
			type,
			userId
		);

		setEvents(resp.data.data.events_list);
	}, [userId, type]);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	const responsive = [
		{
			breakpoint: 1203,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5
			}
		},
		{
			breakpoint: 935,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4
			}
		},
		{
			breakpoint: 764,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 590,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}
	];

	return (
		<div className={classes.container}>
			<div className={classes.eventTypes}>
				<button type="button" onClick={() => setType('going')} className={type === 'going' && 'is-active'}>
					Events
				</button>
				<button type="button" className={type === 'went' && 'is-active'} onClick={() => setType('went')}>
					Past Events
				</button>
			</div>
			{events.length === 0 && 'No events'}
			{events.length > 0 && <Carousel data={events} link={null} />}
		</div>
	);
}

export default Events;
