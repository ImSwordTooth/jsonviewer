import styled from 'styled-components';

export const StyledFooter = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	background-color: #1b1b22;
	border-top: solid 1px #4f4b60;
	color: #C1C2CA;
	font-size: 12px;
	height: 28px;
	border-radius: 0 0 8px 8px;
	overflow: hidden;

	.footerItem {
		position: relative;
		height: 100%;
		display: inline-flex;
		align-items: center;
		padding: 0 12px 0 16px;
		cursor: pointer;
		clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%, 6px 50%, 0 0);
		margin-left: -7px;

		&:nth-of-type(1) {
			margin-left: 0;
			padding: 0 12px;
			clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%);

			&::before {
				content: unset;
			}
		}

		&:hover {
			background-color: #565170;

			&::before {
				content: unset;
			}

			& + ::before {
				content: unset;
			}
		}

		&::before{
			position: absolute;
			content: '';
			width: 4px;
			height: 8px;
			background-color: #C1C2CA;
			left: 4px;
			clip-path: polygon(0 0, 1px 0, 4px 50%, 1px 100%, 0 100%, 2px 50%, 0 0);
			z-index: 3;
		}
	}

	.copy {
		position: absolute;
		right: 0;
		top: 0;
		width: 28px;
		height: 28px;
		border-radius: 0 0 8px 0;

		& svg {
			width: 20px;
			height: 20px;
		}
	}
`;
