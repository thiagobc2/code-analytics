import Link from 'next/link';
import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { imageUrl } from '~/helpers/images';
import Auth from '~/services/Auth';
import CalendarButton from '~/components/Events/CalendarButton';
import GuestList from '~/components/Events/GuestList';
import styles from './styles';


const hostInfo = (event, statusReply) => {
	const classes = styles();
	const showButtonChat = statusReply === 'going' || statusReply === 'interested';

	return (
		<>
			{event.owner.thumb_image_path && (
				<Avatar alt={event.owner.name} src={imageUrl(event.owner.thumb_image_path)} className={classes.icon} />
			)}
			<Typography className={classes.hostLink} variant="body1">
				Hosted by <Link href={`/profile/${event.owner.id}`}>{event.owner.name}</Link>
				{showButtonChat && (
					<Link href={`/chat/event/${event.id}`} passHref>
						<Chip label="Chat" clickable className={classes.chip} />
					</Link>
				)}
			</Typography>
		</>
	);
};

const formatDate = date => moment.utc(date).local().format('dddd, MMMM DD [at] h:mm A');

const dates = event => {
	const startingDate = formatDate(event.dates.start_date);

	const endDate =
		event.dates.finish_date &&
		event.dates.finish_date !== '0000-00-00 00:00:00' &&
		event.dates.finish_date !== event.dates.start_date
			? ` - ${formatDate(event.dates.finish_date)}`
			: '';
	return startingDate + endDate;
};

const Info = ({ event, statusReply }) => {
	const classes = styles();

	return (
		<Grid className={classes.container} container>
			<Grid item xs={12} className={classes.item}>
				<Typography className={classes.title} variant={'h2'}>
					{event.title}
				</Typography>
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<img src={'/assets/images/iconTime.png'} alt={event.title} className={classes.icon} />
				<Typography className={classes.datatime} variant={'body1'}>
					<strong>{dates(event)}</strong> <br />
					<small>({moment.tz.guess()} Time)</small>
				</Typography>
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<CalendarButton
					action="TEMPLATE"
					text={event.title}
					dates={event.dates}
					details={event.descriptions}
					location={event.event_type === '1' ? event.address.venue_name : event.event_url}
					sprop={`website:${event.event_url}`}
				/>
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<img src={'/assets/images/iconLocation.png'} alt="" className={classes.icon} />
				{event.event_type === '1' ? (
					<Typography variant={'body1'}>
						{event.address.venue_name || null}
						{event.address.venue_name && <br />}
						{event.address.street_address || null}
					</Typography>
				) : (
					<Typography variant={'body1'}>
						<strong>Online event</strong>
					</Typography>
				)}
			</Grid>
			<Grid item xs={12} className={classes.item}>
				<img src={'/assets/images/iconTicket.png'} alt="" className={classes.icon} />
				<Typography variant={'body1'}>
					{event.entry_fee && event.entry_fee > 0 ? `Tickets $ ${event.entry_fee}` : 'Free'}
				</Typography>
			</Grid>
			<Grid item xs={12} className={classes.item}>
				{hostInfo(event, statusReply)}
			</Grid>
			<Grid item xs={12} className={classes.item}>
				{Auth.isLoggedIn() && <GuestList eventId={event.id} />}
			</Grid>
		</Grid>
	);
};

Info.propTypes = {
	event: PropTypes.any.isRequired
};

export default Info;
