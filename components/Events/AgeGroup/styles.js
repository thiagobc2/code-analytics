import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	info: {
		fontSize: 14,
		fontWeight: 700
	},
	sliderContainer: {
		margin: '0 20px 0 0'
	},
	slider: {
		color: '#3498ff'
	},
	thumb: {
		height: 20,
		width: 20,
		marginTop: -9,
		backgroundColor: '#fff',
		border: '2px solid #3498ff'
	}
}));

export default styles;
