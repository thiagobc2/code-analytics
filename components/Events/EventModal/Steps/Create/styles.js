import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Success = styled.div`
	text-align: center;
	padding: 50px 0;

	h4 {
		font-size: 26px;
		color: #00c269;
		margin-bottom: 30px;
	}

	a {
		text-transform: capitalize;
		text-decoration: none;
		background: #04032b;
		padding: 6px 20px;
		border-radius: 60px;
		color: #fff;
	}
`;

export const styles = makeStyles(theme => ({
	success: {
		textAlign: 'center',
		padding: '50px 0',
		'& > h4': {
			fontSize: 26,
			color: '#00c269',
			marginBottom: 30,
			fontWeigth: 400
		},
		'& > a': {
			textTransform: 'capitalize',
			textDecoration: 'none',
			background: '#04032b',
			padding: '6px 20px',
			borderRadius: 60,
			color: '#fff'
		}
	}
}));
