import * as React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import { Link, Typography } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";

export default function BanBottomBar() {
  return (
    <Box>
      <CssBaseline />

      <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">
            <Link color="inherit" href="#">
              Henry Match
            </Link>{" "}
            {new Date().getFullYear()}
            {". "}
            Hecho con <Favorite fontSize="small" color="primary" /> por{" "}
            <Link color="inherit" href="#">
              alumnos
            </Link>{" "}
            de Henry
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
