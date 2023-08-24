import styled from 'styled-components';

export const StyledApp = styled.div`
	display: flex;

	.leftPart {
		width: 800px;
		margin-right: 40px;
	}

	.rightPart {
		flex: 1;

		.jsonviewerWp {
			padding: 20px;
			margin: 20px;
		}

		::selection {
			background-color: #214c87;
		}

	}
`
