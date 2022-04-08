import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RewardProvider } from './Context/RewardContext';
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <RewardProvider >
      <Provider store={store}>
          <App />
        </Provider>
    </RewardProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
