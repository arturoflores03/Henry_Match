import React from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "./../../Redux/actions/index";
import { Box, Divider, Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export default function AdminUsers() {
  const db = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Box sx={{ marginTop: 10 }}>
      {db.map((user) => (
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ display: "inline-flex" }}>
            <Typography variant="h5">{user.name}</Typography>
          </Box>
          <Box
            sx={{
              //   display: "inline",
              textAlign: "end",
            }}
          >
            <GreenSwitch {...label} />
          </Box>
          <Divider sx={{ borderColor: "white" }} />
        </Box>
      ))}
    </Box>
  );
}
