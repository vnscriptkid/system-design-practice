import express from 'express';
import { AUCTION_EXPIRED_DURATION } from './constants';
import { connectDb, pool } from './db';
import { requireAuth } from './middlewares';
const app = express();

app.use(express.json())

app.get('/api/ping', (req, res) => {    
    res.send({alive: true})
})

app.post('/api/auctions', async (req, res) => {
    const {title} = req.body as {title: string};
    
    const nowInSecs = Math.round(Date.now() / 1000);
    
    const auction = {
        title,
        status: 'OPEN',
        created_at: nowInSecs,
        ended_at: nowInSecs + AUCTION_EXPIRED_DURATION
    }

    const {rows} = await pool.query({
        text: `insert into auctions (title, status, created_at, ended_at) values ($1, $2, $3, $4) returning *;`,
        values: [auction.title, auction.status, auction.created_at, auction.ended_at]
    })

    return res.status(201).send({ data: rows[0] })
})

app.get('/api/auctions', requireAuth, async (req, res) => {
    const {status = 'open'} = req.query as {status: string}

    if (!['open', 'closed'].includes(status)) return res.status(400).send({error: 'invalid status'})
    
    const {rows} = await pool.query({
        text: `select * from auctions where status = $1;`,
        values: [status.toUpperCase()]
    })

    return res.send({ data: rows })
})

app.get('/api/auctions/:id', async (req, res) => {
    const {rows, rowCount} = await pool.query({
        text: `select * from auctions where id = $1;`,
        values: [req.params.id]
    })

    if (rowCount === 0) return res.status(404).json({error: 'not found'});

    return res.send({ data: rows[0] })
})

/* BIDS */

app.post('/api/auctions/:auctionId/bids', async (req, res) => {
    const {auctionId} = req.params as any;
    const {amount} = req.body || {};

    if (typeof amount !== 'number' || !auctionId) return res.status(400).json({error: 'invalid input'});
    
    const {rowCount: foundAuctionsWithId, rows: [existingAuction]} = await pool.query({
        text: `select * from auctions where id = $1`,
        values: [auctionId]
    })

    if (foundAuctionsWithId === 0) return res.status(404).json({error: 'auction not found'});

    if (existingAuction.status !== 'OPEN') return res.status(400).json({error: 'auction has been closed'});

    if (amount <= existingAuction.highest_bid) return res.status(400).json({error: 'bid must be higher than current highest'});
    
    const {rowCount: updatedAuctions, rows} = await pool.query({
        text: `update auctions set highest_bid = $1 where id = $2 and $3 > highest_bid returning *;`,
        values: [amount, auctionId, amount]
    })

    if (updatedAuctions === 0) return res.status(400).json({error: 'failed to bid'});

    return res.send({ data: rows })
})

const port = process.env.PORT || 8500;
app.listen(port, async () => {
    await connectDb();
    console.log(`[AuctionService] server is listening on port ${port}`)
})