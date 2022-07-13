//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import Header from "../../components/Header/Header";
import Cards from "../../components/Card";
import Loader from "../../components/Loader/Loader";
import BottomBar from "../../components/BottomBar";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { filterByMe, filterUserByMatches, getUsers } from "../../redux/actions";
import { getUserByNick, updateMatches } from "../../redux/actions/index";

//======ESTILO E IMAGENES
import { Grid } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import Ban from "../../components/Ban";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const users = useSelector((state) => state.users);
  const userMatches = useSelector((state) => state.userMatches);
  const userDetail = useSelector((state) => state.userDetail);

  const iAmActive = userDetail?.active;

  let allAdmins = [];

  let filterAdmins = users.filter((user) => {
    if (user.isAdmin === true) {
      allAdmins.push(user);
    }
  });

  //MODAL PARA CREAR USUARIO
  const [modal, setModal] = useState(false);

  //PARA ABRIR MODAL PREMIUM
  const [premium, setPremium] = useState(false);

  //IDENTIFICO CUANDO SE CREO UN USUARIO NUEVO
  const [newUser, setNewUser] = useState(false);

  //ME TRAIGO EL USER DE AUTH0 DEL LOCAL STORAGE A ESTE ESTADO LOCAL
  const [localUser, setLocalUser] = useState(
    localStorage.getItem("localUser")
      ? JSON.parse(localStorage.getItem("localUser"))
      : []
  );
  //IDENTIFICO CUANDO SE HA GENERADO UN CAMBIO EN CARDS
  const [cardMoved, setCardMoved] = useState(false);

  //IDENTIFICO CUANDO SE HA GENERADO UN CAMBIO EN CARDS
  const [match, setMatch] = useState(false);

  //OBJETO USER DE AUTH0 Y SU SUB (NUESTRO NICKNAME)
  const userAuth = user;

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
    console.log("AAAAAAAAAAAA", users);
    //EL USUARIO ACTUAL ESTA EN LA DB?
    const userInDb = users.find((u) => u.nickname === userAuth.sub);
    console.log("BBBBBBBBBBBB", userInDb);

    //ACTUALIZO USERDETAIL Y FILTROS AL VOLVER A HOME
    if (isAuthenticated === true && Object.keys(userInDb).length > 0) {
      dispatch(getUserByNick(userAuth.sub));
      console.log("CCCCCCCCC userAuth.sub", userAuth.sub);
      dispatch(filterByMe());
      console.log("DDDDDDDDDDD user in DB", userInDb);
    }

    //PARA FILTRAR LO QUE RENDERIZA CARD CUANDO NO SE ABRIO EL MODAL
    if (isAuthenticated === true && newUser === true) {
      dispatch(filterByMe());
      setNewUser(false);
    } else {
      console.log("USER DETAIL", Object.keys(userDetail).length > 0);
    }
  }, []);
  //PARA CHAT2
  useEffect(() => {
    if (user) {
      const userid = {
        name: user.name,
        id: user.sub,
        photoUrl: user.picture,
        email: user.email || "exampleEmail@gmail.com",
        description: "im Ready to get my first HenryMatch",
        role: "default",
      };

      window.localStorage.setItem("currentTalkjsUser", JSON.stringify(userid));
    }
  }, [user]);

  //PARA ABRIR MODAL SOLO CUANDO EL USUARIO NO ESTA EN LA DB
  useEffect(() => {
    if (isAuthenticated === true && Object.keys(users).length > 0) {
      //EL USUARIO ACTUAL ESTA EN LA DB?
      console.log("1111111111111111111", isAuthenticated);
      console.log("222222222222222", users);
      const userInDb = users.find((u) => u.nickname === userAuth.sub);
      console.log("33333333333333", userInDb);
      if (userInDb) {
        setModal(false);
        //SI EL USUARIO SI ESTABA EN NUESTRA DB SE LLENA EL userDetail DEL STORE
        //NO TIENE SENTIDO PORQUE NO SE LLENA EL USERDETAIL
        dispatch(getUserByNick(userInDb.nickname));

        dispatch(filterByMe());
        //console.log("5555555555555 con like?", userDetail);
      } else {
        setModal(true);
      }
    }
  }, [users]);

  //PARA FILTRAR LO QUE RENDERIZA CARD CUANDO SI  SE ABRIO EL MODAL
  useEffect(() => {
    if (isAuthenticated === true && newUser === true) {
      dispatch(filterByMe());
      console.log("newuser 11111111111", Object.keys(userDetail).length > 0);
      setNewUser(false);
    } else {
      console.log("newuser 22222222", Object.keys(userDetail).length > 0);
    }
  }, [newUser]);

  //PARA ACTUALIZAR DESPUES DE MOVER CARTAS O MATCHES
  useEffect(() => {
    if (cardMoved === true || match === true) {
      dispatch(getUsers());
      dispatch(getUserByNick(userAuth.sub));
      dispatch(filterByMe());
      setCardMoved(false);
      setMatch(false);
      console.log("CARDMOVED1111111", userDetail);
    }
  }, [cardMoved, match]);

  //PARA ACTUALIZAR DESPUES DE MOVER CARTAS O MATCHES
  useEffect(() => {
    if (cardMoved === true || match === true) {
      dispatch(getUserByNick(userAuth.sub));
      dispatch(filterByMe());
      console.log("UPDATEMATCHES111111", userDetail);
    }
  }, [updateMatches]);

  /*   //PARA MONTAR CON LOS FILTROS GENERO,LIKES, DISLIKES APLICADOS
  useEffect(() => {
    dispatch(filterByMe());
  }, [userDetail]);

  useEffect(() => {
    if (user) {
      dispatch(getUserByNick(user.sub)).then(() =>
        dispatch(filterUserByMatches(userDetail?._id))
      );
    }
  }, [user, userDetail?._id]);
 */
  return (
    <>
      <Modal modal={modal} setModal={setModal} setNewUser={setNewUser}></Modal>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {iAmActive === false ? (
        <>
          <Ban userDetail={userDetail} users={users} allAdmins={allAdmins} />
        </>
      ) : (
        <Grid>
          <Header 
          userDetail={userDetail} users={users} allAdmins={allAdmins}
          />
          <Cards
            setPremium={setPremium}
            setCardMoved={setCardMoved}
            setMatch={setMatch}
          />
          <BottomBar
            premium={premium}
            setPremium={setPremium}
            userDetail={userDetail}
          />
        </Grid>
      )}
    </>
  );
};

export default Home;
