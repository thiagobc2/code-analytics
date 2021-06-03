import PropTypes from 'prop-types';

import NotEvents from '~/components/NotEvents';

import BoxCategories from '../BoxCategories';
import styles from './styles';

const CategoryList = ({ events: { categoryEvents, categoryEventsAsembl, myEvents, onlineEvents } }) => {
	const classes = styles();

	if (!onlineEvents) {
		onlineEvents = [];
	}
	if (
		categoryEvents.length === 0 &&
		categoryEventsAsembl.length === 0 &&
		myEvents.length === 0 &&
		onlineEvents.length === 0
	)
		return <NotEvents />;

	return (
		<>
			{myEvents.length !== 0 && <BoxCategories data={myEvents} name="My Events" idCat={1} />}

			{onlineEvents && onlineEvents.length !== 0 && (
				<BoxCategories data={onlineEvents} name="Online Events" linkTo="/online-events" />
			)}

			{categoryEventsAsembl.length !== 0 && (
				<BoxCategories
					data={categoryEventsAsembl}
					name={categoryEventsAsembl[0].event_owner_name}
					idCat={0}
					linkTo="/asembl-events"
				/>
			)}

			{categoryEvents.map(category => (
				<BoxCategories key={category.id} data={category.list} name={category.name} idCat={category.id} />
			))}
		</>
	);
};

CategoryList.propTypes = {
	events: PropTypes.objectOf(PropTypes.any).isRequired
};

export default CategoryList;
