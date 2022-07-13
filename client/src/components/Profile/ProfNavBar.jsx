//======PAQUETES Y LIBRERIAS
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
} from "@mui/material";
import Loader from "../Loader/Loader";
import ProfSideBar from "./ProfSideBar";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const ProfNavBar = ({ setRender }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const userDetail = useSelector((state) => state.userDetail);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      {isAuthenticated && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="inherit">
            <Toolbar>
              <ProfSideBar setRender={setRender} />
              {/* DESKTOP */}
              <Box sx={{ flexGrow: 1 }} />

              <Tooltip title="MATCHEA">
                <NavLink to={"/home"}>
                  <IconButton size="large" aria-label="show 4 new mails">
                    <LocalFireDepartmentIcon
                      fontSize="large"
                      sx={{ color: "primary.main" }}
                    />
                  </IconButton>
                </NavLink>
                {/* MATCHS */}
              </Tooltip>
              {/* PROFILE */}
              <Box sx={{ display: { xs: "flex", md: 900 } }}>
                <Tooltip title={user.name}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={userDetail?.image}
                      alt={user.name.substring(0, 1)}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <NavLink to={"/home"}>
                    <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        sx={{ textDecoration: "none", color: "light.main" }}
                      >
                        Regresar
                      </Typography>
                      {/* MENU: LOGOUT  */}
                    </MenuItem>
                  </NavLink>
                  <MenuItem
                    key={"logout"}
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    <Typography textAlign="center">Cerrar Sesión</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
};

export default ProfNavBar;
