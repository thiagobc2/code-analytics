import { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import {
	Card,
	Grid,
	Modal,
	Typography,
	IconButton,
	InputAdornment,
	FormControl,
	InputLabel,
	FilledInput,
	useMediaQuery,
	useTheme,
	Button
} from '@material-ui/core';
import { FiX } from 'react-icons/fi';
import swal from 'sweetalert';
import Link from 'next/link';

import styles from './styles';
import Auth from '~/services/Auth';
import { donations } from '~/services/Api';

const DonationModal = ({ event, showDonationModal, handleDonationModal }) => {
	const classes = styles();
	const [amount, setAmount] = useState(1);
	const isLoggedIn = Auth.isLoggedIn();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const closeModal = () => {
		handleDonationModal();
	};

	const generateDonation = async (details, data) => {
		const donationData = {
			order_id: data.orderID,
			event_id: event.id,
			value: amount,
			status: 'success'
		};
		const donation = await donations.createDonation(donationData);
		if (donation.data.status) {
			swal('Success', 'Thanks for your donation', 'success').then(() => closeModal());
		} else {
			swal('Error', 'Your donation was not processed. Please, try again', 'error');
		}
	};

	return (
		<>
			<Modal open={showDonationModal} onClose={handleDonationModal}>
				<Card className={classes.container}>
					<IconButton color="primary" onClick={closeModal} className={classes.closeButton}>
						<FiX />
					</IconButton>
					<Grid container className={classes.grid}>
						<Grid item xs={12} spacing={2}>
							{isLoggedIn ? (
								<>
									<Typography variant="h1">Donation</Typography>
									<Typography variant="h6">Send a tip to the event owner</Typography>
									<FormControl fullWidth className={classes.input} variant="filled">
										<InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
										<FilledInput
											id="filled-adornment-amount"
											value={amount}
											type="number"
											onChange={e => {
												setAmount(e.target.value && e.target.value < 1 ? 1 : e.target.value);
											}}
											startAdornment={<InputAdornment position="start">$</InputAdornment>}
										/>
									</FormControl>
									<PayPalButton
										amount={amount}
										options={{ clientId: process.env.PAYPAL_CLIENT_ID, currency: 'USD' }}
										shippingPreference="NO_SHIPPING"
										onSuccess={(details, data) => {
											// OPTIONAL: Call your server to save the transaction
											generateDonation(details, data);
										}}
										onError={err => {
											//console.log(err);
											swal(
												'Error',
												'Your donation could not be processed. Please provide an amount and try again.',
												'error'
											);
										}}
									/>
								</>
							) : (
								<>
									<p>You'll need an asembl account to send a tip.</p>
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
										<Button
											variant="contained"
											size={isMobile ? 'small' : 'large'}
											disableElevation
										>
											Sign Up
										</Button>
									</Link>
								</>
							)}
						</Grid>
					</Grid>
				</Card>
			</Modal>
		</>
	);
};

export default DonationModal;
