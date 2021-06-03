import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	about: {
		width: '100%',
		justifyContent: 'center',
		textAlign: 'center',
		float: 'left',
		position: 'relative',
		marginTop: -36,
		'& > .buttonProfile': {
			maxWidth: 250,
			width: '100%',
			display: 'inline-block',
			marginTop: 20
		},
		[theme.breakpoints.down('md')]: {
			marginTop: 0
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: 65
		}
	},
	cover: {
		width: '100%',
		overflow: 'hidden',
		position: 'relative',
		cursor: 'pointer',
		height: 220,
		backgroundColor: '#f3f3f3',
		textAlign: 'center',

		'& > .btnItens': {
			position: 'absolute',
			right: 15,
			top: 15,
			outline: 'none',
			background: 'transparent',
			'& > .round': {
				background: '#fff',
				width: 10,
				height: 10,
				borderRadius: 10,
				float: 'left',
				marginRight: 5
			}
		}
	},
	background: {
		width: '100%'
	},
	usePhoto: {
		position: 'absolute',
		top: 150,
		left: 'calc(50% - 68px)',
		cursor: 'pointer'
	},
	photo: {
		borderRadius: 100,
		width: 130,
		height: 130,
		border: '3px solid #fff',
		position: 'relative'
	},
	editPhoto: {
		color: '#f3f3f3',
		position: 'absolute',
		bottom: 6,
		background: '#04032b',
		padding: '10px 12px 6px',
		borderRadius: 40,
		right: 14,
		fontSize: 14,
		'&:hover': {
			background: '#fa324f',
			color: '#fff'
		}
	},
	name: {
		fontSize: 30,
		color: '#111111',
		fontWeight: 700,
		[theme.breakpoints.down('xs')]: {
			fontSize: 24
		}
	},
	userInfo: {
		width: '100%',
		justifyContent: 'center',
		textAlign: 'center',
		marginTop: 100
	},
	container: {
		width: '100%',
		float: 'left',
		marginTop: 40,
		paddingBottom: 50,
		'.content-event': {
			marginBottom: 80
		},
		[theme.breakpoints.down('xs')]: {
			padding: 15
		}
	},
	friends: {
		maxWidth: 450,
		width: '100%',
		'& > h5': {
			color: '#111111',
			fontSize: 20,
			fontWeight: 700,
			margin: 0
		},
		'& > .subtitle': {
			color: '#000f64',
			'& > span': {
				marginRight: 30,
				'& > strong': {
					color: '#000f64'
				}
			}
		}
	},
	linkItem: {
		width: '100%',
		borderRadius: 4,
		color: '#000',
		boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)',
		'&:hover': {
			color: '#fff',
			background: '#04032b'
		}
	},
	boxItem: {
		width: '100%',
		maxWidth: 280,
		position: 'absolute',
		top: 0,
		right: 15,
		paddingTop: 40,
		'& > .main': {
			background: '#ffffff',
			boxShadow: '0 0 5px #999999',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			justifyContent: 'center',
			zIndex: 10,
			overflow: 'hidden',
			'& > header': {
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				borderBottom: '1px solid #b9bdc9',
				padding: '7px 18px 7px 13px',
				background: '#ffffff',
				'& > .button > svg': {
					fontSize: 16,
					color: '#111111',
					position: 'relative',
					top: 3
				},
				'& > .button': {
					backgroundColor: 'transparent',
					outline: 'none',
					padding: 0,
					marginRight: 15
				}
			}
		},
		'& > .main > .list': {
			borderRadius: 'none',
			boxShadow: 'none',
			marginBottom: 10,
			'& > .list-item': {
				marginBottom: 10,
				borderRadius: 4,
				boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)'
			}
		},
		'& > .main > .content': {
			padding: 10,
			width: '100%'
		},
		'.editProfile': {
			color: '#04032b',
			fontWeight: 500,
			fontSize: 16,
			marginBottom: 8,
			display: 'block'
		},
		'.buttons': {
			float: 'right',
			border: 'none',
			background: 'transparent',
			padding: 0,
			'&:first-child': {
				width: '100%',
				float: 'left'
			},
			'&:first-child .is-normal': {
				fontSize: 16,
				width: '31.33%'
			},
			'&:first-child .is-normal:hover, &:first-child .is-normal.is-selected': {
				backgroundColor: '#fa3151',
				color: '#ffffff'
			},
			'&:last-child': {
				width: '100%'
			},
			'&:last-child .is-primary': {
				backgroundColor: '#04032b',
				width: '100%',
				fontSize: 16
			},
			'&:last-child .is-primary:hover': {
				opacity: 0.8
			},
			'&:active': {
				boxShadow: 'none'
			},
			'&.is-active': {
				boxShadow: 'none'
			},
			'&:focus:not(:active)': {
				boxShadow: 'none'
			},
			'&.is-focused:not(:active)': {
				boxShadow: 'none'
			}
		},
		[theme.breakpoints.down('md')]: {
			right: -50,
			paddingTop: 57
		}
	},
	title: {
		color: '#111111',
		fontSize: 20,
		fontWeight: 700,
		marginBottom: 15
	}
}));

export default styles;
