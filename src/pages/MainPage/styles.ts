import { css } from '@linaria/core';

export const styles = {
	page: css`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	`,
	head: css`
		font-weight: 700;
		font-size: 36px;
		line-height: 42px;
		color: #252525;
		text-shadow: -2px -4px 3px #ffffff, 2px 4px 3px rgba(0, 0, 0, 0.25);
		margin-bottom: 50px;
	`,
	container: css`
		width: 520px;
	`,
	marginWrapperWords: css`
		margin-top: 40px;
	`,
};
