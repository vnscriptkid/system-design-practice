import { Pool } from "pg";

export let pool: Pool;

export const connectDb = async () => {
  pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123456",
    database: "medium",
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

  await initOnce();
};

async function initOnce() {
  // await pool.query("create database if not exists medium;");
  await pool.query(`drop table blogs;`);
  await pool.query(`drop table users;`);

  await pool.query(`
      create table if not exists users (
          id serial primary key,
          name varchar(20) NOT NULL,
          bio varchar(255),
          num_of_blogs int default 0
      );
      `);

  await pool.query(`
        create table if not exists blogs(
            id serial primary key,
            title varchar(50) NOT NULL,
            body text NOT NULL,
            deleted_at TIMESTAMP DEFAULT NULL,
            published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            author_id int REFERENCES users (id) ON DELETE CASCADE
        );
    `);

  await pool.query(
    `insert into users (name, bio) values ('thanh', 'software engineer')`
  );
}
