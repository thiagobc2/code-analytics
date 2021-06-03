import { makeStyles } from '@material-ui/core/styles';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';

const styles = makeStyles({
	contentSeemore: {
		widht: '100%',
		paddingTop: '100%',
		borderRadius: 10,
		position: 'relative',
		overflow: 'hidden',
		background: '#000f64'
	},
	box: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 35,
		fontWeight: 'bold',
		color: '#ffffff !important',
		lineHeight: 1,
		padding: 30
	}
});

export default styles;
