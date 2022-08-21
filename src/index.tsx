import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore} from "redux";

const isAdmin: boolean = false

function reducer(state: boolean = isAdmin, action: any) {
  if (action.type === 'admin') {
    state = true
    return state
  } else {
    return state
  }
}

let store = createStore(reducer)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);