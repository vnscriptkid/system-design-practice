import express, { Request, Response } from 'express';
import flights from './frontier.json'

const app = express();

app.use(express.json())

app.post('/frontier-flights', (req: Request, res: Response) => {
    const { from, to } = req.body;

    res.send({
        data: flights.filter(x => x.from === from && x.to === to)
    })
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`frontier service is listening on port ${PORT}`)
})