import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		minHeight: '100vh',
		flexDirection: 'column',
		alignItems: 'center',
		overscrollBehavior: 'none'
	},
	bgBlue: {
		minHeight: '100vh',
		flexDirection: 'column',
		alignItems: 'center',
		overscrollBehavior: 'none',
		backgroundColor: '#e9ecf3'
	},
	content: {
		flex: '1 0 auto',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			paddingRight: 15,
			paddingLeft: 15,
			paddingBottom: 20,
			paddingTop: 120
		},
		[theme.breakpoints.up('md')]: {
			width: theme.breakpoints.values.lg,
			paddingRight: 40,
			paddingLeft: 40,
			paddingTop: 140,
			paddingBottom: 40
		},
		[theme.breakpoints.down('sm')]: {
			paddingTop: 70
		}
	},
	pageFooter: {
		width: '100%',
		flexShrink: 0
	}
}));

export default styles;
