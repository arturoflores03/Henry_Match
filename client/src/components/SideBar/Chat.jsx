import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  filterUserByMatches,
  getUserByNick,
  getUsers,
} from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

export default function Chat() {
  const dispatch = useDispatch();
  const userMatches = useSelector((state) => state.userMatches);
  const userDetail = useSelector((state) => state.userDetail);
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {userMatches.map((user) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.image} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={user.interests.join(", ")}
              sx={{ color: "primary.contrastText" }}
            />
            <NavLink to="/chatroom">
              <IconButton color="primary" size="large">
                <SendIcon />
              </IconButton>
            </NavLink>
          </ListItem>

          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
