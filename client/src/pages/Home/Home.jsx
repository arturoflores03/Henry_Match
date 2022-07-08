//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import Cards from "../../components/Card";
import Loader from "../../components/Loader/Loader";
import Copyright from "../../components/Copyright/Copyright";
import BottomBar from "../../components/BottomBar";

//======IMPORTACIONES DE FUNCIONES NUESTRAS

import { filterByMe, getUsers } from "../../redux/actions";
import { getUserByNick } from "../../redux/actions/index";

//======ESTILO E IMAGENES
import { Typography, Box, Grid } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userMatch = useSelector((state) => state.userMatch);
  const users = useSelector((state) => state.users);
  const userDetail = useSelector((state) => state.userDetail);

  //MODAL PARA CREAR USUARIO
  const [modal, setModal] = useState(false);

  //ME TRAIGO EL USER DE AUTH0 DEL LOCAL STORAGE A ESTE ESTADO LOCAL
  const [localUser, setLocalUser] = useState(
    localStorage.getItem("localUser")
      ? JSON.parse(localStorage.getItem("localUser"))
      : []
  );

  //OBJETO USER DE AUTH0 Y SU SUB (NUESTRO NICKNAME)
  const userAuth = user;

  //PARA ABRIR MODAL PREMIUM
  const [premium, setPremium] = useState(false);

  //IDENTIFICO CUANDO SE CREO UN USUARIO NUEVO
  const [newUser, setNewUser] = useState(false);

  //IDENTIFICO CUANDO SE HA GENERADO UN CAMBIO EN CARDS
  const [cardMoved, setCardMoved] = useState(false);

  //IDENTIFICO CUANDO SE HA GENERADO UN CAMBIO EN CARDS
  const [match, setMatch] = useState(false);

  //PARA LLENAR EL LOCALSTORAGE CON EL USER DE AUTH0
  useEffect(() => {
    if (userAuth) {
      localStorage.setItem("localUser", JSON.stringify(userAuth) ?? []);
    }
  }, [userAuth]);

  //PARA LLENAR EL STORE CON TODOS LOS USUARIOS Y USERDETAIL SI EL USUARIO YA ESTA LOGUEADO
  useEffect(() => {
    //SIN CONDICIONAL
    dispatch(getUsers());

    //EL USUARIO ACTUAL ESTA EN LA DB?
    const userInDb = users.find((u) => u.nickname === userAuth.sub);

    //ACTUALIZO USERDETAIL Y FILTROS AL VOLVER A HOME
    if (isAuthenticated === true && userInDb) {
      dispatch(getUserByNick(userAuth.sub));
      dispatch(filterByMe());
      console.log("uuuuuuuuser in DB", userInDb);
    }

    //PARA FILTRAR LO QUE RENDERIZA CARD CUANDO NO SE ABRIO EL MODAL
    if (isAuthenticated === true && newUser === true) {
      dispatch(filterByMe());
      setNewUser(false);
    } else {
      console.log("USER DETAIL", Object.keys(userDetail).length > 0);
    }
  }, []);

  //PARA ABRIR MODAL DE CREACION DE USUARIO CUANDO NO ESTA EN LA DB
  useEffect(() => {
    if (isAuthenticated === true) {
      //EL USUARIO ACTUAL ESTA EN LA DB?
      const userInDb = users.find((u) => u.nickname === userAuth.sub);

      if (userInDb) {
        setModal(false);
        //SI EL USUARIO SI ESTABA EN NUESTRA DB SE LLENA EL userDetail DEL STORE
        dispatch(getUserByNick(userAuth.sub));
        dispatch(filterByMe());
        console.log("nooooooooooo entre al modal", userAuth.sub);
      } else {
        setModal(true);
      }
    }
  }, [isAuthenticated]);

  //PARA ACTUALIZAR DESPUES DE MOVER CARTAS O MATCHES
  useEffect(() => {
    if (cardMoved === true || match === true) {
      dispatch(getUserByNick(userAuth.sub));
      dispatch(filterByMe());

      console.log("se han movido caaaaards o se ha matcheado");
      setCardMoved(false);
      setMatch(false);
    }
  }, [cardMoved, match]);

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <Modal
        modal={modal}
        setModal={setModal}
        users={users}
        userDetail={userDetail}
        setNewUser={setNewUser}></Modal>
      {isAuthenticated ? (
        <Grid>
          <CssBaseline />
          <Header />
          <Cards
            setPremium={setPremium}
            setCardMoved={setCardMoved}
            setMatch={setMatch}
          />
          <BottomBar premium={premium} setPremium={setPremium} />
        </Grid>
      ) : (
        <>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${HenryGirl})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "start",
              }}
            />

            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <Typography variant="h4">
                    Matchea y chateá con Alumnos de Henry!
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      right: 0,
                      left: 0,
                      border: 0,
                      marginTop: 20,
                    }}>
                    <LoginButton />
                  </Box>
                  <Copyright sx={{ mt: 25 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
