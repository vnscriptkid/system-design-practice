import express, { Request, Response } from 'express';
import reviews from './reviews.json'

const app = express();

app.get('/reviews', (req: Request, res: Response) => {
    let data = reviews;

    if (Math.random() < 0.5) {
        throw new Error('unexpected err');
    }

    if (req.query.productId) {
        data = data.filter(x => x.productId === Number(req.query.productId))
    }

    res.send({
        data
    })
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`reviews service is listening on port ${PORT}`)
})