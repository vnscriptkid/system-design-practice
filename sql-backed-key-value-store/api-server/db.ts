import { Pool } from "pg";

let pool1: Pool;
let pool2: Pool;

function hashStrToNum(key): number {
  return key.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
}

export function getPool(key: string): Pool {
  const pools = [pool1, pool2];

  const idx = hashStrToNum(key) % pools.length;

  console.log(`@@ db ${idx} got selected`);

  return pools[idx];
}

export const connectDb = async () => {
  pool1 = new Pool({
    host: "pg1",
    port: 5432,
    user: "postgres",
    password: "123456",
    database: "store",
    // number of milliseconds to wait before timing out when connecting a new client
    // by default this is 0 which means no timeout
    connectionTimeoutMillis: 0,
    // number of milliseconds a client must sit idle in the pool and not be checked out
    // before it is disconnected from the backend and discarded
    // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
    idleTimeoutMillis: 0,
    // maximum number of clients the pool should contain
    // by default this is set to 10.
    max: 20,
  });

  pool2 = new Pool({
    host: "pg2",
    port: 5432,
    user: "postgres",
    password: "123456",
    database: "store",
    // number of milliseconds to wait before timing out when connecting a new client
    // by default this is 0 which means no timeout
    connectionTimeoutMillis: 0,
    // number of milliseconds a client must sit idle in the pool and not be checked out
    // before it is disconnected from the backend and discarded
    // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
    idleTimeoutMillis: 0,
    // maximum number of clients the pool should contain
    // by default this is set to 10.
    max: 20,
  });

  await pool1.connect();
  await pool2.connect();

  await initOnce();
};

async function initOnce() {
  try {
    await pool1.query(`
        create table if not exists cache (
            key varchar(255) primary key,
            value varchar(255),
            ttl integer default null
        );
        `);

    await pool2.query(`
        create table if not exists cache (
            key varchar(255) primary key,
            value varchar(255),
            ttl integer default null
        );
        `);

    // ttl: > 0 (absolute time) || -1 (soft deleted) || null (won't expire)
  } catch (err) {
    console.error(`!! oops`, err);
    throw err;
  }
}
