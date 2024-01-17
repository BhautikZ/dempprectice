import { toast } from "react-toastify";
import createAPI from "./axios";
import { useNavigate } from "react-router-dom";

function UseMovie() {
  const history = useNavigate();
  const API = createAPI(history);
  //add movie
  const AddMovice = async (data) => {
    try {
      const res = await API.post("movies/add", data);
      return res;
    } catch (err) {
      toast.error("something wrong");
    }
  };
  //get all movie
  const GetAllMovice = async () => {
    try {
      const res = await API.post("movies/list");
      return res;
    } catch (err) {
      toast.error("something wrong");
    }
  };
  //get single movie data
  const GetsingleMovice = async (id) => {
    try {
      const res = await API.get(`movies/${id}`);
      return res;
    } catch (err) {
      toast.error("something wrong");
    }
  };
  //update movie
  const updateMovice = async (data, id) => {
    try {
      const res = await API.put(`movies/update/${id}`, data);
      return res;
    } catch (err) {
      toast.error("something wrong");
    }
  };

  return { AddMovice, GetAllMovice, GetsingleMovice, updateMovice };
}

export default UseMovie;
