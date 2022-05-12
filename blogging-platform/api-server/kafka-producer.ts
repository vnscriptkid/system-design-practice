import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "api-server",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
