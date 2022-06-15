import React, { FC, useEffect, useState } from 'react';

import { TItem, Word } from 'entities/Word';
import { Notification } from 'entities/Notification';
import { Button } from 'shared/ui';

import { styles, UserContainer } from './styles';

interface IDropList {
	sentence: string;
}

type TBoard = {
	id: number;
	items: Array<TItem>;
};

const synth = window.speechSynthesis;

export const DropList: FC<IDropList> = ({ sentence }) => {
	const mustLength =
		sentence.split(' ').length + (6 - (sentence.split(' ').length % 6));
	const [boards, setBoards] = useState<Array<TBoard>>([
		{
			id: 0,
			items: sentence
				.split(' ')
				.sort(() => Math.random() - 0.5)
				.map((word, index) => ({
					id: `${index}-word`,
					order: index,
					word,
					isDraggable: false,
				})),
		},
		{
			id: 1,
			items: [],
		},
	]);
	const [currentItem, setCurrentItem] = useState<null | TItem>(null);
	const [currentBoard, setCurrentBoard] = useState<null | TBoard>(null);
	const [isError, setIsError] = useState(false);
	const [isShowNotification, setIsShowNotification] = useState(false);

	useEffect(() => {
		if (boards[0].items.length < mustLength) {
			const mustCountEmpties = boards[0].items.length % 6;
			const arr: Array<TItem> = [];
			let lastIndex = boards[0].items.length;

			for (let i = 6 - mustCountEmpties; i > 0; i--) {
				arr.push({
					id: `${Math.floor(Math.random() * 10000)}-empty`,
					order: lastIndex,
					word: '',
					isDraggable: false,
				});
				lastIndex += 1;
			}
			const copy = JSON.parse(JSON.stringify(boards));
			copy[0].items = [...boards[0].items, ...arr];
			setBoards(copy);
		} else if (boards[0].items.length > mustLength) {
			const copy = JSON.parse(JSON.stringify(boards));
			copy[0].items.splice(copy[0].items.length - 1, 1);
			setBoards(copy);
		}
	}, [boards]);

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
		setCurrentBoard(boards[boardID]);
		setCurrentItem(item);
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
		const currentIndex = currentBoard?.items.indexOf(currentItem!);
		currentBoard?.items.splice(currentIndex!, 1);
		const dropIndex = boards[boardID].items.indexOf(item!);
		boards[boardID].items.splice(dropIndex + 1, 0, currentItem!);
		setBoards(
			boards.map(board => {
				if (board.id === boardID) {
					return boards[boardID];
				}
				if (board.id === currentBoard?.id) {
					return currentBoard!;
				}
				return board;
			})
		);
	};

	const dropWordHandler = (
		e: React.DragEvent<HTMLDivElement>,
		tBoard: TBoard
	) => {
		tBoard.items.push(currentItem!);
		const currentIndex = currentBoard?.items.indexOf(currentItem!);
		currentBoard?.items.splice(currentIndex!, 1);
		setBoards(
			boards.map(board => {
				if (board.id === tBoard.id) {
					return tBoard;
				}
				if (board.id === currentBoard?.id) {
					return currentBoard!;
				}
				return board;
			})
		);
	};

	function speak() {
		if (synth.speaking) {
			synth.cancel();
			setTimeout(speak, 300);
		} else {
			const utterThis = new SpeechSynthesisUtterance(sentence);
			utterThis.lang = 'en';
			synth.speak(utterThis);
		}
	}

	const buttonCheckHandler = () => {
		setIsShowNotification(true);
		if (boards[1].items.map(e => e.word).join(' ') !== sentence) {
			setIsError(true);
		} else {
			setIsError(false);
			speak();
		}
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
					<Notification isError={isError} />
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
