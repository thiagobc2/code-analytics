import PropTypes from 'prop-types';

import { imageUrl } from '~/helpers/images';

import { Container, Image, Name } from './styles';

export default function Thumb({ event }) {
	const event_link = `/event/${event.id}`;
	function shortTitle(title) {
		if (title.length < 15) {
			return title;
		}

		return `${title.slice(0, 15)}...`;
	}

	return (
		<Container>
			<a href={event_link}>
				<Image>
					{imageUrl(event.image) && <img src={imageUrl(event.image)} alt={event.title} title={event.title} />}
				</Image>
				<Name className="title">{shortTitle(event.title)}</Name>
			</a>
		</Container>
	);
}

Thumb.propTypes = {
	event: PropTypes.objectOf(PropTypes.any).isRequired
};
