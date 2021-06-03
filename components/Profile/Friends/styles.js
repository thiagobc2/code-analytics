import { makeStyles } from '@material-ui/core/styles';
import { size } from 'polished';

export const styles = makeStyles(theme => ({
	friendList: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: 60,
		marginTop: 20,
		'& > .friend': {
			alignItems: 'center',
			display: 'flex',
			flex: '0 1 0%',
			flexDirection: 'column',
			textAlign: 'center',
			'&:not(:last-child)': {
				marginRight: 20
			},
			'&:hover': {
				textDecoration: 'none'
			},
			'&-container': {
				maxWidth: 80,
				cursor: 'pointer',
				'&:not(last-of-type)': {
					marginRight: 20
				},
				'& > .friend-image': {
					...size('69px'),
					borderRadius: '50%',
					display: 'block',
					marginBottom: 10,
					overflow: 'hidden',
					'& > img': {
						...size('100%'),
						objectFit: 'cover'
					}
				},
				'& > .friend-name': {
					color: '#000f64',
					fontSize: 16,
					fontWeight: 500,
					textTransform: 'capitalize',
					textAlign: 'center'
				}
			}
		}
	}
}));

export default styles;
