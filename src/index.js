import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import initializeStore from './store/store';
import initializeFirebase from './firebase';

initializeFirebase();

const store = initializeStore();

const app = (
    <Provider store={store} >
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

