import styled from 'styled-components';

export const Box = styled.div`
	cursor: pointer;
	outline: 0;
`;

export const Line = styled.div`
	margin-bottom: 30px !important;

	&:last-child {
		margin-bottom: 0px !important;
	}
`;

export const Title = styled.h5`
	text-align: center;
	font-weight: bold;
	margin-bottom: 30px;
	font-size: 2rem;
	color: #000000;
`;

export const Image = styled.div`
	text-align: center;
	width: 100%;
	background: #00043f;
	border-radius: 5px;
	padding: 60px 0;

	&:hover {
		background: #030856;
	}
`;

export const Name = styled.p`
	text-align: center;
	color: #000000;
	font-weight: bold;
	font-size: 2.2rem;
	font-weight: bold;
	text-transform: capitalize;
`;

export const CategoriesList = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	column-gap: 1.5rem;
	row-gap: 3rem;

	@media (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
		row-gap: 1rem;
	}
`;
