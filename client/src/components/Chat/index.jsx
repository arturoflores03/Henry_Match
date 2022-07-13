import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminBottomBar from "../Admin/AdminBottomBar";
import Header from "../Header/Header";
import ChatNavBar from "./ChatNavBar";
import MyNetwork from "./MyNetwork";
import PerfilChat from "./PerfilChat";
import ReviewCarouselHM from "../../components/Reviews/ReviewCarouselHM";
import Invitation2 from "../../components/Reviews/Invitation2";

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
      <Box
        sx={{
          mt: 10,
          maxWidth: 600,
          width: { md: "100%" },
          paddingBottom: 10,
          marginTop: -10,
        }}
      >
        <ReviewCarouselHM users={users} />
        <Invitation2 userDetail={userDetail} />{" "}
      </Box>
      <AdminBottomBar />
    </Box>
  );
};

export default Chat;
