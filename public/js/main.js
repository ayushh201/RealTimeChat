const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", {username, room})

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

socket.on("message", (message) =>{
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
})

// Message Submission
chatForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    // Get Text Message
    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if (!msg) {
        return false;
    }

    // Emits Message
    socket.emit("chatMessage", msg);

    // Clear Input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add("message");
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room){
    roomName.innerText = room;
}

function outputUsers(users){
    userList.innerHTML='';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
      });
    }

document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
        }
});
