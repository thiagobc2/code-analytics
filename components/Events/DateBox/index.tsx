import { toCalendar } from '~/services/Date';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

const DateBox = ({ date }) => {
	const formattedDate = toCalendar(date);
	const classes = styles();
	return (
		<Grid container className={classes.box}>
			<Grid item className={classes.month}>
				{formattedDate.month}
			</Grid>
			<Grid item className={classes.day}>
				{formattedDate.day}
			</Grid>
		</Grid>
	);
};
DateBox.propTypes = {
	date: PropTypes.any.isRequired
};
export default DateBox;
