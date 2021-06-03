import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';

const styles = makeStyles(theme => ({
	contentLoggedIn: {
		marginTop: 20,
		marginBottom: 20
	},
	title: {
		color: 'rgb(0, 0, 0)',
		fontSize: 25,
		fontWeight: 'bold'
	},
	subTitle: {
		color: 'rgb(0, 0, 0)',
		fontSize: 23,
		fontWeight: 'bold'
	},
	textNoLogged: {
		color: 'rgb(0, 0, 0)',
		fontSize: 18,
		fontWeight: '400',
		'& a': {
			color: theme.palette.primary.light
		}
	},
	textContactInfo: {
		color: 'rgb(0, 0, 0)',
		fontSize: 20,
		fontWeight: 'bold'
	},
	input: {
		marginTop: -20,
		'& .MuiFilledInput-inputMarginDense': {
			padding: 9
		},
		'& .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)': {
			marginTop: 0
		},
		'& .MuiFilledInput-underline:after, & .MuiFilledInput-underline:before': {
			border: 0
		},
		'& .MuiFilledInput-root': {
			backgroundColor: '#e9e9ee',
			borderRadius: 6,
			'& :hover': {
				backgroundColor: '#e9e9ee'
			}
		}
	},
	smallText: {
		color: 'rgb(0, 0, 0)',
		fontSize: 13,
		marginBottom: 20,
		fontWeight: '400',
		'& span': {
			color: theme.palette.primary.light
		}
	},
	description: {
		color: 'rgb(0, 0, 0)',
		fontSize: 16,
		fontWeight: '400',
		marginBottom: 10,
		'& a': {
			color: theme.palette.primary.light
		}
	},
	contentPaypal: {
		minHeight: 100,
		marginTop: 10,
		padding: 30,
		border: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.primary
	},

	hr: {
		marginTop: 10,
		marginBottom: 10
	}
}));

export default styles;
