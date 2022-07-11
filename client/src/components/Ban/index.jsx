import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import MyNetwork from "../Chat/MyNetwork";
import BanBottomBar from "./BanBottomBar";
import BanChat from "./BanChat";
import BanNavBar from "./BanNavBar";

const Ban = ({ userDetail, users, allAdmins }) => {
  return (
    <Box>
      <BanNavBar />
      <Box paddingTop={10} textAlign="center">
        <Box>
          <Typography variant="h1">Tu cuenta esta inactiva</Typography>
        </Box>
        <Typography variant="h4">
          Si piensas que fue un error, puedes contactarnos a:
        </Typography>
        <NavLink to={"/"}>
          <Typography variant="h4">admin@henrymatch.com</Typography>
        </NavLink>
        <Box>
          <Typography paddingTop={10} variant="h3">
            O puedes escribirle a algun administrador
          </Typography>
          <BanChat
            userDetail={userDetail}
            users={users}
            allAdmins={allAdmins}
          />
        </Box>
      </Box>
      <BanBottomBar />
    </Box>
  );
};

export default Ban;
