import { eventConstants } from '../constants';

function storeCoords(coords) {
	return {
		type: eventConstants.SET_COORDS,
		coords
	};
}

function storeFilters(filters) {
	return {
		type: eventConstants.SET_FILTERS,
		filters
	};
}

function clearCoords() {
	return {
		type: eventConstants.SET_CLEAR_COORDS
	};
}

function clearFilters() {
	return {
		type: eventConstants.SET_CLEAR_FILTERS
	};
}

const setAsked = () => ({ type: 'ASKED' });

export const eventActions = {
	storeCoords,
	storeFilters,
	clearCoords,
	clearFilters,
	setAsked
};
