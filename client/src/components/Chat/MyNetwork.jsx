import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Talk from "talkjs";
// import "./index.css";
import SendIcon from "@mui/icons-material/Send";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";

class MyNetwork extends Component {
  constructor(props) {
    super(props);

    var currentUser;

    this.state = {
      currentUser,
    };
  }
 
  handleClick(userId) {
    const { userDetail } = this.props;
    const { userMatches } = this.props;

    /* Retrieve the two users that will participate in the conversation */

    let currUser = { ...userDetail, id: userDetail.nickname };

    const user = userMatches.find((user) => user._id === userId);
    const userFinal = { ...user, id: user.nickname };

    /* Session initialization code */
    Talk.ready
      .then(() => {
        /* Create the two users that will participate in the conversation */
        const me = new Talk.User(currUser);
        const other = new Talk.User(userFinal);

        /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tUOOCMxO",
            me: me,
          });
        }

        /* Get a conversation ID or create one */
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation =
          window.talkSession.getOrCreateConversation(conversationId);

        /* Set participants of the conversations */
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        /* Create and mount chatbox in container */
        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(this.container);

        talkSession.unreads.onChange(function (conversationIds) {
          var unreadCount = `${conversationIds.length}`;
          document.getElementById("unread-message-count").innerHTML =
            unreadCount;
          console.log("Conversation ID's", conversationIds);
        });
      })
      .catch((e) => console.error(e));
  }

  render() {
    const { userDetail } = this.props;
    let currUser = { ...userDetail, id: userDetail?.nickname };
    const { userMatches } = this.props;

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            right: 0,
            left: 0,
            marginTop: 10,
          }}
        >
          {userMatches.map((user) => (
            <>
              <Card
                sx={{
                  width: 225,
                  marginBottom: 14,
                  borderColor: "none",
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="266"
                  style={{ backgroundImage: "url(" + user.image + ")" }}
                  alt=""
                  sx={{ borderColor: "#000" }}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ textAlign: "center" }}
                >
                  <CardActions
                    disableSpacing
                    justifyContent="center"
                    alignItems="center"
                    sx={{ bgcolor: "inherit" }}
                  >
                    <IconButton color="light" size="large">
                      <Link to={"/users/"+ user.nickname}>
                        <InfoIcon />
                      </Link>
                    </IconButton>
                    <Typography
                      sx={{
                        fontSize: 23,
                        fontWeight: 900,
                        // letterSpacing: 1,
                        fontFamily: "Proxima Nova",
                      }}
                    >
                      {user.name}{" "}
                    </Typography>
                    <IconButton
                      onClick={() => this.handleClick(user._id)}
                      color="primary"
                      size="large"
                    >
                      <SendIcon />
                    </IconButton>
                  </CardActions>
                </Box>
              </Card>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </Box>

        <div className="chatbox-container" ref={(c) => (this.container = c)}>
          <div id="talkjs-container" style={{ height: "600px" }}>
            <i></i>
          </div>
        </div>
      </Box>
    );
  }
}

export default MyNetwork;
