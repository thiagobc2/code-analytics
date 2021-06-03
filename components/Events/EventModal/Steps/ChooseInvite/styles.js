import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		justifyContent: 'center'
	},
	infoContainer: {
		margin: '0 20px'
	},
	infoTitle: {},
	field: { marginBottom: 10 },
	button: {
		backgroundColor: '#38f09c',
		color: '#000',
		boxShadow: 'none',
		'&:disabled': {
			border: '1px solid #38f09c',
			color: '#38f09c',
			opacity: 0.5,
			background: '#fff'
		},
		'&:hover': {
			backgroundColor: '#38f09c',
			color: '#000',
			boxShadow: 'none',
			opacity: 0.7
		}
	},
	guest: {
		'& > strong': {
			fontWeight: 700,
			fontSize: 17,
			color: '#4a4a4a !important'
		}
	}
}));

export default styles;
