import { getRadius } from '~/helpers/userLocation';

import { eventConstants } from '../constants';

const initialState = {
	coords: {
		lat: 40.7,
		lng: -74.0
	},
	period: 'all',
	friends: 0,
	distance: getRadius(40.7, 12),
	asked: false
};

export function events(state = initialState, action) {
	switch (action.type) {
		case 'ASKED':
			return { ...state, asked: true };

		case eventConstants.SET_COORDS:
			return {
				...state,
				coords: {
					lat: action.coords.lat,
					lng: action.coords.lng
				},
				distance: action.coords.radius || initialState.distance
			};

		case eventConstants.SET_FILTERS:
			return {
				...state,
				period: action.filters.period,
				friends: action.filters.friends,
				distance: action.filters.distance || initialState.distance
			};

		case eventConstants.SET_CLEAR_COORDS:
			return {
				...state,
				coords: {
					lat: initialState.coords.lat,
					lng: initialState.coords.lng
				}
			};

		case eventConstants.SET_CLEAR_FILTERS:
			return {
				...state,
				period: initialState.period,
				friends: initialState.friends,
				distance: initialState.distance
			};

		default:
			return state;
	}
}
