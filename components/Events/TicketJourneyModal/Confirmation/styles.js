import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';

const styles = makeStyles(theme => ({
	bodyConfirmation: {
		display: 'flex',
		marginTop: 100,
		paddingLeft: 30,
		paddingRight: 30,
		textAlign: 'center',
		height: 300,
		flex: 1,
		alignItems: 'center',
		JustifyContent: 'center',
		flexDirection: 'column'
	},
	iconCheck: {
		fontSize: 70
	},
	bodySuccess: {
		marginTop: 150,
		paddingLeft: 30,
		paddingRight: 30,
		textAlign: 'center',
		height: 300
	},
	textSuccess: {
		color: theme.palette.text.primary,
		fontSize: 30,
		fontWeight: 400
	},
	buttonClose: {
		backgroundColor: '#00c269',
		color: '#fff',
		width: `calc( 100% - ${20}px )`,
		maxWidth: 350,
		marginTop: 50,
		fontSize: 16,
		height: 40,

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
