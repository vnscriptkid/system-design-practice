import { Kafka } from "kafkajs";
import { BlogCreatedMessage } from "../shared/models";
import { connectDb, pool } from "./db";

const kafka = new Kafka({
  clientId: "counter-service",
  brokers: ["localhost:9092"],
});

export const consumer = kafka.consumer({
  groupId: "counter-service-group",
  readUncommitted: false,
});

async function start() {
  await consumer.connect();

  await connectDb();

  await consumer.subscribe({ topics: ["blog-created"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      const blogCreatedMessage = BlogCreatedMessage.create(
        message.value.toString()
      );
      console.info({ blogCreatedMessage });

      await incrementBlogCount(blogCreatedMessage.authorId);
    },
  });
}

start();
async function incrementBlogCount(userId: number) {
  const { rowCount } = await pool.query({
    text: `update users set num_of_blogs = num_of_blogs + 1 where id = $1`,
    values: [userId],
  });

  console.info(
    `^^ incremented num_of_blogs by ${rowCount} for user #${userId}`
  );
}
