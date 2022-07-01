import amqp from 'amqplib';
import { connectRabbitMQ } from './connect';

let publisherChannel: amqp.Channel | null = null;
let publisherConnection: amqp.Connection | null = null;

export async function startPublisher() {
  const connected = await connectRabbitMQ();

  if (connected) {
    publisherChannel = connected.channel;
    publisherConnection = connected.connection;
  }
}

export async function stopConsumer() {
  if (publisherChannel) {
      await publisherChannel.close();
  }

  if (publisherConnection) {
      await publisherConnection.close();
  }
}

export async function publish(queueName: string, message: any) {
  if (!publisherChannel) {
    console.error(`!! publisher has not been initiated yet`)
    return;
  }
  
 const msgBuffer = Buffer.from(JSON.stringify(message));

 try {
   await publisherChannel.assertQueue(queueName);

   const sent = publisherChannel.sendToQueue(queueName, msgBuffer);

   if (sent) {
     console.log(`^^ sent msg to queue ${queueName}`, sent, message);
   } else {
     console.error(`!! sent is falsy ${queueName}`, sent, message)
   }
  //  await publisherChannel.close();
 } catch (ex) {
   console.error(`!! failed to send to queue`, ex);
 }
}