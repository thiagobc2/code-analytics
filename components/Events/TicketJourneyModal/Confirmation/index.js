import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import { FaRegCheckCircle } from 'react-icons/fa';

import styles from './styles';

const Confirmation = ({ closeModal }) => {
	const classes = styles();
	return (
		<div className={classes.bodyConfirmation}>
			<FaRegCheckCircle className={classes.iconCheck} />
			<Typography variant="h6" className={classes.textSuccess}>
				Your purchase has been successfully completed!!!
			</Typography>
			<Button className={classes.buttonClose} onClick={closeModal}>
				Close
			</Button>
		</div>
	);
};

export default Confirmation;
