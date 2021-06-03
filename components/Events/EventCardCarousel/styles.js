import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	card: {
		cursor: 'pointer',
		textDecoration: 'none'
	},

	contentImg: {
		widht: '100%',
		paddingTop: '100%',
		borderRadius: 10,
		position: 'relative',
		overflow: 'hidden',
		'& img': {
			objectFit: 'cover'
		}
	},
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover'
	},
	title: {
		textTransform: 'none',
		display: 'box',
		lineClamp: 1,
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		marginTop: 10,
		[theme.breakpoints.down('xs')]: {
			fontSize: 15,
			lineClamp: 1
		},
	
	},
	date: {
		color: '#777',
		fontWeight: 400,
		textTransform: 'none',
		display: 'box',
		lineClamp: 3,
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		[theme.breakpoints.down('xs')]: {
			color: '#777',
			fontSize: 13,
			lineClamp: 2
		}
	}
}));

export default styles;
