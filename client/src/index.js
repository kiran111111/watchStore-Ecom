import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from "react-router-dom";

import { composeWithDevTools } from 'redux-devtools-extension';

// Getting the Provider for letting know react of the redux and its sstore
// It will allow us to pass store into props-------------------
import {Provider} from "react-redux";
import { createStore , applyMiddleware } from 'redux';
import thunk from "redux-thunk";

// Get reducers
import combineReducer from '../src/components/redux/reducers/combineReducer';

import JavascriptTimeAgo from 'javascript-time-ago'
 
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
 
JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)


const store = createStore(combineReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router store={store}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

