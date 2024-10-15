const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'JaypeeChat Bot';


io.on("connection", socket => {
    socket.on("joinRoom", ({ username, room })=> {
        const user = userJoin(socket.id, username, room);
        
        socket.join(user.room); 

        // New User Greetings
        socket.emit("message", formatMessage(botName,'Welcome to JaypeeChat'));

        // Broadcasting to all uers when a new user connects
        socket.broadcast.to(user.room).emit("message", formatMessage(botName,`${user.username} has joined the chat`));
    
        // Send Users and room info
        io.to(user.room).emit("roomUsers", {
            room : user.room,
            users : getRoomUsers(user.room)
        })
    });

    // Extract or Listen Chat message
    socket.on("chatMessage", (msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

     // Runs when user disconnects
     socket.on("disconnect", ()=>{
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit("message", formatMessage(botName,`${user.username} has left the chat`));
            
            // Send Users and room info
            io.to(user.room).emit("roomUsers", {
                room : user.room,
                users : getRoomUsers(user.room),
            })};
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
