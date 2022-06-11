import express from "express";
import request from "request";

const servers = ["http://localhost:3000", "http://localhost:3001"];

let cur = 0;

const handler = (req, res) => {
  // Pipe the vanilla node HTTP request (a readable stream) into `request`
  // to the next server URL. Then, since `res` implements the writable stream
  // interface, you can just `pipe()` into `res`.
  // Add an error handler for the proxied request
  const _req = request({ url: servers[cur] + req.url }).on("error", (error) => {
    res.status(500).send(error.message);
  });
  req.pipe(_req).pipe(res);
  cur = (cur + 1) % servers.length;
};

const profilerMiddleware = (req, res, next) => {
  const start = Date.now();
  // The 'finish' event comes from core Node.js, it means Node is done handing
  // off the response headers and body to the underlying OS.
  res.on("finish", () => {
    console.log("Completed", req.method, req.url, Date.now() - start);
  });
  next();
};

const app = express();

app.use(profilerMiddleware);

app.get("*", handler).post("*", handler);

app.listen(8080, () => {
  console.log(`@@ load balancer is listening on port 8080`);
});
