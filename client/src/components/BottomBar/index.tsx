//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { NavLink } from "react-router-dom";
//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Link, Tooltip, Typography } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import Modal from "@mui/material/Modal";
import ButtonBases from "../Buttoms/ButtomImg";
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

function Item({ item }: { item: { description: string } }) {
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

export default function BottomBar({ premium, setPremium, userDetail }) {
  const handleOpen = () => setPremium(true);
  const handleClose = () => setPremium(false);

  const [index, setIndex] = React.useState(0);
  const handleChange = (cur: number, prev: number) => {
    setIndex(cur);
    console.log(cur, prev);
  };

  console.log(userDetail);
  return (
    <Box>
      <Modal open={premium} onClose={handleClose}>
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
            }}
          >
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Box>
      </Modal>
      <CssBaseline />

      <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          {userDetail ? (
            userDetail.premium === true ? (
              <Tooltip title="YA ERES PREMIUM">
                <StyledFab
                  color="primary"
                  aria-label="add"
                  sx={{ width: 60, height: 60 }}
                  /*  onClick={handleOpen} */
                >
                  <DiamondIcon
                    sx={{
                      color: "dark.main",
                      "&:hover": { color: "primary.main" },
                    }}
                    fontSize="large"
                  />
                </StyledFab>
              </Tooltip>
            ) : (
              <Tooltip title="PREMIUM">
                <StyledFab
                  color="primary"
                  aria-label="add"
                  sx={{ width: 60, height: 60 }}
                  onClick={handleOpen}
                >
                  <DiamondIcon
                    sx={{
                      color: "dark.main",
                      "&:hover": { color: "primary.main" },
                    }}
                    fontSize="large"
                  />
                </StyledFab>
              </Tooltip>
            )
          ) : (
            <Tooltip title="PREMIUM">
              <StyledFab
                color="primary"
                aria-label="add"
                sx={{ width: 60, height: 60 }}
                onClick={handleOpen}
              >
                <DiamondIcon
                  sx={{
                    color: "dark.main",
                    "&:hover": { color: "primary.main" },
                  }}
                  fontSize="large"
                />
              </StyledFab>
            </Tooltip>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="body2" color="text.secondary">
            {}
            <NavLink
              to="/terms"
              style={{
                color: "white",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Henry Match
            </NavLink>{" "}
            {new Date().getFullYear()}
            {". "}
            Hecho con <Favorite fontSize="small" color="primary" /> por{" "}
            <NavLink
              to="/matchteam"
              style={{
                color: "white",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              alumnos
            </NavLink>{" "}
            de Henry
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
