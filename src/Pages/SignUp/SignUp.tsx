import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";

import "./SignUp.css";
import "../../App.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    async function signUpNewUser() {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Signup error:", error.message);
      } else {
        console.log("Signed up!", data);
        navigate("/verifyMail");
      }
    }
    signUpNewUser();
  };

  return (
    <div className="signUpPage">
      <div className="signUpContainer">
        <h1>Sign Up</h1>
        <form onSubmit={signUp}>
          <p className="text"> Email:</p>
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
          <br />
          <button className="btn1" type="submit">
            Sign Up
          </button>
        </form>

        <button className="btn2">
          <Link
            to={"/signIn"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Sign In
          </Link>
        </button>
      </div>
    </div>
  );
};
export default SignUp;
