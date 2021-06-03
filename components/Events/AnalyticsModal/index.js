import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, Modal, Typography, Divider } from '@material-ui/core';
import styles from './styles';

import Link from 'next/link';

import analytics from '~/services/Api/analytics';

import { FiX } from 'react-icons/fi';

const AnalyticsModal = ({ event, showAnalyticsModal, handleAnalyticsModal }) => {
	const classes = styles();
	const [data, setData] = useState();

	useEffect(() => {
		getAnalytics();
	}, []);

	const getAnalytics = async () => {
		try {
			const resp = await analytics.getAnalytics(event.id);
			// console.log(resp);
			if (resp.data?.data) {
				setData(resp.data.data);
			}
		} catch (e) {
			return;
		}
	};

	return (
		<Modal open={showAnalyticsModal} onClose={handleAnalyticsModal}>
			<Card className={classes.modal}>
				<CardContent>
					<Grid container justify="space-between" spacing={20}>
						<Typography gutterBottom variant="h3">
							Host View Information
						</Typography>
						<Button size="large" onClick={() => handleAnalyticsModal()} className={classes.closeButton}>
							<FiX />
						</Button>
					</Grid>
					<Divider variant="middle" />
					<Typography className={classes.textInfos} paragraph variant="h5">
						Total payout: <b>{`$${data?.total_value.toFixed(2)}`}</b>
					</Typography>
					<Typography className={classes.textInfos} paragraph variant="h5">
						Payout pending: <b>{`$${data?.total_value_pending.toFixed(2)}`}</b>
					</Typography>
					<Typography className={classes.textInfos} paragraph variant="h5">
						Payout received: <b>{`$${data?.total_value_paid.toFixed(2)}`}</b>
					</Typography>
					<Typography className={classes.textInfos} gutterBottom variant="h5">
						Total donations: <b>{`$${data?.total_donations.toFixed(2)}`}</b>
					</Typography>
					<Typography className={classes.textInfos} gutterBottom variant="h5">
						Tickets sold: <b>{data?.total_tickets_sales}</b>
					</Typography>
					<Typography className={classes.textInfos} gutterBottom variant="h5">
						Tickets available: <b>{data?.total_tickets_remaining}</b>
					</Typography>
					<Typography className={classes.textInfos} gutterBottom variant="h5">
						Event Stream Link:{' '}
						<a href={event.event_url}>
							<b>{event.event_url}</b>
						</a>
					</Typography>
					<form>
						<Link href="/payout">
							<Button className={classes.payoutScreenButton} variant="contained" fullWidth>
								Payout Screen
							</Button>
						</Link>
					</form>
				</CardContent>
			</Card>
		</Modal>
	);
};

export default AnalyticsModal;
