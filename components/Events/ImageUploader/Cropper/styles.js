import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
	modalCard: {
		width: 640,
		height: 350,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: `translate(-50%, -50%)`,
		overflow: 'hidden',
		background: '#ffffff',
		display: 'flex',
		flexDirection: 'column'
	},
	modalHeader: {},
	modalBody: { position: 'relative', flex: 1 },
	modalFooter: {}
});

export default styles;
