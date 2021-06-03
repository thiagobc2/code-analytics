import { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import { TextField, Grid, Button, Typography, Card, FormControlLabel, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

import AutocompleteAddress from '~/components/AutocompleteAddress';
import AgeGroup from '~/components/Events/AgeGroup';
import Gender from '~/components/Events/Gender';
import ContextEditEvent from './context';
import styles from './styles';

const EditForm = ({ register, errors }) => {
	const { setEventData, eventData } = useContext(ContextEditEvent);
	const [selectedAddress, setSelectedAddress] = useState(eventData['address']);
	const [dateTime, setDateTime] = useState({
		startDate: moment.utc(eventData.dates.start_date).local().toDate(),
		endDate: moment.utc(eventData.dates.finish_date).local().toDate()
	});

	const classes = styles();

	const today = moment().toDate();

	const maxDate = moment(dateTime.startDate).add(5, 'days').toDate();

	const handleDuration = (startDate, endDate, newDate) => {
		const oldDuration = moment.duration(moment(startDate).diff(endDate)).asMinutes();
		const newDuration = moment.duration(moment(newDate).diff(endDate)).asMinutes();
		const diff = newDuration - oldDuration;
		const newEndDate = Math.sign(diff)
			? moment(endDate).add(diff, 'minutes').toDate()
			: moment(endDate).subtract(diff, 'minutes').toDate();
		return newEndDate;
	};

	const handleValidateDate = (startDate, newDate) => {
		if (moment(startDate).isAfter(newDate)) {
			const newEndDate = moment(dateTime.startDate).add(15, 'minutes').toDate();
			return newEndDate;
		} else {
			return newDate;
		}
	};

	const handleAsemblTicket = value => {
		setEventData({
			...eventData,
			is_ticket: value
		});
	};

	const handleSharing = event => {
		setEventData({ ...eventData, sharing: event.target.checked });
	};

	const handleEventType = event => {
		setEventData({ ...eventData, event_type: event.target.checked ? '2' : '1' });
	};

	const handleTimezone = (e, value, reason) => {
		const selectedTimezone = value === 'America/New_York' ? 'EST' : value;
		setEventData({ ...eventData, user_time_zone: selectedTimezone });
	};

	useEffect(() => {
		const startDate = moment(dateTime.startDate).format('YYYY-MM-DD HH:mm');
		const endDate = moment(dateTime.endDate || dateTime.startDate).format('YYYY-MM-DD HH:mm');
		const startDateUTC = moment
			.tz(startDate, 'YYYY-MM-DD HH:mm', eventData.user_time_zone)
			.utc()
			.format('YYYY-MM-DD HH:mm:ss');
		const endDateUTC = moment
			.tz(endDate, 'YYYY-MM-DD HH:mm', eventData.user_time_zone)
			.utc()
			.format('YYYY-MM-DD HH:mm:ss');

		setEventData(old => ({
			...old,
			dates: {
				start_date: startDateUTC,
				finish_date: endDateUTC
			}
		}));
	}, [dateTime, eventData.user_time_zone, setEventData]);

	useEffect(() => {
		if (selectedAddress) {
			setEventData({
				...eventData,
				address: selectedAddress.address,
				city: selectedAddress.city,
				state: selectedAddress.state,
				post_code: selectedAddress.post_code && selectedAddress.post_code,
				lat: selectedAddress.lat,
				lng: selectedAddress.lng,
				venue_name: selectedAddress.name
			});
		} else {
			setEventData({
				...eventData,
				address: null,
				city: null,
				state: null,
				post_code: null,
				lat: null,
				lng: null
			});
		}
	}, [selectedAddress]);

	return eventData ? (
		<>
			<TextField
				id="title"
				fullWidth
				name="title"
				label="Event title"
				placeholder="Enter the event title"
				InputLabelProps={{
					shrink: true
				}}
				inputRef={register({
					required: 'title is required'
				})}
				error={errors.title ? true : false}
				helperText={errors.title && errors.title.message}
				defaultValue={eventData.title}
				className={classes.field}
			/>

			<Grid item xs={12}>
				<Typography variant="body1" className="no-margin">
					<strong>From</strong>
				</Typography>
			</Grid>
			<Grid container className={classes.field} spacing={2}>
				<Grid item md={8} xs={12} className={classes.datepickerContainer}>
					<DatePicker
						placeholderText="Start date"
						selected={dateTime.startDate}
						onChange={date => {
							if (!date) {
								date = dateTime.startDate;
							}
							setDateTime({
								...dateTime,
								startDate: date,
								endDate: dateTime.endDate
									? handleDuration(dateTime.startDate, dateTime.endDate, date)
									: dateTime.endDate
							});
						}}
						dateFormat="MMMM d, yyyy"
						minDate={today}
						selectsStart
						required
						className={classes.datepicker}
					/>
				</Grid>

				<Grid item md={4} xs={12} className={classes.datepickerContainer}>
					<DatePicker
						placeholderText="Start time"
						selected={dateTime.startDate}
						onChange={date => {
							if (!date) {
								date = dateTime.startDate;
							}
							setDateTime({
								...dateTime,
								startDate: date,
								endDate: dateTime.endDate
									? handleDuration(dateTime.startDate, dateTime.endDate, date)
									: dateTime.endDate
							});
						}}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption="Time"
						dateFormat="h:mm aa"
						required
						minTime={
							moment(today).isSame(moment(dateTime.startDate), 'day')
								? today
								: moment(dateTime.startDate).startOf('day').toDate()
						}
						maxTime={
							moment(today).isSame(moment(dateTime.startDate), 'day')
								? moment(today).endOf('day').toDate()
								: moment(dateTime.startDate).endOf('day').toDate()
						}
						className={classes.datepicker}
					/>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="body1" className="no-margin">
					<strong>To (optional)</strong>
				</Typography>
			</Grid>

			<Grid container className={classes.field} spacing={2}>
				<Grid item md={8} xs={12} className={classes.datepickerContainer}>
					<DatePicker
						placeholderText="End date"
						selected={dateTime.endDate}
						onChange={date => {
							setDateTime({
								...dateTime,
								endDate: date ? handleValidateDate(dateTime.startDate, date) : date
							});
						}}
						dateFormat="MMMM d, yyyy"
						selectsEnd
						minDate={dateTime.startDate}
						maxDate={maxDate}
						className={classes.datepicker}
					/>
				</Grid>

				<Grid item md={4} xs={12} className={classes.datepickerContainer}>
					<DatePicker
						placeholderText="End time"
						selected={dateTime.endDate}
						onChange={date => {
							setDateTime({
								...dateTime,
								endDate: date ? handleValidateDate(dateTime.startDate, date) : date
							});
						}}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption="Time"
						dateFormat="h:mm aa"
						minTime={
							moment(dateTime.startDate).isSame(moment(dateTime.endDate), 'day')
								? moment(dateTime.startDate).add(15, 'minutes').toDate()
								: moment(dateTime.endDate).startOf('day').toDate()
						}
						maxTime={
							moment(dateTime.startDate).isSame(moment(dateTime.endDate), 'day')
								? moment(dateTime.startDate).endOf('day').toDate()
								: moment(dateTime.endDate).endOf('day').toDate()
						}
						className={classes.datepicker}
					/>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Autocomplete
					size="small"
					id="timezone"
					name="timezone"
					options={moment.tz.names()}
					fullWidth
					defaultValue={moment.tz.guess()}
					onChange={handleTimezone}
					disableClearable
					className={classes.autocomplete}
					renderInput={params => <TextField {...params} label="Timezone" variant="outlined" />}
				/>
			</Grid>

			<Grid container className={classes.field}>
				<Grid item md={6} xs={12}>
					<FormControlLabel
						value="left"
						control={
							<Checkbox
								id="event_type"
								name="event_type"
								checked={eventData.event_type === '2'}
								onChange={handleEventType}
								color="primary"
							/>
						}
						label="Online Event"
						labelPlacement="end"
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<FormControlLabel
						value="left"
						control={
							<Checkbox
								id="sharing"
								name="sharing"
								checked={eventData.sharing}
								onChange={handleSharing}
								color="primary"
							/>
						}
						label="Allow Sharing"
						labelPlacement="end"
					/>
				</Grid>
			</Grid>

			{eventData.event_type !== '2' && (
				<AutocompleteAddress
					selectedAddress={selectedAddress}
					setSelectedAddress={setSelectedAddress}
					register={register}
					errors={errors}
				/>
			)}

			<Grid container spacing={1}>
				<Grid item xs={6}>
					<Button
						fullWidth
						variant="contained"
						className={
							eventData.is_ticket === 1 ? classes.buttonCreateTicketSelected : classes.buttonCreateTicket
						}
						onClick={() => {
							handleAsemblTicket(1);
						}}
						startIcon={<FaMapMarkerAlt />}
					>
						Create asembl tickets
					</Button>
				</Grid>

				<Grid item xs={6}>
					<Button
						fullWidth
						variant="contained"
						className={
							eventData.is_ticket === 0 ? classes.buttonCreateTicketSelected : classes.buttonCreateTicket
						}
						onClick={() => {
							handleAsemblTicket(0);
						}}
						startIcon={<FaExternalLinkAlt />}
					>
						External event
					</Button>
				</Grid>
			</Grid>

			<Card className={classes.contentInfoPayd} elevation={false}>
				<TextField
					type="hidden"
					name="is_ticket"
					inputRef={register({
						required: 'required field'
					})}
					value={eventData.is_ticket}
				/>

				<TextField
					id="guests"
					fullWidth
					name="guests"
					label={`Capacity (optional)`}
					placeholder={`Enter event capacity. Leave it empty for no limit.`}
					InputLabelProps={{
						shrink: true
					}}
					inputRef={register()}
					error={errors.guests ? true : false}
					helperText={errors.guests && errors.guests.message}
					type="number"
					className={classes.input}
					variant="filled"
					defaultValue={eventData.guests}
				/>

				<TextField
					id="entry_fee"
					fullWidth
					name="entry_fee"
					label="Price (optional)"
					placeholder="Enter event price. Leave it empty for free event."
					InputLabelProps={{
						shrink: true
					}}
					inputRef={register({
						maxLength: { value: 15, message: 'max length exceed' }
					})}
					error={errors.entry_fee ? true : false}
					helperText={errors.entry_fee && errors.entry_fee.message}
					className={classes.input}
					variant="filled"
					defaultValue={eventData.entry_fee}
				/>

				<TextField
					id="event_url"
					fullWidth
					name="event_url"
					label={`Event Link ${eventData.event_type || eventData.is_ticket === 1 ? '' : '(optional)'}`}
					placeholder="Enter event link here"
					InputLabelProps={{
						shrink: true
					}}
					inputRef={register({
						required: eventData.event_type || eventData.is_ticket === 1 ? 'event link required' : false
					})}
					error={errors.event_url ? true : false}
					helperText={errors.event_url && errors.event_url.message}
					type="url"
					className={classes.input}
					variant="filled"
					defaultValue={eventData.event_url}
				/>
			</Card>

			<Grid item xs={12} className={classes.field}>
				<Typography variant="body1" className={classes.guest}>
					<strong>Age group</strong>
				</Typography>
				<AgeGroup
					data={eventData.age_group}
					ageGroupSelected={value =>
						setEventData({
							...eventData,
							age_group: value
						})
					}
				/>
			</Grid>

			<Grid item xs={12} className={classes.field}>
				<Typography variant="body1" className={classes.guest}>
					<strong>Gender</strong>
				</Typography>
				<Gender
					data={eventData.genders}
					genderSelected={value =>
						setEventData({
							...eventData,
							genders: value
						})
					}
				/>
			</Grid>
		</>
	) : null;
};

export default EditForm;
