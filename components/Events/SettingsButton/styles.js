import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';
import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
`;

export const MainButton = styled.button`
	cursor: pointer;
	width: 52px;
	height: 52px;
	border: none;
	background-color: #eaedf3;
	border-radius: 8px;
	outline: none;
	box-shadow: none;
	display: flex;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 812px) {
		width: 100%;
	}

	& > p {
		font-size: 3.6rem;
		line-height: 0;
		/* display: inline; */
		height: 20px;
		@media screen and (max-width: 812px) {
			height: 10px;
		}
	}
`;

export const ModalSettings = styled.div`
	cursor: pointer;
	background-color: #eaedf3;
	box-sizing: border-box;
	max-width: 253px;
	margin: auto;
	position: relative;
	border-radius: 0 0 6px 6px;
	box-shadow: 0 0 5px #dddddd;
	padding: 10px 15px;
	position: absolute;
	top: 62px;
	right: 0;
	width: 155px;
	display: ${props => (props.isOpen ? 'flex' : 'none')};
	flex-flow: row nowrap;

	& > p {
		color: #1377ef;
		font-weight: bold;
		font-size: 1.6rem;
	}

	& > .icon {
		fill: #1377ef;
		height: 2rem;
		width: 2rem;
		margin-right: 5px;
	}
`;

const styles = makeStyles(theme => ({
	container: {
		position: 'relative'
	},
	mainButton: {
		cursor: 'pointer',
		width: 52,
		height: 52,
		border: 'none',
		backgroundColor: '#eaedf3',
		borderRadius: 8,
		outline: 'none',
		boxShadow: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'&:hover': {
			backgroundColor: '#eaedf3'
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%'
		},
		'& > span > span': {
			fontFamily: '"Gilroy",sans-serif,helvetica,arial',
			fontWeight: 400,
			fontSize: 36,
			lineHeight: 0,
			height: 20,
			position: 'absolute',
			top: '50%',
			marginTop: -10,
			[theme.breakpoints.down('xs')]: {
				height: 10
			}
		}
	},
	modalSettings: {
		cursor: 'pointer',
		backgroundColor: '#eaedf3',
		boxSizing: 'border-box',
		maxWidth: 253,
		margin: 'auto',
		borderRadius: '0 0 6px 6px',
		boxShadow: '0 0 5px #dddddd',
		padding: '10px 15px',
		position: 'absolute',
		top: 62,
		right: 0,
		width: 155,
		display: props => (props.isOpen ? 'flex' : 'none'),
		flexFlow: 'row nowrap',
		'& > p': {
			color: '#1377ef',
			fontWeight: 'bold',
			fontSize: 16
		},
		'& > .icon': {
			fill: '#1377ef',
			height: 2,
			width: 2,
			marginRight: 5
		}
	},
	menu: {
		backgroundColor: 'transparent',
		boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.15)',
		marginTop: 60
	},
	list: {
		backgroundColor: 'transparent',
		padding: 0
	},
	button: {
		backgroundColor: '#eaedf3',
		color: '#1377ef',
		fontWeight: 'bold',
		fontSize: 16,
		maxWidth: 155,
		'&:hover': {
			backgroundColor: '#eceef3',
			color: '#1377ef'
		},
		'& > span > p': {
			margin: '0 0 0 5px'
		}
	}
}));

export default styles;
