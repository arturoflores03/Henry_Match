import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUserByNick,
  updateMatches,
} from "../../Redux/actions/index";
import {
  Avatar,
  Button,
  Divider,

  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ButtonBases from './../Buttoms/ButtomImg';



import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DiamondIcon from "@mui/icons-material/Diamond";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import {Fade, Link, Tooltip } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import Modal from "@mui/material/Modal";

import Carousel from "react-material-ui-carousel";




const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -40,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

function Item({ item }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>{item.description}</div>
  );
}

var items = [
  {
    name: "Random Name #1",
    description: "VE QUIEN TE DIO LIKE",
  },
  {
    name: "Random Name #2",
    description: "BOTON DE ARREPENTIMIENTO",
  },
  {
    name: "Random Name #3",
    description: "FILTRA POR EDAD",
  },
];


const DisplayLikeReceived = () => {
  const [likeRec, setlikeRec] = useState(null);
  const currentUser = useSelector((state) => state.userDetail);
  const db = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const myID = currentUser?._id;


  const [index, setIndex] = useState(0);


  const likesUserIds = currentUser?.likeReceived.map((e) => e);
  const likesRec = [...new Set(likesUserIds)];

  const handleOpen = () => setPremium(true);
  const handleClose = () => setPremium(false);
  const [premiums, setPremiums] = useState(false)

  function setPremiumc(){
    if(currentUser.premium){
      setPremiums(true)
    }
  }
useEffect(()=>{

setPremiumc()
  
}, [])

  //console.log("arrLikesRec",arrLikesRec)

  // useEffect(
  //   () => {
  //     dispatch(getUsers());
  //   },[ ]);

  const usersReceived = db.filter((e) => e.likeGiven.includes(myID));
  // console.log("usersReceived", usersReceived);

  return (
    <div>
      {currentUser.premium ? (
        usersReceived?.map((user) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.image} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={"te ha dado un like!"}
                sx={{ color: "primary.contrastText" }}
              />
              {/* <IconButton color="primary" size="large">
              <SendIcon />
            </IconButton> */}
            </ListItem>

            <Divider variant="inset" component="li" />
          </>
        ))
      ) : (
        <>
        <Typography align="center">Solo usuarios Premium</Typography>
        <Modal open={premiums} onClose={handleClose}>
        <Box sx={style}>
          <ButtonBases />
          <Carousel
            index={index}
            /*    onChange={handleChange} */
            interval={4500}
            animation="slide"
            indicators={false}
            stopAutoPlayOnHover
            swipe
            sx={{
              position: "relative",
              top: -140,
              left: 1 / 2,
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              wordSpacing: 2,
              color: "#fff",
              /*   fontWeight: "normal", */
              textDecoration: "none",
              fontStyle: "normal",
              fontVariant: "normal",
              textTransform: "none",
            }}>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Box>
      </Modal>
        </>
      )}
    </div>
  );
};

export default DisplayLikeReceived;
