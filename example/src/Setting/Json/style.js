import styled from 'styled-components';

export const StyledJson = styled.div`
	margin: 8px 0;

	.content {
		display: flex;
		align-content: flex-start;
		margin-top: 4px;

		.component {
			margin: 0 20px;
			font-size: 12px;
			color: black;
			font-family: sans-serif;

			.toolbar {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin-bottom: 4px;
			}

			.textArea {
				font-size: 12px;
				width: 400px;

				textarea {
					font-size: 12px;
					line-height: 18px;
				}
			}

			.buttonWp {
				margin-top: 8px;
				text-align: right;
			}
		}

	}
`
