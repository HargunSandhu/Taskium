import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ohegciuzbnobpqonduik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWdjaXV6Ym5vYnBxb25kdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTA5MzAsImV4cCI6MjA2MDI4NjkzMH0.bH8Tmh0EuxzkUk0-mum6EU-tCeWJjRz2ZFHIpZ_9u0Y"
);
import "../../App.css";

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
