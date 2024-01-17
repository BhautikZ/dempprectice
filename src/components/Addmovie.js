import React, { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import UseMovie from "../service/useMovie";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./movieform.css";
import dragicon from "../icons/dropefile.svg";
import Footer from "./footer";
import { useTranslation } from "react-i18next";

function Addmovie() {
  //defind state
  const [files, setFiles] = useState([]);
  const [siglemoviedata, setsiglemovidata] = useState([]);
  const { id } = useParams();
  const { AddMovice, GetsingleMovice, updateMovice } = UseMovie();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required(t("movie_image_required"))
      .test("fileSize", t("file_size_limit"), (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value && value.size <= 1024000; // 1MB (adjust as needed)
        }
      })
      .test("fileType", t("image_format_restrict"), (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }
      }),
    title: Yup.string().required(t("title_required")),
    year: Yup.string()
      .required(t("publish_year_required"))
      .matches(/^\d{4}$/, t("publish_year_format")),
  });

  // Formik form values and submit function
  const formik = useFormik({
    initialValues: {
      image: null,
      title: "",
      year: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      var formData = new FormData();
      formData.append("image", values.image);
      formData.append("title", values.title);
      formData.append("year", values.year);

      if (id) {
        updateMovice(formData, id).then((res) => {
          console.log(res, "res");
          toast.success(res?.data?.message);
          navigate("/listmovie");
        });
      } else {
        AddMovice(formData).then((res) => {
          console.log("res", res);
          toast.success(res?.data?.message);
          navigate("/listmovie");
        });
      }
    },
  });

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          formik.setFieldValue("image", file);
          formik.setFieldError("image", ""); // Clear error when a file is selected
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  // Fetch single movie data when editing
  useEffect(() => {
    if (id) {
      GetsingleMovice(id).then((res) => {
        setsiglemovidata(res.data.data);
        formik.resetForm({ values: res.data.data });
      });
    }
  }, []);

  return (
    <div className="JJ">
      <h1 className="create_movie_title">
        {id && id !== null ? t("edit") : t("create_a_new_movie")}
      </h1>

      <form onSubmit={formik.handleSubmit} className="form">
        <div id="111">
          <div {...getRootProps()} className="dragfile">
            <input {...getInputProps()} type="file" />

            {files && files.length > 0 ? (
              <div>
                {files.map((file, index) => (
                  <Fragment key={index}>
                    <img
                      src={file?.preview ? file.preview : ""}
                      style={{ width: "473px", height: " 504px" }}
                      alt=""
                    />
                  </Fragment>
                ))}
              </div>
            ) : id && id !== null ? (
              <img
                src={`${process.env.REACT_APP_IMAGE_BASE_URL}${siglemoviedata?.image}`}
                style={{ width: "473px", height: " 504px" }}
                alt=""
              />
            ) : (
              <div>
                <img src={dragicon} style={{ marginLeft: "33px" }} alt=""></img>
                <h5 className="dragefiletext">{t("select_or_drag_file")}</h5>
              </div>
            )}
          </div>
          {formik.touched.image && formik.errors.image && (
            <p style={{ color: "red" }}>{formik.errors.image}</p>
          )}
        </div>
        <div className="mainfileddiv">
          <div className="formfiled">
            <input
              type="text"
              className="titlefiled"
              placeholder={t("title")}
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <p style={{ color: "red", marginTop: "2px" }}>{formik.errors.title}</p>
            )}
            <input
              className="yearfiled"
              min={4}
              inputMode="numeric"
              pattern="\d{4}"
              placeholder={t("publish_year")}
              {...formik.getFieldProps("year")}
            />
            {formik.errors.year && (
              <p style={{ color: "red", marginTop: "2px" }}>{formik.errors.year}</p>
            )}
          </div>
          <div className="buttondiv">
            <button type="submit" className="submitbutton">
              {id && id !== null ? t("update") : t("submit")}
            </button>
            <button type="button" className="canclebutton" onClick={() => navigate("/listmovie")}>
              {t("cancel")}
            </button>
          </div>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
}

export default Addmovie;
