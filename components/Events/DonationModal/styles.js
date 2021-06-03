import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		display: 'flex',
		width: '100%',
		height: 'auto',
		maxWidth: 500,
		padding: 30,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: `translate(-50%, -50%)`,
		outline: 'none',
		[theme.breakpoints.down('xs')]: {
			top: 0,
			left: 0,
			height: '100%',
			maxHeight: '100vh',
			margin: 0,
			padding: 0,
			transform: `translate(0, 0)`
		}
	},
	input: {
		marginTop: 20,
		'& p': {
			marginBottom: 0
		}
	},
	grid: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeButton: {
		fontSize: 15,
		position: 'absolute',
		top: 10,
		right: 10
	}
}));

export default styles;
