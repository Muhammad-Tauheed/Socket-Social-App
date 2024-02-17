const { Server } = require("socket.io");

function ChatSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User Connected", socket.id);

        socket.on("message", ({ room, message }) => {
            console.log(room, message);
            // Exclude sender from receiving their own message
        });

        socket.on("join-room", (room) => {
            socket.join(room);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
}

module.exports = ChatSocket;
