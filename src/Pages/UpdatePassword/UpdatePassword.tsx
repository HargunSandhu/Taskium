import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ohegciuzbnobpqonduik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWdjaXV6Ym5vYnBxb25kdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTA5MzAsImV4cCI6MjA2MDI4NjkzMH0.bH8Tmh0EuxzkUk0-mum6EU-tCeWJjRz2ZFHIpZ_9u0Y"
);
import "../../App.css";


const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate()

  const confirmUpdate = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    
    
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.log("Error updating password: ", updateError)
    } else {
      navigate("/signIn")
    }
  }

  return (
    <>
      <form onSubmit={confirmUpdate}>
        <input
          type="text"
          placeholder="Enter your new password"
          className="input"
          value={password}
          onChange={(e) => setPassword(
            e.target.value
  )}
        />
        <button className="btn2" type="submit">
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default UpdatePassword;
