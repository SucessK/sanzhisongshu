import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";
import filters from "./filters";
import {Provider} from "react-redux"
import store from "./store"
import './assets/css/common.scss'
import {
  BrowserRouter as Router
} from "react-router-dom"

axios.interceptors.request.use(config=>{
  // config.url = "/api"+config.url;
  console.log(config)

  return config;
})

axios.interceptors.response.use(({data})=>{
  // console.log("111111"+data)
  return data;
})

React.Component.prototype.$axios = axios;
React.Component.prototype.$filters = filters;


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <Router>
          <App />
        </Router>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
