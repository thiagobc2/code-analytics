import { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { TextField, Grid, Button, Typography, Checkbox, FormControlLabel, Card } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment-timezone';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import ModalEventContext from '../EventModal/context';
import CreationContext from '~/components/Events/EventModal/context';
import CreationImageUploader from '~/components/Events/ImageUploader';
import AutocompleteAddress from '~/components/AutocompleteAddress';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

import styles from './styles';

const EventForm = ({ userLogged }) => {
	const { inviteSelected, setInviteSelected, CreateEvent } = useContext(ModalEventContext);
	const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit' });
	const { user } = useSelector(state => state.auth);
	const {
		showPrevStep,
		showNextStep,
		setEventData,
		eventData,
		dateTime,
		setDateTime,
		selectedAddress,
		setSelectedAddress
	} = useContext(CreationContext);

	const handleTimezone = (e, value, reason) => {
		const selectedTimezone = value === 'America/New_York' ? 'EST' : value;
		setEventData({ ...eventData, user_time_zone: selectedTimezone });
	};

	const handleFormSubmit = data => {
		setEventData({ ...eventData, ...data });
		if (userLogged.account_type === 'business') {
			setInviteSelected(1);
			CreateEvent();
		} else {
			showNextStep();
		}
	};

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

	const PaypalBtn = () => {
		return (
			<div className={classes.paypalBtn}>
				<Typography variant="h6" align="center">
					To create asembl tickets, please connect your account with Paypal.
					<br />
					<br />
					<Link
						href={`https://www.${
							process.env.REACT_APP_ENV === 'production' ? 'paypal' : 'sandbox.paypal'
						}.com/connect?flowEntry=static&response_type=id_token&client_id=${
							process.env.PAYPAL_CLIENT_ID
						}&scope=email https://uri.paypal.com/services/paypalattributes&redirect_uri=${
							process.env.BASE_PATH
						}`}
						passHref
					>
						<a>
							<img
								className={classes.imgBtnPaypal}
								src="https://www.paypalobjects.com/webstatic/en_US/developer/docs/login/connectwithpaypalbutton.png"
								alt="Connect with Paypal"
							/>
						</a>
					</Link>
				</Typography>
			</div>
		);
	};

	const handleValidateDate = (startDate, newDate) => {
		if (moment(startDate).isAfter(newDate)) {
			const newEndDate = moment(dateTime.startDate).add(15, 'minutes').toDate();
			return newEndDate;
		} else {
			return newDate;
		}
	};

	const handleSharing = event => {
		setEventData({ ...eventData, sharing: event.target.checked });
	};

	const handleEventType = event => {
		setEventData({ ...eventData, event_type: event.target.checked });
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
			starting_utc_date_time: startDateUTC,
			end_utc_date_time: endDateUTC
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
			// document.getElementById('autocompleteInput').value = '';
		}
	}, [selectedAddress]);

	const handleAsemblTicket = value => {
		setEventData({
			...eventData,
			is_ticket: value
		});
	};

	useEffect(() => {
		setEventData({
			...eventData,
			invitation_to: inviteSelected
		});
	}, [inviteSelected]);

	return (
		<Grid container component="form" onSubmit={handleSubmit(handleFormSubmit)} spacing={4}>
			<Grid item md={6} xs={12}>
				<CreationImageUploader />

				<Grid container spacing={1}>
					<Grid item xs={6}>
						<Button
							fullWidth
							variant="contained"
							className={
								eventData.is_ticket === 1
									? classes.buttonCreateTicketSelected
									: classes.buttonCreateTicket
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
								eventData.is_ticket === 0
									? classes.buttonCreateTicketSelected
									: classes.buttonCreateTicket
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
					{!user.paypal_code && eventData.is_ticket === 1 ? (
						<PaypalBtn />
					) : (
						<>
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
							/>

							<TextField
								id="event_url"
								fullWidth
								name="event_url"
								label={`Event Link ${
									eventData.event_type || eventData.is_ticket === 1 ? '' : '(optional)'
								}`}
								placeholder="Enter event link here"
								InputLabelProps={{
									shrink: true
								}}
								inputRef={register({
									required:
										eventData.event_type || eventData.is_ticket === 1
											? 'event link required'
											: false
								})}
								error={errors.event_url ? true : false}
								helperText={errors.event_url && errors.event_url.message}
								type="url"
								className={classes.input}
								variant="filled"
							/>
						</>
					)}
				</Card>
			</Grid>

			<Grid item md={6} xs={12}>
				<TextField
					id="title"
					fullWidth
					name="title"
					label="Event"
					placeholder="Enter the event title"
					InputLabelProps={{
						shrink: true
					}}
					inputRef={register({
						required: 'title is required'
					})}
					error={errors.title ? true : false}
					helperText={errors.title && errors.title.message}
				/>

				<Grid container className={classes.field}>
					<Grid item md={6} xs={12}>
						<FormControlLabel
							value="left"
							control={
								<Checkbox
									id="event_type"
									name="event_type"
									checked={eventData.event_type}
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

				{!eventData.event_type && (
					<AutocompleteAddress
						selectedAddress={selectedAddress}
						setSelectedAddress={setSelectedAddress}
						type="createEvent"
						register={register}
						errors={errors}
					/>
				)}

				<TextField
					id="descriptions"
					fullWidth
					name="descriptions"
					placeholder="Add event info (optional)"
					multiline
					rows="4"
					className={classes.field}
					variant="outlined"
					inputRef={register({
						required: false
					})}
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
						defaultValue={eventData.timezone}
						onChange={handleTimezone}
						disableClearable
						className={classes.autocomplete}
						renderInput={params => <TextField {...params} label="Timezone" variant="outlined" />}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={4} className={classes.buttons}>
				<Grid item md={3} sm={6} xs={6}>
					<Button
						type="button"
						className={classes.button}
						variant="contained"
						fullWidth
						size="large"
						color="primary"
						onClick={() => showPrevStep()}
					>
						Prev
					</Button>
				</Grid>

				<Grid item md={3} sm={6} xs={6}>
					<Button
						className={classes.button}
						type="submit"
						size="large"
						variant="contained"
						color="primary"
						fullWidth
					>
						{userLogged.account_type === 'business' ? 'Create Event' : 'Next'}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default EventForm;
