import Link from 'next/link';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const TagList = ({ eventCategories, openCategories, edit }) => {
	const classes = styles();
	const tags = () => {
		return eventCategories.map(category => {
			const parentUrl = category.parent_id === 0 ? category.id : category.parent_id;

			const childUrl = category.parent_id !== 0 ? `/${category.id}` : '';

			return (
				<Link href={`/category/${parentUrl}${childUrl}`} key={category.id} passHref>
					<Chip clickable label={category.name} className={classes.chip} />
				</Link>
			);
		});
	};

	return (
		<>
			{tags()}
			{edit && (
				<Chip
					clickable
					label={'Edit Categories'}
					onClick={openCategories}
					variant="outlined"
					className={classes.chipLightBlue}
				/>
			)}
		</>
	);
};

TagList.propTypes = {
	eventCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
	edit: PropTypes.bool,
	openCategories: PropTypes.func
};

TagList.defaultProps = {
	edit: false,
	openCategories: () => {}
};

export default TagList;
