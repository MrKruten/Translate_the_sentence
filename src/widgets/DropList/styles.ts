import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const styles = {
	wordsContainer: css`
		margin-top: 50px;
		margin-bottom: 30px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		min-width: 200px;

		& div:not(:last-child) {
			margin-right: 10px;
		}

		& div {
			margin-bottom: 15px;
		}
	`,
	line: css`
		border: 1px solid #4b4b4b;
		position: absolute;
		width: 482px;
		background: #4b4b4b;
	`,
	marginWrapperNotification: css`
		margin-bottom: 30px;
	`,
};

export const UserContainer = styled.div<{ height: number }>`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	width: 100%;
	min-width: 200px;
	height: ${props => props.height}px;

	& div:not(:last-child) {
		margin-right: 10px;
	}

	& div {
		margin-top: 8px;
	}
`;
