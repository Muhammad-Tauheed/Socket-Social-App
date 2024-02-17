import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { Stack, Typography } from "@mui/material";
import axios from "axios";

const SmsScreen = () => {
  const [messages, setMessages] = useState([]);
  const [socketID, setSocketId] = useState("");

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const connected = () => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected", socket.id);
    });
  };

  const received = () => {
    socket.on("received-message", (data) => {
      setMessages((messages) => [...messages, { text: data, sender: "other" }]);
    });

    socket.on("sent-message", (data) => {
      setMessages((messages) => [...messages, { text: data, sender: "self" }]);
    });
  };

  const selfMessageStyle = {
    color: "white",
    backgroundColor: "#007bff",
    borderRadius: "10px",
    padding: "8px",
    display: "inline-block",
    maxWidth: "50%",
    wordWrap: "break-word",
    marginLeft: "290px",
  };

  const otherMessageStyle = {
    color: "black",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    padding: "8px",
    display: "inline-block",
    maxWidth: "50%",
    wordWrap: "break-word",
  };

  //Get Data
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/sms");
      setMessages(response.data.sms);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    connected();
    received();
    fetchMessages();

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Stack>
        {messages.map((m, i) => {
          return (
            <Typography
              key={i}
              variant="h6"
              component="div"
              gutterBottom
              align={m.sender === "self" ? "right" : "left"}
              style={m.sender === "self" ? selfMessageStyle : otherMessageStyle}
            >
              {m.sender}
              {m.message}
            </Typography>
          );
        })}
      </Stack>
    </>
  );
};

export default SmsScreen;
