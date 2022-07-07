//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import Loader from "../../components/Loader/Loader";

//======IMPORTACIONES DE FUNCIONES NUESTRAS

import { getUsers, renderAdmin } from "../../Redux/actions/index";

//======ESTILO E IMAGENES
import { Grid, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AdminNavBar from "../../components/Admin/AdminNavBar";
import AdminBottomBar from "../../components/Admin/AdminBottomBar";
import AdminUsers from "../../components/Admin/AdminUsers";
import AdminUsers2 from "../../components/Admin/Users/Users";

//PABLO CUANDO PUEDAS CONTAME DE ESTA FUNCION <`*.*´> (ZAYRA)

const Admin = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const render = useSelector((state) => state.admin);

  let a = "x";

  //PARA LLENAR EL STORE CON TODOS LOS USUARIOS
  useEffect(() => {
    dispatch(getUsers());
    dispatch(renderAdmin("users"));
  }, [a]);

  console.log(render);
  return (
    <>
      {isLoading && <Loader />}
      <Grid>
        <CssBaseline />
        <AdminNavBar />
        {render === "users" ? (
          <AdminUsers2 />
        ) : (
          <Typography variant="h1" sx={{ top: 200 }}>
            Algo salio mal
          </Typography>
        )}
        <AdminBottomBar />
      </Grid>
    </>
  );
};

export default Admin;
