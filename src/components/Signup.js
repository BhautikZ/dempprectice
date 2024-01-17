import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signin.css";
import Usesignin from "../service/usesignin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

function SignUp() {
  const { Signin } = Usesignin();
  const navigate = useNavigate();

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is not valid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include a combination of uppercase, lowercase, numbers, and special characters."
      )
      .required("Password is required"),
  });

  // Formik form values and submit function
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await Signin(values);
      if (res?.status === 200) {
        toast.success("SignUp success");
        navigate("/");
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="signin">
          <p
            style={{
              color: "white",
              fontSize: "xxx-large",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input id="tb1" type="text" placeholder="Name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && (
                <p className="error">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <input id="tb1" type="text" placeholder="Email" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && (
                <p className="error">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <input
                id="tb1"
                type="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </div>
            <div className="noaccountdiv">
              <p style={{ color: "white", fontSize: "small" }}>
                Already have an account?{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Sigin up here
                </span>
              </p>
            </div>
            <div>
              <button className="lbtn" type="submit">
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default SignUp;
