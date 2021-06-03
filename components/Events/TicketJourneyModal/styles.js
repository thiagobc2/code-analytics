import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	bodyModal: {
		display: 'flex',
		width: '100%',
		height: '100%',
		maxWidth: 900,
		maxHeight: '80vh',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: `translate(-50%, -50%)`,
		padding: 0,
		outline: 'none',
		[theme.breakpoints.down('xs')]: {
			top: 0,
			left: 0,
			height: '100%',
			maxHeight: '100vh',
			margin: 0,
			padding: 0,
			transform: `translate(0, 0)`
		}
	},
	container: {
		display: 'flex',
		flex: 1
	},
	scroll: {
		overflowY: 'auto',
		flex: 1,
		maxHeight: `calC(100vh - ${350}px)`,
		paddingBottom: 80,
		[theme.breakpoints.down('xs')]: {
			maxHeight: `calC(100vh - ${150}px)`
		}
	},
	contentButtonsSteps: {
		'& .MuiStepConnector-alternativeLabel': {
			top: 22
		},
		'& .MuiStepConnector-lineHorizontal': {
			borderTopWidth: 3,
			borderTopColor: '#d9d9d9'
		}
	},
	buttonSteps: {
		'& svg': {
			borderWidth: 4,
			borderStyle: 'solid',
			borderColor: '#d9d9d9',
			borderRadius: '100%',
			padding: 6
		},
		'& circle': {
			color: 'transparent'
		},

		'& text': {
			fill: '#d9d9d9',
			fontSize: 18,
			fontWeight: 'bold'
		},
		'& .MuiStepIcon-root.MuiStepIcon-completed': {
			borderWidth: 4,
			borderStyle: 'solid',
			borderColor: theme.palette.success.dark,
			borderRadius: '100%',
			background: '#fff',
			'& path': {
				// stroke: '#f00',
				// strokeWidth: 5,
				fill: theme.palette.success.dark,
				minWidth: 30,
				minHeight: 30
			}
		}
	},
	summary: {
		flex: 1,
		background: '#f4f7ff',
		position: 'relative',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			minHeight: 150,
			marginTop: 40
		}
	},
	contentCloseButton: {
		justifyContent: 'space-between',
		marginBottom: 40
	},
	iconClose: {
		fontSize: 15,
		marginTop: -10,
		marginRight: -10
	},
	closeButton: {
		fontSize: 22
	},
	textOrderSummary: {
		color: 'rgb(0, 0, 0)',
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 0.38
	},
	description: {
		color: 'rgb(0, 0, 0)',
		fontSize: 16,
		fontWeight: '500',
		letterSpacing: 0.38,
		marginBottom: 10,
		maxWidth: 230,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	},
	contentTotal: {
		marginTop: 20,
		justifyContent: 'space-between',
		[theme.breakpoints.down('xs')]: {
			marginTop: 0,
			marginBottom: 0
		}
	},
	textTotal: {
		color: 'rgb(0, 0, 0)',
		fontSize: 20,
		fontWeight: '500',
		letterSpacing: 0.48
	},
	textPriceTotal: {
		color: 'rgb(0, 0, 0)',
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 0.48
	},
	buttonCheckout: {
		backgroundColor: '#00c269',
		color: '#fff',
		width: `calc( 100% - ${20}px )`,
		margin: 10,
		fontSize: 16,
		height: 40,
		position: 'absolute',
		bottom: 0,
		left: 0,
		opacity: 0.8,

		'&:hover': {
			backgroundColor: '#00c269',
			opacity: 1
		},
		'&:disabled': {
			color: '#ffffff',
			backgroundColor: theme.palette.text.primary,
			opacity: 0.5
		}
	},

	hr: {
		marginTop: 10,
		marginBottom: 10
	},
	iconCheck: {
		fontSize: 70
	},
	bodySuccess: {
		marginTop: 150,
		paddingLeft: 30,
		paddingRight: 30,
		textAlign: 'center',
		height: 300
	},
	textSuccess: {
		color: theme.palette.text.primary,
		fontSize: 30,
		fontWeight: 400
	},
	buttonClose: {
		backgroundColor: '#00c269',
		color: '#fff',
		width: `calc( 100% - ${20}px )`,
		maxWidth: 350,
		marginTop: 50,
		fontSize: 16,
		height: 40,

		'&:hover': {
			backgroundColor: 'rgb(56, 240, 140, 100)',
			opacity: 0.5
		},
		'&:disabled': {
			color: '#ffffff',
			backgroundColor: theme.palette.text.primary,
			opacity: 0.5
		}
	},

	//STEP
	root: {
		width: '100%'
	},
	completed: {
		display: 'inline-block'
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2)
	}
}));

export default styles;
