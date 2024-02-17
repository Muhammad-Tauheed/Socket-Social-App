import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import SmsScreen from "./SmsScreen";

const SocketIO = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

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

  const onChange1 = (e) => {
    setMessage(e.target.value);
  };
  const onChange2 = (e) => {
    setRoom(e.target.value);
  };
  const onChange3 = (e) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/sms", {
      message: message,
      room: room,
    });
    socket.emit("message", { message, room });
    setMessages((messages) => [...messages, { text: message, sender: "self" }]);
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
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
    <Container maxWidth="sm">
      <Typography variant="h6" component="div" gutterBottom>
        {socketID}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={onChange3}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          name="message"
          onChange={onChange1}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />

        <TextField
          value={room}
          onChange={onChange2}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
<SmsScreen/>
     
    </Container>
  );
};

export default SocketIO;
