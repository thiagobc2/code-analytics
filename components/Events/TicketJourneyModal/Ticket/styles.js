import { makeStyles, withStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
import { borderWidth } from 'polished';
import { theme } from '~/config/theme';

export const styles = makeStyles(theme => ({
	textInfos: {
		color: 'rgb(0, 0, 0)',
		fontSize: 22,
		fontWeight: 'bold'
	},
	description: {
		color: 'rgb(0, 0, 0)',
		fontSize: 16,
		fontWeight: '400',
		letterSpacing: 0.38,
		marginBottom: 10
	},
	contentTickets: {
		marginTop: 51
	},
	textTickets: {
		color: 'rgb(0, 0, 0)',
		fontSize: 18,
		letterSpacing: 0.43,
		fontWeight: 'bold'
	},
	textPrice: {
		color: 'rgb(0, 0, 0)',
		fontSize: 16,
		letterSpacing: 0.38,
		fontWeight: '400'
	},
	input: {
		color: '#000',
		marginTop: 10,
		marginBottom: 10,
		maxWidth: 50,
		maxHeight: 40,
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderStyle: 'solid',
		borderColor: '#d9d9d9',
		'& .MuiInputBase-root': {
			minHeight: 38
		},
		'& .MuiInputBase-root fieldset': {
			border: 'none',
			borderRadius: 0
		},
		'& :disabled': {
			color: '#777'
		}
	},
	contentInputNumber: {
		'& button:first-child:hover': {
			background: '#c9c9c9'
		},
		'& button:last-child:hover': {
			background: '#0063BA'
		}
	},
	buttonNumber1: {
		color: '#555',
		background: '#d9d9d9',
		borderRadius: 0,
		marginTop: 10,
		maxHeight: 40,
		minWidth: 40,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
		cursor: 'pointer'
	},
	buttonNumber2: {
		color: '#fff',
		background: '#007aff',
		borderRadius: 0,
		marginTop: 10,
		maxHeight: 40,
		maxWidth: 50,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		cursor: 'pointer'
	},
	textContacts: {
		marginTop: 15
	}
}));
