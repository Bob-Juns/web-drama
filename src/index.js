import React from 'react';
import { render } from 'react-dom';

// apollo
import { client } from './apollo/client';
import { ApolloProvider } from '@apollo/client';

// styles
import App from './App';
import GlobalStyle from './styles/GlobalStyle';

render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.querySelector('#root'),
);
