import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	slide: {
		padding: 0,
		width: '100%',
		textAlign: 'left',
		float: 'left',
		'& .slick-track': {
			margin: 0
		},
		'& .slick-next, &.slick-prev': {
			right: -50,
			top: '45%',
			zIndex: 999,
			height: 40,
			width: 40,
			borderRadius: 50
		},
		'& .slick-prev': {
			left: -50
		},
		'& .slick-next:before, & .slick-prev:before': {
			content: '>',
			fontSize: 32,
			fontFamily: '"Trebuchet MS", sans-serif',
			opacity: '1 !important',
			color: '#FFF'
		},
		'& .slick-prev:before': {
			content: '<'
		},
		[theme.breakpoints.down('md')]: {
			'& .slick-next, & .slick-prev': {
				top: -30,
				height: 32,
				width: 32
			},
			'& .slick-prev': {
				left: '90%'
			},
			'& .slick-next': {
				right: 0
			},
			'& .slick-next: before, & .slick-prev: before': {
				fontSize: 26
			}
		},
		[theme.breakpoints.down('sm')]: {
			'& .slick-prev': {
				left: '82.5%'
			}
		},
		[theme.breakpoints.down('xs')]: {
			'& .slick-prev': {
				left: '75%'
			}
		}
	},
	item: {
		minWidth: '100%',
		paddingRight: '20px',
		textTransform: 'capitalize',
		fontSize: 16,
		'& > a': {
			color: '#000f64',
			fontWeight: 700
		}
	},
	imageContainer: {
		borderRadius: 6,
		background: '#000331',
		textAlign: 'center',
		marginBottom: 10,
		padding: '42px 0',
		'& > img': {
			display: 'initial'
		}
	}
}));

export default styles;
