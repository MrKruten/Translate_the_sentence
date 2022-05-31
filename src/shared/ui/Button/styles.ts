import { css } from '@linaria/core';

export const styles = {
	button: css`
		width: 100%;
		font-weight: 700;
		padding: 24px;
		font-size: 18px;
		line-height: 21px;
		text-align: center;
		background: linear-gradient(91.2deg, #ffffff 0%, #f2f2f2 100%);
		box-shadow: -2px -4px 8px #ffffff, 2px 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 88px;
		&:disabled {
			opacity: 0.5;
		}
		&:hover:not([disabled]) {
			box-shadow: inset -2px -4px 12px #ffffff,
				inset 2px 4px 8px rgba(0, 0, 0, 0.05);
		}
		&:active:not([disabled]) {
			box-shadow: inset -2px -4px 12px #ffffff,
				inset 2px 4px 8px rgba(0, 0, 0, 0.2);
		}
	`,
};
