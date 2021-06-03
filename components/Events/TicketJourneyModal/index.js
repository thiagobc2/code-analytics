import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { user as UserApi } from '~/services/Api';
import Auth from '~/services/Auth';
import {
	Button,
	Card,
	CardContent,
	Grid,
	Modal,
	Typography,
	Divider,
	IconButton,
	Stepper,
	Step,
	StepButton,
	useTheme,
	useMediaQuery
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { FaRegCheckCircle, FaCheck } from 'react-icons/fa';

import { PaypalWithFee, PaypalFee } from '~/helpers/paypalFees';
import styles from './styles';
import Ticket from './Ticket';
import Payment from './Payment';
import Confirmation from './Confirmation';
import ContactsContext from './context';

const TicketJourneyModal = ({ event, showTicketJourneyModal, handleTicketJourneyModal }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const classes = styles();
	const [total, setTotal] = useState(1);
	const auth = useSelector(state => state.auth);
	const [contacts, setContacts] = useState([]);
	const [tickets, setTickets] = useState(event.tickets || []);
	const isLoggedIn = Auth.isLoggedIn();

	const { register, handleSubmit, errors, formState, watch } = useForm({
		mode: 'onBlur',
		reValidateMode: 'onSubmit'
	});

	//STEPERS
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({
		0: true
	});
	const steps = ['Tickets', 'Payment', 'Confirmation'];
	const totalSteps = () => {
		return steps.length;
	};
	const completedSteps = () => {
		return Object.keys(completed).length;
	};
	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};
	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};
	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};
	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep + 1] = true;
		setCompleted(newCompleted);
		handleNext();
	};
	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};
	const closeModal = () => {
		handleReset();
		handleTicketJourneyModal();
	};

	const getStepContent = step => {
		switch (step) {
			case 0:
				return (
					<Ticket
						event={event}
						addTicketAmount={addTicketAmount}
						tickets={tickets}
						register={register}
						errors={errors}
						watch={watch}
						orderSummary={orderSummary}
						isMobile={isMobile}
					/>
				);
			case 1:
				return (
					<Payment
						event={event}
						tickets={tickets}
						handleStep={setActiveStep}
						amount={PaypalWithFee(total)}
						handleComplete={handleComplete}
						contacts={contacts}
					/>
				);
			case 2:
				return <Confirmation addTicketAmount={addTicketAmount} closeModal={closeModal} tickets={tickets} />;
			default: {
				return 'no step';
			}
		}
	};

	//END STEPERS
	const addTicketAmount = (e, index) => {
		if (e < 0) {
			return;
		}
		tickets[index].amount = parseInt(e);
		setTickets([...tickets]);
	};

	useEffect(() => {
		event.tickets?.map(ticket => {
			return (ticket.amount = 1);
		});
	}, []);

	useEffect(() => {
		let count = 0;
		let arrTickets = [...tickets];
		arrTickets.map(ticket => {
			count = count + ticket.price * ticket.amount;
		});

		setTotal(count);
	}, [tickets]);

	useEffect(() => {
		if (!auth || !isLoggedIn) {
			return;
		}

		getUser();
	}, []);

	const getUser = async () => {
		const resp = await UserApi.byID(auth.user.id, auth.access_token);
		if (resp) {
			const user = resp.data.data.user;
			setContacts([
				...contacts,
				{
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					confirmemail: user.email
				}
			]);
		}
	};

	const createContacts = () => {
		if (formState.isValid) {
			const newCompleted = completed;
			newCompleted[activeStep + 1] = true;
			setCompleted(newCompleted);
			handleNext();
		}
	};

	const orderSummary = () => {
		return (
			<Grid item xs={12} sm={4} className={classes.summary}>
				<CardContent>
					{!isMobile && (
						<Grid container className={classes.contentCloseButton}>
							<>
								<Typography variant="h6" className={classes.textOrderSummary}>
									Order Summary
								</Typography>
								<IconButton color="primary" onClick={closeModal} className={classes.iconClose}>
									<FiX />
								</IconButton>
							</>
						</Grid>
					)}

					<Grid item className={classes.contentTotal}>
						{!isMobile && (
							<>
								{tickets?.map((ticket, index) => (
									<div key={ticket.id}>
										{ticket.amount > 0 && (
											<Grid key={ticket.id} container justify="space-between">
												<Typography variant="h6" className={classes.description}>
													{ticket.amount} x {ticket.title}
												</Typography>
												<Typography variant="h6" className={classes.description}>
													${(ticket.amount * ticket.price).toFixed(2)}
												</Typography>
											</Grid>
										)}
									</div>
								))}
							</>
						)}
						{total > 0 && (
							<>
								{!isMobile && <Divider variant="fullWidth" className={classes.hr} />}
								<Grid container className={classes.contentTotal}>
									<Typography variant="h6" className={classes.description}>
										Fee:
									</Typography>
									<Typography variant="h6" className={classes.description}>
										${PaypalFee(total)}
									</Typography>
								</Grid>
								<Grid container className={classes.contentTotal}>
									<Typography variant="h6" className={classes.textTotal}>
										Total:
									</Typography>
									<Typography variant="h6" className={classes.textPriceTotal}>
										${PaypalWithFee(total)}
									</Typography>
								</Grid>
							</>
						)}
					</Grid>
					{total > 0 && (
						<>
							{activeStep === 0 && (
								<Button
									className={classes.buttonCheckout}
									onClick={activeStep === 0 ? handleSubmit(createContacts) : handleComplete}
								>
									{activeStep === 0 ? 'Check Out' : activeStep === 1 && 'Next'}
								</Button>
							)}
						</>
					)}
				</CardContent>
			</Grid>
		);
	};

	return (
		<ContactsContext.Provider value={{ contacts, setContacts }}>
			<Modal open={showTicketJourneyModal} onClose={handleTicketJourneyModal} className={classes.modal}>
				<Card className={classes.bodyModal}>
					<Grid container className={classes.container}>
						<Grid item xs={12} sm={activeStep === 2 ? 12 : 8}>
							<div className={classes.root}>
								{activeStep !== 3 && (
									<>
										<Stepper nonLinear alternativeLabel activeStep={activeStep}>
											{steps.map((label, index) => (
												<Step key={label} className={classes.contentButtonsSteps}>
													<StepButton
														completed={completed[index]}
														className={classes.buttonSteps}
													>
														{label}
													</StepButton>
												</Step>
											))}
										</Stepper>
										<Divider variant="fullWidth" />
									</>
								)}
								<Grid item className={activeStep !== 3 && classes.scroll}>
									{allStepsCompleted() ? (
										<Grid item className={classes.bodySuccess}>
											<FaRegCheckCircle className={classes.iconCheck} />
											<Typography variant="h6" className={classes.textSuccess}>
												Your purchase has been successfully completed!!!
											</Typography>
											<Button className={classes.buttonClose} onClick={closeModal}>
												Close
											</Button>
										</Grid>
									) : (
										<div className={classes.instructions}>{getStepContent(activeStep)}</div>
									)}
								</Grid>
							</div>
						</Grid>
						{activeStep < 2 && !isMobile && orderSummary()}
					</Grid>
				</Card>
			</Modal>
		</ContactsContext.Provider>
	);
};

export default TicketJourneyModal;
