import { Slider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const AgeGroup = ({ data, ageGroupSelected }) => {
	const classes = styles();
	const value = data.split('-');
	value[0] = Number(value[0]);
	value[1] = Number(value[1]);

	return (
		<>
			<Typography className={classes.info} gutterBottom>{`${value[0]}-${value[1]}`}</Typography>
			<div className={classes.sliderContainer}>
				<Slider
					classes={{
						root: classes.slider,
						thumb: classes.thumb
					}}
					value={value}
					onChange={(event, newValue) => {
						ageGroupSelected(`${newValue[0]}-${newValue[1]}`);
					}}
				/>
			</div>
		</>
	);
};

AgeGroup.propTypes = {
	data: PropTypes.arrayOf().isRequired,
	ageGroupSelected: PropTypes.func.isRequired
};

export default AgeGroup;
