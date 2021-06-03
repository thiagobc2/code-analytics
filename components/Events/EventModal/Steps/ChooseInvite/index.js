import { useContext } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import AgeGroup from '~/components/Events/AgeGroup';
import Gender from '~/components/Events/Gender';
import Invite from '~/components/Events/EventModal/Invite';
import ModalEventContext from '../../context';

import styles from './styles';

const ChooseInvite = () => {
	const { showPrevStep, showNextStep, eventData, setEventData, inviteSelected, CreateEvent } = useContext(
		ModalEventContext
	);
	const classes = styles();
	return (
		<>
			<Grid container spacing={4} className={classes.container}>
				<Grid className={classes.infoContainer} container xs={12} nowrap>
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<Typography variant="body1" className={classes.guest}>
							<strong>* Invite</strong>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<Typography variant="body1" className={classes.guest}>
							<strong>Age group</strong>
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.field}>
					<Invite />
				</Grid>
				<Grid item xs={12} sm={6} className={classes.field}>
					<AgeGroup
						data={eventData.age_group}
						ageGroupSelected={value =>
							setEventData({
								...eventData,
								age_group: value
							})
						}
					/>

					<Typography variant="body1" className={classes.guest}>
						<strong>Gender</strong>
					</Typography>
					<Gender
						data={eventData.genders}
						genderSelected={value =>
							setEventData({
								...eventData,
								genders: value
							})
						}
					/>
				</Grid>
			</Grid>
			<hr />
			<Grid container spacing={4} className={classes.container}>
				<Grid item md={3} sm={6} xs={12}>
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={() => showPrevStep()}
						fullWidth
					>
						Prev
					</Button>
				</Grid>
				<Grid item md={3} sm={6} xs={12}>
					{inviteSelected !== 2 ? (
						<Button
							variant="contained"
							className={classes.button}
							onClick={() => CreateEvent()}
							disabled={eventData.invitation_to <= 0 || eventData.genders <= 0}
							fullWidth
						>
							Create Event
						</Button>
					) : (
						<Button
							variant="contained"
							className={classes.button}
							onClick={() => showNextStep()}
							disabled={eventData.invitation_to <= 0 || eventData.genders <= 0}
							fullWidth
						>
							Next
						</Button>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default ChooseInvite;
