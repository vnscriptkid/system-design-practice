import { chat } from "./app";
import { connectDb } from "./db";
import "./redis-client";
import { createPublisher, createSubscriber } from "./redis-client";
const socketio = require("socket.io");

const app = require("express")();
const debug = require("debug")(`chat-server:${process.env.PORT}`);
const http = require("http");

main();

async function main() {
  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(process.env.PORT || "8082");
  app.set("port", port);

  try {
    await connectDb();

    await createPublisher();
    await createSubscriber();

    debug(`^^ db connected`);
  } catch (err) {
    debug(`!! err connecting db`, err);
  }

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

  var io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  chat(io);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("^^ edge-server is listening on " + bind);
  }

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val: any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
