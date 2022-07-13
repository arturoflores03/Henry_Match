//======PAQUETES Y LIBRERIAS
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
//======IMPORTACIONES DE COMPONENTES
import Chat from "../../components/Chat";
import Ban from "../../components/Ban";
// import Landing from "../../components/LandingPage";
import ReviewCarouselHM from "../../components/Reviews/ReviewCarouselHM";
import Invitation2 from "../../components/Reviews/Invitation2";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import {
  clearUserDetailMatches,
  filterUserByMatches,
  getUserByNick,
  getUsers,
} from "../../Redux/actions";
//======ESTILO E IMAGENES
import { Box, Typography } from "@mui/material";
import ChatReport from "../../components/ChatReport/ChatReport";
import AdminBottomBar from "../../components/Admin/AdminBottomBar";
import ProfNavBar from "../../components/Profile/ProfNavBar";

const ChatRoomReport = () => {
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
    if (user) {
      dispatch(getUserByNick(user.sub)).then(() =>
        dispatch(filterUserByMatches(userDetail?._id))
      );
    }
    return () => {
      dispatch(clearUserDetailMatches());
    };
  }, [user, userDetail?._id]);

  return (
    <Box>
      {isAuthenticated && (
        <>
          <ProfNavBar />
          <Box sx={{ paddingTop: 10 }}>
            <ChatReport
              userDetail={userDetail}
              users={users}
              allAdmins={allAdmins}
            />
          </Box>
          <AdminBottomBar />
        </>
      )}
    </Box>
  );
};

export default ChatRoomReport;
