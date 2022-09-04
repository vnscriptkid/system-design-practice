import express, { Request, Response } from 'express';
import { ExecutionError, Lock } from 'redlock';
import { connectRedis, getRedlock } from './cache';

// while true; do curl -X POST http://localhost:3000/cancel-sales/123; echo; sleep 0.5; done;
async function main() {
    await connectRedis();

    const app = express();

    app.post('/cancel-sales/:orderId', async (req: Request, res: Response) => {
        const orderId = req.params.orderId;

        if (!orderId) {
            return res.status(400).send('missing orderId');
        }

        let lock: Lock | null = null;

        try {
            lock = await getRedlock().acquire([`locks:cancelorder:${orderId}`], 60 * 1000);

            await callStripeToChargeUser()
            // throw new Error('unexpected error before DONE')            

            return res.status(200).send({ success: true });
        } catch (err) {
            if (err instanceof ExecutionError) {
                console.log('ExecutionError: ', err.name, err);
                return res.status(400).send(`failed to get the lock`);
            }

            if (lock) {
                // lock has been acquired, but some error occurred => release the lock
                // const released = await getRedlock().release(lock);
                await lock.release()
            }

            return res.status(500).send(`server error`);
        }
    })

    app.listen(3000, () => {
        console.log('app is listening on port 3000');
    })
}

async function callStripeToChargeUser() {
    console.log('... calling STRIPE');
    await wait(2000);
    console.log('... got back from STRIPE');
}

async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



main();
