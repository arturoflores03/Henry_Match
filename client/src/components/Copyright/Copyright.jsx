//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import Cards from "../../components/Card";
import Loader from "../../components/Loader/Loader";
//import Detail from "../../components/Detail/Detail";
import BottomBar from "../../components/BottomBar";

// import MyNetwork from "../../components/Chat/MyNetwork";
// import ChatRoom from "../ChatRoom/ChatRoom";

//======IMPORTACIONES DE FUNCIONES NUESTRAS

import { filterByMe, filterUserByMatches, getUsers } from "../../redux/actions";
import { getUserByNick, clearUserDetail } from "../../redux/actions/index";

//======ESTILO E IMAGENES
import { Typography, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

//LINEA HECHO CON <3 POR ALUMNOS DE HENRY
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      <Link color="inherit" href="#">
        Henry Match
      </Link>{" "}
      {new Date().getFullYear()}
      {". "}
      Hecho con <FavoriteIcon fontSize="small" color="primary" /> por alumnos de
      Henry
    </Typography>
  );
}

export default Copyright;
