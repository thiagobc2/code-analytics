import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	chip: {
		backgroundColor: '#fff',
		color: '#2a2f3b',
		marginRight: 10,
		marginBottom: 10,
		padding: 10,
		fontSize: 16,
		fontWeight: 700,
		textTransform: 'capitalize',
		width: 290,
		height: 46,
		'&:hover': {
			backgroundColor: 'rgba(0, 122, 255, 0.09)',
			borderColor: theme.palette.primary.light,
			color: theme.palette.primary.light
		},
		'&:not(last-of-type)': {
			marginBottom: 25
		}
	},
	chipLightBlue: {
		backgroundColor: 'rgba(0, 122, 255, 0.09)',
		borderColor: theme.palette.primary.light,
		color: theme.palette.primary.light,
		marginRight: 10,
		marginBottom: 10,
		padding: 10,
		fontSize: 16,
		fontWeight: 700,
		textTransform: 'capitalize',
		width: 290,
		height: 46,
		'&:not(last-of-type)': {
			marginBottom: 25
		}
	}
}));

export default styles;
