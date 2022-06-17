import { combine, createEvent, createStore, restore, sample } from 'effector';

import { TItem } from 'entities/Word';
import { SentenceModel } from 'entities/Sentence';
import { NotificationModel } from 'entities/Notification';
import { TSentence } from 'entities/Sentence/model';

type TBoard = {
	id: number;
	items: Array<TItem>;
};

const $boards = createStore<Array<TBoard>>(
	[
		{
			id: 0,
			items: [],
		},
		{
			id: 1,
			items: [],
		},
	],
	{ name: 'boards' }
);

sample({
	clock: SentenceModel.$sentence,
	fn: sentence => [
		{
			id: 0,
			items: sentence?.en
				.split(' ')
				.sort(() => Math.random() - 0.5)
				.map((word, index) => ({
					id: `${index}-word`,
					word,
				})),
		},
		{
			id: 1,
			items: [],
		},
	],
	target: $boards,
});

const $mustLength = SentenceModel.$sentence.map(
	sentence =>
		sentence.en.split(' ').length + (6 - (sentence.en.split(' ').length % 6))
);

const $combine = combine({ mustLength: $mustLength, boards: $boards });

const $newBoards = $combine.map(store => {
	if (store.boards[0].items.length < store.mustLength) {
		const mustCountEmpties = store.boards[0].items.length % 6;
		const arr: Array<TItem> = [];

		for (let i = 6 - mustCountEmpties; i > 0; i--) {
			arr.push({
				id: `${Math.floor(Math.random() * 10000)}-empty`,
				word: '',
			});
		}

		store.boards[0].items = [...store.boards[0].items, ...arr];
		return store.boards;
	}
	if (store.boards[0].items.length > store.mustLength) {
		store.boards[0].items.splice(store.boards[0].items.length - 1, 1);
		return store.boards;
	}
	return store.boards;
});

sample({
	clock: $newBoards,
	target: $boards,
});

const setCurrentItem = createEvent<TItem>();

const $currentItem = restore<TItem>(setCurrentItem, {
	id: '-1',
	word: '',
});

const setCurrentBoard = createEvent<TBoard>();

const $currentBoard = restore<TBoard>(setCurrentBoard, {
	id: -1,
	items: [],
});

const dropHandler = createEvent<{ boardID: number; item: TItem }>();

sample({
	clock: dropHandler,
	source: { $boards, $currentBoard, $currentItem },
	fn: (
		{
			$boards: boards,
			$currentBoard: currentBoard,
			$currentItem: currentItem,
		},
		{ boardID, item }
	) => {
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);
		const dropIndex = boards[boardID].items.indexOf(item);
		boards[boardID].items.splice(dropIndex + 1, 0, currentItem);
		return boards.map(board => {
			if (board.id === boardID) {
				return boards[boardID];
			}
			if (board.id === currentBoard.id) {
				return currentBoard;
			}
			return board;
		});
	},
	target: $boards,
});

const dropWordHandler = createEvent<TBoard>();

sample({
	clock: dropWordHandler,
	source: { $boards, $currentBoard, $currentItem },
	fn: (
		{
			$boards: boards,
			$currentBoard: currentBoard,
			$currentItem: currentItem,
		},
		tBoard
	) => {
		tBoard.items.push(currentItem);
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);
		return boards.map(board => {
			if (board.id === tBoard.id) {
				return tBoard;
			}
			if (board.id === currentBoard.id) {
				return currentBoard;
			}
			return board;
		});
	},
	target: $boards,
});

const synth = window.speechSynthesis;

const speak = (sentence: string) => {
	if (synth.speaking) {
		synth.cancel();
		setTimeout(speak, 300);
	} else {
		const utterThis = new SpeechSynthesisUtterance(sentence);
		utterThis.lang = 'en';
		synth.speak(utterThis);
	}
};

const checkHandler = createEvent();

sample({
	clock: checkHandler,
	source: [$boards, SentenceModel.$sentence],
	fn: (source, _) => {
		const boards = source[0] as Array<TBoard>;
		const sentence = source[1] as TSentence;
		if (boards[1].items.map(e => e.word).join(' ') !== sentence.en) {
			return true;
		}
		speak(sentence.en);
		return false;
	},
	target: NotificationModel.setIsErrorNotification,
});

export const DropListModel = {
	$boards,
	dropWordHandler,
	dropHandler,
	setCurrentBoard,
	$currentBoard,
	$currentItem,
	setCurrentItem,
	$mustLength,
	checkHandler,
};
