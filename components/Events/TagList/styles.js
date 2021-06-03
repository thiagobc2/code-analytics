import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	chip: {
		backgroundColor: '#eaedf3',
		color: '#627e91',
		marginRight: 10,
		marginBottom: 10,
		padding: 10,
		fontSize: 16,
		textTransform: 'capitalize',
		'&:last-child': {
			marginRight: 0
		}
	},
	chipLightBlue: {
		backgroundColor: 'transparent',
		borderColor: theme.palette.primary.light,
		color: theme.palette.primary.light,
		marginBottom: 10,
		padding: 10,
		fontSize: 16,
		textTransform: 'capitalize'
	}
}));

export default styles;
