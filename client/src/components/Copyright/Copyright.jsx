//======PAQUETES Y LIBRERIAS
import { React } from "react";
import { NavLink } from "react-router-dom";
//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import { Typography } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
//LINEA HECHO CON <3 POR ALUMNOS DE HENRY

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      <NavLink
        to="/terms"
        style={{
          color: "white",
        }}
        target="_blank"
        rel="noopener noreferrer">
        Henry Match
      </NavLink>{" "}
      {new Date().getFullYear()}
      {". "}
      Hecho con <Favorite fontSize="small" color="primary" /> por{" "}
      <NavLink
        to="/matchteam"
        style={{
          color: "white",
        }}
        target="_blank"
        rel="noopener noreferrer">
        alumnos
      </NavLink>{" "}
      de Henry
    </Typography>
  );
}

export default Copyright;
