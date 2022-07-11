import { CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "../Copyright/Copyright";
import HenryGirl from "../../assets/HenryGirl.jpg";
import LoginButton from "../LoginButton/LoginButton";
import Paper from "@mui/material/Paper";
import Slider from "../LandingPage/Slider"

const Landing = () => {
  return (
    <>
      <Grid container component="main" sx={{/*  mx: 80, */ /* height: "90vh" */ }}>
        
        {/* <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${HenryGirl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "start",
          }}
        /> */}

        <Grid item xs={12} sm={8} md={5} component={Paper}  elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 0, marginTop: 20}}>
              <Typography variant="h4">
                Matchea y chatea con Alumnos de Henry!
                {/*    {users[0]?.name} */}
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  border: 0,
                  marginTop: 25,
                }}
              >
                <LoginButton />
              </Box>
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
                  <Slider/>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
