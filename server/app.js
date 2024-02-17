const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/connectDB");
const http = require("http");
const ChatSocket = require("./Socket/ChatSocket");
const route=require("./routes/index")
require('dotenv').config();
const PORT=process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"))

connectDB();

ChatSocket(server); 

app.use("/api",route);

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});



