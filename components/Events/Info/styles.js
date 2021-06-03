import { makeStyles } from '@material-ui/core/styles';
import { theme, colors } from '~/config/theme';

const styles = makeStyles(theme => ({
	container: {},
	item: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
		fontSize: 16,

		'& strong': {
			fontSize: 18
		},
		'& p': {
			marginBottom: 0
		}
	},
	title: {
		margin: 0,
		color: theme.palette.primary.dark
	},
	datatime: {
		'& > strong': {
			color: theme.palette.text.primary
		}
	},
	hostLink: {
		'& > a': {
			textDecoration: 'none'
		}
	},
	icon: {
		marginRight: 15
	},
	chip: {
		backgroundColor: colors.bluishGray,
		color: theme.palette.secondary.main,
		fontWeight: 'bold',
		padding: 10,
		marginLeft: 10
	}
}));

export default styles;
