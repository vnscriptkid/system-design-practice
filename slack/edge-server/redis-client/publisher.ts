import * as redis from "redis";
const debug = require("debug")(`chat-server:${process.env.PORT}`);

let publisher: any = null;

export const createPublisher = async () => {
  publisher = redis.createClient({
    url: "redis://redis:6379",
  });

  try {
    await publisher.connect();

    debug(`^^ redis publisher connected`);
    return publisher;
  } catch (err) {
    debug(`!! redis publisher can't connected`);
    return null;
  }
};

export const publish = async (topic: string, message: any) => {
  if (!publisher) {
    await createPublisher();
  }

  try {
    const msgStr = JSON.stringify(message);
    await publisher.publish(topic, msgStr);

    debug(`^^ published msg to ${topic}`, msgStr);
  } catch (err) {
    debug(`!! failed to publish to ${topic}`, err);
  }
};
