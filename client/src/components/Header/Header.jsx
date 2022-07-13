//======PAQUETES Y LIBRERIAS
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
//======IMPORTACIONES DE COMPONENTES
import Loader from "../Loader/Loader";
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
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SideBar from "../SideBar";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = ({ setPremium }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const userDetail = useSelector((state) => state.userDetail);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const iAmAdmin = userDetail?.isAdmin;
  const name = userDetail?.name;

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <>
      {isLoading && <Loader />}
      {isAuthenticated && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="inherit">
            <Toolbar>
              <SideBar />
              {/* DESKTOP */}
              <Tooltip title="Solo estoy trabajando!">
                <NavLink to="/desktop">
                  <IconButton>
                    <WorkHistoryIcon sx={{ color: "primary.light" }} />
                  </IconButton>
                </NavLink>
              </Tooltip>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: { /* xs: "none" ,*/ md: "flex", paddingRight: 10 },
                }}
              >
                {/* MESSAGES */}
                <Tooltip title="Nuevos mensajes">
                  <NavLink to={"/chatroom"}>
                    <IconButton size="large" aria-label="show 4 new mails">
                      <Badge
                        badgeContent={<span id="unread-message-count"></span>}
                        color="error"
                      >
                        <MailIcon sx={{ color: "primary.light" }} />
                      </Badge>
                    </IconButton>
                  </NavLink>
                  {/* MATCHS */}
                </Tooltip>
              </Box>
              {/* PROFILE */}
              <Box sx={{ display: { xs: "flex", md: 900 } }}>
                <Tooltip title={name}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={userDetail?.image}
                      alt={user.name?.substring(0, 1)}
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
                  {/* MENU: MY PROFILE  */}
                  <NavLink to={"/profile"}>
                    <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        sx={{ textDecoration: "none", color: "light.main" }}
                      >
                        Mi Perfil
                      </Typography>
                      {/* MENU: LOGOUT  */}
                    </MenuItem>
                  </NavLink>
                  {iAmAdmin === true && (
                    <NavLink to={"/admin"}>
                      <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          sx={{ textDecoration: "none", color: "light.main" }}
                        >
                          Administrador
                        </Typography>
                        {/* MENU: LOGOUT  */}
                      </MenuItem>
                    </NavLink>
                  )}
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
export default Header;
