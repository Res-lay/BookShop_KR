import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <main className="light bg-background text-primary-700">
          <Provider store={store}>
          <App />
          </Provider>
      </main>
  </React.StrictMode>
);

reportWebVitals();
