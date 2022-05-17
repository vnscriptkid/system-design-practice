import * as express from "express";
import { connectDb, pool } from "./db";

const app = express();

app.use(express.json());

// store key-value
app.post("/api/v1/keys", async (req, res) => {
  const { key, value, ttl = null } = req.body;

  if (!key || !value)
    return res.json(400).json({ error: `missing key or value` });

  try {
    const { rows } = await pool.query({
      text: `insert into cache (key, value, ttl) values ($1, $2, $3) returning *;`,
      values: [key, value, ttl],
    });

    return res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to insert", details: err });
  }
});

// update key-value
app.put("/api/v1/keys", async (req, res) => {
  const { key, value, ttl = null } = req.body;

  if (!key || !value)
    return res.json(400).json({ error: `missing key or value` });

  try {
    const { rows } = await pool.query({
      text: `update cache set value = $1, ttl = $2 where key = $3 returning *;`,
      values: [value, ttl, key],
    });

    return res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to update", details: err });
  }
});

// upsert key-value
app.post("/api/v2/keys", async (req, res) => {
  const { key, value, ttl = null } = req.body;

  if (!key || !value)
    return res.json(400).json({ error: `missing key or value` });

  try {
    const { rows } = await pool.query({
      text: `
        insert into cache (key, value, ttl) 
        values ($1, $2, $3)
        on conflict (key)
        do update set value = $4, ttl = $5
        returning *;`,
      values: [key, value, ttl, value, ttl],
    });

    return res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to upsert", details: err });
  }
});

// delete a key
app.delete("/api/v1/keys/:key", async (req, res) => {
  const { key } = req.params;

  if (!key) return res.json(400).json({ error: `missing key` });

  try {
    const { rowCount } = await pool.query({
      text: `update cache set ttl = -1 where key = $1 and ttl > extract(epoch from now());`,
      values: [key],
    });

    if (rowCount > 0) return res.status(200).json({ message: "success" });
    else return res.status(400).json({ error: "no row effected" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to upsert", details: err });
  }
});

// get value of key
app.get("/api/v1/keys/:key", async (req, res) => {
  const { key } = req.params;

  if (!key) return res.json(400).json({ error: `missing key` });

  try {
    const { rows, rowCount } = await pool.query({
      text: `select * from cache where key = $1`,
      values: [key],
    });

    let data = null;

    if (rowCount > 0 && rows[0].ttl > Date.now() / 1000) {
      data = rows[0].value;
    }

    return res.status(data === null ? 404 : 200).json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to upsert", details: err });
  }
});

const PORT = 3000;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`server is listening on port ${PORT}`);
});
