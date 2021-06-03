import styled from 'styled-components';

export const Container = styled.div`
	border-bottom: 1px solid #e4e4e4;
	padding-bottom: 40px;

	.selectAll {
		float: right;
		font-size: 1.4rem;
		font-weight: 400;
		position: absolute;
		right: 20px;
		color: #007aff;
		font-family: 'Gilroy', sans-serif;
		margin-top: -30px;
	}
`;

export const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 8rem;
	row-gap: 4rem;

	&.listAllGroup {
		padding-top: 32px;
		:30px ;
	}

	@media (max-width: 700px) {
		grid-template-columns: repeat(1, 1fr);
		column-gap: 2rem;
		row-gap: 2rem;
		display: block;
		width: 100%;
		float: left;
		margin-bottom: 30px;
	}

	.boxUser {
		font-family: 'Gilroy', sans-serif;

		img {
			width: 60px;
			height: 60px;
			border-radius: 60px;
			float: left;
			margin-right: 20px;
		}

		.userName {
			float: left;
			width: calc(90% - 180px);
			overflow: hidden;
			margin-top: 8px;
			color: #111111;
		}

		.userFriends {
			float: left;
			width: calc(90% - 180px);
			color: #9698a0;
			font-size: 1.5rem;
			margin-top: 0;
		}

		button {
			float: right;
			background: #087eff;
			box-shadow: none;
			border: 1px solid #087eff;
			outline: 0;
			color: #fff;
			font-family: 'Gilroy', sans-serif;
			font-size: 1.6rem;
			border-radius: 5px;
			margin-top: -18px;
			width: 100px;
			font-weight: 600;
			padding: 5px;
			cursor: pointer;

			&.active {
				color: #4e6376;
				border-color: #607b8e;
				background: #fff;
			}
		}
	}
`;
