import { useContext } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import styles from './styles';

import ModalEventContext from '../context';

const StepProgress = ({ user, close }) => {
	const classes = styles();
	const { currentStep } = useContext(ModalEventContext);

	const a11yProps = index => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`
		};
	};
	return (
		<Tabs className={classes.tabs} value={currentStep} variant="fullWidth">
			<Tab className={classes.tab} label="Choose a category" {...a11yProps(0)} />
			<Tab className={classes.tab} label="Details" {...a11yProps(1)} />
			{user?.account_type !== 'business' && <Tab className={classes.tab} label="Invite" {...a11yProps(2)} />}
			<Tab className={classes.tabClose} onClick={close} icon={<FaTimes />} {...a11yProps(3)} />
		</Tabs>
	);
};

export default StepProgress;
