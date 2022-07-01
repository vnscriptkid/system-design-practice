import { connectDb, pool } from "./db";
var cron = require('node-cron');

async function main() {
  await connectDb();

  cron.schedule("* * * * *", async () => {
    console.info(`@@ process auctions every minute!`)

    const nowInSec = ~~(Date.now() / 1000)
    
    const {rowCount, rows} = await pool.query({
      text: `update auctions set status = 'CLOSED' where ended_at <= $1 and status = 'OPEN' returning *;`,
      values: [nowInSec]
    })

    console.info(`^^ expired ${rowCount} auction(s)`, [rows.map(x => x.id)])
  });
}

main();
