//======PAQUETES Y LIBRERIAS
import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SideBar from "../SideBar";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
const Header = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const userDetail = useSelector((state) => state.userDetail);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
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
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      {isLoading && <Loader></Loader>}
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
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* MESSAGES */}
                <Tooltip title="Nuevos mensajes">
                  <NavLink to={"/chatroom"}>
                    <IconButton size="large" aria-label="show 4 new mails">
                      <Badge badgeContent={5} color="error">
                        <MailIcon sx={{ color: "primary.light" }} />
                      </Badge>
                    </IconButton>
                  </NavLink>
                  {/* MATCHS */}
                </Tooltip>
                <Tooltip title="Nuevos matches">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon sx={{ color: "primary.light" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
              {/* PROFILE */}
              <Box sx={{ display: { xs: "flex", md: 900 } }}>
                <Tooltip title={`${user.name.substring(0, 1)} perfil`}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={userDetail?.picture}
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
                  <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                    <NavLink to={"/profile"}>
                      <Typography
                        textAlign="center"
                        sx={{ textDecoration: "none", color: "light.main" }}
                      >
                        Mi Perfil
                      </Typography>
                    </NavLink>
                    {/* MENU: LOGOUT  */}
                  </MenuItem>
                  <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                    <NavLink to={"/admin"}>
                      <Typography
                        textAlign="center"
                        sx={{ textDecoration: "none", color: "light.main" }}
                      >
                        Administrador
                      </Typography>
                    </NavLink>
                    {/* MENU: LOGOUT  */}
                  </MenuItem>
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
          {renderMobileMenu}
        </Box>
      )}
    </>
  );
};
export default Header;
