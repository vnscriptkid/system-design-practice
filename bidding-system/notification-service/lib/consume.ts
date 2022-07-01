import amqp from 'amqplib';
import { connectRabbitMQ } from './connect';

let consumerChannel: amqp.Channel | null = null;
let consumerConnection: amqp.Connection | null = null;

export async function startConsumer() {
  const connected = await connectRabbitMQ();

  if (connected) {
    consumerChannel = connected.channel;
    consumerConnection = connected.connection;
  }
}

export async function stopConsumer() {
    if (consumerChannel) {
        await consumerChannel.close();
    }

    if (consumerConnection) {
        await consumerConnection.close();
    }
}

type ConsumerCallback = (messageJson: Record<string, any>) => Promise<void>

export async function consume(queueName: string, consumerCallback: ConsumerCallback) {
    if (!consumerChannel) {
        console.error(`!! consumer channel has not been initiated yet`);
        return;
    }
    
    try {
        await consumerChannel.assertQueue(queueName);
        
        consumerChannel.consume(queueName, async (message) => {

            const msgStr = message?.content.toString() as string;
            const msgJson = JSON.parse(msgStr);

            if (msgJson) {
                try {
                    await consumerCallback(msgJson);

                    consumerChannel!.ack(message!);
                    console.log(`^^ message has been consumed`);
                } catch (err) {
                    console.error(`!! failed at consuming message`)
                }
                // { sender: 'system@gmail.com', receiver: 'user@gmail.com', content: 'hello user!!!' }
            } 

        });

        console.log(`Waiting for messages from queue ${queueName}...`);
      } catch (ex) {
        console.error(`!! failed to listen from queue ${queueName}`, ex);
      }
}