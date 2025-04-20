import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ohegciuzbnobpqonduik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWdjaXV6Ym5vYnBxb25kdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTA5MzAsImV4cCI6MjA2MDI4NjkzMH0.bH8Tmh0EuxzkUk0-mum6EU-tCeWJjRz2ZFHIpZ_9u0Y"
);

const Confirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
    const [error, setError] = useState("");
    
    useEffect(() => {
        const tokenHash = searchParams.get("token_hash");
            if (!tokenHash) {
      setError("Token is missing.");
      return;
    }

        const verify = () => {
            supabase.auth
                .verifyOtp({
                    token_hash: tokenHash,
                    type: "recovery",
                })
                .then(({ error }) => {
                    if (error) {
                        setError(error.message);
                        
                    } else {
                        navigate("/updatePassword");
                    }
                });
            console.log(error)
        }
        verify()
}, [searchParams, navigate])
         



  return (
    <>
      <div className="">Confirm</div>
    </>
  );
};

export default Confirm;
