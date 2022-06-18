import React, { FC } from 'react';

import { styles } from './styles';

export type TItem = {
	id: string;
	word: string;
};

interface IWord {
	word: TItem;
	bordID: number;
	dragOverHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
	dragLeaveHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
	dragStartHandler?: (
		e: React.DragEvent<HTMLDivElement>,
		bordID: number,
		item: TItem
	) => void;
	dragEndHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
	dropHandler?: (
		e: React.DragEvent<HTMLDivElement>,
		bordID: number,
		item: TItem
	) => void;
}

export const Word: FC<IWord> = ({
	word,
	dragLeaveHandler,
	dragStartHandler,
	dragOverHandler,
	dropHandler,
	dragEndHandler,
	bordID,
}) => {
	return (
		<div
			id={word.id}
			className={styles.word}
			data-is-empty={!word.word}
			draggable={!!word.word}
			onDragOver={dragOverHandler && (e => dragOverHandler(e))}
			onDragLeave={dragLeaveHandler && (e => dragLeaveHandler(e))}
			onDragStart={
				dragStartHandler && (e => dragStartHandler(e, bordID, word))
			}
			onDragEnd={dragEndHandler && (e => dragEndHandler(e))}
			onDrop={dropHandler && (e => dropHandler(e, bordID, word))}
		>
			{word.word}
		</div>
	);
};
