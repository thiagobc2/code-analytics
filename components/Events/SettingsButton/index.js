import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { FiAlertCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';

const SettingsEvent = ({ handleReportModal }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [isOpenModalSetting, setModalSettings] = useState(false);

	const handleSettingsModal = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleModalReportEvent = () => {
		setModalSettings(false);
		handleReportModal();
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const classes = styles();

	return (
		<>
			<Button className={classes.mainButton} onClick={handleSettingsModal}>
				<span>...</span>
			</Button>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				classes={{
					paper: classes.menu,
					list: classes.list
				}}
			>
				<Button className={classes.button} onClick={handleModalReportEvent}>
					<FiAlertCircle />
					<p>Report Event</p>
				</Button>
			</Menu>
		</>
	);
};

export default SettingsEvent;
