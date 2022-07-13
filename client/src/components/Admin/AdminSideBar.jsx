import * as React from "react";
import Box from "@mui/material/Box";
import { Drawer, Link } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EditIcon from "@mui/icons-material/Edit";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Chip, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

export default function AdminSideBar({ setRender }) {
  const [state, setState] = React.useState({
    left: false,
  });
  const [nav, setNav] = React.useState({
    left: true,
  });

  const handleUsers = () => {
    setRender("users");
  };
  const handleInbox = () => {
    setRender("inbox");
  };
  const handleStatistics = () => {
    setRender("statistics");
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
          <Chip
            label="ADMIN"
            sx={{
              color: "light.main",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
            }}
          />
        </Divider>
        <ListItem>
          <ListItemButton onClick={handleUsers}>
            <ListItemIcon>
              <ListItemIcon>
                <IconButton onClick={handleUsers}>
                  <PeopleIcon sx={{ color: "white" }} />
                </IconButton>
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={handleStatistics}>
            <ListItemIcon>
              <ListItemIcon>
                <IconButton onClick={handleStatistics}>
                  <AutoGraphIcon sx={{ color: "white" }} />
                </IconButton>
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Estadisticas" />
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

        <Link
          sx={{ color: "white" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://dashboard.stripe.com/test/payments"
          underline="none"
          target="_blank"
        >
          <ListItem>
            <ListItemButton onClick={handleInbox}>
              <ListItemIcon>
                <ListItemIcon>
                  <IconButton onClick={handleInbox}>
                    <MonetizationOnIcon sx={{ color: "white" }} />
                  </IconButton>
                </ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Pagos" />
            </ListItemButton>
          </ListItem>
        </Link>
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
