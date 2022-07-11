import * as React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { Fade } from "@mui/material";

const images = [
  {
    url: "https://st3.depositphotos.com/10932024/17870/i/450/depositphotos_178706266-stock-photo-vip-is-written-in-abstract.jpg",
    title: "SUSCRIBIRSE",
    width: "100%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.7,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBases() {
  return (
    <NavLink to="/subscription">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          minWidth: 300,
          width: "100%",
        }}>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}>
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Fade in={true} timeout={2200}>
                <Typography
                  component="span"
                  variant="h4"
                  color="inherit"
                  sx={{
                    position: "relative",
                    top: 40,
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    letterSpacing: 2,
                    textShadow: "#474747 3px 5px 2px",
                    "&:hover": {
                      textShadow:
                        "#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #ffff00 0px 0px 20px, #ffff00 0px 0px 30px, #ffff00 0px 0px 40px, #ffff00 0px 0px 50px, #ffff00 0px 0px 75px",
                    },
                  }}>
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Fade>
            </Image>
          </ImageButton>
        ))}
      </Box>
    </NavLink>
  );
}
