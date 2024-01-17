import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseMovie from "../service/useMovie";
import ReactPaginate from "react-paginate";
import addmovieicon from "../icons/addmovieicon.svg";
import logouticon from "../icons/logout.svg";
import "./movie.css"; // Add your component-specific styles
import { useTranslation } from "react-i18next";

function Movielist() {
  //defind state
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // Adjust as needed
  const navigate = useNavigate();
  const { GetAllMovice } = UseMovie();
  const { t } = useTranslation();

  //get movie details
  const fetchMovieData = useCallback(async () => {
    try {
      const res = await GetAllMovice();
      setMovieList(res.data.data);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching movie data:", error);
    }
  }, []);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  // Calculate the total number of pages
  const pageCount = Math.ceil(movieList.length / itemsPerPage);

  // Slice the data to get the current page items
  const currentMovies = movieList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  //logout function
  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
  };

  return (
    <div className="parent-div">
      {movieList && movieList.length > 0 ? (
        <>
          <div id="jj">
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <h1 style={{ color: "white" }}>{t("my_movie")}</h1>{" "}
              <img
                src={addmovieicon}
                onClick={() => navigate("/addmovie")}
                style={{ cursor: "pointer" }}
                alt=""
              ></img>
              {/* <button onClick={() => navigate("/addmovie")}>Add movie</button> */}
            </div>
            <div
              id="login-button"
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={logout}
            >
              <p>{t("logout")}</p>
              <img src={logouticon} alt="non"></img>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="cardmanin">
        {currentMovies.map((data) => (
          <div
            key={data._id}
            onClick={() => navigate(`/updatemovie/${data?._id}`)}
            className="card"
          >
            <img
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}${data?.image}`}
              alt={data?.title}
              className="cardimage"
            />
            <p className="movie-title" style={{ color: "white" }}>
              {data?.title}
            </p>
            <p className="movie-year" style={{ color: "white" }}>
              {data?.year}
            </p>
          </div>
        ))}
      </div>

      {movieList && movieList.length > itemsPerPage && (
        <div style={{ margin: "5rem" }}>
          <ReactPaginate
            previousLabel={t("previous")}
            nextLabel={t("next")}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}

      {movieList && movieList.length === 0 && (
        <div className="mainemptydiv">
          <h1 style={{ color: "white" }}>{t("empty_movie_list")}</h1>
          <button onClick={() => navigate("/addmovie")} className="emptybutton">
            {t("addmovie")}
          </button>
        </div>
      )}
    </div>
  );
}

export default Movielist;
