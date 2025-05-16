import "./Intro.css";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Heading from "../../Components/Heading/Heading";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="introContainer">
      <Heading />
      <h3>Please login to your account or create a new account to continue</h3>
      <div className="buttons">
        <button className="btn1" onClick={() => navigate("/signIn")}>
          Sign In
        </button>
        <button className="btn2" onClick={() => navigate("/signUp")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Intro;
