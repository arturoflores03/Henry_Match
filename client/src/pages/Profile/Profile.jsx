//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

//======IMPORTACIONES DE COMPONENTES
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import LoginButton from "../../components/LoginButton/LoginButton";
import Loader from "../../components/Loader/Loader";
import Formu from "../../components/Form/Form";
import Invitation2 from "../../components/Reviews/Invitation2";

import ReviewField from "../../components/Reviews/ReviewField";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { /* getUsers, */ getUserByNick, updateUser } from "../../Redux/actions";

//======ESTILO E IMAGENES
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Profile.css";
import MyProfile from "../../components/Profile";

const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userDetail);
  const { user, isAuthenticated, isLoading } = useAuth0();
  // ACTUALIZAR AL RENDERIZAR
  const [update, setUpdate] = useState(false);
  //RENDERIZAR EL FORM
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    dispatch(getUserByNick(userProfile?.nickname));
    setUpdate(false);
  }, [update]);

  //ACTUALIZO CAMBIOS
  const handleClick = () => {
    setUpdateForm(true);
  };

  // BOTON PARA ELIMINAR CUENTA :
  function handleUserActive() {
    dispatch(updateUser(userProfile._id, { active: false }));
    /*   setUpdate(true);
      setUpdateForm(false) */
    alert("Tu cuenta ha sido eliminada");
  }

  return (
    <>
      {isLoading && <Loader />}
      {isAuthenticated ? (
        <MyProfile />
      ) : (
        <Paper>
          <Box
            sx={{
              boxShadow: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="legend"
              variant="h4"
              sx={{
                mb: 3,
              }}
            >
              Lo siento, pero no estas loggeado
            </Typography>

            <NavLink to="/">
              <Button
                color="primary"
                type="button"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                HOME{" "}
              </Button>
            </NavLink>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Profile;
