import Link from 'next/link';
import PropTypes from 'prop-types';
// import icsFormatter from 'icsFormatter/icsFormatter';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import styles from './styles';

const formatDate = date => moment.utc(date).local().format('YYYYMMDD[T]HHmm');
const calendar_dates = dates => {
	const startingDate = formatDate(dates.start_date);

	const endDate =
		dates.finish_date && dates.finish_date !== '0000-00-00 00:00:00'
			? `/${formatDate(dates.finish_date)}`
			: `/${formatDate(dates.start_date)}`;

	return `${startingDate}${endDate}`;
};

const CalendarButton = ({ action, text, dates, details, location, sprop }) => {
	const classes = styles();
	// const calEntry = icsFormatter;
	// const begin_utc = moment.utc(dates.start_date).local().toDate();
	// const end_utc =
	// 	dates.finish_date && dates.finish_date !== '0000-00-00 00:00:00'
	// 		? moment.utc(dates.finish_date).local().toDate()
	// 		: moment.utc(dates.start_date).local().toDate();

	const calendarLink = `https://www.google.com/calendar/event?action=${action}&text=${text}&dates=${calendar_dates(
		dates
	)}&details=${details}&location=${location}&sprop=${sprop}`;

	// calEntry.addEvent(text, details, location, begin_utc, end_utc);

	return (
		<Typography className={classes.hostLink} variant={'body1'}>
			<span>Add to</span>&nbsp;
			<Link href={calendarLink} passHref>
				<a target="_blank">Google Calendar</a>
			</Link>
			{/* <Spacing>or</Spacing>
			<ICSbutton onClick={() => calEntry.download()} download>
				Export Event
			</ICSbutton> */}
		</Typography>
	);
};

CalendarButton.propTypes = {
	action: PropTypes.string,
	text: PropTypes.string,
	dates: PropTypes.any,
	details: PropTypes.string,
	location: PropTypes.string,
	sprop: PropTypes.string
};

CalendarButton.defaultProps = {
	action: 'TEMPLATE'
};

export default CalendarButton;
