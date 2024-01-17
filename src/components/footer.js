import React from "react";
import "./footer.css";
import vector from "../icons/footersvg2.svg";
import icon from "../icons/footerimage1.svg";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="img">
          <img src={vector} style={{ width: "100%" }} alt="no" />
          <img
            style={{
              position: "absolute",
              left: "0px",
              width: "100%",
            }}
            src={icon}
            alt="Icon"
          />
        </div>
      </div>
    </>
  );
}

export default Footer;
