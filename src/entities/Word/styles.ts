import { css } from '@linaria/core';

export const styles = {
	word: css`
		user-select: none;
		text-align: center;
		padding: 5px 10px;
		min-width: 70px;
		width: max-content;
		height: 30px;
		background: #ffffff;
		border: 1px solid #c9c9c9;
		box-shadow: 0 8px 4px -6px rgba(0, 0, 0, 0.25);
		border-radius: 13px;

		&[data-is-empty='false'] {
			cursor: grab;
			&:hover {
				box-shadow: inset 0 8px 4px -6px rgba(0, 0, 0, 0.25);
			}
		}

		&[data-is-empty='true'] {
			border: none;
			background: #e6e6e6;
			box-shadow: inset 0 8px 4px -6px rgba(0, 0, 0, 0.25);
		}
	`,
};
