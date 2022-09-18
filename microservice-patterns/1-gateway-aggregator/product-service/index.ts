import express, { Request, Response } from 'express';
import products from './products.json'

const app = express();

app.get('/products/:productId', (req: Request, res: Response) => {
    const product = products.find(x => x.id == Number(req.params.productId));

    if (!product) {
        return res.status(404).send();
    }

    res.send({
        data: product
    })
})

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`product service is listening on port ${PORT}`)
})