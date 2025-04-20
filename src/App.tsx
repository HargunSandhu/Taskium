import "./App.css";
import Home from "./components/Home";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { Route, Routes } from "react-router-dom";
import VerifyMail from "./components/VerifyMail";
import UpdatePassword from "./components/updatePassword";
import Confirm from "./components/Confirm";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/verifyMail" element={<VerifyMail />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/confirm" element={<Confirm />} /> 
      </Routes>
    </>
  );
};

export default App;
