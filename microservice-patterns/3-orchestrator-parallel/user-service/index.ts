import express, { Request, Response } from 'express';
import { usersDb } from './usersDb';

const app = express();

app.use(express.json())

app.get('/users/:uid', async (req: Request, res: Response) => {
    const uid = parseInt(req.params.uid);

    if (isNaN(uid)) return res.status(400).send('invalid uid');

    const foundUser = usersDb.findById(uid);

    if (!foundUser) return res.status(404).send('user not found');

    return res.send({ data: foundUser });
})

app.put('/users/:uid', async (req: Request, res: Response) => {
    const uid = parseInt(req.params.uid);

    if (isNaN(uid)) return res.status(400).send('invalid uid');

    const foundUser = usersDb.findById(uid);

    if (!foundUser) return res.status(404).send('user not found');

    let { type, amount } = (req.query || {}) as any;

    if (!['deduct', 'restore'].includes(type as string)) {
        return res.status(400).send('invalid op type');
    }

    amount = parseInt(amount as string);

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).send('invalid amount');
    }

    const finalAmount = type === 'deduct' ? -amount : +amount;

    try {
        await usersDb.updateBalance(foundUser!, finalAmount);

        return res.send('success');
    } catch (err) {
        return res.status(500).send('failed to update balance');
    }

})

const port = 3000;
app.listen(port, () => console.log('user service is listening on port ' + port));