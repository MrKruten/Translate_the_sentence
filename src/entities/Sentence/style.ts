import { css } from '@linaria/core';

export const styles = {
	container: css`
		display: flex;
		align-items: flex-start;
	`,
	personImg: css`
		margin-right: 10px;
	`,
	sentence: css`
		width: 300px;
		border: 2px solid #252525;
		border-radius: 20px 20px 20px 15px;
		padding: 17px 14px 10px 24px;
		display: flex;
		flex-wrap: wrap;
		position: relative;

		&:before {
			position: absolute;
			content: '';
			bottom: 8px;
			left: -20px;
			border: 10px solid transparent;
			border-right: 10px solid #252525;
			border-bottom: 10px solid #252525;
		}
		&:after {
			position: absolute;
			content: '';
			bottom: 10px;
			left: -16px;
			border: 10px solid transparent;
			border-right: 10px solid #f5f5f5;
			border-bottom: 10px solid #f5f5f5;
		}
	`,
	word: css`
		border-bottom: 1px dashed #000000;
		margin-right: 10px;
		margin-bottom: 10px;
	`,
};
