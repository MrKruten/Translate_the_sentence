import { gql } from '@apollo/client';

export const GET_ALL_SENTENCES = gql`
	query GetSentenceAll {
		sentenceAll {
			en
			ru
		}
	}
`;
