import { useContext, useEffect } from 'react';
import {
	CardContent,
	Grid,
	Typography,
	Divider,
	TextField,
	IconButton,
	useMediaQuery,
	useTheme,
	Button
} from '@material-ui/core';
import { styles } from './styles';
import ContactsContext from '../context';
import Auth from '~/services/Auth';
import Link from 'next/link';

import moment from 'moment-timezone';

import { MdRemove, MdAdd } from 'react-icons/md';

const Ticket = ({ event, addTicketAmount, tickets, register, errors, watch, orderSummary }) => {
	const { contacts, setContacts } = useContext(ContactsContext);
	const classes = styles();
	const isLoggedIn = Auth.isLoggedIn();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const formatDate = date => moment.utc(date).local().format('dddd, MMMM DD [at] h:mm A');

	const dates = event => {
		const startingDate = formatDate(event.dates.start_date);

		const endDate =
			event.dates.finish_date &&
			event.dates.finish_date !== '0000-00-00 00:00:00' &&
			event.dates.finish_date !== event.dates.start_date
				? ` - ${formatDate(event.dates.finish_date)}`
				: '';
		return startingDate + endDate;
	};

	const setContactFields = (event, index, field) => {
		const arrContacts = [...contacts];
		arrContacts[index] = { ...arrContacts[index], [field]: event.target.value };
		setContacts([...arrContacts]);
	};

	return (
		<Grid item xs={12}>
			{isLoggedIn ? (
				<CardContent>
					<Typography className={classes.textInfos} variant="h6">
						{event.title.toUpperCase()}
					</Typography>
					<Typography className={classes.description} variant="h6">
						{dates(event)}
					</Typography>
					<div className={classes.contentTickets}>
						{tickets.map((ticket, index) => (
							<div key={`contact_${ticket.id}`}>
								<Grid container justify="space-between">
									<Grid item>
										<Typography className={classes.textTickets} variant="h6">
											{ticket.title}
										</Typography>
										<Typography className={classes.textPrice} variant="h6">
											${ticket.price.toFixed(2)}
										</Typography>
									</Grid>
									<Grid item>
										<Grid item className={classes.contentInputNumber}>
											<IconButton
												className={classes.buttonNumber1}
												aria-label="remove"
												onClick={() => addTicketAmount(ticket.amount - 1, index)}
											>
												<MdRemove />
											</IconButton>
											<TextField
												id="input"
												variant="outlined"
												className={classes.input}
												value={ticket.amount}
												disabled={true}
												onChange={e => {
													addTicketAmount(e.target.value, index);
												}}
											/>
											<IconButton
												className={classes.buttonNumber2}
												aria-label="add"
												onClick={() => addTicketAmount(ticket.amount + 1, index)}
											>
												<MdAdd />
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
								<Divider variant="fullWidth" className={classes.hr} />

								{[...Array(ticket.amount)].map((object, index) => (
									<>
										<Grid key={index} container spacing={1} component={'form'}>
											<Grid item md={12}>
												<Typography className={classes.textContacts} variant="h6">
													Ticket nº {index + 1} contact info
												</Typography>
											</Grid>
											<Grid item md={6} xs={12}>
												<TextField
													fullWidth
													label="Name"
													value={contacts[index]?.first_name}
													name={`first_name_${index}`}
													InputLabelProps={{
														shrink: true
													}}
													inputRef={register({
														required: `Name is required for ticket nº ${index + 1}`
													})}
													error={errors[`first_name_${index}`] ? true : false}
													helperText={
														errors[`first_name_${index}`] &&
														errors[`first_name_${index}`].message
													}
													variant="filled"
													onChange={e => setContactFields(e, index, 'first_name')}
												/>
											</Grid>
											<Grid item md={6} xs={12}>
												<TextField
													fullWidth
													label="Last Name"
													value={contacts[index]?.last_name}
													name={`last_name_${index}`}
													InputLabelProps={{
														shrink: true
													}}
													inputRef={register({
														required: `Last Name is required for ticket nº ${index + 1}`
													})}
													error={errors[`last_name_${index}`] ? true : false}
													helperText={
														errors[`last_name_${index}`] &&
														errors[`last_name_${index}`].message
													}
													variant="filled"
													onChange={e => setContactFields(e, index, 'last_name')}
												/>
											</Grid>
											<Grid item md={6} xs={12}>
												<TextField
													fullWidth
													label="E-mail"
													autoComplete="none"
													value={contacts[index]?.email}
													name={`email_${index}`}
													InputLabelProps={{
														shrink: true
													}}
													inputRef={register({
														required: `Email is required for ticket nº ${index + 1}`,
														pattern: {
															value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
															message: 'Invalid email address'
														}
													})}
													error={errors[`email_${index}`] ? true : false}
													helperText={
														errors[`email_${index}`] && errors[`email_${index}`].message
													}
													variant="filled"
													type="email"
													onChange={e => setContactFields(e, index, 'email')}
												/>
											</Grid>
											<Grid item md={6} xs={12}>
												<TextField
													fullWidth
													onPaste={e => {
														e.preventDefault();
													}}
													autoComplete="none"
													label="Confirm E-mail"
													value={contacts[index]?.confirmemail}
													name={`confirmemail_${index}`}
													InputLabelProps={{
														shrink: true
													}}
													inputRef={register({
														required: `Confirmation is required for ticket nº ${index + 1}`,
														pattern: {
															value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
															message: 'Invalid email address'
														},
														validate: value =>
															value === watch(`email_${index}`) || "E-mail don't match."
													})}
													error={errors[`confirmemail_${index}`] ? true : false}
													helperText={
														errors[`confirmemail_${index}`] &&
														errors[`confirmemail_${index}`].message
													}
													variant="filled"
													type="email"
													onChange={e => setContactFields(e, index, 'confirmemail')}
												/>
											</Grid>
										</Grid>
										<Divider variant="fullWidth" className={classes.hr} />
									</>
								))}
							</div>
						))}
						{isMobile && orderSummary()}
					</div>
				</CardContent>
			) : (
				<CardContent>
					<p>
						You'll need an asembl account to access your tickets after purchase, so please create one if you
						haven't already.
					</p>
					<Link href="/signin" passHref>
						<Button
							color="primary"
							variant="contained"
							size={isMobile ? 'small' : 'large'}
							disableElevation
							style={{ marginRight: 15 }}
						>
							Sign In
						</Button>
					</Link>
					<Link href="/signup" passHref>
						<Button variant="contained" size={isMobile ? 'small' : 'large'} disableElevation>
							Sign Up
						</Button>
					</Link>
				</CardContent>
			)}
		</Grid>
	);
};

export default Ticket;
