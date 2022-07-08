//======PAQUETES Y LIBRERIAS
import React, { useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TinderCard from "react-tinder-card";
//======IMPORTACIONES DE COMPONENTES
//======IMPORTACIONES DE FUNCIONES NUESTRAS

import {
  filterByMe,
  getUserByNick,
  updateMatches,
  getUsers,
  filterByGender,
} from "../../Redux/actions";

//======ESTILO E IMAGENES
import { styled } from "@mui/material/styles";
import {
  Tooltip,
  CardHeader,
  Card,
  Collapse,
  CardContent,
  CardActions,
  autocompleteClasses,
  Box,
  Divider,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
  Slide,
} from "@mui/material";

import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import { MsgContainer, MsgText } from "../Card/StyleMsg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InterestsIcon from "@mui/icons-material/Interests";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkIcon from "@mui/icons-material/Work";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import Swal from "sweetalert2";

//=============================================
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

const messages = [
  "",
  "Por el momento no hay más usuarios!",
  "Por favor regresa más tarde.",
];
//=============================================

export default function Cards({ setPremium, setCardMoved, setMatch }) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const db = useSelector((state) => state.usersSelected);

  const currentUser = useSelector((state) => state.userDetail);

  //================================
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // MENSAJE CUANDO NO HAY MAS CARTAS
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // get next message
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  //================================

  //ULTIMO INDICE DEL ARREGLO DE USUARIOS
  const [currentIndex, setCurrentIndex] = React.useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  //ACTUALIZA EL INDICE ACTUAL DEL ARREGLO
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  //EL INDICE ACTUAL ES MENOR QUE EL ULTIMO INDICE DEL ARREGLO?
  const canGoBack = currentIndex < db.length - 1;
  //EL INDICE ACTUAL ES >= 0
  const canSwipe = currentIndex >= 0;

  //FUNCION QUE SETEA LA ULTIMA DIRECCION Y MERMA EL INDICE ACTUAL
  const swiped = (direction, name, index, id) => {
    const currentCard = db.find((user) => user._id === id);
    const miID = currentUser?._id;
    const cardID = currentCard._id;

    if (direction === "right") {
      dispatch(
        updateMatches(id, {
          likeReceived: miID,
        })
      );

      dispatch(
        updateMatches(miID, {
          likeGiven: cardID,
        })
      );
      setCardMoved(true);
    }

    if (direction === "left") {
      dispatch(
        updateMatches(miID, {
          dislike: id,
        })
      );

      dispatch(
        updateMatches(id, {
          dislikeReceived: miID,
        })
      );
      setCardMoved(true);
    }

    const foundMatch = currentCard.likeGiven?.includes(miID);

    if (foundMatch) {
      dispatch(
        updateMatches(id, {
          matches: miID,
        })
      );
      //ALERT
      Swal.fire({
        title: `hiciste match con ${name}`,
        text: "Felicidades!!",
        imageUrl: `${currentCard.image}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      dispatch(
        updateMatches(miID, {
          matches: id,
        })
      );
      setMatch(true);
    }

    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  //// handle the case in which go back is pressed before card goes outOfFrame
  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) {
      setPremium(true);
      return;
    }
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <>
      {db.length ? (
        db.map((character, index) => (
          <Box
            key={character._id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: 10,
              position: "absolute",
              right: 0,
              left: 0,
              boxShadow: 3,
              border: 0,
            }}>
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              preventSwipe={["up", "down"]}
              onSwipe={(dir) =>
                swiped(dir, character.name, index, character._id)
              }
              onCardLeftScreen={() => outOfFrame(character.name, index)}>
              <Card
                sx={{
                  width: 330,
                  height: 460,
                  mt: 0,
                  marginBottom: 14,
                  borderColor: "none",
                  borderRadius: 3,
                }}>
                {/* MARTIN: NOMBRE Y EDAD
                  <ImageListItemBar
                    title={character.name}
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70% rgba(0,0,0,0)100%) ",
                    }}
                    position="bottom"></ImageListItemBar> */}
                <CardMedia
                  component="img"
                  height="566"
                  style={{ backgroundImage: "url(" + character.image + ")" }}
                  alt=""
                  sx={{ borderColor: "#000" }}
                />
                <CardActions disableSpacing sx={{ bgcolor: "inherit" }}>
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 900,
                      // letterSpacing: 1,
                      fontFamily: "Proxima Nova",
                    }}>
                    {character.name}
                    <Typography
                      sx={{
                        fontWeight: 300,
                        display: "inline",
                        fontSize: 20,
                        letterSpacing: 2,
                        fontFamily: "Proxima Nova",
                      }}>
                      {character.age}
                    </Typography>
                  </Typography>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon color="light" />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expanded}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    marginTop: -3,
                  }}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        right: 0,
                        left: 0,
                        marginTop: 1,
                      }}>
                      <Typography>
                        <LocationOnIcon /> {character.city}
                      </Typography>
                    </Box>
                    <Typography sx={{ letterSpacing: 3, fontStyle: "oblique" }}>
                      {character.description}
                    </Typography>
                    <Divider color="#ffff00" />
                    <Typography textTransform="uppercase">
                      <PersonOutlineIcon /> {character.gender}
                    </Typography>
                    <Typography>
                      <CakeIcon /> {character.birthday}
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
                      }}>
                      <Typography
                        textTransform="uppercase"
                        sx={{
                          display: "inline",
                          letterSpacing: 2,
                          fontFamily: "Proxima Nova",
                        }}>
                        <WorkIcon /> {character.job}
                      </Typography>
                      <Typography
                        textTransform="uppercase"
                        sx={{
                          display: "inline",
                          letterSpacing: 2,
                          fontFamily: "Proxima Nova",
                        }}>
                        <AttachFileIcon /> {character.henryLevel}
                      </Typography>
                      <InterestsIcon />{" "}
                      {character.interests?.map((i) => {
                        return <div key={i}>{i}</div>;
                      })}
                    </Box>
                  </CardContent>
                </Collapse>
              </Card>
            </TinderCard>
          </Box>
        ))
      ) : (
        <MsgContainer ref={containerRef} overflow="hidden">
          <Slide
            direction={"right"}
            in={show}
            container={containerRef.current}
            timeout={{
              enter: 600,
              exit: 100,
            }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <MsgText>{messages[messageIndex]}</MsgText>
            </Box>
          </Slide>
        </MsgContainer>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: 15,
          right: 0,
          left: 0,
        }}>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            position: "absolute",
            top: 80,
            mx: "auto",
            width: 300,
          }}>
          <IconButton
            style={{
              backgroundColor: !canSwipe && "#83838077",
            }}
            onClick={() => swipe("left")}
            color="warning"
            size="large">
            <CloseIcon font="large" />
          </IconButton>
          <IconButton
            style={{ backgroundColor: !canGoBack /* && "#83838077" */ }} //preguntar sobre esto
            onClick={() => goBack()}
            color="primary"
            size="large">
            <Tooltip title="go back">
              <ArrowBackIcon font="large" />
            </Tooltip>
          </IconButton>
          <IconButton
            style={{ backgroundColor: !canSwipe && "#83838077" }}
            onClick={() => swipe("right")}
            color="info"
            size="large">
            <FavoriteIcon font="large" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
