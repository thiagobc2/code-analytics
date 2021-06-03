import { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Modal, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

import ModalReportContext from './context';
import styles from './styles';
import ButtonClose from './ButtonClose';
import events from '~/services/Api/events';
import PropTypes from 'prop-types';

const ReportModal = ({ eventId, handleReportModal, showReportModal }) => {
	const { register, handleSubmit, errors } = useForm();
	const [text, setText] = useState('');
	const [reasonCharValue, setReasonCharValue] = useState(50);
	const [isDisable, setDisable] = useState(true);
	const classes = styles();

	const auth = useSelector(state => state.auth);
	const accessToken = typeof auth.access_token !== 'undefined' ? auth.access_token : null;

	const handleReportEvent = data => {
		events
			.reportEvent(eventId, data.description, accessToken)
			.then(res => {
				swal('Success!', res.data.message, 'success').then(() => {
					handleReportModal();
					setText('');
				});
			})
			.catch(error => {
				const objReturned = !!Object.keys(error).length;
				const message = objReturned
					? error.message
					: 'We were unable to complete your report, please try again later';

				swal('Error!', message, 'error').then(() => {
					handleReportModal();
				});
			});
	};

	const handleInputText = text => {
		setReasonCharValue(50 - text.length);
		setText(text);
		handleSubmitButtonState();
	};

	const handleSubmitButtonState = () => {
		setDisable(() => (reasonCharValue > 0 && reasonCharValue >= -201 ? true : false));
	};

	const handleValidateText = () => {
		if (reasonCharValue > 0) {
			return (
				<Typography className={classes.rejectColor} gutterBottom variant="body2">
					{reasonCharValue} characters left to reach the minimum required
				</Typography>
			);
		} else if (reasonCharValue >= -200) {
			return (
				<Typography className={classes.acceptColor} gutterBottom variant="body2">
					Maximum 250 character limit
				</Typography>
			);
		} else {
			return (
				<Typography className={classes.rejectColor} gutterBottom variant="body2">
					250 character limit exceeded
				</Typography>
			);
		}
	};

	return (
		<ModalReportContext.Provider value={{ handleReportModal }}>
			<Modal open={showReportModal} onClose={handleReportModal}>
				<Card className={classes.modal}>
					<CardContent>
						<Typography gutterBottom variant="h4">
							Report Event
						</Typography>
						<ButtonClose />
						<Typography className={classes.subtitle} gutterBottom variant="body1">
							Tell us why you are reporting this event?
						</Typography>
						<form onSubmit={handleSubmit(handleReportEvent)}>
							<TextField
								className={classes.textArea}
								name="description"
								placeholder="Enter text"
								value={text}
								onChange={e => handleInputText(e.target.value)}
								variant="outlined"
								error={errors.email ? true : false}
								rows={4}
								inputRef={register({
									required: true,
									minLength: 50,
									maxLength: 250
								})}
								fullWidth
								multiline
							/>

							{handleValidateText()}

							<Button
								className={classes.sendButton}
								disabled={isDisable}
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								onClick={handleReportEvent}
							>
								Report this event
							</Button>
						</form>
					</CardContent>
				</Card>
			</Modal>
		</ModalReportContext.Provider>
	);
};

ReportModal.propTypes = {
	eventId: PropTypes.number.isRequired,
	handleReportModal: PropTypes.func.isRequired,
	showReportModal: PropTypes.bool.isRequired
};

export default ReportModal;
