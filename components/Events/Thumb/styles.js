import { size } from 'polished';
import styled from 'styled-components';

const defaultSize = '18.3rem';

export const Container = styled.div`
	width: ${defaultSize};
`;

export const Image = styled.picture`
	border-radius: 0.5rem;
	display: block;
	overflow: hidden;
	${size(defaultSize)}

	&:not(:last-child) {
		margin-bottom: 1.2rem;
	}

	img {
		object-fit: cover;
		${size('100%')}
	}
`;

export const Name = styled.div`
	color: $c-blue-10;
	font-size: 1.6rem;
	font-weight: 700;
`;
