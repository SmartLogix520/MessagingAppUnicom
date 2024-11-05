// Démarrer express
const express = require("express");
var bodyParser = require("body-parser");
const multer = require('multer');
// const { Server } = require("socket.io");


const mongoose = require("mongoose");
// Used for session saving

const http = require("http");

// Accepter les variables d'environnement
const env = require("dotenv").config();

// Json Web Token
const jwt = require("jsonwebtoken");
const policy = require("./middleware/policy");

// Importer les rou tes
const GuestRouter = require("./routes/Guest");
const UserRouter = require("./routes/User");
const EmailRouter = require("./routes/Email");
// const GuestRouter = require("./routes/Guest");
const AuthRouter = require("./routes/Auth");
const MessageRouter = require("./routes/Message");
const UploadRouter = require("./routes/Upload");
const CallRouter = require("./routes/Call");
const RouterTrash = require("./routes/Trash");
const DraftsRouter = require("./routes/Drafts");
const FavorisRouter = require("./routes/favoris");
// const session = require("./middleware/session");
const { compareSync } = require("bcrypt");

var session = require('express-session');
const cors = require('cors')

// Créer une application express 
app = express(); 
const path = require("path");

app.use(policy);
// app.use(sess);
app.use("/avatars", express.static(path.join(__dirname, "avatars")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var jsonParser = bodyParser.json();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://unicom-19f.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });
// Configure the session store and options
const MongoStore = require('connect-mongo');
const ContactMessengerRouter = require("./routes/MessengerContact");

const store = MongoStore.create({ mongoUrl: process.env.DB_URI });

const sessionConfig = {
  secret: process.env.AUTH_TOKEN,
  resave: false,
  saveUninitialized: true,
  store,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true
  } 
};

// Configure the cors options
const corsOptions = {
  origin: 'http://localhost:3000', // The frontend origin
  optionsSuccessStatus: 200,
  credentials: true // Allow cookies
}; 

// Use the express-session and cors middlewares
app.use(session(sessionConfig));
app.use(cors(corsOptions));


var jsonParser = bodyParser.json();
app.use(express.json());




/* JAWT code, json web token are not meant for sessions
simple cookie sessions are better */ 
/*
function auth(req, res, next) { 
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];
  if (authToken == null) return res.sendStatus(401);
  jwt.verify(authToken, process.env.AUTH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user;
    next();  
  });
}
*/

/* Is user logged in */
const isAuthenticated = async (req, res, next) => {
  const { user } = req.session
  if(!user)
    res.status(401).json({ message: "Unauthorized"})
  else
   next() 
}
 
const db = (module.exports = () => {
  try {
    // Connexion à MongoDB en utilisant Mongoose et la variable d'environnemennt DB_URI
    // Voir le fichier .env dans la racine du dossier "server"
    const uri = process.env.DB_URI;

    mongoose.connect(uri);
    console.log("Connexion établie avec success");
    // Route vers la gestion des utilisateurs
    app.use("/users", jsonParser, UserRouter);
    app.use("/guests", jsonParser, GuestRouter);
    // app.use("/users", jsonParser, UserRouter);
    // Route pour la gestion des Emails
    app.use("/emails", jsonParser, EmailRouter);
    app.use('/trash',jsonParser, RouterTrash);
    app.use('/drafts',jsonParser, DraftsRouter);
    app.use('/favoris',jsonParser, FavorisRouter);
    app.use("/auth", jsonParser, AuthRouter);
    // Route vers la gestion de messagerie instantanée
    app.use("/messages", jsonParser, MessageRouter);
    // Router for contact messenger
    app.use("/messenger-contacts", jsonParser, ContactMessengerRouter);
    // Pour la mise en ligne des images 
    app.use("/upload", jsonParser, UploadRouter);
    // Exposer le dossier /public à travers /static
    app.use('/public', express.static('public'));
    app.use('/uploads', express.static('uploads'));

    app.use('/calls/', jsonParser, CallRouter)

  } catch (error) {
    console.log(error);
  }
});

// Se connecter à la base de donnée ATLAS
db(); 

// // Numéro de port su server
// /* A récupérer dans le fichier .env de la racine du dossier "server" */
// const port_number = process.env.PORT_NUMBER;
// app.listen(port_number, () => { 
//   console.log(`Le server est démarré au port : ${port_number} `);
// }); 

// Numéro de port su server
/* A récupérer dans le fichier .env de la racine du dossier "server" */
const port_number = process.env.PORT_NUMBER;
app.listen(port_number, () => {
  console.log(`Le server est démarré au port : ${port_number} `);
});

// -------------- HANDLE AUDIO CALL SOCKET EVENTS ----------------- //
// // Gestion des connexions Socket.IO
// io.on("connection", (socket) => {
//   console.log("Nouvelle connexion : ", socket.id);

//   // handle start_audio_call event
//   socket.on("start_audio_call", async (data) => {
//     // Extraction des données de l'événement
//     const { from, to, roomID } = data;

//     // Recherche des informations sur l'utilisateur initiateur et le destinataire de l'appel
//     const to_user = await User.findById(to);
//     const from_user = await User.findById(from);

//     console.log("to_user", to_user);

//     // Envoi de la notification au destinataire de l'appel
//     io.to(to_user?.socket_id).emit("audio_call_notification", {
//       from: from_user,
//       roomID,
//       streamID: from,
//       userID: to,
//       userName: to,
//     });
//   });

//   // handle audio_call_not_picked
//   socket.on("audio_call_not_picked", async (data) => {
//     console.log(data);
//     // Recherche et mise à jour de l'enregistrement d'appel
//     const { to, from } = data;

//     const to_user = await User.findById(to);

//     await AudioCall.findOneAndUpdate(
//       {
//         participants: { $size: 2, $all: [to, from] },
//       },
//       { verdict: "Missed", status: "Ended", endedAt: Date.now() }
//     );

//     // TODO => émettre l'événement "audio_call_missed" au destinataire de l'appel
//     io.to(to_user?.socket_id).emit("audio_call_missed", {
//       from,
//       to,
//     });
//   });

//   // handle audio_call_accepted
//   socket.on("audio_call_accepted", async (data) => {
//     const { to, from } = data;

//     const from_user = await User.findById(from);

//     // Recherche et mise à jour de l'enregistrement d'appel
//     await AudioCall.findOneAndUpdate(
//       {
//         participants: { $size: 2, $all: [to, from] },
//       },
//       { verdict: "Accepted" }
//     );

//     // TODO => émettre l'événement "audio_call_accepted" à l'expéditeur de l'appel
//     io.to(from_user?.socket_id).emit("audio_call_accepted", {
//       from,
//       to,
//     });
//   });

//   // handle audio_call_denied
//   socket.on("audio_call_denied", async (data) => {
//     // Recherche et mise à jour de l'enregistrement d'appel
//     const { to, from } = data;

//     await AudioCall.findOneAndUpdate(
//       {
//         participants: { $size: 2, $all: [to, from] },
//       },
//       { verdict: "Denied", status: "Ended", endedAt: Date.now() }
//     );

//     const from_user = await User.findById(from);
//     // TODO => émettre l'événement "audio_call_denied" à l'expéditeur de l'appel

//     io.to(from_user?.socket_id).emit("audio_call_denied", {
//       from,
//       to,
//     });
//   });

//   // handle user_is_busy_audio_call
//   socket.on("user_is_busy_audio_call", async (data) => {
//     const { to, from } = data;
//     // Recherche et mise à jour de l'enregistrement d'appel
//     await AudioCall.findOneAndUpdate(
//       {
//         participants: { $size: 2, $all: [to, from] },
//       },
//       { verdict: "Busy", status: "Ended", endedAt: Date.now() }
//     );

//     const from_user = await User.findById(from);
//     // TODO => émettre l'événement "on_another_audio_call" à l'expéditeur de l'appel
//     io.to(from_user?.socket_id).emit("on_another_audio_call", {
//       from,
//       to,
//     });
//   });
// });


 