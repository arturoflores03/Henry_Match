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
import { styled } from "@mui/material/styles";
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
  CardActionArea,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InterestsIcon from "@mui/icons-material/Interests";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
    handleExpandClick();
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

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Box>
      {/* MENSAJITO SI EL USUARIO NO HA DEJADO SU COMENTARIO AUN */}
      <Box sx={{ paddingTop: 10 }}>
        <Invitation2 />
      </Box>
      <Box
        key={character?._id}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 3,
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
          <CardActionArea>
            <CardMedia
              component="img"
              height="566"
              style={{ backgroundImage: "url(" + character?.image + ")" }}
              alt=""
              onClick
            />
          </CardActionArea>

          <CardActions disableSpacing sx={{ bgcolor: "inherit" }}>
            <Box sx={{ display: "flex", left: 0 }}>
              <Tooltip title="Editar perfil">
                <IconButton onClick={handleClick}>
                  {" "}
                  <EditIcon color={"primary"} />{" "}
                </IconButton>
              </Tooltip>
            </Box>
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
              sx={{ color: "white" }}
            >
              <ExpandMoreIcon />
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
                <Typography textTransform="uppercase">
                  <PersonOutlineIcon /> {character?.gender}
                </Typography>
              </Box>
              {!character?.description ? (
                <Typography sx={{ color: "red" }}>
                  Ingresa una descripcion
                </Typography>
              ) : (
                <Typography sx={{ letterSpacing: 3, fontStyle: "oblique" }}>
                  {character?.description}
                </Typography>
              )}
              <Divider color="#ffff00" />
              {!character?.city ? (
                <Typography sx={{ color: "red" }}>
                  <LocationOnIcon sx={{ color: "red" }} /> Ingresa tu ciudad
                </Typography>
              ) : (
                <Typography>
                  <LocationOnIcon /> {character?.city}
                </Typography>
              )}
              {character?.genderInt?.length === 0 ? (
                <Typography sx={{ color: "red" }}>
                  <TransgenderIcon sx={{ color: "red" }} /> Ingresa tu
                  orientacion sexual
                </Typography>
              ) : (
                <Typography>
                  <TransgenderIcon /> {character?.genderInt}
                </Typography>
              )}
              {!character?.phone ? (
                <Typography sx={{ color: "red" }}>
                  <LocalPhoneIcon sx={{ color: "red" }} /> Ingresa tu celular
                </Typography>
              ) : (
                <Typography>
                  <LocalPhoneIcon /> {character?.phone}
                </Typography>
              )}

              {character?.henryLevel?.length === 0 ? (
                <Typography sx={{ color: "red" }}>
                  <AttachFileIcon sx={{ color: "red" }} /> Ingresa tu modulo
                </Typography>
              ) : (
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
              )}

              <Divider color="#ffff00" />
              {/* <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  marginTop: 1,
                }}
              >
                {character?.interests?.length === 0 ? (
                  <Typography sx={{ color: "red" }}>
                    <InterestsIcon sx={{ color: "red" }} /> Ingresa intereses
                  </Typography>
                ) : (
                  <Typography>
                    <InterestsIcon />{" "}
                    {character?.interests?.map((i) => {
                      return <div key={i}>{i}</div>;
                    })}
                  </Typography>
                )}
              </Box> */}
            </CardContent>
          </Collapse>
        </Card>
        {updateForm && (
          <Box sx={{ paddingBottom: 20, paddingLeft: 5 }}>
            <Formu setUpdate={setUpdate} setUpdateForm={setUpdateForm} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfCard;
