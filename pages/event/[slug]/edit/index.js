import { useEffect, useState, useCallback } from 'react';
import { FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import {
	Button,
	Modal,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
	useTheme,
	useMediaQuery
} from '@material-ui/core';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import moment from 'moment-timezone';

import EditImageUploader from '~/components/Events/ImageUploader';
import DateBox from '~/components/Events/DateBox';
import CategorySelect from '~/components/CategorySelect';
import TagList from '~/components/Events/TagList';
import Loading from '~/components/Loading';
import Map from '~/components/Map';
import ContextEditEvent from '~/components/Events/EventFormEdit/context';
import EventForm from '~/components/Events/EventFormEdit';
import { events } from '~/services/Api';
import Auth from '~/services/Auth';
import Events from '~/services/Events';
import styles from '~/styles/event-edit';

const EventEdit = () => {
	const auth = useSelector(state => state.auth);
	const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit' });
	const router = useRouter();
	const { slug } = router.query;
	const classes = styles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [eventData, setEventData] = useState();
	const [formData, setFormData] = useState({});

	const [data, setData] = useState({
		error: false,
		loading: true,
		saving: false,
		removing: false,
		showModal: false
	});

	const fetchEventDetails = useCallback(async () => {
		if (!slug) return;
		const slug_array = slug.toString().split('-');
		const id = slug_array[slug_array.length - 1];

		const accessToken = typeof auth.access_token !== 'undefined' ? auth.access_token : null;

		const res = await events.detail(id, accessToken);

		if (res === false) {
			setData({ ...data, error: true, loading: false });
			return;
		}

		if (auth.user.id !== res.owner.id) {
			router.back();
		}

		res.timezone = res.user_time_zone || moment.tz.guess();

		setEventData(res);
		setData({ ...data, error: false, loading: false });
	}, [slug, auth, router]);

	const handleFormSubmit = async event_data => {
		setData({ ...data, saving: true });
		const eventToSubmit = { ...formData, ...event_data, image: eventData.image };

		const resp = await events.editEvent(eventToSubmit.id, eventToSubmit, Auth.getAccessToken());

		let error = true;
		let dialogMessage = null;

		if (resp.data.status === false) {
			dialogMessage = resp.data.errors;
		} else if (resp.status === 500 || resp.status === 401) {
			dialogMessage = resp.statusText;
		} else {
			dialogMessage = resp.data.message;
			error = false;
		}

		swal(error ? 'Error' : 'Ok', dialogMessage, error ? 'error' : 'success').then(() => {
			if (!error) {
				router.push(`/event/${slug}`);
			}
		});

		setData({ ...data, saving: false });
	};

	const handleDeleteEvent = async () => {
		setData({ ...data, removing: true });

		const resp = await Events.delete(eventData.id);

		if (resp.status === false) {
			swal('Error', resp.message, 'error');
		} else {
			swal('Ok', resp.message, 'success').then(() => {
				router.push('/');
			});
		}
	};

	useEffect(() => {
		fetchEventDetails();
	}, [fetchEventDetails]);

	useEffect(() => {
		if (!eventData) {
			return;
		}

		const {
			id,
			title,
			descriptions,
			event_url,
			address,
			dates,
			sharing,
			entry_fee,
			venue_name,
			open_all,
			guests,
			age_group,
			genders,
			categories,
			categories_structured,
			event_type,
			user_time_zone,
			is_ticket
		} = eventData;

		setFormData(old => ({
			...old,
			id,
			title,
			descriptions,
			event_url,
			address: address && event_type !== '2' ? address.street_address : null,
			city: address && event_type !== '2' ? address.city : null,
			state: address && event_type !== '2' ? address.state : null,
			lat: address && event_type !== '2' ? address.lat : null,
			lng: address && event_type !== '2' ? address.lng : null,
			post_code: address && event_type !== '2' ? address.post_code : null,
			starting_utc_date_time: dates.start_date,
			end_utc_date_time: dates.finish_date,
			sharing,
			entry_fee: parseFloat(entry_fee),
			venue_name,
			open_all,
			guests,
			age_group,
			genders,
			categories_structured,
			event_type: event_type,
			user_time_zone,
			is_ticket
		}));
	}, [eventData]);

	return !eventData ? (
		<Loading heightLoading={100} />
	) : (
		<ContextEditEvent.Provider
			value={{
				eventData,
				setEventData,
				formData,
				setFormData
			}}
		>
			<Grid container component="form" onSubmit={handleSubmit(handleFormSubmit)} spacing={4}>
				<Grid item md={7} sm={6} xs={12}>
					<EditImageUploader edit />
					<DateBox date={eventData.dates.start_date} />

					{!isMobile && (
						<>
							<TextField
								fullWidth
								name="descriptions"
								placeholder="Add event info (optional)"
								defaultValue={eventData.descriptions}
								multiline
								rows="4"
								className={classes.field}
								variant="outlined"
								inputRef={register({
									required: false
								})}
							/>
							<TagList
								eventCategories={eventData.categories}
								openCategories={() => setData({ ...data, showModal: true })}
								edit
							/>
						</>
					)}
				</Grid>
				<Grid item md={5} sm={6} xs={12}>
					<EventForm register={register} errors={errors} />

					{isMobile && (
						<>
							<TextField
								fullWidth
								name="descriptions"
								placeholder="Add event info (optional)"
								defaultValue={eventData.descriptions}
								multiline
								rows="4"
								className={classes.field}
								variant="outlined"
								inputRef={register({
									required: false
								})}
							/>
							<TagList
								eventCategories={eventData.categories}
								openCategories={() => setData({ ...data, showModal: true })}
								edit
							/>
						</>
					)}

					<Grid container className={classes.field} spacing={2}>
						<Grid item md={6} xs={12}>
							<Link href={`/event/${slug}`} passHref>
								<Button variant="contained" fullWidth>
									Cancel
								</Button>
							</Link>
						</Grid>
						<Grid item md={6} xs={12}>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleDeleteEvent}
								disabled={data.removing}
								fullWidth
							>
								{!data.removing ? 'Delete' : 'Deleting'}
							</Button>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Button type="submit" variant="contained" color="primary" disabled={data.saving} fullWidth>
							{!data.saving ? 'Save Changes' : 'Saving'}
						</Button>
					</Grid>

					<Modal open={data.showModal} onClose={() => setData({ ...data, showModal: false })}>
						<Card className={classes.modalContainer}>
							<CardContent item className={classes.modalHeader}>
								<Typography variant="body1">Choose a Category</Typography>
								<Button
									className={classes.closeButton}
									aria-label="close"
									onClick={() => setData({ ...data, showModal: false })}
								>
									<FiX />
								</Button>
							</CardContent>
							<CardContent item className={classes.modalBody}>
								{eventData.categories_structured && (
									<CategorySelect
										selectedCategories={
											eventData.categories_structured.length > 0
												? eventData.categories_structured
												: []
										}
										onSelectCategories={listCategories =>
											setEventData({
												...eventData,
												categories_structured: listCategories
											})
										}
										buttonsSelect={false}
										validCategories
									/>
								)}
							</CardContent>
						</Card>
					</Modal>
				</Grid>
			</Grid>
		</ContextEditEvent.Provider>
	);
};

export default EventEdit;
