import express, { Request, Response } from 'express';
import flights from './jetblue.json'

const app = express();

app.get('/jetblue-flights/:from/:to', (req: Request, res: Response) => {
    const { from, to } = req.params;

    res.send({
        data: flights.filter(x => x.from === from && x.to === to)
            .map(({ date, price }) => ({
                date,
                price
            }))
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`jetblue service is listening on port ${PORT}`)
})