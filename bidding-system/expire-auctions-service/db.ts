import { Pool } from "pg";

export let pool: Pool;

export const connectDb = async () => {
  pool = new Pool({
    host: "localhost",
    port: 5434,
    user: "postgres",
    password: "123456",
    database: "bidding",
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

  try {
    await pool.connect();

    console.info(`^^ db connected`)
  } catch (err) {
    console.error(`!! failed to connect to db`, err)
  }

};

