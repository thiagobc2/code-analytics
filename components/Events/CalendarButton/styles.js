import { makeStyles } from '@material-ui/core/styles';
import { theme } from '~/config/theme';

const styles = makeStyles(theme => ({
	hostLink: {
		'& > a': {
			textDecoration: 'none'
		}
	}
}));

export default styles;
