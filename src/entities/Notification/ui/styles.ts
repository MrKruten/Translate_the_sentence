import { css } from '@linaria/core';

export const styles = {
	notification: css`
		text-align: center;
		font-size: 24px;
		line-height: 28px;
		color: #ff0000;
		text-shadow: -1px -2px 2px #ffffff, 1px 2px 2px rgba(91, 13, 13, 0.5);

		&[data-is-success='true'] {
			color: green;
			text-shadow: -1px -2px 2px #ffffff, 1px 2px 2px green;
		}
	`,
};
