import "./App.css";
import Home from "./Pages/Home/Home";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";

import { Route, Routes } from "react-router-dom";
import VerifyMail from "./Pages/VerifyMail/VerifyMail";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";
import Confirm from "./Pages/Confirm/Confirm";
import Intro from "./Pages/Intro/Intro";


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
        <Route path="/intro" element={<Intro />} />
      </Routes>
    </>
  );
};

export default App;
