import express, { Request, Response } from 'express';
import { models } from './models';
import { chargeUser } from './payment';
import { emailQueue } from './queue';

const app = express();

app.post('/attendees', async (req: Request, res: Response) => {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const attendee = await models.Attendee.create({
                user_id: '123',
                conference_id: 'xyz'
            }, { transaction })

            console.log('... attendee created inside txn')
            await chargeUser('123', 100)

            await emailQueue.add(attendee, 5)
        })


        return res.status(200).send(`succeeded`)
    } catch (err) {
        return res.status(500).send(`failed to attend: ${(err as any)?.message}`)
    }
})

app.listen(3000, async () => {
    await models.sequelize.sync();
    console.log('server is listening on port 3000');
})
