import styled from 'styled-components';

export const StyledWp = styled.div`
	position: relative;

	.copy {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 30px;
		height: 30px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: pink;
		z-index: 9;
		border-radius: 4px;
		cursor: pointer;
		transition: all .3s;

		&:hover {
			background-color: #3c3c4d;

			& svg {
				fill: #b4b4b4;
			}
		}

		svg {
			width: 22px;
			height: 22px;
			fill: #7b7b7b;
			transition: all .3s;
		}
	}
`;
