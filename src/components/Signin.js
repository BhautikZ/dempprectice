import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signin.css";
import Usesignin from "../service/usesignin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./lodder";
import Footer from "./footer";
import { useTranslation } from "react-i18next";

function Signin() {
  const { Signup } = Usesignin();
  const [lodding, setloding] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("notvalidemail")).required(t("remail")),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        t("notvalidpassword")
      )
      .required(t("rpassword")),
  });
  const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));

  // Set initial form values based on remembered user
  const initialFormValues = rememberedUser
    ? { ...rememberedUser, rememberMe: true }
    : { email: "", password: "", rememberMe: false };

  // Formik form values and submit function
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      setloding(true);
      const res = await Signup(values);
      if (res?.status === 200) {
        console.log(res);
        localStorage.setItem("token", res?.data.token);
        toast.success(res?.data.message);
        setloding(false);

        // Remember Me functionality
        if (values.rememberMe) {
          localStorage.setItem("rememberedUser", JSON.stringify(res?.data?.data));
        } else {
          localStorage.removeItem("rememberedUser");
        }
        navigate("/listmovie");
      } else {
        setloding(false);
      }
    },
  });

  return (
    <>
      <div className="signin">
        <p style={{ color: "white", fontSize: "xxx-large", fontWeight: "bold" }}>{t("signin")}</p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              id="tb1"
              type="text"
              placeholder={t("email")}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="error">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              id="tb1"
              type="password"
              placeholder={t("password")}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
          </div>

          {/* Remember Me checkbox */}
          <label id="tb2">
            <input
              type="checkbox"
              {...formik.getFieldProps("rememberMe")}
              checked={formik.values.rememberMe}
            />
            {t("rememberMe")}
          </label>
          {/* <div className="noaccountdiv">
            <p style={{ color: "white", fontSize: "small" }}>
              Don't have an account?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </span>
              .
            </p>
          </div> */}

          <div>
            <button className="lbtn" type="submit" disabled={lodding}>
              {lodding ? <Loader></Loader> : ""} {t("loginButton")}
            </button>
          </div>
        </form>
      </div>
      <div>{/* <img src="icon.svg"></img> */}</div>
      <Footer></Footer>
    </>
  );
}

export default Signin;
