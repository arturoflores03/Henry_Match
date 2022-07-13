import { Box } from "@mui/material";
import React from "react";
import AdminBottomBar from "../Admin/AdminBottomBar";
import ProfNavBar from "../Profile/ProfNavBar";
import DetailPrueba from "./DetailPrueba";

const InfoDetailUser = () => {
  return (
    <Box>
      <ProfNavBar />
      <DetailPrueba />
      <AdminBottomBar />
    </Box>
  );
};

export default InfoDetailUser;
