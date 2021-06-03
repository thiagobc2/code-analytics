import { useCallback, useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

import Loading from '~/components/Loading';
import { events } from '~/services/Api';

import ModalEventContext from '../../context';
import { Success, styles } from './styles';

function Create() {
	const classes = styles();
	const { eventData } = useContext(ModalEventContext);

	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState(false);

	const auth = useSelector(value => value.auth);

	const handleCreateEvent = useCallback(async () => {
		setLoading(true);

		const accessToken = typeof auth.access_token !== 'undefined' ? auth.access_token : null;

		const resp = await events.createEvent(eventData, accessToken);

		if (resp.data.status === true) {
			setLoading(false);
			if (resp.data.data.event.id) {
				setEvent(resp.data.data.event);
			}
		} else {
			swal(resp.data.message, resp.data.errors, 'error').then(() => {
				setLoading(false);
			});
		}
	}, [auth, eventData]);

	useEffect(() => {
		handleCreateEvent();
	}, [handleCreateEvent]);

	return (
		<div>
			{loading && <Loading heightLoading="60" />}

			{!loading && event.id && (
				<div className={classes.success}>
					<h4>Successfully created your event!</h4>
					<a href={`/event/${event.slug}-${event.id}`}>See my event</a>
				</div>
			)}
			{!loading && !event.id && (
				<div className={classes.success}>
					<h4>Successfully created your event!</h4>
					<a href={`/`}>Back to home</a>
				</div>
			)}
		</div>
	);
}

export default Create;
