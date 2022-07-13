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
import { Avatar, Chip, Tooltip, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MyNetwork from "../Chat/MyNetwork";
import { useDispatch, useSelector } from "react-redux";
import DisplayLikeReceived from "./LikeReceived";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ChatIcon from "@mui/icons-material/Chat";
import { renderSideBar } from "../../Redux/actions";
import { Invitation } from "../Reviews/Invitation";
import DiamondIcon from "@mui/icons-material/Diamond";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export default function SideBar({ setPremium }) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });
  const [nav, setNav] = React.useState({
    left: true,
  });

  const render = useSelector((state) => state.renderSideBar);
  const users = useSelector((state) => state.users);
  const userDetail = useSelector((state) => state.userDetail);

  const handleChat = () => {
    dispatch(renderSideBar("chat"));
    console.log(render);
  };
  const handleMatches = () => {
    dispatch(renderSideBar("matches"));
    console.log(render);
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
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[""].map((text, index) => (
          <>
            <ListItem key={text}>
              <NavLink to="/profile">
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <Box
                      sx={{
                        paddingLeft: 8,
                        paddingBottom: 2,
                      }}
                    >
                      <Tooltip title="Mi Perfil">
                        <IconButton>
                          <Avatar
                            src={userDetail?.image}
                            alt={user.name}
                            sx={{ width: 76, height: 76 }}
                          ></Avatar>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <NavLink to="/desktop"></NavLink>
                  )}
                </ListItemIcon>
              </NavLink>
              <ListItemText primary={text} />
            </ListItem>
            <Divider sx={{ bgcolor: "white" }} />
          </>
        ))}

        <Box
          sx={{
            paddingTop: 2,
            paddingLeft: 5,
            // transform: "translate(25%)",
          }}
        >

          <Box
            sx={{
              // paddingTop: 2,
              display: "inline-block",
              // transform: "translate(25%)",
            }}
          >
            <Tooltip placement="top" arrow title="Chatea con tus matches">
              <IconButton
                onClick={handleMatches}
                size="large"
                sx={{ color: "white" }}
              >
                <ChatIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              // paddingTop: 2,
              paddingLeft: "15px",
              display: "inline-block",
              // transform: "translate(25%)",
            }}
          >
            <Tooltip placement="top" arrow title="Ve quien te dio LIKE">
              <IconButton onClick={handleChat} size="large" color="info">
                <DiamondIcon
                  sx={{
                    color: "primary.main",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          
        
            <Box
              sx={{
                // paddingTop: 2,
                paddingLeft: "15px",
                display: "inline-block",
                // transform: "translate(25%)",
              }}
            >
              <Tooltip title="AYUDA">
                <NavLink to="/report">
                  <IconButton
                    sx={{ color: "white", paddingTop: "10px", size: "large" }}
                  >
                    <QuestionMarkIcon />
                  </IconButton>
                </NavLink>
              </Tooltip>
            </Box>
        </Box>
        
      </List>

      {render === "matches" ? (
        <>
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "light.main",
              },
            }}
          >
            {" "}
            <Chip
              label="CHAT"
              sx={{
                color: "light.main",
                fontWeight: 700,
                textDecoration: "none",
              }}
            />
          </Divider>
          <Chat />
        </>
      ) : (
        <>
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "light.main",
              },
            }}
          >
            {" "}
            <Chip
              label="LIKES RECIBIDOS"
              sx={{
                color: "light.main",
                fontWeight: 700,
                textDecoration: "none",
              }}
            />
          </Divider>
          <DisplayLikeReceived />
        </>
      )}

      {/* <MyNetwork usersDetail={userDetail} users={users} /> */}
      <Divider
        sx={{ bgcolor: "white", position: "relative", verticalAlign: "bottom" }}
      />

      <Box sx={{ paddingTop: "100%" }}>
        <Invitation />
      </Box>
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
