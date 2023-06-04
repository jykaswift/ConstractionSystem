import {MemoryRouter, Route, Routes} from "react-router-dom";
import Main from "../../pages/Main";
import Find from "../../pages/Find";
import Document from "../../pages/Document/Document";
import Auth from "../../pages/Auth";
import Register from "../../pages/Register";
import ConfirmEmail from "../../pages/ConfirmEmail";
import PasswordRecovery from "../../pages/PasswordRecovery";
import SuccessConfirmation from "../../pages/SuccessСonfirmation";
import ErrorConfirmation from "../../pages/ErrorConfirmation";
import Profile from "../../pages/Profile";
import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {store} from "../../redux/store";
import {Provider} from "react-redux";
import {GoogleOAuthProvider} from "@react-oauth/google";
import NotFound from "../../pages/NotFound";

export default function renderWithRouter(component, initialRoute = '/', initialRedux = {}) {
  return (
    <Provider store={store(initialRedux)}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/search" element={<Find />}></Route>
          <Route path="/doc" element={<Document />}></Route>
          <Route path="/login" element={<Auth />}></Route>
          <Route path="/registration" element={<Register />}></Route>
          <Route path="/confirm" element={<ConfirmEmail />}></Route>
          <Route path="/recoveryPassword" element={<PasswordRecovery />}></Route>
          <Route path="/successConfirm" element={<SuccessConfirmation />}></Route>
          <Route path="/errorConfirm" element={<ErrorConfirmation />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          {component}
        </Routes>
        <Footer />
      </MemoryRouter>
      </GoogleOAuthProvider>
    </Provider>
  )
}