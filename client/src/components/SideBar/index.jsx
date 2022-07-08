import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Chat from "./Chat";
import EditIcon from "@mui/icons-material/Edit";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Chip, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MyNetwork from "../Chat/MyNetwork";
import { useSelector } from "react-redux";

export default function SideBar() {
  const [state, setState] = React.useState({
    left: false,
  });
  const [nav, setNav] = React.useState({
    left: true,
  });

  const userDetail = useSelector((state) => state.userDetail);
  const users = useSelector((state) => state.users);

  const handleNav = () => {
    setNav(nav);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {[""].map((text, index) => (
          <ListItem key={index}>
            <ListItemButton>
              <NavLink to="/profile">
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <Box
                      sx={{
                        transform: "translate(30%)",
                      }}>
                      <Tooltip title="Mi Perfil">
                        <IconButton>
                          <Avatar
                            src={user.picture}
                            alt={user.name}
                            sx={{ width: 56, height: 56 }}></Avatar>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar Perfil">
                        <IconButton>
                          <EditIcon color="light" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <NavLink to="/desktop"></NavLink>
                  )}
                </ListItemIcon>
              </NavLink>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider
        sx={{
          "&::before, &::after": {
            borderColor: "light.main",
          },
        }}>
        {" "}
        <NavLink to="/matches">
          <Chip
            label="MATCHES"
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
            }}
          />
        </NavLink>
        <NavLink to="/chatroom">
          <Chip
            label="CHAT"
            sx={{
              color: "light.main",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
            }}
          />
        </NavLink>
      </Divider>
      <Chat />
      {/* <MyNetwork usersDetail={userDetail} users={users} /> */}
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon color="primary" />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
