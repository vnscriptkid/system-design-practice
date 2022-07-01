import amqp from 'amqplib';
import { RABBITMQ_URL } from '../constants';

export async function connectRabbitMQ(): Promise< { channel: amqp.Channel, connection: amqp.Connection } | null> {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        return {channel, connection};
    } catch (err) {
        console.error(`!! failed to connect to rabbitmq`);
        return null;
    }
}
