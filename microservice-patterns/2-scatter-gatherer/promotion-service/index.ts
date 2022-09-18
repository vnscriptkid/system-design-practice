import express, { Request, Response } from 'express';
import promotions from './promotions.json'

const app = express();

app.get('/promotions', (req: Request, res: Response) => {
    res.send({
        data: promotions.filter(x => x.active === true)
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`promotion service is listening on port ${PORT}`)
})