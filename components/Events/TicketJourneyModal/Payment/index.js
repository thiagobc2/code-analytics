import { useSelector } from 'react-redux';
import Auth from '~/services/Auth';
import { orders } from '~/services/Api';
import { PayPalButton } from 'react-paypal-button-v2';
import { CardContent, Grid, Typography } from '@material-ui/core';

import swal from 'sweetalert';

import { events } from '~/services/Api';
import styles from './styles';

const Payment = ({ event, tickets, amount, handleStep, handleComplete, contacts }) => {
	const classes = styles();
	const isLoggedIn = Auth.isLoggedIn();
	const auth = useSelector(state => state.auth);

	const generateOrder = async (details, data) => {
		tickets.map(async ticket => {
			const orderData = {
				order_id: data.orderID,
				event_id: event.id,
				ticket_id: ticket.id,
				quantity: ticket.amount,
				total_price: (ticket.amount * ticket.price).toFixed(2),
				contacts: contacts,
				status: 'success'
			};
			await orders.createOrder(orderData);
		});
		handleComplete();
	};

	return (
		<Grid item xs={12}>
			<CardContent>
				<Typography className={classes.subTitle} variant="h6">
					Payment
				</Typography>
				<Typography className={classes.description} variant="h6">
					Choose a payment method
				</Typography>
				<PayPalButton
					amount={amount}
					options={{ clientId: process.env.PAYPAL_CLIENT_ID, currency: 'USD' }}
					shippingPreference="NO_SHIPPING"
					onSuccess={(details, data) => {
						// OPTIONAL: Call your server to save the transaction
						generateOrder(details, data);
					}}
					onError={err => {
						//console.log(err);
						swal('Error', 'Your payment could not be processed. Please try again.', 'error');
					}}
				/>
			</CardContent>
		</Grid>
	);
};

export default Payment;
