import express, { Request, Response } from 'express';
import { orderExpirationQueue } from './expiration-queue';
import { orders } from './ordersDb';

async function main() {
    const app = express();

    app.post('/orders', async (req: Request, res: Response) => {
        // add new order with status pending
        // pending order means items being reserved
        orders.push({
            id: '1234',
            status: 'pending'
        })

        await orderExpirationQueue.add({ orderId: '1234' })

        res.send({ message: 'success' })
    })

    app.listen(3000, () => {
        console.log('app is listening on port 3000');
    })
}

main();
