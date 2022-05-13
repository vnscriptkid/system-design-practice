import express, { Request, Response } from "express";
import { initTables, pool } from "./db";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;

// I AM ALIVE
app.post("/api/v1/heartbeats", async (req: Request, res: Response) => {
  const { username } = req.body as { username: string };

  try {
    await pool.query({
      text: `
        insert into heartbeats (username) values ($1) 
        on conflict (username) 
        do update set last_visited = current_timestamp;`,
      values: [username],
    });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "server err", details: err });
  }
});

// WHO IS ONLINE
app.get("/api/v1/heartbeats", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `select 
            username, 
            extract(epoch from (now() - last_visited)) as diff 
        from heartbeats;`
    );

    console.table(rows);

    const normalizedData = rows.map(({ username, diff }) => ({
      username,
      isOnline: parseFloat(diff) <= 20,
    }));

    return res.status(200).json({ data: normalizedData });
  } catch (err) {
    return res.status(500).json({ message: "server err", details: err });
  }
});

app.listen(PORT, async () => {
  await pool.connect();
  await initTables();
  console.log(`server is listening on port ${PORT}`);
});
