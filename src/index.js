import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { client } from './apollo/client';
import { ApolloProvider } from '@apollo/client';

import GlobalStyle from './GlobalStyle';

render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.querySelector('#root'),
);
