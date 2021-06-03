import { blobUrlToFile } from '~/helpers/file';
import { camelToSnake } from '~/helpers/strings';
import { store } from '~/store';

import { api, apiv3, nodeapiv3 } from './instance';
import moment from 'moment';

async function getFormData(eventData, typeImage) {
	const formData = new FormData();

	Object.keys(eventData).forEach(async key => {
		if (eventData[key]) {
			const label = camelToSnake(key);
			formData.append(label, eventData[key]);
		}
	});

	if (eventData.image && !typeImage) {
		const file = await blobUrlToFile(eventData.image);
		formData.append('image', file, `event-image.jpg`);
	}

	if (eventData.image && typeImage) {
		const file = await blobUrlToFile(eventData.image);
		formData.append(typeImage, file, `event-image.jpg`);
	}

	return formData;
}

async function createEvent(eventData, accessToken = '') {
	if (!accessToken) {
		throw new Error('The accessToken is required');
	}

	const formData = await getFormData({
		...eventData,
		categories: JSON.stringify(eventData.categories),
		contacts: eventData.contacts.length <= 0 ? '' : JSON.stringify(eventData.contacts),
		genders: JSON.stringify(eventData.genders),
		groups: JSON.stringify(eventData.invited_groups),
		age_group: eventData.age_group.replace(',', '-'),
		event_type: eventData.event_type !== false ? 2 : 1
	});

	try {
		return await apiv3.post('/event', formData, {
			headers: {
				AccessToken: accessToken !== null ? accessToken : ''
			}
		});
	} catch (e) {
		return e.response;
	}
}

async function deleteEvent(id, accessToken) {
	if (!accessToken) {
		throw new Error('The accessToken is required');
	}

	try {
		return await api.post(
			`/users/deleteevent`,
			{ event_id: id },
			{
				headers: {
					AccessToken: accessToken !== null ? accessToken : ''
				}
			}
		);
	} catch (e) {
		return e.response;
	}
}

async function editEvent(id, eventData, accessToken = '') {
	if (!accessToken) {
		throw new Error('The accessToken is required');
	}

	const formData = await getFormData(
		{
			...eventData,
			genders: JSON.stringify(eventData.genders),
			categories: JSON.stringify(eventData.categories_structured),
			// end_utc_date_time:
			// 	eventData.end_utc_date_time !== null && eventData.end_utc_date_time.search('0000-00-00 00:00:00') >= 0
			// 		? ''
			// 		: eventData.end_utc_date_time,
			// event_type: eventData.event_type ? 2 : 1,
			_method: 'PUT'
		},
		'image'
	);

	try {
		return await apiv3.post(`/event/${id}`, formData, {
			headers: {
				AccessToken: accessToken !== null ? accessToken : ''
			}
		});
	} catch (e) {
		return e.response;
	}
}

async function byCategory(parentId, childId, accessToken = '') {
	if (!parentId) {
		throw new Error('The parentId is required');
	}

	const state = store.getState();

	try {
		return await api.post(
			'/users/allcategoryevents',
			{
				latitude: state.events.coords.lat,
				longitude: state.events.coords.lng,
				default_radius: state.events.distance,
				parent_id: parentId,
				limit_web: true,
				child_id: childId || null,
				event_display: state.events.period,
				whose_going: state.events.friends
			},
			{
				headers: {
					AccessToken: accessToken !== null ? accessToken : ''
				}
			}
		);
	} catch (e) {
		return false;
	}
}

async function userEvents(page, accessToken = '', event_display, whose_going, event_mode, userId = '') {
	try {
		return await api.get(
			`/users/usersevents?page=${page}&event_display=${event_display}&whose_going=${whose_going}&event_mode=${event_mode}&user_id=${userId}`,
			{
				headers: {
					AccessToken: accessToken !== null ? accessToken : ''
				}
			}
		);
	} catch (e) {
		return e.response;
	}
}

async function listEvents(type, config, accessToken) {
	const searchConfig = {
		default_radius: config.defaultRadius,
		event_display: config.eventDisplay,
		latitude: config.latitude,
		longitude: config.longitude,
		limit_web: true,
		whose_going: config.whoseGoing
	};

	const headers = {};

	if (accessToken) {
		headers.AccessToken = accessToken;
	}

	return api.post(`/users/all${type}events`, searchConfig, {
		headers
	});
}

async function allMapEvents(accessToken = '') {
	const state = store.getState();

	try {
		return await api.post(
			'/users/allmapevents',
			{
				latitude: state.events.coords.lat,
				longitude: state.events.coords.lng,
				default_radius: state.events.distance,
				event_display: state.events.period,
				whose_going: state.events.friends
			},
			{
				headers: {
					AccessToken: accessToken !== null ? accessToken : ''
				}
			}
		);
	} catch (e) {
		return e;
	}
}

async function detail(eventId, accessToken = '') {
	if (!eventId) {
		throw new Error('The eventId is required');
	}

	try {
		const resp = await apiv3.get(`/event/${eventId}`, {
			headers: {
				AccessToken: accessToken || null
			}
		});

		return resp.data.data;
	} catch (e) {
		return false;
	}
}

async function allCategories(time = null) {
	const timeNow = time || moment().valueOf();

	try {
		const resp = await api.post('/users/categorymaster', {
			time_stamp: timeNow
		});

		return resp.data.data;
	} catch (e) {
		return false;
	}
}

async function replyEvent(eventId, type, accessToken = null) {
	try {
		const resp = await api.post(
			'/users/acceptrejectevent',
			{ event_id: eventId, type },
			{
				headers: {
					AccessToken: accessToken || ''
				}
			}
		);
		return resp;
	} catch (e) {
		return e.response.data;
	}
}

async function guests(eventId) {
	try {
		const resp = await apiv3.get(`/event/${eventId}/guest`);
		return resp.data.data;
	} catch (e) {
		return e.response;
	}
}

async function getCategory(categoryId) {
	try {
		const resp = await apiv3.get(`/category/${categoryId}`);
		return resp.data;
	} catch (e) {
		return e.response;
	}
}

async function duplicateEvent(event_id, accessToken, invite_to = 1) {
	try {
		const response = await api.post(
			`/users/shareevent`,
			{
				event_id,
				invite_to
			},
			{
				headers: {
					AccessToken: accessToken || null
				}
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}

async function inviteFriendsToEvent(event_id, friend_list, accessToken) {
	try {
		const response = await api.post(
			`/users/inviteotherevent`,
			{
				event_id,
				friend_list
			},
			{
				headers: {
					AccessToken: accessToken || null
				}
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}

async function onlineEvents(event_display, whose_going) {
	const params = {
		type: 'online',
		event_display: event_display,
		whose_going: whose_going
	};
	return apiv3.get('/event', { params });
}

async function reportEvent(event_id, reason, accessToken) {
	try {
		const response = await nodeapiv3.post(
			`/report`,
			{
				event_id,
				reason
			},
			{
				headers: {
					AccessToken: accessToken || null
				}
			}
		);
		return response;
	} catch (error) {
		return error;
	}
}

export default {
	byCategory,
	listEvents,
	detail,
	allCategories,
	replyEvent,
	guests,
	createEvent,
	allMapEvents,
	userEvents,
	editEvent,
	deleteEvent,
	duplicateEvent,
	inviteFriendsToEvent,
	onlineEvents,
	getCategory,
	reportEvent
};
