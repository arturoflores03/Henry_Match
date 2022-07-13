import React from "react";
import { Box } from "@mui/system";
import ProfNavBar from "./ProfNavBar";
import ProfCard from "./ProfCard";
import AdminBottomBar from "../Admin/AdminBottomBar";

const MyProfile = () => {
  return (
    <Box>
      <ProfNavBar />
      <ProfCard />
      <AdminBottomBar />
    </Box>
  );
};

export default MyProfile;
