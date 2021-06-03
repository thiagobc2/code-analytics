// import styled from 'styled-components';

// export const Container = styled.div`
// 	padding: 20px;
// 	position: relative;

// 	@media (max-width: 600px) {
// 		padding: 0;
// 	}

// 	.searchName {
// 		border: 0;
// 		background: #f4f7ff url(/assets/images/iconSearch.png);
// 		background-repeat: no-repeat;
// 		background-position: 20px 10px;
// 		color: #8e8e93;
// 		font-size: 1.4rem;
// 		padding: 10px 10px 10px 50px;
// 		font-weight: bold;
// 		font-weight: 400;
// 		max-width: 300px;
// 		width: 100%;
// 		border-radius: 4px;
// 		outline: 0;
// 	}

// 	.pagination {
// 		max-width: 300px;
// 		width: 100%;
// 		margin: 40px auto 0;
// 		font-size: 1.5rem;
// 		font-weight: bold;
// 		li {
// 			a {
// 				color: #5f5f5f;
// 			}

// 			&.active {
// 				a {
// 					background: #1b7eff;
// 					color: #fff;
// 					font-weight: bold;
// 					padding: 4px 10px;
// 					border-radius: 30px;
// 				}
// 			}
// 		}
// 	}
// `;

// export const Loading = styled.div`
// 	width: 100%;
// 	text-align: center;
// 	padding: 50px 0px;
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// `;

// export const Title = styled.h5`
// 	text-align: center;
// 	padding: 50px;
// 	font-weight: bold;
// 	font-size: 20px;
// `;

// export const Accordion = styled.div`
// 	$color_blue: #447fff;
// 	$color_blue__fade: rgba($color_blue, 0.1);
// 	$color_white: #f9f9f9;
// 	$color_cloud: #eaeaea;

// 	.accordion-content {
// 		margin-bottom: 40px;
// 	}

// 	.accordion {
// 		$accordion: &;
// 		background: $color_white;

// 		&-tabs {
// 			margin-top: 20px;
// 			font-family: 'Gilroy', sans-serif;

// 			:focus {
// 				outline: none;
// 			}

// 			.accordion-tab {
// 				font-weight: bold;
// 				padding: 1rem 2rem;
// 				font: inherit;
// 				border: none;
// 				cursor: pointer;
// 				transition: background 0.1s ease;
// 				font-size: 1.6rem;
// 				color: #6f798f;
// 				text-align: center;
// 				border-radius: 20px;
// 				margin-right: 15px;
// 				padding: 5px;
// 				text-transform: capitalize;

// 				&:last-child {
// 					border-right: 0;
// 					margin-right: 0px;
// 				}

// 				&.accordion-active,
// 				&:hover {
// 					font-weight: bold;
// 					color: #04032b;

// 					.total {
// 						font-weight: normal;
// 					}
// 				}
// 			}
// 		}

// 		&-item {
// 			display: none;
// 			border-bottom: 1px solid $color_cloud;

// 			&.accordion-active {
// 				display: block;
// 			}

// 			&:last-child {
// 				border: none;
// 			}

// 			&__label {
// 				margin: 0;
// 				padding: 1.25rem;
// 				cursor: pointer;
// 				transition: padding 0.2s ease;
// 				position: relative;

// 				&:after {
// 					content: '';
// 					height: 4px;
// 					width: 4px;
// 					position: absolute;
// 					top: -4px;
// 					right: 1.25rem;
// 					bottom: 0;
// 					margin: auto;
// 					border: 3px solid transparent;
// 					border-radius: 2px;
// 					transform: rotate(45deg);
// 					border-color: transparent;
// 					opacity: 1;
// 					transition: opacity 0.1s ease;
// 				}
// 			}

// 			&__container {
// 				padding: 0 1.25em;
// 				height: 0;
// 				overflow: hidden;
// 				opacity: 0;
// 				transition: padding 0.2s ease, opacity 0.5s 0.15s ease;
// 			}
// 		}

// 		&-active {
// 			.accordion-item {
// 				&__label {
// 					padding-bottom: 0;
// 					cursor: inherit;

// 					&:hover {
// 						background: none;
// 					}

// 					&:after {
// 						opacity: 0;
// 					}
// 				}

// 				&__container {
// 					padding: 1.25em;
// 					height: auto;
// 					opacity: 1;

// 					p,
// 					h1,
// 					h2,
// 					h3,
// 					h4,
// 					h5,
// 					h6 {
// 						&:first-child {
// 							margin-top: 0;
// 						}

// 						&:last-child {
// 							margin-bottom: 0;
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}

// 	@media (min-width: 600px) {
// 		.accordion-tabs {
// 			display: flex;
// 			border: 0;
// 		}

// 		.accordion-item {
// 			padding: 0;
// 			display: none;
// 			border: none;
// 			background: $color_white;
// 			min-height: 260px;

// 			&__label,
// 			&__container {
// 				padding: 0;
// 				transition: inherit;
// 			}

// 			&__label {
// 				margin-bottom: 1.5rem;
// 			}

// 			&.accordion-active {
// 				display: block;

// 				.accordion-item__container {
// 					padding: 0;
// 				}
// 			}
// 		}
// 	}

// 	.accordion {
// 		box-shadow: 0 1em 2em -0.9em rgba(#000, 0.7);
// 		border-radius: 10px;
// 		overflow: hidden;
// 		width: 100%;
// 		max-width: 400px;

// 		@media (min-width: 600px) {
// 			max-width: 600px;
// 		}
// 		+ p {
// 			color: rgba(#fff, 0.8);
// 			font-weight: 300;
// 			font-size: 0.9rem;
// 			margin-top: 2rem;
// 		}
// 	}

// 	@media (max-width: 700px) {
// 		.tabs ul {
// 			align-items: normal;
// 			display: block;
// 			flex-grow: initial;
// 			flex-shrink: initial;
// 			padding-bottom: 10px;

// 			li {
// 				float: left;
// 				margin-right: 15px;
// 			}
// 		}
// 	}
// `;
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		justifyContent: 'center'
	},
	field: { marginBottom: 10 },
	guest: {
		marginTop: 10
	}
}));

export default styles;
