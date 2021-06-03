import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';

const styles = makeStyles(theme => ({
	modal: {
		width: '100%',
		maxWidth: 420,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: `translate(-50%, -50%)`,
		padding: 0,
		outline: 'none'
	},
	subtitle: {
		fontWeight: 'bold',
		color: 'rgb(0, 0, 0)',
		width: '100%',
		fontSize: 17,
		marginBottom: 10
	},
	textArea: {
		'&:focus': {
			outline: theme.palette.primary.light
		}
	},
	sendButton: {
		backgroundColor: 'rgb(0, 122, 255)',
		color: 'rgb(255, 255, 255)',
		height: 50,
		'&:hover': {
			backgroundColor: 'rgb(0, 122, 255)',
			opacity: 0.5
		},
		'&:disabled': {
			color: '#ffffff',
			backgroundColor: theme.palette.text.primary,
			opacity: 0.5
		}
	},
	acceptColor: {
		color: theme.palette.primary.light
	},
	rejectColor: {
		color: theme.palette.secondary.main
	}
}));

export default styles;
