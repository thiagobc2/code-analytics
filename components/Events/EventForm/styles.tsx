import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	field: { marginBottom: 10 },
	datepicker: {
		border: 0,
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		padding: '10px 0',
		width: '100%',
		outline: 0
	},
	datepickerContainer: {
		overflow: 'hidden',
		'& .react-datepicker-wrapper': {
			width: '100%'
		}
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: '#38f09c',
		color: '#000',
		boxShadow: 'none',
		'&:disabled': {
			border: '1px solid #38f09c',
			color: '#38f09c',
			opacity: 0.5,
			background: '#fff'
		},
		'&:hover': {
			backgroundColor: '#38f09c',
			color: '#000',
			boxShadow: 'none',
			opacity: 0.7
		}
	},

	buttonCreateTicketSelected: {
		backgroundColor: theme.palette.primary.light,
		color: '#fff',
		boxShadow: 'none',
		'&:disabled': {
			border: `1px solid ${theme.palette.primary.light}`,
			color: theme.palette.primary.light,
			opacity: 0.5,
			background: '#fff'
		},
		'&:hover': {
			backgroundColor: theme.palette.primary.light,
			color: '#fff',
			boxShadow: 'none',
			opacity: 0.7
		}
	},
	buttonCreateTicket: {
		backgroundColor: '#E0E0E0',
		color: theme.palette.text.primary,
		boxShadow: 'none',
		'&:disabled': {
			border: `1px solid ${theme.palette.primary.light}`,
			color: theme.palette.primary.light,
			opacity: 0.5,
			background: '#fff'
		},
		'&:hover': {
			backgroundColor: theme.palette.primary.light,
			color: '#fff',
			boxShadow: 'none',
			opacity: 0.7
		}
	},
	guest: {
		marginTop: 10
	},
	input: {
		margin: 0,
		'& .MuiFilledInput-underline:after, & .MuiFilledInput-underline:before': {
			border: 0
		},
		'& .MuiFilledInput-root': {
			backgroundColor: '#fff',
			borderRadius: 6,
			'& :hover': {
				backgroundColor: '#fff'
			}
		}
	},
	colorRadio: {
		'& .MuiRadio-colorPrimary': {
			color: theme.palette.primary.light
		},
		color: theme.palette.primary.light
	},
	contentInfoPayd: {
		marginTop: 10,
		marginBottom: 10,
		padding: '15px 15px 0',
		border: 0,
		background: '#e9ecf3'
	},
	autocomplete: {
		zIndex: 0,
		position: 'relative'
	},
	paypalBtn: {
		width: '100%',
		minHeight: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}));

export default styles;
