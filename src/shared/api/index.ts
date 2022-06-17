import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'https://academtest.ilink.dev/graphql',
	cache: new InMemoryCache(),
});
