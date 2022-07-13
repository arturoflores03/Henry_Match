import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearUserDetailMatches, getUserByDetail } from "../../Redux/actions";
import { styled } from "@mui/material/styles";
import Invitation2 from "../../components/Reviews/Invitation2";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Button,
  Paper,
  Card,
  CardMedia,
  CardActions,
  Collapse,
  CardContent,
  Divider,
  CardActionArea,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InterestsIcon from "@mui/icons-material/Interests";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TransgenderIcon from "@mui/icons-material/Transgender";

const DetailPrueba = () => {
  const dispatch = useDispatch();
  const { nickname } = useParams();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  useEffect(() => {
    dispatch(getUserByDetail(nickname));
    return () => {
      dispatch(clearUserDetailMatches());
    };
  }, [dispatch]);

  const userDetail = useSelector((state) => state.userDetailMatches);
  return (
    <Box>
      {/* MENSAJITO SI EL USUARIO NO HA DEJADO SU COMENTARIO AUN */}
      <Box sx={{ paddingTop: 10 }}>
        <Invitation2 />
      </Box>
      <Box
        key={userDetail?._id}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 3,
          right: 0,
          left: 0,
          boxShadow: 3,
          border: 0,
        }}
      >
        <Card
          sx={{
            width: 375,
            marginBottom: 14,
            borderColor: "none",
            borderRadius: 3,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="566"
              style={{ backgroundImage: "url(" + userDetail?.image + ")" }}
              alt=""
              onClick
            />
          </CardActionArea>

          <CardActions disableSpacing sx={{ bgcolor: "inherit" }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                // letterSpacing: 1,
                fontFamily: "Proxima Nova",
              }}
            >
              {userDetail?.name}{" "}
              <Typography
                sx={{
                  fontWeight: 300,
                  display: "inline",
                  fontSize: 20,
                  letterSpacing: 2,
                  fontFamily: "Proxima Nova",
                }}
              >
                {userDetail?.age}
              </Typography>
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{ color: "white" }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{
              marginTop: -3,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  marginTop: 1,
                }}
              >
                <Typography textTransform="uppercase">
                  <PersonOutlineIcon /> {userDetail?.gender}
                </Typography>
              </Box>
              {!userDetail?.description ? (
                <div />
              ) : (
                <Typography sx={{ letterSpacing: 3, fontStyle: "oblique" }}>
                  {userDetail?.description}
                </Typography>
              )}
              <Divider color="#ffff00" />
              {!userDetail?.city ? (
                <div />
              ) : (
                <Typography>
                  <LocationOnIcon /> {userDetail?.city}
                </Typography>
              )}
              {userDetail?.genderInt?.length === 0 ? (
                <div />
              ) : (
                <Typography>
                  <TransgenderIcon /> {userDetail?.genderInt}
                </Typography>
              )}
              {!userDetail?.phone ? (
                <div />
              ) : (
                <Typography>
                  <LocalPhoneIcon /> {userDetail?.phone}
                </Typography>
              )}

              {userDetail?.henryLevel?.length === 0 ? (
                <div />
              ) : (
                <Typography
                  textTransform="uppercase"
                  sx={{
                    display: "inline",
                    letterSpacing: 2,
                    fontFamily: "Proxima Nova",
                  }}
                >
                  <AttachFileIcon /> {userDetail?.henryLevel}
                </Typography>
              )}

              <Divider color="#ffff00" />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  marginTop: 1,
                }}
              >
                {userDetail?.interests?.length === 0 ? (
                  <div />
                ) : (
                  <Typography>
                    <InterestsIcon />{" "}
                    {userDetail?.interests?.map((i) => {
                      return <div key={i}>{i}</div>;
                    })}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};

export default DetailPrueba;
