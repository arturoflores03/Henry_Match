//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import Loader from "../../components/Loader/Loader";

//======IMPORTACIONES DE FUNCIONES NUESTRAS

import {
  getUserByNick,
  getUsers,
  renderAdmin,
} from "../../Redux/actions/index";

//======ESTILO E IMAGENES
import { Button, Grid, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AdminNavBar from "../../components/Admin/AdminNavBar";
import AdminBottomBar from "../../components/Admin/AdminBottomBar";
import AdminUsers from "../../components/Admin/AdminUsers";
import AdminUsers2 from "../../components/Admin/Users/Users";
import { NavLink } from "react-router-dom";
import PerfilChat from "../../components/Chat/PerfilChat";
import { Box } from "@mui/system";

//PABLO CUANDO PUEDAS CONTAME DE ESTA FUNCION <`*.*´> (ZAYRA)

const Admin = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [render, setRender] = useState("users");
  const userDetail = useSelector((state) => state.userDetail);

  const iAmAdmin = userDetail?.isAdmin;
  // const localUserNickname = user.sub;
  const [localUser, setLocalUser] = useState(
    localStorage.getItem("localUser")
      ? JSON.parse(localStorage.getItem("localUser"))
      : []
  );

  const userAuth = user;
  useEffect(() => {
    localStorage.setItem("localUser", JSON.stringify(userAuth) ?? []);
  }, [userAuth]);

  useEffect(() => {
    dispatch(getUserByNick(localUser.sub));
  }, []);

  //PARA LLENAR EL STORE CON TODOS LOS USUARIOS
  useEffect(() => {
    dispatch(getUsers());
    dispatch(renderAdmin("users"));
  }, []);

  return (
    <>
      {iAmAdmin ? (
        <Grid>
          {/* {isLoading && <Loader />} */}
          <CssBaseline />
          <AdminNavBar setRender={setRender} />
          {render === "users" && <AdminUsers2 />}
          {render === "inbox" && (
            <Box sx={{ paddingTop: 10 }}>
              <PerfilChat />
            </Box>
          )}
          {render === "statistics" && (
            <Box sx={{ paddingTop: 10 }}>Aqui estaran las estadisticas xD</Box>
          )}
          <AdminBottomBar />
        </Grid>
      ) : (
        <>
          <Typography variant="h1" color="red">
            NO SOS ADMIN! Rajá de aca atrevido jajaj
          </Typography>

          <Button href="/" color="info">
            HOME
          </Button>
        </>
      )}
    </>
  );
};

export default Admin;
