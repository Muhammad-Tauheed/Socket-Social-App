import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  console.log(messages);

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const connected = () => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected", socket.id);
    });
  };

  const received = () => {
    socket.on("received-message", (data) => {
      console.log("data1",data);
      setMessages((messages) => [...messages, { text: data, sender: "other" }]);
    });

    socket.on("sent-message", (data) => {
      console.log("data2",data);
      setMessages((messages) => [...messages, { text: data, sender: "self" }]);
    });
  };
  console.log("messages",messages)
  const selfMessageStyle = {
    color: "white",
    backgroundColor: "#007bff", // Blue color as an example
    borderRadius: "10px", // Set border-radius for the message
    padding: "8px", // Add padding for better appearance
    display: "inline-block", // Set display to inline-block
    maxWidth: "50%", // Set the maximum width of the message container
    wordWrap: "break-word", // Allow long words to break and wrap onto the next line
    marginLeft: "290px", // Add left margin
  };

  const otherMessageStyle = {
    color: "black",
    backgroundColor: "#f0f0f0", // Light gray color as an example
    borderRadius: "10px", // Set border-radius for the message
    padding: "8px", // Add padding for better appearance
    display: "inline-block", // Set display to inline-block
    maxWidth: "50%", // Set the maximum width of the message container
    wordWrap: "break-word", // Allow long words to break and wrap onto the next line
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

  // const received = () => {
  //   socket.on("received-message", (data) => {
  //     console.log(data);
  //     setMessages((messages)=>[...messages,data]);
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessages((messages) => [...messages, { text: message, sender: "self" }]);
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    connected();
    received();

    return () => {
      socket.disconnect();
    };
  }, []);
  // console.log("messege",messege)
  return (
    <>
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

        <Stack>
          {messages.map((m, i) => (
            <Typography
              key={i}
              variant="h6"
              component="div"
              gutterBottom
              align={m.sender === "self" ? "right" : "left"} // Align messages based on the sender
              style={m.sender === "self" ? selfMessageStyle : otherMessageStyle} // Apply styles based on the sender
            >
              <div></div>
              {m.sender}<br/>
              {m.text}
            </Typography>
          ))}
        </Stack>

        
      </Container>
    </>
  );
};

export default App;
