import * as express from "express";
import { connectDb, pool } from "./db";
import { CreateBlogDto } from "./dtos/create-blog.dto";

const app = express();

app.use(express.json());

app.get("/api/v1/health", async (req, res) => {
  const { rows } = await pool.query(`select now();`);
  console.table(rows);
  res.send({ message: "ok" });
});

app.get(
  "/api/v1/users",
  async (req: express.Request, res: express.Response) => {
    const { rows } = await pool.query(`select * from users;`);

    console.table(rows);

    return res.status(200).json({ data: rows });
  }
);

app.get(
  "/api/v1/blogs",
  async (req: express.Request, res: express.Response) => {
    const { rows } = await pool.query(`select * from blogs;`);

    console.table(rows);

    return res.status(200).json({ data: rows });
  }
);

app.post(
  "/api/v1/blogs",
  async (req: express.Request, res: express.Response) => {
    // TODO: take userId from jwt instead
    const { userId, title, body } = req.body as CreateBlogDto;

    // check user exists
    const { rowCount } = await pool.query({
      text: `select id from users where id = $1`,
      values: [userId],
    });

    if (rowCount === 0)
      return res.status(404).send(`user #${userId} not found.`);

    const client = await pool.connect();

    try {
      await client.query("begin");

      // create blog post
      const { rows } = await client.query({
        text: "insert into blogs (title, body, author_id) values ($1, $2, $3) returning *;",
        values: [title, body, userId],
      });

      // update blogs count of user
      await client.query({
        text: "update users set num_of_blogs = num_of_blogs + 1 where id = $1",
        values: [userId],
      });

      await client.query("commit");

      return res.status(201).send({ data: rows[0] });
    } catch (err) {
      await client.query("rollback");
      return res.status(500).send({ message: "server err", details: err });
    } finally {
      client.release();
    }
  }
);

const PORT = 3000;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`server is listening on port ${PORT}`);
});
