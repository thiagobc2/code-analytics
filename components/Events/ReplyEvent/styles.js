import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	mainButton: {
		boxShadow: 'none',
		height: 50,
		fontSize: 18,
		'&:hover': {
			boxShadow: 'none'
			// backgroundColor: props => props.bgColor,
			// color: props => props.color,
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
		padding: '15px 40px',
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
	}
}));

export default styles;
