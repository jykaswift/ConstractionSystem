import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import ScrollToTop from "./utils/ScrollTop";
import {GoogleOAuthProvider} from "@react-oauth/google";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />

    <Provider store={store()}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
);
