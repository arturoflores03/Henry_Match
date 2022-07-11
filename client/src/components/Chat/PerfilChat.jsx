import React, { Component, Fragment } from "react";
import Talk from "talkjs";
import "./index.css";

class PerfilChat extends Component {
  constructor(props) {
    super(props);

    this.inbox = undefined;
    let currentUser;
    const currentTalkjsUser = localStorage.getItem("currentTalkjsUser");
    if (currentTalkjsUser) {
      currentUser = JSON.parse(currentTalkjsUser);
    }

    this.state = {
      currentUser,
    };
  }

  componentWillMount() {
    Talk.ready
      .then(() => {
        const me = new Talk.User(this.state.currentUser);

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tUOOCMxO",
            me: me,
          });
        }

        this.inbox = window.talkSession.createInbox();
        this.inbox.mount(this.container);

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
    return (
      <Fragment>
        <div
          style={{ height: "600px" }}
          className="inbox-container"
          ref={(c) => (this.container = c)}
        >
          Loading...
        </div>
      </Fragment>
    );
  }
}

export default PerfilChat;
