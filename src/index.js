import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

import App from "./App";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyBVhQBlsUMJaFcbKbSGKOi2MbOX_TQzDdc",
  authDomain: "horror-house-app.firebaseapp.com",
  projectId: "horror-house-app",
  storageBucket: "horror-house-app.appspot.com",
  messagingSenderId: "111645674505",
  appId: "1:111645674505:web:6b29907bbb21ad0fb1bcd8",
});
getAnalytics(app);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
