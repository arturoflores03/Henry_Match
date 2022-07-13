//======PAQUETES Y LIBRERIAS
import React from "react";

//======IMPORTACIONES DE COMPONENTES
import Copyright from "../../components/Copyright/Copyright";
import Slider from "./Slider";
import LoginButton from "../../components/LoginButton/LoginButton";
//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import { CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";

const Landing = () => {
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
            <Box textAlign="center" sx={{ mt: 0, marginTop: 20 }}>
              <Typography variant="h4">
                Matchea y chatea con Alumnos de Henry!
              </Typography>
              <LoginButton />
              <Copyright sx={{ mt: 30 }} />
            </Box>
            <Box
              item
              xs={12}
              sm={12}
              sx={{
                right: 0,
                left: 0,
                border: 0,
                marginTop: -85,
                marginRight: -300,
              }}></Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={7} elevation={6}>
          <Slider />
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
