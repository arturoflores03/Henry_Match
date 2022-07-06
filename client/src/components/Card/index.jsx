//======PAQUETES Y LIBRERIAS
import React, { useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TinderCard from "react-tinder-card";
//======IMPORTACIONES DE COMPONENTES
//======IMPORTACIONES DE FUNCIONES NUESTRAS
import {
  getUsers,
  filterByGender,
  filterByMe,
  getUserByNick,
  updateMatches,
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
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import InterestsIcon from "@mui/icons-material/Interests";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { AttachFileIcon } from "@mui/icons-material/AttachFile";

import Swal from "sweetalert2";

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

export default function Cards({ premium, setPremium }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const db = useSelector((state) => state.usersSelected);

  const currentUser = useSelector((state) => state.userDetail);

  const [UpdateCurrentUser, setUpdateCurrentUser] = useState({});
  const [UpdateCardUser, setUpdateCardUser] = useState({});

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getUsers());
    },
    [
      /* currentUser, db  */
      /* UpdateCardUser,  */
      /* UpdateCurrentUser, */
    ]
  );

  const [currentIndex, setCurrentIndex] = React.useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  //infinito
  /*  useEffect(()=>{
    dispatch(filterByMe())
    console.log('ahora me estoy montando')
    }) */

  //convierte al userDetail en null
  /* useEffect(()=>{
      dispatch(filterByMe())
      console.log('ahora me estoy montando')
      },[currentUser]) */

  //FILTERBYME EN EL EFFECT TE DEVUELVE  USERDETAIL NULL!!!!!!!!

  /*  useEffect(()=>{
        dispatch(filterByMe())
        console.log('ahora me estoy montando')
        },[]) */

  /*  useLayoutEffect(()=>{
      dispatch(filterByMe())
      dispatch(getUsers())
      },[]) */

  //userDetail en NULL
  /*  useEffect(()=>{
      dispatch(getUserByNick(currentUser.nickname));
      dispatch(getUsers())
      dispatch(filterByMe())
        console.log('ahora me estoy montando')
      },[updateMatches]) 
 */
  //userDetail en NULL
  /* useEffect(()=>{
        dispatch(getUsers())
        dispatch(getUserByNick(currentUser.nickname));
          console.log('ahora me estoy montando')
        },[updateMatches]) 
 */
  /*  useEffect(()=>{
          dispatch(getUsers())
                      console.log('ahora me estoy montando')
          },[updateMatches])  */
  //atrasado 2 pasos
  /*    useEffect(()=>{
            dispatch(getUsers())
            },[])  */

  /*    useEffect(()=>{
              return () => dispatch(clearUserDetail())
              },[dispatch])   */

  const childRefs = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, name, index, id) => {
    const currentCard = db.find((ss) => ss._id === id);

    dispatch(getUserByNick(currentUser?.nickname));

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

      dispatch(getUserByNick(currentUser?.nickname));
      dispatch(filterByMe());
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

      dispatch(getUserByNick(currentUser?.nickname));
    }

    const foundMatch = currentCard.likeGiven?.includes(miID);

    if (foundMatch) {
      dispatch(
        updateMatches(id, {
          matches: miID,
        })
      );
      //  alert(`hiciste match con ${name}`)
      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: `hiciste match con ${name}`,
      //   showConfirmButton: false,
      //   timer: 2500,
      // });
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
      alert(`hiciste match con ${name}`);
      dispatch(getUserByNick(currentUser?.nickname));
    }

    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

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
      {db.map((character, index) => (
        <Box
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
            key={character.id}
            onSwipe={(dir) => swiped(dir, character.name, index, character._id)}
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
                  {character.name}{" "}
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
      ))}
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
            style={{ backgroundColor: !canGoBack }}
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
      {lastDirection ? (
        <Typography variant="h5" key={lastDirection}>
          You swiped {lastDirection}
        </Typography>
      ) : (
        <Typography variant="h5">
          Swipe a card or press a button to get Restore Card button visible!
        </Typography>
      )}
    </>
  );
}
