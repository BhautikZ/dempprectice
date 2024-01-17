import "./App.css";
import Signin from "./components/Signin";
import Addmovie from "./components/Addmovie";
import { Route, Routes, Navigate } from "react-router-dom";
import Movielist from "./components/Movielist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./components/Signup";

import LanguageSelector from "./components/locallization";

function isAuthenticated() {
  // Check if the user is authenticated (e.g., by checking the presence of a token in localStorage)
  const token = localStorage.getItem("token");
  return !!token;
}

//protected routes
function PrivateRoute({ element, path }) {
  return isAuthenticated() ? element : <Navigate to="/" state={{ from: path }} replace />;
}

function App() {
  return (
    <div>
      <LanguageSelector></LanguageSelector>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route
          path="/addmovie"
          element={<PrivateRoute element={<Addmovie />} path="/addmovie" />}
        ></Route>
        <Route
          path="/updatemovie/:id"
          element={<PrivateRoute element={<Addmovie />} path="/updatemovie/:id" />}
        ></Route>
        <Route
          path="/listmovie"
          element={<PrivateRoute element={<Movielist />} path="/listmovie" />}
        ></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
