import { connectDb, pool } from "./db";
var cron = require("node-cron");

async function main() {
  await connectDb();
  cron.schedule("* * * * *", async () => {
    const { rowCount } = await pool.query(
      `delete from cache where ttl < extract(epoch from now());`
    );

    console.log(`^^ ${rowCount} deleted`);
  });
}

main();
