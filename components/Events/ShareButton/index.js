import { useState, useMemo } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Menu, MenuItem, Button, Grid, Modal, Paper } from '@material-ui/core';

import PropTypes from 'prop-types';

import { events } from '~/services/Api';

import styles from './styles';
import swal from 'sweetalert';
import Invite from '~/components/Invite';

const options = [
	{
		id: 0,
		label: 'Invite Friends',
		value: 'invite'
	},
	{
		id: 1,
		label: 'Duplicate Event',
		value: 'duplicate'
	}
];

const ShareButton = ({ eventId }) => {
	const classes = styles();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState({
		value: null,
		optionIndex: null
	});

	const [showOptions, setShowOptions] = useState(false);

	const [sending, setSending] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClickListItem = event => setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	const handleModalOpen = () => setOpen(true);

	const handleModalClose = () => setOpen(false);

	const auth = useSelector(state => state.auth);
	const accessToken = typeof auth.access_token !== 'undefined' ? auth.access_token : null;

	async function shareEvent(optionIndex, value) {
		setShowOptions(false);

		if (value !== '') {
			setSending(true);
			let resp = false;

			if (optionIndex === 0) {
				handleModalOpen();
			}

			if (optionIndex === 1) {
				resp = await events.duplicateEvent(eventId, accessToken);
				if (resp.status) {
					swal('Ok!', 'Event successfully duplicated.', 'success');
				}
			}

			setSending(false);
			handleClose();
		}
	}

	const showButtonLabel = useMemo(() => {
		const selectedOption = options.find(option => {
			return option.value === selected.value;
		});

		return selectedOption ? selectedOption.label : 'Share';
	}, [selected.optionIndex]);

	return (
		accessToken && (
			<>
				<Button
					variant="contained"
					className={classes.mainButton}
					onClick={handleClickListItem}
					fullWidth
					// size="large"
				>
					{showButtonLabel}
				</Button>
				<Menu
					id="lock-menu"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'center',
						horizontal: 'left'
					}}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
					classes={{
						paper: classes.menu,
						list: classes.listMenu
					}}
				>
					{options.map((option, index) => {
						return (
							<MenuItem key={option} onClick={event => shareEvent(index, event)}>
								<FiCheck /> {option.label}
							</MenuItem>
						);
					})}
				</Menu>
				<Modal
					open={open}
					onClose={handleModalClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<Paper className={classes.modalContainer}>
						<Invite eventId={eventId} />
					</Paper>
				</Modal>
			</>
		)
	);
};

ShareButton.propTypes = {
	eventId: PropTypes.number.isRequired
};

export default ShareButton;
