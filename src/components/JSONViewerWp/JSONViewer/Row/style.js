import styled from 'styled-components'

export const StyledRow = styled.div`
	position: relative;
	min-height: 18px;
	white-space: normal;

	.toolbar {
		position: fixed;
		left: 0;
		//width: 42px;
		padding-right: 18px;
		height: 18px;
		text-align: right;
		//border-right: solid 1px #4f4b60;
		color: #6f6c81;
		line-height: 18px;
		font-size: 12px;
		user-select: none;
		transition: all .3s;

		.lineNumber {
			display: inline-block;
			font-size: 12px;
			transform: scale(0.9);
			transform-origin: right;

			&.long {
				transform: scale(0.8);
			}
		}

		.collapse {
			position: absolute;
			top: 2px;
			right: 2px;
			width: 20px;
			height: 18px;
			cursor: pointer;

			&.close {
				& svg {
					transform: rotate(0deg);
				}
			}

			& svg {
				width: 12px;
				height: 12px;
				transform: rotate(90deg);
				transition: transform .3s;
			}
		}
	}

	.childrenWp {
		position: relative;
		z-index: 3;
	}

	&:hover {

		&::before {
			content: '';
			position: fixed;
			left: 0;
			width: 100%;
			height: 18px;
			pointer-events: none;
			background-color: rgba(66, 68, 94, 1);
			z-index: 0;
		}
	}

	&.active {
		&::before {
			content: '';
			position: fixed;
			left: 0;
			width: 100%;
			height: 18px;
			pointer-events: none;
			background-color: rgb(65 69 123);
			z-index: 0;
		}
	}
`
