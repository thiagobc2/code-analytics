import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	chip: {
		backgroundColor: '#fff',
		borderColor: '#939db3',
		color: '#2a2f3b',
		marginRight: 10,
		marginBottom: 10,
		padding: 10,
		fontSize: 16,
		fontWeight: 700,
		textTransform: 'capitalize',
		'&:hover': {
			backgroundColor: 'rgba(0, 122, 255, 0.09)',
			borderColor: theme.palette.primary.light,
			color: theme.palette.primary.light
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
		textTransform: 'capitalize'
	}
}));

export default styles;
