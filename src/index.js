import React from 'react';
import { render } from 'react-dom';

import { client } from './apollo/client';
import { ApolloProvider } from '@apollo/client';

import App from './components/App';
import GlobalStyle from './styles/GlobalStyle';

render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.querySelector('#root'),
);
