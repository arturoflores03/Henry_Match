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

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { /* getUsers, */ getUserByNick, updateUser } from "../../Redux/actions";

//======ESTILO E IMAGENES
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Avatar, IconButton, Typography } from "@mui/material";
import "./Profile.css";

const Profile = () => {
  const userProfile = useSelector((state) => state.userDetail);
  const { user, isAuthenticated, isLoading } = useAuth0();
  // ACTUALIZAR AL RENDERIZAR
  const [update, setUpdate] = useState(false);
  //RENDERIZAR EL FORM
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByNick(userProfile.nickname));
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
    alert('Tu cuenta ha sido eliminada')
  }

  return (
    <>
      {isLoading && <Loader />}
      {isAuthenticated ? (
        <div className="todojunto">
          <div className="informaciondelusuario">
            <Link to="/">
              <button className="returnHomeButton">Return to Home</button>
            </Link>
            <Avatar
              src={userProfile.image}
              alt={userProfile.name}
              sx={{ width: 56, height: 56 }}
              align="center"></Avatar>

            <Typography variant="h2" color="text.secondary">
              {userProfile.name}
            </Typography>
            {/*  <h1 className="perfil">Perfil del Usuario</h1> */}
            <div className="label">
              {userProfile.name ? (
                <p> El nombre que elegiste para mostrar: {userProfile.name} </p>
              ) : (
                <p> Todavia no ingresaste un nombre para mostrar</p>
              )}
            </div>

            <div className="label">
              {userProfile.image?/* .length >= 0 ? */ (
                <img
                  src={userProfile.image}
                  alt={userProfile.name}
                  className="imagenperfil"
                />
              ) : (
                <p className="alert"> Debes cargar una imagen </p>
              )}
            </div>
            <div className="label">
              {userProfile.age ? (
                <p> La edad que declaraste es: {userProfile.age} </p>
              ) : (
                <p className="alert"> Todavia no ingresaste tu edad</p>
              )}
            </div>

            <div className="label">
              {userProfile.email ? (
                <p> Tu email: {userProfile.email} </p>
              ) : (
                <p className="alert"> Todavia no ingresaste tu email</p>
              )}
            </div>

            <div className="label">
              {userProfile.gender ? (
                <p>
                  Te definiste como{" "}
                  {userProfile.gender === "male" ? (
                    <p>"hombre"</p>
                  ) : (
                    <p>"mujer"</p>
                  )}
                </p>
              ) : (
                <p className="alert"> Todavia no definiste tu género</p>
              )}
            </div>

            <div className="label">
              {userProfile.genderInt ? (
                <p>
                  Te interesa conectar con
                  {userProfile.genderInt === "male" ? (
                    <p>"hombres"</p>
                  ) : userProfile.genderInt === "female" ? (
                    <p>"mujeres"</p>
                  ) : (
                    <p>"ambos"</p>
                  )}
                </p>
              ) : (
                <p className="alert"> Todavia no definiste tu genero de interes </p>
              )}{" "}
            </div>

            <div className="label">
              {userProfile.description ? (
                <p> Tu Descripcion: {userProfile.description} </p>
              ) : (
                <p className="alert"> Ingresa una breve descripcion tuya</p>
              )}
            </div>

            <div className="label">
              {userProfile.interests ? (
                <p> Tus Intereses son: {userProfile.interests.map(i => <p>{i}</p>)} </p>
              ) : (
                <p className="alert"> Ingresa tus intereses</p>
              )}
            </div>

            <div className="label">
              {userProfile.henryLevel ? (
                <p> Etapa del Bootcamp: {userProfile.henryLevel} </p>
              ) : (
                <p className="alert"> Ingresa tu etapa de Bootcamp</p>
              )}
            </div>

           {/*  <h3> Tu Imagenes cargadas </h3>
            <br />
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}>
              {userProfile.image.map((item) => (
                <ImageListItem key={item}>
                  <img
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={userProfile.name}
                    loading="lazy"
                    className="imagenescargadas"
                  />
                </ImageListItem>
              ))}
            </ImageList> */}

            <button className='eliminar' onClick={handleUserActive}>ELIMINAR CUENTA</button>

            <LogoutButton />
          </div>

          <button onClick={handleClick}> Actualiza tus Datos </button>



          {updateForm && (
            <div className="datosacompletar">
              <Formu setUpdate={setUpdate} setUpdateForm={setUpdateForm} />
            </div>
          )}

        </div>
      ) : (
        <div>
          <h1>Lo siento, pero no estas loggeado</h1>
          <NavLink to="/">
            <button>HOME</button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Profile;
