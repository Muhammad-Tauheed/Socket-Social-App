import  express  from "express";
import { Server } from "socket.io";
import {createServer} from "http"
import cors from 'cors';
const PORT=3000;
const app=express();
const server=createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
    }
});

app.use(cors({
    origin:"*",
    methods:["GET", "POST"],
    credentials:true,
})
);

app.get("/",(req,res)=>{
    res.send("Tauheed")
});


io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("message", ({ room, message }) => {
        console.log(room, message);
        // Exclude sender from receiving their own message
        socket.to(room).emit("received-message", message);
    });

    socket.on("join-room", (room) => {
        socket.join(room);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});



server.listen(PORT,()=>{
    console.log(`Surver is running on PORT ${PORT}`);

});
