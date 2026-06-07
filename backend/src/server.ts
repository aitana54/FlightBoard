// Punto de entrada de la aplicación.
// Inicia el servidor y escucha las peticiones entrantes.

import { app } from './app.js';
import { PORT } from './config/config.js';
import logger from './config/logger.js';
import { Server } from "socket.io";

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`
    : `http://localhost:${PORT}`;

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at ${BASE_URL}`);
});

const httpServer = app.listen(PORT);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
