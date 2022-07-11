import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminBottomBar from "../Admin/AdminBottomBar";
import Header from "../Header/Header";
import ChatNavBar from "./ChatNavBar";
import MyNetwork from "./MyNetwork";
import PerfilChat from "./PerfilChat";

const Chat = ({ userDetail, users, userMatches }) => {
  const [render, setRender] = useState("contactos");

  return (
    <Box>
      <ChatNavBar setRender={setRender} />
      {render === "contactos" && (
        <MyNetwork
          userDetail={userDetail}
          users={users}
          userMatches={userMatches}
        />
      )}
      {render === "inbox" && (
        <Box sx={{ paddingTop: 10 }}>
          <PerfilChat />
        </Box>
      )}

      <AdminBottomBar />
    </Box>
  );
};

export default Chat;
