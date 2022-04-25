import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './shared/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));
if (root) {
  console.log(history.location)
  const path = (/#!(\/.*)$/.exec(history.location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }
  console.log(history.location)
}
root.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
