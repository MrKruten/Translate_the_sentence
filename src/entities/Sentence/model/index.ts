import {
	createEffect,
	createEvent,
	createStore,
	restore,
	sample,
} from 'effector';

import { client } from 'shared/api';

import { GET_ALL_SENTENCES } from '../api';

export type TSentence = {
	ru: string;
	en: string;
};

const getAllSentences = createEvent();

const getAllSentencesFX = createEffect(async (): Promise<Array<TSentence>> => {
	const response = await client.query({
		query: GET_ALL_SENTENCES,
	});
	return response.data.sentenceAll;
});

sample({
	clock: getAllSentences,
	target: getAllSentencesFX,
});

const $sentences = restore<Array<TSentence>>(getAllSentencesFX.doneData, []);

const $sentence = createStore<TSentence>({ ru: '', en: '' });

sample({
	clock: $sentences,
	fn: sentences => sentences[Math.floor(Math.random() * sentences.length)],
	target: $sentence,
});

const loading = getAllSentencesFX.pending;

export const SentenceModel = {
	getAllSentences,
	$sentence,
	loading,
};
