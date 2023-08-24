import styled from 'styled-components';

export const StyledJSONViewer = styled.div`
	background-color: #1d1d26;
	color: #8AA0E9;
	font-size: 13px;
	line-height: 18px;
	position: relative;
	font-family: 'mono', sans-serif;
	white-space: nowrap;

	&::after {
		content: '';
		position: absolute;
		top: 18px;
		left: 22px;
		height: calc(100% - 40px);
		width: 1px;
		background-color: #4f4b60;
		z-index: 3;
	}

	&.level0 {
		border-radius: 8px;
		padding: 20px 20px 20px 52px;
		transform: translate(0);
		overflow: auto;
		transition: padding .3s;

		&.withFooter {
			border-radius: 8px 8px 0 0;
			padding-bottom: 8px;
		}

		&::after {
			content: unset;
		}

		.trueContent {
			position: relative;

			.leftLine {
				position: absolute;
				width: 1px;
				height: 100%;
				left: -1px;
				background-color: #4f4b60;
				z-index: 3;
			}
		}

		&::-webkit-scrollbar {
			width: 6px;
			height: 6px;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: rgba(175, 175, 175, 0.49);
			border-radius: 8px;
		}

		&::-webkit-scrollbar-corner {
			background-color: transparent;
		}
	}

	.propItem {
		display: flex;
		align-items: flex-start;
	}

	.divider { // 逗号、冒号等分隔符
		color: #E0927C;
		margin-right: 4px;

		&.comma {
			align-self: flex-end;
		}
	}

	.ellipsis {
		padding-left: 20px;
		color: #8a8a8a;
	}

	.sign { // 大括号、中括号等
		color: #C9C9D1;
	}
`;
