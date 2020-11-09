import React from 'react';
import ReactDOM from 'react-dom';
import {createGlobalStyle} from 'styled-components';
import {Provider} from 'react-redux';
import {store} from './store';

import App from './views/App';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Proxima Nova';
    src: url('ProximaNova/ProximaNova-Regular.eot') format('embedded-opentype'),
         url('ProximaNova/ProximaNova-Regular.woff') format('woff'),
         url('ProximaNova/ProximaNova-Regular.ttf') format('truetype');
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: row-reverse;
    justify-content: stretch;
    align-items: stretch;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;

    @media (max-width: 768px) {
      flex-direction: row;
    }
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
