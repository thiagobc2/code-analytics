import { createMuiTheme } from '@material-ui/core/styles';

const colors = {
	blueLight: '#007aff',
	blue: '#000f64',
	blueDark: '#04032b',
	bluishGray: '#e9ecf3',
	white: '#ffffff',
	black: '#000000',
	gray: '#4a4a4a',
	grayLight: '#eaedf3',
	grayDark: '#565f72',
	red: '#fb3150',
	greenLight: '#38f09c',
	green: '#38f09c',
	greenDark: '#00be67',
	orange: '#ffa500'
};

const themeConfig = {
	palette: {
		primary: {
			light: colors.blueLight,
			main: colors.blue,
			dark: colors.blueDark
		},
		secondary: {
			light: colors.red,
			main: colors.red,
			dark: colors.red
		},
		error: {
			light: colors.red,
			main: colors.red,
			dark: colors.red
		},
		warning: {
			light: colors.orange,
			main: colors.orange,
			dark: colors.orange
		},
		success: {
			light: colors.greenLight,
			main: colors.green,
			dark: colors.greenDark
		},
		info: {
			light: colors.blueLight,
			main: colors.blueLight,
			dark: colors.blueLight
		},
		background: {
			paper: colors.white,
			default: colors.white
		},
		text: {
			primary: colors.gray,
			secondary: colors.black,
			tertiary: colors.white,
			success: colors.green,
			error: colors.red,
			warning: colors.orange,
			info: colors.blueLight
		}
	},
	typography: {
		fontSize: 16,
		fontFamily: 'Gilroy, Arial',
		button: {
			textTransform: 'none',
			fontWeight: 700
		},
		body1: {
			marginBottom: 20,
			'&.Mui-error, &.MuiFormControlLabel-label, &.no-margin': {
				marginBottom: 0
			},
			'&.MuiFormLabel-root': {
				fontWeight: 'bold'
			},
			'& strong': {
				color: colors.blue
			},
			'& a': {
				color: colors.red
			},
			'& ul': {
				paddingInlineStart: 20
			},
			'& li': {
				marginBottom: 5
			}
		},
		h1: {
			fontSize: 30,
			fontWeight: 700,
			textTransform: 'uppercase',
			fontFamily: 'drukwide-super, Arial',
			color: colors.blue,
			letterSpacing: 4,
			marginBottom: 20,
			'@media (max-width:768px)': {
				fontSize: 20
			}
		},
		h2: {
			fontSize: 30,
			fontWeight: 700,
			textTransform: 'uppercase',
			color: colors.blue,
			marginBottom: 20,
			'@media (max-width:768px)': {
				fontSize: 20
			}
		},
		h3: {
			fontSize: 26,
			fontWeight: 700,
			textTransform: 'uppercase',
			color: colors.blue,
			'@media (max-width:768px)': {
				fontSize: 18
			}
		},
		h4: {
			fontSize: 22,
			fontWeight: 700,
			textTransform: 'uppercase',
			color: colors.blue,
			'@media (max-width:768px)': {
				fontSize: 16
			}
		},
		h5: {
			fontSize: 18,
			fontWeight: 700,
			textTransform: 'uppercase',
			color: colors.blue,
			'@media (max-width:768px)': {
				fontSize: 16
			}
		},
		h6: {
			fontSize: 16,
			fontWeight: 700,
			color: colors.blue,
			'@media (max-width:768px)': {
				fontSize: 16
			}
		}
	},
	overrides: {
		MuiButton: {
			root: {
				borderRadius: 8
			}
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 768,
			md: 960,
			lg: 1280,
			xl: 1920
		}
	}
};

const theme = createMuiTheme(themeConfig);

export { theme, colors };
