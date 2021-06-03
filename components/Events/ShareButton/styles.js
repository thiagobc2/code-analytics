import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(theme => ({
	mainButton: {
		boxShadow: 'none',
		height: 50,
		// fontSize: 16,
		backgroundColor: '#eaedf3',
		'&:hover': {
			backgroundColor: '#eaedf3',
			boxShadow: 'none'
		},
		'& > span > svg': {
			margin: '0 10px'
		}
	},
	menu: {
		width: '100%',
		maxWidth: 220
	},
	listMenu: {
		padding: '15px 10px',
		'& > li': {
			fontWeight: 700,
			fontSize: 16,
			marginBottom: 0,
			'& > svg': {
				marginRight: 10,
				opacity: 0
			},
			'&:hover': {
				color: '#3076bd',
				backgroundColor: 'transparent',
				'& > svg': {
					opacity: 1
				}
			}
		}
	},
	modalContainer: {
		height: 550,
		width: '100%',
		maxWidth: 1100,
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginLeft: '-550px',
		marginTop: '-275px',
		outline: 'none',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			height: '100%'
		}
	}
}));

export default styles;
