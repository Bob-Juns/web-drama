import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { serverURI } from '../../config';

const link = createHttpLink({
  uri: serverURI,
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
