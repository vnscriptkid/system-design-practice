const debug = require("debug")(`chat-server:${process.env.PORT}`);

import * as redis from "redis";
import { userIdToSocket } from "../app";
import { pool } from "../db";
import { Message } from "../models/Message";

let subscriber: any = null;

export const createSubscriber = async () => {
  subscriber = redis.createClient({
    url: "redis://redis:6379",
  });

  try {
    await subscriber.connect();

    debug(`^^ redis subscriber connected`);
    return subscriber;
  } catch (err) {
    debug(`!! redis subscriber can't connected`);

    return null;
  }
};

export const subscribeToChannel = async (channelName: string) => {
  if (!subscriber) {
    await createSubscriber();
  }

  debug(`@@ edge-server subscribes to ${channelName} redis channel`);
  subscriber.subscribe(channelName, async (messageStr: string) => {
    debug(`@@ subscriber received: `, messageStr);
    const message = JSON.parse(messageStr) as Message;
    // channel_member

    // pcmembers: private channel members
    const { rows: membersInChannel, rowCount } = await pool.query({
      text: `SELECT user_id FROM pcmembers WHERE channel_id = $1`,
      values: [message.channelId],
    });

    debug(`@@ there are ${rowCount} members in channel #${channelName}`);

    membersInChannel.forEach(({ user_id }) => {
      // debug(`@@ checking if user #${user_id} is online`);
      const socket = userIdToSocket.get(String(user_id));

      if (socket) {
        // debug(
        //   `@@ found user #${user_id} connecting through socket #${socket.id}`
        // );
        socket.emit(channelName, message);
        debug(`^^ msg sent to ${channelName} over socket ${socket.id}`);
      }
    });
  });
};

export const unsubscribe = async (channelName: string) => {
  if (!subscriber) throw new Error(`!! subscriber is not initialized yet.`);

  await subscriber.unsubscribe(channelName);

  debug(`^^ unsub from ${channelName}`);
};
