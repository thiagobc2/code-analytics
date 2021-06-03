import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';

const styles = makeStyles(theme => ({
	modal: {
		width: '100%',
		maxWidth: 700,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: `translate(-50%, -50%)`,
		padding: 0,
		outline: 'none',

		'& a':{
			textDecoration: 'none',
			textTransform: 'lowercase',
			color: '#000'
		}
	},
	textInfos: {
		color: 'rgb(0, 0, 0)',
		fontWeight: 400,
		width: '100%',
		fontSize: 17,
		marginTop: 20,
		marginBottom: 10
	},
	closeButton: {
		fontSize: 26
	},
	payoutScreenButton: {
		backgroundColor: 'rgb(56, 240, 156, 100)',
		color: 'rgb(0, 0, 0)',
		marginTop: 20,
		maxWidth: 250,
		fontSize: 22,
		height: 50,
		'&:hover': {
			backgroundColor: 'rgb(56, 240, 140, 100)',
			opacity: 0.5
		},
		'&:disabled': {
			color: '#ffffff',
			backgroundColor: theme.palette.text.primary,
			opacity: 0.5
		}
	}
}));

export default styles;
