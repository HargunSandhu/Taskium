import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import "../../App.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const sendMail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/updatePassword",
    });
    if (error) {
      console.error("Error sending mail:", error.message);
    } else {
      console.log("Mail sent!", data);
    }
  };
  return (
    <>
      <form onSubmit={sendMail}>
        <p className="text">Email: </p>
        <input
          type="email"
          className="input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button className="btn2" type="submit">
          Send Mail
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
