import express from "express";
import cors from "cors";
import { getVersion } from "./system";
import socketio from "socket.io";
import { eventDispatcher } from "./service-registry";
import { resolve } from "path";

const app = express();
app.use(cors());
app.use(express.static(resolve(process.cwd(), "public")));

// routes: begin --------------------------------

app.get("/", (req, res) => {
  res.sendFile(resolve(process.cwd(), "public", "index.html"));
});

app.get("/api/system/version", (req, res) => {
  res.send({
    version: getVersion(),
  });
});

// routes: end ----------------------------------

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log("dashy-backend is running...");
});

const io = socketio(server);
io.on("connection", (x) => {
  console.log("client connected: ", x.id);
});

eventDispatcher.registerChannel({
  send: (type, payload) => io.emit(type, payload),
});
