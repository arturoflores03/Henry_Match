//======PAQUETES Y LIBRERIAS
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import imgg4 from "./UsersImg/grupo/4.jpg";
import imgp5 from "./UsersImg/pareja/5.jpg";

import { bgcolor } from "@mui/system";

const Invitation2 = ({ userDetail }) => {
  return (
    <Card
      elevation={4}
      sx={{
        justifyContent: "space-between",
        display: "flex",
        width: "100%",
      }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={imgg4}
        alt="HM <3"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          /* alignItems: "center", */
        }}>
        <CardContent>
          {userDetail.reviews === "" ? (
            <Box>
              <Typography component="div" variant="h6">
                REVIEWS
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div">
                Comparte con los demás tu experiencia!
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography component="div" variant="h6">
                PREMIUM
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div">
                Haceté PREMIUM y disfrutá de todos los beneficios de la
                comunidad HM!
              </Typography>
            </Box>
          )}
        </CardContent>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mx: "auto" }}>
            <NavLink to="/subscription">
              <IconButton>
                <FavoriteIcon
                  sx={{ mx: 0.2 }}
                  fontSize="small"
                  color="primary"
                />
                <FavoriteIcon
                  sx={{ mx: 0.8 }}
                  fontSize="medium"
                  color="primary"
                />
                <FavoriteIcon
                  sx={{ mx: 0.5 }}
                  fontSize="large"
                  color="primary"
                />
              </IconButton>
            </NavLink>
          </Box>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={imgp5}
        alt="HM <3"
      />
    </Card>
  );
};

export default Invitation2;
