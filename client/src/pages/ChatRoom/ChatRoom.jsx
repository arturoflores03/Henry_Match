//======PAQUETES Y LIBRERIAS
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
//======IMPORTACIONES DE COMPONENTES
import Chat from "../../components/Chat";
import Ban from "../../components/Ban";
import Landing from "../../components/LandingPage";
import ReviewCarouselHM from "../../components/Reviews/ReviewCarouselHM";
import Invitation2 from "../../components/Reviews/Invitation2";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import {
  filterUserByMatches,
  getUserByNick,
  getUsers,
} from "../../Redux/actions";
//======ESTILO E IMAGENES
import { Box, Typography } from "@mui/material";

const ChatRoom = () => {
  const userDetail = useSelector((state) => state.userDetail);
  const userMatches = useSelector((state) => state.userMatches);
  const users = useSelector((state) => state.users);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const iAmActive = userDetail?.active;

  let allAdmins = [];

  let filterAdmins = users.filter((user) => {
    if (user.isAdmin === true) {
      allAdmins.push(user);
    }
  });

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getUsers());
    if (user) {
      dispatch(getUserByNick(user.sub)).then(() =>
        dispatch(filterUserByMatches(userDetail?._id))
      );
    }
  }, [user, userDetail?._id]);

  return (
    <Box>
      {isAuthenticated && iAmActive === false ? (
        <>
          <Ban userDetail={userDetail} users={users} allAdmins={allAdmins} />
        </>
      ) : isAuthenticated && iAmActive === true ? (
        <>
          <Box
            sx={{
              display: { md: "flex" },
            }}>
            <Chat
              userDetail={userDetail}
              users={users}
              userMatches={userMatches}
            />
            <Box sx={{ mt: 10, maxWidth: 600, width: { md: "100%" } }}>
              <ReviewCarouselHM users={users} />
              <Invitation2 userDetail={userDetail} />{" "}
            </Box>
          </Box>
        </>
      ) : (
        <Landing />
      )}
    </Box>
  );
};

export default ChatRoom;
