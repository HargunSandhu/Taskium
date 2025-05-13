import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import "../../App.css";

import Heading from "../../Components/Heading/Heading";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    async function loginUser() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Signin error:", error.message);
      } else {
        console.log("Signed in!", data);
        navigate("/");
      }
    }
    loginUser();
  };

  return (
    <div className="signInPage">
      <div className="headerText"><Heading /></div>
      <div className="signInContainer">
        <h1 className="">Sign In</h1>
        <form onSubmit={login}>
          <p className="text"> Email: </p>
          <input
            type="email"
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="text">Password:</p>
          <input
            type="text"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn1" type="submit">
            Sign In
          </button>
        </form>

        <button className="btn2">
          <Link
            to={"/signUp"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Sign Up
          </Link>
        </button>
        <div>
          <Link
            to={"/resetPassword"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
