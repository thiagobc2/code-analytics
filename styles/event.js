import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';

const styles = makeStyles(theme => ({
	container: {
		marginTop: -20
	},
	alertWarning: {
		marginBottom: 20,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#00BCFF',

		'& p': {
			color: '#0096FF',
			padding: 0,
			margin: 0,
			marginRight: 10
		},
		'& a': {
			color: '#007EFF',
			fontWeight: 'bold',
			textDecoration: 'none'
		},
		'& button': {
			backgroundColor: '#007EFF'
		},
		'& button:hover': {
			backgroundColor: '#0057FF'
		}
	},
	imageContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		overflow: 'hidden',
		maxHeight: 280,
		margin: 0
	},
	image: {
		height: 'auto',
		width: '100%',
		border: 0
	},
	ticketButton: {
		backgroundColor: theme.palette.primary.light,
		boxShadow: 'none',
		height: 52,
		'&:hover': {
			backgroundColor: theme.palette.primary.light,
			boxShadow: 'none',
			opacity: 0.7
		}
	},
	donationButton: {
		backgroundColor: '#eaedf3',
		boxShadow: 'none',
		color: theme.palette.primary.dark,
		height: 52,
		'&:hover': {
			backgroundColor: '#eaedf3',
			boxShadow: 'none'
		}
	}
}));

export default styles;
