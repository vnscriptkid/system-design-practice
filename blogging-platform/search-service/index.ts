import { BlogCreatedMessage } from "./../shared/models";
import elasticsearch from "elasticsearch";

const client = new elasticsearch.Client({
  host: "http://localhost:9200",
  log: "debug",
});

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "search-service",
  brokers: ["localhost:9092"],
});

export const consumer = kafka.consumer({
  groupId: "search-service-group",
  readUncommitted: false,
});

async function start() {
  await consumer.connect();

  try {
    await client.indices.create({ index: "blogging" });

    await client.indices.putMapping({
      index: "blogging",
      type: "blog",
      body: {
        properties: {
          publishedAt: { type: "date" },
          title: { type: "text" },
          body: { type: "text" },
          authorId: { type: "text" },
        },
      },
      includeTypeName: true,
    });
  } catch (err) {
    if (
      (err as any)?.body?.error?.type === "resource_already_exists_exception"
    ) {
      console.info("no worries.");
    } else throw err;
  }

  await consumer.subscribe({ topics: ["blog-created"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      const blogCreatedMessage = BlogCreatedMessage.create(
        message.value.toString()
      );

      await feedElastic(blogCreatedMessage);
    },
  });
}

start();

async function feedElastic(blogCreatedMessage: BlogCreatedMessage) {
  await client.update({
    index: ELASTIC_CONFIG.index,
    type: ELASTIC_CONFIG.type,
    id: String(blogCreatedMessage.id),
    body: {
      doc: toIndex(blogCreatedMessage),
      doc_as_upsert: true,
    },
  });
}

var ELASTIC_CONFIG = {
  index: "blogging",
  type: "blog",
};

function toIndex(blogCreatedMessage: BlogCreatedMessage) {
  return {
    publishedAt: blogCreatedMessage.publishedAt,
    title: blogCreatedMessage.title,
    body: blogCreatedMessage.body,
    authorId: blogCreatedMessage.authorId,
  };
}
