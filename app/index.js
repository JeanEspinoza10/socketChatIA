import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { emitter }  from "./events/index.js";
import { logger } from "./config/logger.js";
import { Assistant } from './services/openaiService.js';
import {sequelize} from './config/db.js';
import { HOST, PORT_SERVER, DB_FORCE, ENVIROMENT } from "./config/server.js";
import { middlewareAuth } from "./middleware/auth.js";
import {Audio} from './models/audio.js';
import './listeners/message.js'
import './listeners/audio.js'
import audioRoutes from './route/audio.js';

const app = express();
const server = http.createServer(app);
sequelize.sync({
  force: DB_FORCE
}).then(() => {
  logger.info(`Base de datos se encuentra sinconizada`)
});

//Routes HTTPS // HTTP

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST"]
}));

app.use('/audio',audioRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
});

//  Socket.IO

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

if(!(ENVIROMENT==='development')){
  logger.info(`Middleware of auth in sockets`)
  io.use(middlewareAuth);
}

io.on("connection", async (socket) => {

  const idConnection= socket.id;
  const topicOfConversation = socket.handshake.auth.topic || 'Tus deberes que hiciste hoy en el trabajo';
  const assistant = new Assistant(topicOfConversation)
  logger.info(`User connected ${idConnection}`)
  socket.on('message', (question) => {
    emitter.emit('message:User', {
      question,
      assistant,
      socketId:socket.id
    })
  }); 
  emitter.on('response', (data)=>{
    logger.info(`User : From ${data.socketId} : To ${socket.id}`)
    if(data.socketId===socket.id){
      socket.emit('response', data)
    }
  });
  socket.on('disconnect', (reason) => {
    logger.info(`User disconnect: ${socket.id}`)
    logger.info(`Reason: ${reason}`);
  });
});

// Server
server.listen(PORT_SERVER, () => {
  logger.info(`Server on ${HOST}:${PORT_SERVER}`)
});