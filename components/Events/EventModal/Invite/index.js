import { useContext, useEffect } from 'react';
import { Chip } from '@material-ui/core';

import ModalEventContext from '../context';
import styles from './styles';

const Invite = () => {
	const { inviteSelected, setInviteSelected, eventData, setEventData } = useContext(ModalEventContext);
	const classes = styles();
	const invites = [
		{
			label: 'Choose asembl friends',
			value: 2
		},
		{
			label: 'All asembl friends',
			value: 4
		},
		{
			label: 'All Friends + friends of friends',
			value: 3
		},
		{
			label: 'Everyone on asembl',
			value: 1
		}
	];

	useEffect(() => {
		setEventData({
			...eventData,
			invitation_to: inviteSelected
		});
	}, [inviteSelected]);

	const setSelectedValue = buttonValue => {
		setInviteSelected(buttonValue);
	};

	return (
		<div className={classes.container}>
			{invites.map(item => (
				<Chip
					key={item.value}
					variant={item.value === inviteSelected ? 'contained' : 'outlined'}
					onClick={() => setSelectedValue(item.value)}
					clickable
					label={item.label}
					className={item.value === inviteSelected ? classes.chipLightBlue : classes.chip}
					fullWidth
				/>
			))}
		</div>
	);
};

export default Invite;
