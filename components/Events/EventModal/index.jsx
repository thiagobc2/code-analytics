import { useState, useEffect } from 'react';
import { Card, CardContent, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';

import Close from './Close';
import ModalEventContext from './context';
import StepProgress from './StepProgress';
import ChooseCategory from './Steps/ChooseCategory';
import ChooseInvite from './Steps/ChooseInvite';
import Create from './Steps/Create';
import Details from './Steps/Details';
import Friends from './Steps/Friends';
import styles from './styles';

const EventModal = ({ user, show }) => {
	const [state, setState] = useState({
		typeSelected: null,
		loading: true
	});

	const classes = styles();

	const baseDate = moment().add(40, 'days');
	const startDate = baseDate.set({ hour: 19, minute: 0, second: 0, millisecond: 0 }).toDate();
	const endDate = baseDate.add(3, 'hours').toDate();
	const starting_utc_date_time = baseDate.utc().format('YYYY-MM-DD HH:mm:ss');
	const end_utc_date_time = baseDate.add(3, 'hours').utc().format('YYYY-MM-DD HH:mm:ss');
	const currentTimezone = moment.tz.guess();
	const originalEventData = {
		event_type: true,
		categories: [],
		image: null,
		title: null,
		descriptions: null,
		address: null,
		city: null,
		state: null,
		post_code: null,
		lat: null,
		lng: null,
		starting_utc_date_time: starting_utc_date_time,
		end_utc_date_time: end_utc_date_time,
		entry_fee: null,
		event_url: null,
		sharing: true,
		open_all: true,
		is_ticket: 1,
		age_group: '0-100',
		invitation_to: null,
		genders: ['m', 'f', 'nb'],
		contacts: [],
		invited_groups: [],
		user_time_zone: currentTimezone,
		timezone: currentTimezone
	};

	const [eventData, setEventData] = useState(originalEventData);
	const [inviteSelected, setInviteSelected] = useState(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [slideValue, setSlideValue] = useState([0, 100]);
	const [categories, setCategories] = useState(null);
	const [genderSelected, setGenderSelected] = useState({
		checkAll: true,
		value: ['m', 'f', 'b']
	});
	const [valid, setValid] = useState(true);

	const [dateTime, setDateTime] = useState({
		startDate: startDate,
		endDate: endDate
	});

	const [selectedAddress, setSelectedAddress] = useState(false);
	const [children, setChildren] = useState([]);

	const steps = [
		{
			name: 'choose-category',
			component: <ChooseCategory />
		},
		{
			name: 'details',
			component: <Details user={user} />
		},
		{
			name: 'choose-invite',
			component: <ChooseInvite />
		},
		{
			name: 'friends',
			component: <Friends />
		},
		{
			name: 'create',
			component: <Create />
		}
	];

	const showPrevStep = () => {
		const totalSteps = steps.length;
		const prevIndex = currentStep - 1;
		if (prevIndex <= totalSteps) {
			setCurrentStep(prevIndex);
		}
	};

	const CreateEvent = () => {
		setCurrentStep(steps.length - 1);
	};

	const showNextStep = () => {
		const totalSteps = steps.length;
		const nextIndex = currentStep + 1;
		if (nextIndex <= totalSteps) {
			setCurrentStep(nextIndex);
		}
	};

	const CloseModal = () => {
		show.setShowModal(false);
		setEventData(originalEventData);
	};

	return (
		<ModalEventContext.Provider
			value={{
				eventData,
				setCategories,
				categories,
				setEventData,
				showPrevStep,
				showNextStep,
				setState,
				state,
				inviteSelected,
				setInviteSelected,
				slideValue,
				setSlideValue,
				genderSelected,
				setGenderSelected,
				CreateEvent,
				CloseModal,
				valid,
				setValid,
				dateTime,
				setDateTime,
				selectedAddress,
				setSelectedAddress,
				children,
				setChildren,
				currentStep
			}}
		>
			<Modal open={show.showModal} onClose={CloseModal}>
				<Card className={classes.modalContainer}>
					<CardContent className={classes.modalHeader}>
						{/* <Close /> */}
						<StepProgress user={user} close={CloseModal} />
					</CardContent>
					<CardContent className={classes.modalBody}>{steps[currentStep].component}</CardContent>
				</Card>
			</Modal>
		</ModalEventContext.Provider>
	);
};

EventModal.propTypes = {
	show: PropTypes.shape({
		showModal: PropTypes.bool.isRequired,
		setShowModal: PropTypes.func.isRequired
	}).isRequired
};

export default EventModal;
