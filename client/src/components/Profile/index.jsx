import React from "react";
import { Box } from "@mui/system";
import ProfNavBar from "./ProfNavBar";
import BottomBar from "../BottomBar";
import ProfCard from "./ProfCard";

const MyProfile = () => {
  return (
    <Box>
      <ProfNavBar />
      <ProfCard />
      <BottomBar />
    </Box>
  );
};

export default MyProfile;
