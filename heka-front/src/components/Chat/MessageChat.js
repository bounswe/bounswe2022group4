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

export const MessageChat = ({ loggedInUser, authenticatonToken }) => {
  if (!loggedInUser) {
    if (getCookie("loggedInUser")) {
      loggedInUser = getCookie("loggedInUser");
    }
  }
  if (!authenticatonToken) {
    if (getCookie("authenticationToken")) {
      authenticatonToken = getCookie("authenticationToken");
    }
  }
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
  const [selectedUser, setSelectedUser] = useState(loggedInUser);

  useEffect(() => {
    const getMessages = async () => {
      const response = await BackendApi.fetchMessage(
        selectedUser,
        authenticatonToken
      );
      if (response.status >= 200 && response.status < 300) {
        setMessages(response.data);
        console.log(response.data);
      }
    };
    getMessages(loggedInUser, authenticatonToken);
  }, [changeInMessages, selectedUser]);

  const onSend = async (value) => {
    const response = await BackendApi.sendMessage(
      selectedUser,
      value,
      authenticatonToken
    );
    if (!(response.status >= 200 && response.status < 300)) {
      alert(
        "Karşıdaki kullanıcı bulunamadı veya serverda bir hata meydana geldi"
      );
    } else {
      setChangeInMessages(!changeInMessages);
      setChangeInUserList(changeInUserList);
    }
  };
  const [ChatUserList, setUserListInChat] = useState({
    user_list: [loggedInUser],
  });
  const [changeInUserList, setChangeInUserList] = useState(false);
  useEffect(() => {
    const getUserList = async () => {
      const response = await BackendApi.fetchUsersForChat(authenticatonToken);
      if (response.status >= 200 && response.status < 300) {
        setUserListInChat(response.data);
        console.log(response.data);
      }
    };
    getUserList(authenticatonToken);
  }, [changeInUserList]);

  const messagesList = (messages) => {
    return (
      <MessageList style={{ height: "180px", overflow: "auto" }}>
        {messages.map((message) => (
          <Message
            model={{
              direction:
                message.sender === loggedInUser ? "outgoing" : "incoming",
              message: message.message,
              sentTime: message.timestamp,
              sender: message.sender,
            }}
          />
        ))}
      </MessageList>
    );
  };

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
    <Card>
      <CardHeader>
        {loggedInUser && (
          <div
            style={{
              justifyContent: "right",
              marginLeft: "4px",
              overflow: "hidden",
            }}
          >
            {ChatUserList &&
              ChatUserList.user_list.map((ChatUser) => (
                <Button
                  value={ChatUser}
                  variant="contained"
                  onClick={() => setSelectedUser(ChatUser)}
                >
                  {ChatUser}
                </Button>
              ))}
          </div>
        )}
      </CardHeader>
      <CardBody>
        <CardActions>
          {expanded && loggedInUser && (
            <div
              style={{
                position: "relative",
              }}
            >
              <MainContainer>
                <ChatContainer>
                  {messages && messagesList(messages)}
                  <MessageInput
                    placeholder="Type message here"
                    onSend={(textContext) => {
                      onSend(textContext);
                    }}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              position: "relative",
            }}
          >
            CHATBOT
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </CardBody>
    </Card>
  );
};
