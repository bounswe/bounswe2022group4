import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useState, useEffect } from "react";
import { BackendApi } from "../../api";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { styled } from "@mui/material/styles";

import { IconButton, Card } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { CardActions } from "@material-ui/core";
import { Button, CardBody, CardHeader } from "reactstrap";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const MessageChat = () => {
  const [authToken, setAuthToken] = React.useState("");
  const [loggedUser, setLoggedUser] = React.useState("");
  useEffect(() => {
    setLoggedUser(localStorage["user"]);
  }, [localStorage["user"]]);
  useEffect(() => {
    setAuthToken(localStorage["authToken"]);
  }, [localStorage["authToken"]]);
  // if (!loggedInUser) {
  //   if (getCookie("loggedInUser")) {
  //     loggedInUser = getCookie("loggedInUser");
  //   }
  // }
  // if (!authenticatonToken) {
  //   if (getCookie("authenticationToken")) {
  //     authenticatonToken = getCookie("authenticationToken");
  //   }
  // }
  const [messages, setMessages] = useState([
    {
      sender: "hekayigit",
      receiver: "hekayigit",
      message: "benim adım ali",
      timestamp: "yesterday",
    },
    {
      sender: "hekayigit",
      receiver: "hekayigit",
      message: "benim adım belii",
      timestamp: "yesterday",
    },
    {
      sender: "hekayigit",
      receiver: "hekayigit",
      message: "benim adım celi",
      timestamp: "yesterday",
    },
    {
      sender: "hekayigit",
      receiver: "hekayigit",
      message: "benim adım kemii",
      timestamp: "yesterday",
    },
    {
      sender: "hekayigit",
      receiver: "hekayigit",
      message: "benim adım hemiii",
      timestamp: "yesterday",
    },
  ]);
  const [changeInMessages, setChangeInMessages] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    setSelectedUser(localStorage["user"]);
  }, [localStorage["user"]]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await BackendApi.fetchMessage(selectedUser, authToken);
      if (response.status >= 200 && response.status < 300) {
        setMessages(response.data);
        console.log(response.data);
      }
    };
    getMessages(loggedUser, authToken);
  }, [changeInMessages, selectedUser]);

  const onSend = async (value) => {
    const response = await BackendApi.sendMessage(
      selectedUser,
      value,
      authToken
    );
    if (!(response.status >= 200 && response.status < 300)) {
      alert(
        "Karşıdaki kullanıcı bulunamadı veya serverda bir hata meydana geldi"
      );
    } else {
      setChangeInMessages(!changeInMessages);
      setChangeInUserList(!changeInUserList);
    }
  };
  const [ChatUserList, setUserListInChat] = useState({
    user_list: [loggedUser],
  });
  const [changeInUserList, setChangeInUserList] = useState(false);
  useEffect(() => {
    const getUserList = async () => {
      const response = await BackendApi.fetchUsersForChat(authToken);
      if (response.status >= 200 && response.status < 300) {
        setUserListInChat(response.data);
        console.log(response.data);
      }
    };
    getUserList(authToken);
  }, [changeInUserList]);

  const messagesList = (messages) => {
    return (
      <MessageList style={{ height: "180px", overflow: "auto" }}>
        {messages.map((message) => (
          <Message
            model={{
              direction:
                message.sender === loggedUser ? "outgoing" : "incoming",
              message: message.message,
              sentTime: message.timestamp,
              sender: message.sender,
            }}
          />
        ))}
      </MessageList>
    );
  };
  //this part is for automatic refreshing for messages
  setTimeout(() => {
    if (loggedUser && authToken && expanded) {
      setChangeInMessages(!changeInMessages);
      setChangeInUserList(!changeInUserList);
    }
  }, 1000);
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

  return (
    <div>
      {!expanded && <div style={{ width: "320px", height: "280px" }}></div>}
      <Card>
        {/* <CardHeader></CardHeader> */}
        <CardBody></CardBody>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            border: "2px",
          }}
        >
          {loggedUser && expanded && (
            <div
              style={{
                overflowX: "scroll",
                height: "48px",
                backgroundImage:
                  "linear-gradient(-225deg, #e3fdf5 50%, #ffe6fa 50%)",
              }}
            >
              {ChatUserList &&
                ChatUserList.user_list.map((ChatUser) => (
                  <Button
                    value={ChatUser}
                    style={{
                      marginBottom: "4px",
                      marginLeft: "12px",
                      marginTop: "4px",
                      width: "90px",
                      backgroundColor: "#6ea9d7",
                      justifyContent: "normal",
                    }}
                    variant="outlined"
                    onClick={() => setSelectedUser(ChatUser)}
                  >
                    {ChatUser}
                  </Button>
                ))}
            </div>
          )}
          {expanded && loggedUser && (
            <div
              style={{
                position: "relative",
                width: "320px",
              }}
            >
              <MainContainer>
                <ChatContainer>
                  {messages && messagesList(messages)}
                  <MessageInput
                    fancyScroll={true}
                    placeholder="Type message here"
                    onSend={(textContext) => {
                      onSend(textContext);
                    }}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
          )}
        </div>
        <CardActions
          style={{
            height: "40px",
            backgroundImage:
              "linear-gradient(-225deg, #e3fdf5 50%, #ffe6fa 50%)",
          }}
        >
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              position: "absolute",
            }}
          >
            CHAT
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    </div>
  );
};
