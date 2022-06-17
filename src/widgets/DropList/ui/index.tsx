import React from 'react';
import { useStore } from 'effector-react';

import { TItem, Word } from 'entities/Word';
import { Notification } from 'entities/Notification/ui';
import { Button } from 'shared/ui';
import { NotificationModel } from 'entities/Notification';

import { DropListModel } from '../model';

import { styles, UserContainer } from './styles';

type TBoard = {
	id: number;
	items: Array<TItem>;
};

export const DropList: React.FC = () => {
	const mustLength = useStore(DropListModel.$mustLength);
	const boards = useStore(DropListModel.$boards);
	const isShowNotification = useStore(NotificationModel.$isShowNotification);

	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.id.includes('word')) {
			e.currentTarget.style.background = 'lightgray';
		}
	};

	const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.id.includes('word')) {
			e.currentTarget.style.background = '#ffffff';
		}
	};

	const dragStartHandler = (
		e: React.DragEvent<HTMLDivElement>,
		boardID: number,
		item: TItem
	) => {
		DropListModel.setCurrentBoard(boards[boardID]);
		DropListModel.setCurrentItem(item);
	};

	const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.id.includes('word')) {
			e.currentTarget.style.background = '#ffffff';
		}
	};

	const dropHandler = (
		e: React.DragEvent<HTMLDivElement>,
		boardID: number,
		item: TItem
	) => {
		e.stopPropagation();
		e.preventDefault();
		if (e.currentTarget.id.includes('word')) {
			e.currentTarget.style.background = '#ffffff';
		}
		DropListModel.dropHandler({ item, boardID });
	};

	const dropWordHandler = (
		e: React.DragEvent<HTMLDivElement>,
		tBoard: TBoard
	) => {
		DropListModel.dropWordHandler(tBoard);
	};

	const buttonCheckHandler = () => {
		NotificationModel.setIsShowNotification(true);
		DropListModel.checkHandler();
	};

	return (
		<>
			<UserContainer
				height={Math.floor(mustLength / 6) * 45}
				onDragOver={e => dragOverHandler(e)}
				onDrop={e => dropWordHandler(e, boards[1])}
			>
				{boards[1].items.map(word => (
					<Word
						bordID={1}
						word={word}
						key={word.id}
						dragEndHandler={dragEndHandler}
						dragLeaveHandler={dragLeaveHandler}
						dragOverHandler={dragOverHandler}
						dragStartHandler={dragStartHandler}
						dropHandler={dropHandler}
					/>
				))}
				{[...new Array(Math.floor(mustLength / 6) + 1)].map((item, id) => (
					<hr
						className={styles.line}
						key={`line-${id}`}
						style={{ top: id * 45 }}
					/>
				))}
			</UserContainer>
			<div
				className={styles.wordsContainer}
				onDragOver={e => dragOverHandler(e)}
				onDrop={e => dropWordHandler(e, boards[0])}
			>
				{boards[0].items
					.sort((a, b) => +a.id.split('-')[0] - +b.id.split('-')[0])
					.map(word => (
						<Word
							bordID={0}
							word={word}
							key={word.id}
							dragEndHandler={dragEndHandler}
							dragLeaveHandler={dragLeaveHandler}
							dragOverHandler={dragOverHandler}
							dragStartHandler={dragStartHandler}
							dropHandler={dropHandler}
						/>
					))}
			</div>
			{isShowNotification && (
				<div className={styles.marginWrapperNotification}>
					<Notification />
				</div>
			)}
			<Button
				isDisabled={!boards[1].items.length}
				onClick={buttonCheckHandler}
			>
				Check
			</Button>
		</>
	);
};
