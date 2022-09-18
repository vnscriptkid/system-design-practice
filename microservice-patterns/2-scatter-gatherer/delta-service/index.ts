import express, { Request, Response } from 'express';
import flights from './delta.json'

const app = express();

app.get('/delta-flights/:from/:to', (req: Request, res: Response) => {
    const { from, to } = req.params;

    if (Math.random() > 0.2) {
        throw new Error('unexpected err');
    }

    res.send({
        data: flights.filter(x => x.from === from && x.to === to)
    })
})

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`delta service is listening on port ${PORT}`)
})