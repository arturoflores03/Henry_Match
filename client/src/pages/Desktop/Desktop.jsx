import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import screenshot from "./screenshot.png";

//MODIFICAR LA HARCODEADA DE IMG

const Desktop = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <img
      src={screenshot}
      alt="img not found"
      width={"100%"}
      height={"100%"}
      onClick={goBack}
    />
  );
};

export default Desktop;
