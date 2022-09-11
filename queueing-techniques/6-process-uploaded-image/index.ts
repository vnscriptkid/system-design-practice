import express, { Request, Response } from 'express';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { imageProcessQueue } from './queue';

const app = express();

app.post('/upload', async (req: Request, res: Response) => {
    try {
        const savedFileName = uuidv4();

        const meta = await sharp("sammy.png")
            .toFile(`uploads/unprocessed/${savedFileName}.png`);

        await imageProcessQueue.add({ fileName: savedFileName })

        res.send({ done: meta });
    } catch (err) {
        console.log(err);
        res.status(400).send({ oops: (err as any).message })
    }

})

async function getMetadata(fileName: string) {


    const metadata = await sharp(fileName).metadata();

    console.log(metadata);
}

app.listen(3000, () => {
    console.log('app is listening on port 3000');
})