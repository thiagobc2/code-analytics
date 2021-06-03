import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	card: {
		minHeight: 370,
		cursor: 'pointer',
		textDecoration: 'none',
		display: 'block'
	},
	title: {
		textTransform: 'none',
		display: 'box',
		lineClamp: 2,
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		marginBottom: 20
	},
	image: {
		objectFit: 'cover',
		width: 400,
		height: 170,
		maxWidth: '100%',
		marginBottom: 10,
		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	}
}));

export default styles;
