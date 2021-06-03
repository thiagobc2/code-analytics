import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';

const styles = makeStyles({
	box: {
		display: 'flex',
		flexDirection: 'column',
		width: 72,
		height: 65,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		boxShadow: 'rgba(0, 0, 0, 0.3) 3px 3px 2px 0px',
		transform: 'translate(30px, -50%)',
		color: theme.palette.primary.dark,
		lineHeight: 1.2
	},
	month: {
		fontSize: 16,
		textTransform: 'uppercase'
	},
	day: {
		fontSize: 22
	}
});

export default styles;
