import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import Carousel from '~/components/Carousel';
import styles from './styles';

import Link from 'next/link';

const BoxCategories = ({ data, name, idCat, linkTo }) => {
	const classes = styles();
	const { pathname } = window.document.location;
	let catSub = pathname.split('/category/');
	catSub = catSub[0] === pathname ? null : catSub[1];

	const url = `/category/${catSub !== null ? `${catSub}/${idCat}` : idCat}`;

	const path = idCat === 1 ? 'my-events' : 'events/asembl';

	const categoryLink = idCat > 1 ? url : path;

	return (
		<>
			<Link href={linkTo || categoryLink} passHref>
				<a className={classes.title}>
					<Typography variant="h1">{name}</Typography>
				</a>
			</Link>
			<Carousel data={data} link={linkTo || categoryLink} />
		</>
	);
};

BoxCategories.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	name: PropTypes.string.isRequired,
	idCat: PropTypes.number,
	linkTo: PropTypes.string
};

BoxCategories.defaultProps = {
	idCat: null,
	linkTo: null
};

export default BoxCategories;
