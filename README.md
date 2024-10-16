# Real-time Chat App

## Overview
This Real-time Chat App allows users to communicate with each other without sharing personal details like phone numbers. It is designed to provide a secure interaction portal, enabling students and mentors to connect and collaborate effectively. The app uses real-time WebSockets for instant communication and a Node.js server for backend functionalities.

### Key Features:
- **Real-time Messaging**: Users can exchange messages instantly through WebSocket connections.
- **User Privacy**: No personal information such as phone numbers or emails is required for interaction.
- **Mentor-Student Interaction Portal**: A dedicated portal for students and mentors to connect and discuss academic topics.
- **Secure Communication**: End-to-end encryption for secure messaging between users.


## Tech Stack:
- **Node.js**: Backend server
- **Express.js**: Framework for building the server-side REST API
- **WebSocket.io**: Real-time, bidirectional communication between users


## Features:
1. **User Registration and Authentication**:
   - Secure login system (can be extended to use OAuth or JWT).
   - Option for users to join anonymously or as registered members.

2. **Real-time Messaging**:
   - Users can exchange messages in real time through WebSocket connections.
   - Typing indicators and read receipts are included for an enhanced experience.

3. **Mentor-Student Interaction**:
   - A dedicated portal for students to connect with mentors and ask questions.
   - Both students and mentors are assigned roles that restrict or allow certain actions within the portal.
   - Messaging within this portal keeps personal details such as phone numbers hidden.

4. **Chat Rooms**:
   - Public or private chat rooms based on user roles.
   - Private mentoring sessions can be initiated by mentors for one-on-one interactions.

5. **Data Privacy**:
   - Users can communicate without sharing any personal details such as phone numbers or email addresses.
   - All communication data is securely stored and transmitted using encryption techniques.

## Installation:

1. Clone the repository:

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

## How It Works:

1. **WebSocket Communication**:
   The app uses **WebSocket.io** to handle real-time communication between users. When users send a message, it is instantly broadcasted to the connected chat participants through the WebSocket connection.

2. **Express.js Server**:
   The **Express.js** server handles user authentication, session management, and serves the chat interface. It also acts as the bridge for socket connections, passing messages between users in real time.

3. **Security**:
   - User credentials and messages are encrypted.
   - The app ensures that personal details, such as phone numbers, are never exposed during interactions.


## Future Improvements:

- Implement user presence (online/offline status).
- Add file-sharing capabilities within the chat interface.
- Extend chat rooms to support group video/audio calls.


## Contributing:
Contributions are welcome! Feel free to submit a pull request or open an issue if you find a bug or want to suggest a feature.

