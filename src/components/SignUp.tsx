import React, { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
const supabase = createClient(
  "https://ohegciuzbnobpqonduik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWdjaXV6Ym5vYnBxb25kdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTA5MzAsImV4cCI6MjA2MDI4NjkzMH0.bH8Tmh0EuxzkUk0-mum6EU-tCeWJjRz2ZFHIpZ_9u0Y"
);

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    async function signUpNewUser() {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      
        
      });
        if (error) {
          console.error("Signup error:", error.message);
        } else {
          console.log("Signed up!", data);
        }
        }
        signUpNewUser()
    }
    

    return (
      <>
        <div className="container1">
          <h1>Sign Up</h1>
          <form onSubmit={signUp}>
            <input
              type="email"
              className="inputField"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="inputField"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="btn2" type="submit">
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
      </>
    );
}
export default SignUp;