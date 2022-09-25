import express, { Request, Response } from 'express';
import reviews from './reviews.json'

const app = express();

app.get('/reviews', async (req: Request, res: Response) => {
    let data = reviews;

    if (Math.random() < 0.7) {
        console.log('unexpected server error')
        res.status(500).send('unexpected server error');
        return;
    }

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