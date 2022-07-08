import { Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { Box, styled } from "@mui/system";

export const MsgContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "450px 0px 40px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0px 20px 0px",
  overflow: "hidden",
}));

export const MsgText = styled(Typography)(({ theme }) => ({
  //fontFamily: ,
  [theme.breakpoints.up("md")]: {
    fontSize: "2.2rem",
  },

  fontSize: "1rem",
}));
