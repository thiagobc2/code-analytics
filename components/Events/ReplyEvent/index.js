import { useState, useEffect, useMemo } from 'react';
import { FiMapPin, FiChevronDown, FiCheck, FiHeart, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Menu, MenuItem, Button } from '@material-ui/core';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { theme } from '~/config/theme';

import { events } from '~/services/Api';
import styles from './styles';

const options = [
	{
		id: 0,
		label: 'You in?',
		value: 'youin',
		icon: <FiMapPin />,
		bgColor: '#eaedf3',
		color: theme.palette.text.primary
	},
	{
		id: 1,
		label: 'Going',
		value: 'going',
		icon: <FiMapPin />,
		bgColor: theme.palette.secondary.main,
		color: theme.palette.text.tertiary
	},
	{
		id: 2,
		label: 'Interested',
		value: 'likeinterested',
		icon: <FiHeart />,
		bgColor: '#c1ecff',
		color: theme.palette.text.primary
	},
	{
		id: 3,
		label: 'Not Going',
		value: 'notgoing',
		icon: <FiX />,
		bgColor: '#eaedf3',
		color: theme.palette.text.primary
	}
];

const ReplyEvent = ({ eventId, optionSelected, statusReply }) => {
	const { access_token } = useSelector(state => state.auth);
	const [anchorEl, setAnchorEl] = useState(null);
	const [currentStatus, setCurrentStatus] = useState(optionSelected);

	const router = useRouter();
	const classes = styles();

	const handleClickListItem = event => setAnchorEl(event.currentTarget);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMainButtonState = () => {
		let choiceStatus = {};
		switch (currentStatus) {
			case 'going':
				choiceStatus = 1;
				break;
			case 'likeinterested':
				choiceStatus = 2;
				break;
			case 'notgoing':
				choiceStatus = 3;
				break;
			default:
				choiceStatus = 0;
				break;
		}

		return (
			<Button
				variant="contained"
				style={{
					backgroundColor: options[choiceStatus].bgColor,
					color: options[choiceStatus].color
				}}
				className={classes.mainButton}
				onClick={!access_token ? showModal : handleClickListItem}
				fullWidth
				size="large"
			>
				{options[choiceStatus].icon} {options[choiceStatus].label} <FiChevronDown />
			</Button>
		);
	};

	async function respondEvent(event, index) {
		const status = options[index].value;
		const resp = await events.replyEvent(eventId, status, access_token || null);
		setCurrentStatus(status);
		handleClose();
		if (resp.data) {
			statusReply(resp.data?.event_attending_status);
		}
	}

	function showModal() {
		swal('You need an asembl account to do that', {
			buttons: {
				signup: {
					text: 'Signup',
					value: 'signup',
					className: 'blue'
				},
				signin: {
					text: 'Signin',
					value: 'signin',
					className: 'gray'
				}
			}
		}).then(result => {
			if (result === 'signin') {
				router.push('/signin');
			}
			if (result === 'signup') {
				router.push('/signup');
			}
		});
	}

	return (
		<>
			{handleMainButtonState()}
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
					if (index === 0) return;
					return (
						<MenuItem key={option} onClick={event => respondEvent(event, index)}>
							<FiCheck /> {option.label}
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};

ReplyEvent.propTypes = {
	eventId: PropTypes.any.isRequired,
	optionSelected: PropTypes.string,
	statusReply: PropTypes.any.isRequired
};

export default ReplyEvent;
