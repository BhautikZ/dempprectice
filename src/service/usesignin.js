import { useNavigate } from "react-router-dom";
import createAPI from "./axios";

function Usesignin() {
  const history = useNavigate();
  const API = createAPI(history);

  //user sigin Login
  const Signup = async (data) => {
    try {
      const res = await API.post("auth/login", data);
      return res;
    } catch (error) {
      return error;
    }
  };
  //signup
  const Signin = async (data) => {
    try {
      const res = await API.post("users/create", data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return { Signup,Signin };
}

export default Usesignin;
