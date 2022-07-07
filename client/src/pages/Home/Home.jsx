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
import { Typography, Link, Box, Grid } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "../../components/Modal/Modal";

//PABLO CUANDO PUEDAS CONTAME DE ESTA FUNCION <`*.*´> (ZAYRA)
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
      Hecho con <FavoriteIcon fontSize="small" /> por alumnos de Henry
    </Typography>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userMatch = useSelector((state) => state.userMatch);
  const users = useSelector((state) => state.users);
  const userDetail = useSelector((state) => state.userDetail);
  //MODAL PARA CREAR USUARIO
  const [modal, setModal] = useState(false);
  //KEY PARA CERRAR EL MODAL DE CREACION DE USUARIO
  const [key, setKey] = useState(false);
  //USER DE AUTH0 EN LOCAL STORAGE
  const [localUser, setLocalUser] = useState(
    localStorage.getItem("localUser")
      ? JSON.parse(localStorage.getItem("localUser"))
      : []
  );

  //PARA ABRIR MODAL PREMIUM
  const [premium, setPremium] = useState(false);

  //PARA LLENAR EL STORE
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserByNick(localUser.sub));
    /*  userDetail.length > 0
      ? dispatch(filterByMe())
      : console.log("HOME: userDetail está vacío"); */
  }, []);

  //PARA FILTRAR LO QUE RENDERIZA CARD CUANDO SE MODIFICA USERDETAIL
  useEffect(() => {
    /*  userDetail.length > 0
      ? dispatch(filterByMe())
      : console.log("HOME: userDetail está vacío 2"); */
  }, [userDetail]);

  //PARA GUARDAR USER DE AUTH0 EN LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("localUser", JSON.stringify(localUser) ?? []);
  }, [localUser]);

  //MENSAJES
  useEffect(() => {
    if (user) {
      const userid = {
        name: user.name,
        id: user.sub,
        photoUrl: user.picture,
        email: user.email || "exampleEmail@gmail.com",
        description: "im Ready to get my first HenryMatch",
        role: "user",
      };

      window.localStorage.setItem("currentTalkjsUser", JSON.stringify(userid));
    }
  }, [user]);

  //PARA ABRIR MODAL DE CREACION DE USUARIO CUANDO NO ESTA EN LA DB
  useEffect(() => {
    if (isAuthenticated === true) {
      //ME GUARDO EL SUB (NUESTRO NICKNAME) DEL USUARIO DE AUTH0 EN ESTA VARIABLE
      const localUserNickname = user.sub;
      console.log("localUser que contiene user Auth0", localUser.sub);
      //EN ESTA VARIABLE SER GUARDA EL LOCAL USER SI ESTA EN LA DB
      const userInDb = users.find((u) => u.nickname === localUserNickname);

      //======> SI ESTAS EN LA DB =======> console.log(userInDb);
      //SI NO HAY NADA EN userInDb SE ABRE EL MODAL
      if (!userInDb || userInDb === undefined) {
        setModal(true);
      } else {
        setModal(false);
        //SI EL USUARIO SI ESTABA EN NUESTRA DB SE LLENA EL userDetail DEL STORE
        dispatch(getUserByNick(localUserNickname));
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}

      <Modal modal={modal} setModal={setModal} setKey={setKey}></Modal>
      {isAuthenticated ? (
        <Grid>
          <CssBaseline />
          <Header />
          <Cards premium={premium} setPremium={setPremium} />
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
                  <Copyright sx={{ mt: 30 }} />
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
