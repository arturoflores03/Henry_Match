//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { NavLink } from "react-router-dom";
//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import { Typography } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";

export default function AdminBottomBar() {
  return (
    <Box>
      <CssBaseline />

      <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">
            <NavLink
              to="/terms"
              style={{
                color: "white",
              }}
              target="_blank"
              rel="noopener noreferrer">
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
              rel="noopener noreferrer">
              alumnos
            </NavLink>{" "}
            de Henry
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
