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
import { getUserByNick } from "../../redux/actions/index";

//======ESTILO E IMAGENES
import { Grid } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import Ban from "../../components/Ban";
import Landing from "../../components/LandingPage";

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

  //PARA LLENAR EL STORE CON TODOS LOS USUARIOS
  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
    if (isAuthenticated === true) {
      //ME GUARDO EL SUB (NUESTRO NICKNAME) DEL USUARIO DE AUTH0 EN ESTA VARIABLE
      const localUserNickname = user.sub;

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

  //PARA FILTRAR USUARIO POR GENERO
  /*   useEffect(() => {
    dispatch(filterByGender(userDetail?.genderInt));
     }, [modal]); */

  //PARA MONTAR CON LOS FILTROS GENERO,LIKES, DISLIKES APLICADOS
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

  return (
    <>
          <Modal
            modal={modal}
            setModal={setModal}
            setNewUser={setNewUser}
          ></Modal>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {isAuthenticated && iAmActive === false ? (
        <>
          <Ban userDetail={userDetail} users={users} allAdmins={allAdmins} />
        </>
      ) : isAuthenticated ? (
        <Grid>
          <Header />
          <Cards setPremium={setPremium} />
          <BottomBar premium={premium} setPremium={setPremium} />
        </Grid>
      ) : (
        <Landing />
      )}
    </>
  );
};

export default Home;
