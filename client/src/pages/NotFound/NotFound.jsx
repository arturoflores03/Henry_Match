//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

//======IMPORTACIONES DE COMPONENTES
import Copyright from "../../components/Copyright/Copyright";
import Slider from "../Landing/Slider";
//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import { Grid, Box, Typography, Paper } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <Grid container component="main">
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Box component="form" noValidate sx={{ mt: 0, marginTop: 20 }}>
              <Typography variant="h4">
                No estas en una pagina de Henry Match!
              </Typography>

              <Link className="link" to="/"> VOLVER</Link>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  border: 0,
                  marginTop: 25,
                }}></Box>
              <Copyright sx={{ mt: 20 }} />
            </Box>

            <Box
              item
              xs={12}
              sm={12}
              /* md={7} */
              sx={{
                /* mx: 8, */
                right: 0,
                left: 0,
                border: 0,
                marginTop: -85,
                marginRight: -300,
              }}>
              <Slider />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
