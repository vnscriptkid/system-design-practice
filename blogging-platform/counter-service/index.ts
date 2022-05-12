import { Kafka } from "kafkajs";
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
      console.log(message.value.toString());
      const blogCreatedMessage = BlogCreatedMessage.create(
        message.value.toString()
      );
      console.log({ blogCreatedMessage });

      await incrementBlogCount(blogCreatedMessage.userId);
    },
  });
}

class BlogCreatedMessage {
  userId: number;
  blogId: number;

  constructor(userId: number, blogId: number) {
    this.userId = userId;
    this.blogId = blogId;
  }

  static create(jsonStr: string) {
    const { userId, blogId } = JSON.parse(jsonStr);
    return new BlogCreatedMessage(parseInt(userId), parseInt(blogId));
  }
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
