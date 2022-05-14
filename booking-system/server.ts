import express from "express";
import pg from "pg";

const app = express();

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123456",
  database: "cinemas",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//get all seats
app.get("/seats", async (req, res) => {
  const result = await pool.query("select * from seats");

  res.send(result.rows);
});

//book a seat give the seatId and your name
app.put("/:id/:name", async (req, res) => {
  const { id, name } = req.params;

  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    // getting the row to make sure it is not booked
    const { rowCount } = await conn.query({
      text: "SELECT * FROM seats where id = $1 and isbooked is false for update;",
      values: [id],
    });
    // if no rows found then the operation should fail can't book
    if (rowCount === 0) return res.send({ error: "Seat already booked" });

    //if we get the row, we are safe to update
    const updateResult = await conn.query({
      text: "update seats set isbooked = true, name = $2 where id = $1",
      values: [id, name],
    });

    await conn.query("COMMIT");

    res.send(updateResult);
  } catch (err) {
    console.log(err);
    await conn.query("ROLLBACK");
    res.send(500);
  } finally {
    conn.release();
  }
});

async function initAndSeedDB() {
  try {
    await pool.query(`create table seats (
              id serial primary key, 
              isbooked boolean not null default false, 
              name varchar(30) default null
          )`);
  } catch (err) {
    console.info("no worries");
  }

  const { rowCount } = await pool.query(`select * from seats;`);

  if (rowCount === 0) {
    for (let i = 0; i < 15; i++) {
      await pool.query(
        `insert into seats (isbooked, name) values (false, null);`
      );
    }
  }
}

process.on("message", (port: string) => {
  app.listen(port, async () => {
    await initAndSeedDB();

    console.log("Listening on " + port);
    process.send!("server started");
  });
});
