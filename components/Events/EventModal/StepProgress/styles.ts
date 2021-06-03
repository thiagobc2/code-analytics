import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	tabs: {
		boxShadow: '#939db3 0px 6px 12px',
		marginBottom: 20,
		'& .MuiTabs-flexContainer': {
			height: 74
		},
		'& .MuiTabs-indicator': {
			borderBottom: '5px solid #007aff'
		},
		'& .PrivateTabIndicator-root-1009': { borderBottom: '5px solid #007aff' },
		'&  .PrivateTabIndicator-colorSecondary-1011': { borderBottom: '5px solid #007aff' }
	},
	tab: {
		height: 74,
		fontSize: 20,
		color: '#4a4a4a',
		borderStyle: 'solid',
		borderColor: '#4a4a4a',
		borderLeftWidth: 1,
		[theme.breakpoints.down('xs')]: {
			fontSize: 14
		}
	},
	tabClose: {
		height: 74,
		maxWidth: 100,
		minWidth: 100,
		padding: 0,
		fontSize: 20,
		color: '#4a4a4a',
		borderStyle: 'solid',
		borderColor: '#4a4a4a',
		borderLeftWidth: 1
	},
	tabText: {}
}));

export default styles;
