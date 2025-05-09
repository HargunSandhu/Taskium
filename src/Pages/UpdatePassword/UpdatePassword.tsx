import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import "../../App.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const confirmUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.log("Error updating password: ", updateError);
    } else {
      navigate("/signIn");
    }
  };

  return (
    <>
      <form onSubmit={confirmUpdate}>
        <input
          type="text"
          placeholder="Enter your new password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
