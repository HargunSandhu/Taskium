import SyncLoader from "react-spinners/SyncLoader";
import "./Loading.css"
import Heading from "../Heading/Heading";

const Loading = () => {
    return (
      <div className="">
        <Heading />
        <SyncLoader color="white" />
      </div>
    );
}

export default Loading