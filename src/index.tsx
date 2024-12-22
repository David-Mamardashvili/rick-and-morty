import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { App } from './App';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #001832;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
