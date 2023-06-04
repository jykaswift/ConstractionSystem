import "./styles/app.scss";
import "./styles/modules/react-select.scss";
import React, {useEffect} from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./pages/Main";
import Find from "./pages/Find";
import { Route, Routes } from "react-router-dom";
import Document from "./pages/Document/Document";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import { checkAuth } from "./redux/slices/authSlice";
import {useDispatch} from "react-redux";
import ConfirmEmail from "./pages/ConfirmEmail";
import SuccessConfirmation from "./pages/SuccessСonfirmation";
import ErrorConfirmation from "./pages/ErrorConfirmation";
import Profile from "./pages/Profile";
import PasswordRecovery from "./pages/PasswordRecovery";
import NotFound from "./pages/NotFound";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }

  }, [dispatch])


  return (
      <div className="wrapper">

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
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
