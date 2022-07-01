import { consume, startConsumer } from './lib/consume';
console.log(`[NotificationService] started`);

async function main() {
    await startConsumer();

    await consume('email-queue', async (msgJson) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log(`^^ sent mail`, msgJson)
    })
}

main();