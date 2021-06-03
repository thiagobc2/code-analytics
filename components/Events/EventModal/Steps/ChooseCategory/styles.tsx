import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		justifyContent: 'center'
	},

	button: {
		backgroundColor: '#38f09c',
		color: '#000',
		width: '90%',
		maxWidth: 294,
		height: 45,
		boxShadow: 'none',
		position: 'absolute',
		transform: 'translate(-50%, 0)',
		left: '50%',
		bottom: 20,
		'&:disabled': {
			border: '1px solid #38f09c',
			color: '#38f09c',
			background: '#fff'
		},
		'&:hover': {
			backgroundColor: '#38f09c',
			color: '#000',
			boxShadow: 'none',
			opacity: 0.7
		}
	}
}));

export default styles;
