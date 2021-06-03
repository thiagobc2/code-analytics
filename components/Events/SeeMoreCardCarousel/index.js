import PropTypes from 'prop-types';

import styles from './styles';
import Link from 'next/link';

const SeeMoreCard = ({ link }) => {
	const classes = styles();
	return (
		<Link href={link} passHref>
			<div className={classes.contentSeemore}>
				<a className={classes.box}>
					See <br /> more
				</a>
			</div>
		</Link>
	);
};

SeeMoreCard.propTypes = {
	link: PropTypes.string.isRequired
};

export default SeeMoreCard;
