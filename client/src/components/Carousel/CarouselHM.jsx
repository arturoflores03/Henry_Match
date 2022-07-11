//======PAQUETES Y LIBRERIAS
import React from "react";
import { NavLink } from "react-router-dom";

//======IMPORTACIONES DE COMPONENTES
//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { users } from "./UserImgs";

//======ESTILO E IMAGENES
import { Typography, ButtonBase, Box, Fade } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//BOTON SOBRE LA IMAGEN DE FONDO//
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // HOVER: BORDE
    height: 200,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

//LA IMAGEN DE FONDO//
const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

//TEXTO SOBRE LA IMAGEN DE FONDO
const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 40,
  right: 40,
  top: 10,
  bottom: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

//FILTRO SOBRE LA IMAGEN DE FONDO
const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.7,
  transition: theme.transitions.create("opacity"),
}));
//MARQUITA --
const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const CarouselHM = () => {
  /* ONCHANGE -SIN UTILIDAD AHORA-
  const [index, setIndex] = React.useState(0);
  const handleChange = (cur, prev) => {
    setIndex(cur);
    console.log(cur, prev);
  }; */

  return (
    <Box>
      <Typography variant="h4">TITULO</Typography>
      {/* <Modal open={open} onClose={handleClose}> AQUI PUEDE IR EL MODAL SI ES NECESARIO*/}
      <Box /* sx={{ mt: 10 }} //AFECTA LA UBICACION*/>
        <Carousel
          NextIcon={<ChevronRightIcon />} //BOTONES
          /* next={(next, active) =>
            console.log(`we left ${active} and are now at ${next}`)} */
          PrevIcon={<ChevronLeftIcon />} //BOTONES
          /* prev={(prev, active) =>
            console.log(`we left ${active} and are now at ${prev}`)} */
          navButtonsProps={{
            //CAMBIA ESTILO DE LOS BOTONES
            style: {
              color: "#ffff00",
            },
          }}
          animation={"fade"} /*"slide"*/
          /* index={index} */
          /*    onChange={handleChange} */
          interval={4500}
          indicators={false}
          stopAutoPlayOnHover
          swipe
          /* fullHeightHover */
          sx={{
            top: 20,
            height: 200,
            width: 400,
            //ESTOS ATRIBUTOS NO AFECTAN
            /* position: "relative", */
            /* left: 1 / 2, */
            /* textAlign: "center", */
            /* fontSize: 15, */
            /* fontWeight: "bold", */
            /* letterSpacing: 2, */
            /*  wordSpacing: 2, */
            /* color: "#fff", */
            /*   fontWeight: "normal", */
            /* textDecoration: "none",
            fontStyle: "normal",
            fontVariant: "normal",
            textTransform: "none", */
          }}>
          {users.map((user) => (
            <ImageButton
              key={user.img}
              /* NO USAR style={{}}//MODIFICAR ARRIBA EN SU FUNCION */
            >
              <ImageSrc style={{ backgroundImage: `url(${user.img})` }} />
              {/* TIENE SU FUNCION */}
              <ImageBackdrop className="MuiImageBackdrop-root" />
              {/* TIENE SU FUNCION */}
              <Image>
                {/* TIENE SU FUNCION */}
                <Fade in={true} timeout={2200}>
                  <Typography
                    component="span"
                    variant="h4"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      letterSpacing: 2,
                      textShadow: "#3e3e3ea6 1px 2px 1px",
                      "&:hover": {
                        color: "#474747",
                        /* textShadow:
                            "#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #ffff00 0px 0px 20px, #ffff00 0px 0px 30px, #ffff00 0px 0px 40px, #ffff00 0px 0px 50px, #ffff00 0px 0px 75px", */
                      },
                    }}>
                    {user.description}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Fade>
              </Image>
            </ImageButton>
          ))}
        </Carousel>
      </Box>
      {/* </Modal> */}
      <CssBaseline />
    </Box>
  );
};

export default CarouselHM;
