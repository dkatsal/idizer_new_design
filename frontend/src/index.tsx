import React from 'react';
import ReactDOM from 'react-dom';

import dotenv from 'dotenv';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStubbedServer } from 'server';

import './index.scss';

dotenv.config();

// TODO: remove this when we have a working backend deployed
// if (process.env.NODE_ENV !== 'production') {
createStubbedServer();
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
