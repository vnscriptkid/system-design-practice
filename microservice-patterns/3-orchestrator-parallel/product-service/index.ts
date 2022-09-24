import express, { Request, Response } from 'express';
import productsDb from './productsDb.json';

const app = express();

app.get('/products/:productId', async (req: Request, res: Response) => {
    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) return res.status(400).send('invalid productId');

    const foundProduct = productsDb.find(x => x.id === productId);

    if (!foundProduct) return res.status(404).send('user not found');

    return res.send({ data: foundProduct });
})

const port = 3001;
app.listen(port, () => console.log('product service is listening on port ' + port));