import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		width: '100%',
		position: 'relative',
		'& > picture': {
			background: '#e6e3e3',
			color: '#e6e3e3'
		}
	},
	eventTypes: {
		display: 'flex',
		marginBottom: 20,
		'& > button': {
			background: 'none',
			border: 'none',
			color: '#939db3',
			fontSize: 20,
			fontWeight: 'bold',
			height: 'initial',
			padding: 0,
			outline: 'none',
			boxShadow: 'none',
			cursor: 'pointer',
			'&:not(:last-child)': {
				marginRight: 80,
			},
			'&.is-active': {
				color: '#111'
			
			}
		}
	}
}));

export default styles;
