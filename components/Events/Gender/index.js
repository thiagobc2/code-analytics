import produce from 'immer';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

import styles from './styles';

const Gender = ({ data, genderSelected }) => {
	const classes = styles();
	const options = [
		{
			label: 'Male',
			value: 'm'
		},
		{
			label: 'Female',
			value: 'f'
		},
		{
			label: 'Non-binary',
			value: 'nb'
		}
	];

	const onToggleOption = value => {
		const nextGenders = produce(data, draft => {
			const optionIndex = draft.findIndex(option => option === value);

			if (optionIndex >= 0) {
				draft.splice(optionIndex, 1);
			} else {
				draft.push(value);
			}
		});

		genderSelected(nextGenders);
	};

	const isSelected = value => data.includes(value);

	return (
		<>
			{options.map(option => (
				<Chip
					key={option.value}
					variant={isSelected(option.value) ? 'contained' : 'outlined'}
					onClick={() => onToggleOption(option.value)}
					clickable
					label={option.label}
					className={isSelected(option.value) ? classes.chipLightBlue : classes.chip}
				/>
			))}
		</>
	);
};

Gender.propTypes = {
	data: PropTypes.arrayOf().isRequired,
	genderSelected: PropTypes.func.isRequired
};

export default Gender;
