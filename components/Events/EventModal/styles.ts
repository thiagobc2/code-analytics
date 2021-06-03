import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	modalContainer: {
		width: theme.breakpoints.values.lg,
		minHeight: '60vh',
		position: 'absolute',
		top: 80,
		left: '50%',
		transform: `translate(-50%, 0)`,
		overflow: 'hidden',
		background: '#ffffff',
		display: 'flex',
		flexDirection: 'column',
		outline: 'none',
		borderRadius: 8,
		[theme.breakpoints.down('xs')]: {
			top: 0,
			width: '100%',
			height: '100%',
			borderRadius: 0
		}
	},
	modalHeader: {
		padding: 0
	},
	modalBody: {
		flex: 1,
		maxHeight: '75vh',
		overflowY: 'scroll',
		overflowX: 'hidden',
		padding: 20
	}
}));

export default styles;
