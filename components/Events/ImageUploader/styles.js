import styled from 'styled-components';

export const Container = styled.div`
	height: 0;
	overflow: hidden;
	padding-top: calc(190 / 446 * 100%);
	background: white;
	position: relative;
	margin-bottom: 20px;
`;

export const Inside = styled.div`
	align-items: center;
	background-image: linear-gradient(180deg, #000f64 0%, #060f5a 100%);
	cursor: pointer;
	display: flex;
	left: 0;
	height: 100%;
	justify-content: center;
	position: absolute;
	top: 0;
	width: 100%;

	picture {
		align-items: center;
		display: flex;
		justify-content: center;
		height: 100%;
		width: 100%;

		img {
			height: 100%;
			object-fit: cover;
			width: 100%;
		}
	}
`;

export const InputFile = styled.input`
	display: none;
`;

export const Icon = styled.img``;

export const LabelInput = styled.div`
	bottom: 1rem;
	color: #d3d9e6;
	font-weight: 500;
	position: absolute;
	right: 2rem;
	text-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
`;
