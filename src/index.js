import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from "react-redux";
import MyApp from "./App";

// let rerenderEntireTree = (state) => {
ReactDOM.render(<MyApp />, document.getElementById('root'));
// };


// rerenderEntireTree(store.getState());

// window.store = store;
// store.subscribe(() => {
// 	// let state = store.getState();
// 	rerenderEntireTree();
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
