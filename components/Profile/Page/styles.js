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
	marginBotton: {
		marginBottom: '60px'
	},
	buttonProfile: {
		maxWidth: 200,
		width: '100%',
		display: 'inline-block'
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
			border: 'none',
			background: 'transparent',
			'& > .round': {
				background: '#d9d9d9',
				cursor: 'pointer',
				boxShadow: theme.shadows[3],
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
		display: 'flex',
		fontSize: 14,
		position: 'absolute',
		right: 15,
		bottom: 110,
		cursor: 'pointer',
		textDecoration: 'none',
		alignItems: 'center',
		'& > h4': {
			fontSize: 16,
			color: '#000f64'
		}
	},
	iconUser: {
		color: '#000f64',
		fontSize: 30,
		marginRight: '10px'
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
	bio: {
		marginBottom: '60px',
		'& > h5': {
			color: '#111111',
			fontSize: 20,
			fontWeight: 700,
			margin: 0
		},
		'& > .subtitle': {
			color: '#111111',
			'& > span': {
				marginRight: 30
			}
		}
	},
	friends: {
		maxWidth: 450,
		marginBottom: 30,
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
			},
			'& :nth-child(2)': {
				marginLeft: 20
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
	},

	modal: {
		display: 'flex',
		alignItemns: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		outlineWidth: 0,
		borderRadius: 4,
		marginTop: 80,
		width: '100%',
		maxWidth: '800px',
		height: 'max-content',
		maxHeihg: '90%',
		overflowY: 'auto',
		overflowX: 'hidden',
		fontFamily: '"Gilroy",sans-serif,helvetica,arial',
		fontWeight: 400,
		fontSize: 16,
		[theme.breakpoints.down('xs')]: {
			width: '90%'
		}
	},
	header: {
		padding: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	closeButton: {
		color: '#000f64',
		fontSize: 25,
		cursor: 'pointer'
	},
	body: {
		display: 'flex',
		padding: 20,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			padding: 10
		},
		'& > button': {
			color: '#d9d9d9',
			fontSize: 60,
			[theme.breakpoints.down('xs')]: {
				fontSize: 40
			},
			[theme.breakpoints.down('389')]: {
				display: 'none'
			}
		},
		'& > .photo': {
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center',
			'& > img': {
				width: '100%',
				objectFit: 'contain'
			},
			'& > .contentSpan': {
				display: 'flex',
				flex: 1,
				justifyContent: 'center',
				'& > .span': {
					appearance: 'none',
					display: 'flex',
					width: 15,
					height: 15,
					marginTop: 10,
					border: 'none',
					borderRadius: '50%',
					background: '#d7d7d7',
					outline: 'none',
					cursor: 'pointer',
					'& + button': {
						marginLeft: 10
					}
				},
				'& .selected': {
					background: '#000f64'
				}
			}
		},
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	footer: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: 20
	},

	containerDropdown: {
		display: 'flex',
		backgroundColor: '#ffffff',
		width: 280,
		height: 'auto',
		position: 'absolute',
		right: 160,
		top: 40,
		boxShadow: '0 0 5px #999999',
		flexDirection: 'column',
		transform: 'translateX(50%)',

		'& > .header': {
			display: 'flex',
			flex: 1,
			padding: 10,
			flexWrap: 'wrap',
			borderBottom: '1px solid #b9bdc9',
			justifyContent: 'space-between',
			alignItems: 'center',
			'& > .title': {
				margin: 0,
				fontSize: 16,
				color: theme.palette.primary.main
			},
			'& > button': {
				fontSize: 20,
				border: 0,
				margin: 0,
				cursor: 'pointer',
				background: 0,
				outline: 0
			}
		},

		'& > .body': {
			display: 'flex',
			justifyContent: 'space-between',
			flexDirection: 'row',
			padding: 10,

			'& > .applyBtn': {
				fontSize: 16,
				flex: 1
			}
		},
		'& > .footer': {
			display: 'flex',
			flex: 1,
			padding: 10,
			'& > .cancelBtn': {
				fontSize: 16,
				flex: 1
			}
		},
		'& > .linkItem': {
			justifyContent: 'flex-start',
			background: '#f5f5f5',
			marginBottom: 10,
			paddingLeft: 20,
			boxShadow: 'rgba(10, 10, 10, 0.1) 0px 2px 3px, rgba(10, 10, 10, 0.1) 0px 0px 0px 1px',
			borderBottom: '1px solid #dbdbdb',
			fontSize: 16,
			color: theme.palette.primary.main,
			'&:hover': {
				backgroundColor: theme.palette.primary.main,
				color: '#ffffff'
			}
		},

		'& > .filterBtn': {
			borderRadius: 30
		}
	}
}));

export default styles;
