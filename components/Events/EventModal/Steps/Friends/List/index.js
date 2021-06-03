import { useContext, useState } from 'react';

import produce from 'immer';
import PropTypes from 'prop-types';

import { imageUrl } from '~/helpers/images';

import ModalEventContext from '../../../context';
import { Container, Content } from './styles';

function List({ type, data }) {
	const { setEventData, eventData } = useContext(ModalEventContext);
	const [selectedAll, setSelectedAll] = useState(true);
	const [selectedAllGroup, setSelectedAllGroup] = useState(true);

	function imgValid(image) {
		if (image.length > 0) {
			return imageUrl(image[0].thumb_image_path);
		}
		return '/assets/images/placeholder.png';
	}

	function imgValidGroup(image) {
		if (image.length > 0 && image.image) {
			return imageUrl(image.image[0].thumb_image_path);
		}
		return '/assets/images/placeholder.png';
	}

	function selectAll() {
		if (type === 'users') {
			setSelectedAll(!selectedAll);

			if (eventData.contacts === data) {
				setEventData({ ...eventData, contacts: [] });
			} else {
				setEventData({ ...eventData, contacts: data });
			}
		}

		if (type === 'groups') {
			setSelectedAllGroup(!selectedAllGroup);

			if (eventData.invited_groups === data) {
				setEventData({ ...eventData, invited_groups: [] });
			} else {
				setEventData({ ...eventData, invited_groups: data });
			}
		}
	}

	function selectData(user) {
		const index = eventData.contacts.findIndex(contact => contact.id === user.id);

		if (index < 0) {
			setEventData({
				...eventData,
				contacts: [...eventData.contacts, user]
			});
		} else {
			const nextSelected = produce(eventData.contacts, draft => {
				draft.splice(index, 1);
			});

			setEventData({ ...eventData, contacts: nextSelected });
		}
	}

	function selectDataGroup(group) {
		const index = eventData.invited_groups.findIndex(item => item.group_id === group.group_id);

		if (index < 0) {
			setEventData({
				...eventData,
				invited_groups: [...eventData.invited_groups, group]
			});
		} else {
			const nextSelected = produce(eventData.invited_groups, draft => {
				draft.splice(index, 1);
			});

			setEventData({ ...eventData, invited_groups: nextSelected });
		}
	}

	const isSelected = user => eventData.contacts.includes(user);

	const isSelectedGroup = group => eventData.invited_groups.includes(group);

	return (
		<Container>
			{type === 'users' && (
				<a href="#" className="selectAll" onClick={() => selectAll()}>
					{selectedAll ? 'Select all' : 'Unselect all'}
				</a>
			)}

			{type === 'groups' && (
				<a href="#" className="selectAll" onClick={() => selectAll()}>
					{selectedAllGroup ? 'Select all' : 'Unselect all'}
				</a>
			)}

			<Content className={type === 'groups' && 'listAllGroup'}>
				{type === 'users' &&
					data.map(user => (
						<div key={user.id} className="boxUser">
							<img src={imgValid(user.profile_images)} alt={user.name} />
							<p className="userName">{user.name}</p>
							<p className="userFriends">
								{user.total_mutual_friend > 1 || user.total_mutual_friend === 0
									? `${user.total_mutual_friend} mutual friends`
									: `${user.total_mutual_friend} mutual friend`}
							</p>

							<button
								type="button"
								value={user}
								className={`${isSelected(user) && 'active'}`}
								onClick={() => selectData(user)}
							>
								{`${isSelected(user) ? 'Remove' : 'Invite'}`}
							</button>
						</div>
					))}

				{type === 'groups' &&
					data.map(group => (
						<div key={group.group_id} className="boxUser">
							<img src={imgValidGroup(group.group_icon_images)} alt={group.group_title} />
							<p className="userName">{group.group_title}</p>

							<button
								type="button"
								value={group}
								className={`${isSelectedGroup(group) && 'active'}`}
								onClick={() => selectDataGroup(group)}
							>
								{`${isSelectedGroup(group) ? 'Remove' : 'Invite'}`}
							</button>
						</div>
					))}
			</Content>
		</Container>
	);
}

export default List;

List.propTypes = {
	data: PropTypes.objectOf().isRequired,
	type: PropTypes.string.isRequired
};
