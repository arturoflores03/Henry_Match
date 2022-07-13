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

import EditIcon from "@mui/icons-material/Edit";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Chip, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";

export default function ChatSideBar({ setRender }) {
  const [state, setState] = React.useState({
    left: false,
  });
  const [nav, setNav] = React.useState({
    left: true,
  });

  const handleContactos = () => {
    setRender("contactos");
  };
  const handleInbox = () => {
    setRender("inbox");
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "light.main",
            },
          }}
        >
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

        <ListItem>
          <ListItemButton onClick={handleContactos}>
            <ListItemIcon>
              <ListItemIcon>
                <IconButton onClick={handleContactos}>
                  <PeopleIcon sx={{ color: "white" }} />
                </IconButton>
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Contactos" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={handleInbox}>
            <ListItemIcon>
              <ListItemIcon>
                <IconButton onClick={handleInbox}>
                  <InboxIcon sx={{ color: "white" }} />
                </IconButton>
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
      </List>
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
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
