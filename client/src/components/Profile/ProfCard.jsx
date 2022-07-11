//======PAQUETES Y LIBRERIAS
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

//======IMPORTACIONES DE COMPONENTES
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import LoginButton from "../../components/LoginButton/LoginButton";
import Loader from "../../components/Loader/Loader";
import Formu from "../../components/Form/Form";
import ReviewField from "../../components/Reviews/ReviewField";
import Invitation2 from "../../components/Reviews/Invitation2";

//======ACTIONS
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
  Card,
  CardMedia,
  CardActions,
  Collapse,
  CardContent,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InterestsIcon from "@mui/icons-material/Interests";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProfCard = () => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.userDetail);
  const { user, isAuthenticated, isLoading } = useAuth0();
  // ACTUALIZAR AL RENDERIZAR
  const [update, setUpdate] = useState(false);
  //RENDERIZAR EL FORM
  const [updateForm, setUpdateForm] = useState(false);
  //EXPANDIR INFO
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    dispatch(getUserByNick(character?.nickname));
    setUpdate(false);
  }, [update]);

  //ACTUALIZO CAMBIOS
  const handleClick = () => {
    setUpdateForm(true);
  };

  //EXPANDIR INFO
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // BOTON PARA ELIMINAR CUENTA :
  function handleUserActive() {
    dispatch(updateUser(userProfile._id, { active: false }));
    /*   setUpdate(true);
        setUpdateForm(false) */
    alert("Tu cuenta ha sido eliminada");
  }

  return (
    <Box>
      {/* MENSAJITO SI EL USUARIO NO HA DEJADO SU COMENTARIO AUN */}
      {/* <Invitation2 userDetail={userProfile} />
      <ReviewField userDetail={userProfile} /> */}
      <Box
        key={character?._id}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 18,
          right: 0,
          left: 0,
          boxShadow: 3,
          border: 0,
        }}
      >
        <Card
          sx={{
            width: 375,
            marginBottom: 14,
            borderColor: "none",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              tr: {
                background: "#f1f1f1",
                "&:hover": {
                  background: "#f00",
                },
              },
            }}
          >
            <CardMedia
              component="img"
              height="566"
              style={{ backgroundImage: "url(" + character?.image + ")" }}
              alt=""
              sx={{
                tr: {
                  background: "#f1f1f1",
                  "&:hover": {
                    background: "#f00",
                  },
                },
              }}
              onClick
            />
          </Box>
          <CardActions disableSpacing sx={{ bgcolor: "inherit" }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                // letterSpacing: 1,
                fontFamily: "Proxima Nova",
              }}
            >
              {character?.name}{" "}
              <Typography
                sx={{
                  fontWeight: 300,
                  display: "inline",
                  fontSize: 20,
                  letterSpacing: 2,
                  fontFamily: "Proxima Nova",
                }}
              >
                {character?.age}
              </Typography>
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon color="light" />
            </ExpandMore>
          </CardActions>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{
              marginTop: -3,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  marginTop: 1,
                }}
              >
                <Typography>
                  <LocationOnIcon /> {character?.city}
                </Typography>
              </Box>
              <Typography sx={{ letterSpacing: 3, fontStyle: "oblique" }}>
                {character?.description}
              </Typography>
              <Divider color="#ffff00" />
              <Typography textTransform="uppercase">
                <PersonOutlineIcon /> {character?.gender}
              </Typography>
              <Typography>
                <CakeIcon /> {character?.birthday}
              </Typography>
              <Divider color="#ffff00" />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  marginTop: 1,
                }}
              >
                <Typography
                  textTransform="uppercase"
                  sx={{
                    display: "inline",
                    letterSpacing: 2,
                    fontFamily: "Proxima Nova",
                  }}
                >
                  <WorkIcon /> {character?.job}
                </Typography>
                <Typography
                  textTransform="uppercase"
                  sx={{
                    display: "inline",
                    letterSpacing: 2,
                    fontFamily: "Proxima Nova",
                  }}
                >
                  <AttachFileIcon /> {character?.henryLevel}
                </Typography>
                <InterestsIcon />{" "}
                {character?.interests?.map((i) => {
                  return <div key={i}>{i}</div>;
                })}
              </Box>
            </CardContent>
          </Collapse>
        </Card>
        <Button onClick={handleClick}> Actualiza tus Datos </Button>
      </Box>

      {updateForm && (
        <div className="datosacompletar">
          <Formu setUpdate={setUpdate} setUpdateForm={setUpdateForm} />
        </div>
      )}
    </Box>
  );
};

export default ProfCard;
