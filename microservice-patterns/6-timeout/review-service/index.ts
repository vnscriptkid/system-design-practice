import express, { Request, Response } from 'express';
import reviews from './reviews.json'

const app = express();

app.get('/reviews', async (req: Request, res: Response) => {
    let data = reviews;

    const possibleTimeouts = [200, 300, 700, 1000, 2000];

    const randomIdx = Math.floor(Math.random() * possibleTimeouts.length)

    const finalTimeout = possibleTimeouts[randomIdx];
    console.log('timeout: ', finalTimeout);
    await wait(finalTimeout)

    if (req.query.productId) {
        data = data.filter(x => x.productId === Number(req.query.productId))
    }

    res.send({
        data
    })
})

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`reviews service is listening on port ${PORT}`)
})