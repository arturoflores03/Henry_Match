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

export default function AdminSideBar() {
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "light.main",
            },
          }}>
          <NavLink to="/chatroom">
            <Chip
              label="ADMIN"
              sx={{
                color: "light.main",
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "none",
              }}
            />
          </NavLink>
        </Divider>
        {["Usuarios", "Inbox"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <PeopleIcon sx={{ color: "white" }} />
                ) : (
                  <InboxIcon sx={{ color: "white" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}{" "}
        <ListItem key={"Supscripciones"} disablePadding>
          <Link
            sx={{ color: "white" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://dashboard.stripe.com/test/payments"
            underline="none">
            <ListItemButton>
              <ListItemIcon>
                <MonetizationOnIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Pagos supscripciones"} />
            </ListItemButton>{" "}
          </Link>
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
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
