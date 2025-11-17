
# Chatterly

Real-Time Chat Application 💬⚡


## 🚀 About the Project
 
Chatterly is a modern real-time chat application built using:
 
* React + Vite (Frontend)

* Redux Toolkit for state management

* Express.js + MongoDB (Backend)

* Socket.io for real-time communication

* #JWT Auth + Cookies for secure authentication

The app allows users to chat instantly, see online users, update their profile, and experience smooth real-time messaging.


## ✨ Features

### 🔐 Authentication System
* User Signup / Login

* Secure JWT + HttpOnly Cookies

* Auto-auth on refresh
### 💬 Real-Time Chat
* Instant messaging using Socket.io

* Online users indicator

* Auto-connect & auto-disconnect sockets
### 👤 User Profile
* Update profile info

* Upload profile image

* Live socket reconnection after profile update
### ⚡ Modern UI
* Fast React + Vite frontend

* Toast notifications

* Responsive design

## 🛠️ Tech Stack

**Client:** React, Redux Toolkit, Vite, Axios, Socket.io, TailwindCSS.

**Server:** Node.js, Express.js, MongoDB + Mongoose, Cloudinary(for image), Socket.io (for server).

## 📦 Folder Structure
```
Chatterly/
│
├── assets/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── store/
│       ├── pages/
│       ├── lib/
│       │   ├── axios.js
│       │   └── socket.js
│       └── App.jsx
│
└── server/
    ├── controllers/
    ├── routes/
    ├── models/
    ├── config/
    ├── socket.js
    └── app.js


```

## ⚙️Environment Variables

To run this project, you will need to add the following environment variables to your .env file

* `MONGO_URI = mongodb://127.0.0.1:27017`

* `PORT = 4000`

* `CLOUDINARY_CLOUD_NAME = davzth3r6`

* `CLOUDINARY_API_KEY = 836832181724261`

* `CLOUDINARY_API_SECRET = kvnBsR8kYEjrI55asSBaAOPkoRw`

* `JWT_SECRET_KEY = mynameisdanishmanyotra`

* `JWT_EXPIRE = 7d`

* `COOKIE_EXPIRE = 7`

* `NODE_ENV = development`

* `FRONTEND_URL=http://localhost:5173`




