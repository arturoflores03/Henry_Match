import React, { Component } from "react";
import { dummyUsers } from "./Users";
import Talk from "talkjs";
import { connect } from "react-redux";
import "./index.css";

class MyNetwork extends Component {
  constructor(props) {
    super(props);

    let currentUser;

    const currentTalkjsUser = localStorage.getItem("currentTalkjsUser");
    

    if (currentTalkjsUser) {
      currentUser = JSON.parse(currentTalkjsUser);
    }
    this.state = {
      currentUser,
    };
  }

  handleClick(userId) {
    const { users } = this.props;
    const { userMatches } = this.props;
    /* Retrieve the two users that will participate in the conversation */
    const { currentUser } = this.state;

    const user = userMatches.find((user) => user._id === userId);

    const userFinal = { ...user, id: user.nickname };
    // console.log(userFinal, "userFinal");

    /* Session initialization code */
    Talk.ready
      .then(() => {
        /* Create the two users that will participate in the conversation */
        const me = new Talk.User(currentUser);
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
      })
      .catch((e) => console.error(e));
    
//############################ NOTIFICATION FUNCTION START ########################
      window.talkSession.unreads.on("change", function (conversationIds) {
        var amountOfUnreads = conversationIds.length;
      
        // update the text and hide the badge if there are
        // no unreads.
        $("#notifier-badge")
          .text(amountOfUnreads)
          .toggle(amountOfUnreads > 0);
      
        // update the tab title so users can easily see that they have
        // messages waiting
        if (amountOfUnreads > 0) {
          document.title = "(" + amountOfUnreads + ") MySite";
        } else {
          document.title = "MySite";
        }
      });
//#################################### END ######################################
}

  render() {
    const { currentUser } = this.state;
    const { users } = this.props;
    const { userMatches } = this.props;

    return (
      <div className="users">
        <div className="current-user-container">
          {currentUser && (
            <div>
              <picture className="current-user-picture">
                <img alt={currentUser.name} src={currentUser.photoUrl} />
              </picture>
              <div className="current-user-info">
                <h3>{currentUser.name}</h3>
                <p>{currentUser.description}</p>
              </div>
            </div>
          )}
        </div>

        <div className="users-container">
          <ul>
            {userMatches.map((user) => (
              <li key={user._id} className="user">
                <picture className="user-picture">
                  <img src={user.image} alt={`${user.name}`} />
                </picture>
                <div className="user-info-container">
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    {/* <p>{user.info}</p> */}
                  </div>
                  <div className="user-action">
                    <button onClick={() => this.handleClick(user._id)}>
                      Message
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="chatbox-container" ref={(c) => (this.container = c)}>
            <div id="talkjs-container" style={{ height: "600px" }}>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyNetwork;
