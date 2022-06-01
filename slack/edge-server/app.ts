import { subscribeToChannel } from "./redis-client/subscriber";
// import { redisTopic } from "./constants";
import { Message } from "./models/Message";

// const uuidv4 = require("uuid").v4;
// const OktaJwtVerifier = require('@okta/jwt-verifier');
// const okta = require('@okta/okta-sdk-nodejs');

import { publish, unsubscribe } from "./redis-client";

const debug = require("debug")(`chat-server:${process.env.PORT}`);

// import { Socket } from "socket.io";

// const jwtVerifier = new OktaJwtVerifier({
//   clientId: '{yourClientID}',
//   issuer: 'https://{yourOktaDomain}/oauth2/default',
// });

// const oktaClient = new okta.Client({
//   orgUrl: 'https://{yourOktaDomain}',
//   token: '{yourOktaAPIToken}',
// });

async function authHandler(socket: any, next: any) {
  //   debug(`socket.handshake.query: `, socket.handshake.query);
  //   debug(`socket.handshake: `, socket.handshake);

  const { userId = "" } = socket.handshake.query || {};
  const { token = null } = socket.handshake.auth || {};

  if (userId && token) {
    // TODO: do something fun with token
    socketToUserId.set(socket, userId);
    // if (!(userId in userIdToSocket)) userIdToSocket.set(userId, []);
    userIdToSocket.set(userId, socket);
    // debug(`^^ `, { socketToUserId, userIdToSocket });
  }
  //   const { token = null } = socket.handshake.query || {};

  //   if (token) {
  //     try {
  //         const [authType, tokenValue] = token.trim().split(' ');

  //         if (authType !== 'Bearer') {
  //           throw new Error('Expected a Bearer token');
  //         }

  //         const {claims: {sub}} = await jwtVerifier.verifyAccessToken(tokenValue, 'api://default');
  //         const user = await oktaClient.getUser(sub);

  //       users.set(socket, {
  //         id: user.id,
  //         name: [user.profile.firstName, user.profile.lastName]
  //           .filter(Boolean)
  //           .join(" "),
  //       });
  //     } catch (error) {
  //       debug(error);
  //     }
  //   }

  next();
}

const messages = new Set();
// const users = new Map();

/*
 * key: socket object
 * value: userId are connecting through this socket
 */
export const socketToUserId = new Map<any, string>();

/*
 * key: userId
 * value: the socket over which this user is connecting to edge-server
 */
export const userIdToSocket = new Map<string, any>(); // TODO: one user can hold multiple sockets conn (tabs, devices)

/*
 * key: channelName
 * value: set of socket ids that are listening to that channel
 */
export const channelToSocketIds = new Map<string, Set<string>>();

class Connection {
  socket: any;
  io: any;

  constructor(io: any, socket: any) {
    this.socket = socket;
    this.io = io;

    // socket.on("getMessages", () => this.getMessages());
    socket.on("message", (value: any) => this.handleMessage(value));
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err: any) => this.errorHandler(err));

    socket.on("join-channel", async (channelName: string) => {
      debug(`@@ user joins channel ${channelName}`);

      await subscribeToChannel(channelName);

      if (!channelToSocketIds.has(channelName))
        channelToSocketIds.set(channelName, new Set());
      channelToSocketIds.get(channelName)?.add(this.socket.id);
    });

    socket.on(`quit-channel`, async (channelName: string) => {
      debug(`@@ user quits channel ${channelName}`);

      if (channelToSocketIds.get(channelName)?.has(this.socket.id)) {
        channelToSocketIds.get(channelName)?.delete(this.socket.id);

        if (channelToSocketIds.get(channelName)?.size === 0) {
          // unsubscribe from this redis channel
          debug(`@@ unsubscribing from redis channel ${channelName}`);
          await unsubscribe(channelName);
        }
      }
    });
  }
  errorHandler(err: any) {
    debug(`connect_error due to ${err.message}`);
  }

  sendMessage(message: any) {
    this.io.sockets.emit("message", message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value: any) {
    const message: Message = {
      senderId: socketToUserId.get(this.socket),
      ...(value || {}),
      time: Date.now(),
    };
    debug(`@@ handle msg`, message);

    if (!message.channelId) {
      debug(`!! channelId is missing in message`, message);
      return;
    }

    publish(`channel-${message.channelId}`, message);
  }

  disconnect() {
    const userId = socketToUserId.get(this.socket);

    if (userId) {
      debug(`@@ user #${userId} is disconnecting`);

      socketToUserId.delete(this.socket);
      userIdToSocket.delete(userId);

      debug(`^^ user #${userId} disconnected`);
    }
  }
}

export function chat(io: any) {
  io.use(authHandler);

  io.on("connection", (socket: any) => {
    new Connection(io, socket);
    debug(`@@ user ${socketToUserId.get(socket)} comming over `, socket.id);
  });
}
