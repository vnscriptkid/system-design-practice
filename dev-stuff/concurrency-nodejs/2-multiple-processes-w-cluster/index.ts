import express from "express";
import cluster from "cluster";

const app = express();

if (cluster.isMaster) {
  // primary process listening on port 3000 and
  // passing connections off to all the workers in round-robin fashion via IPC
  console.log(`@@ Spawning 4 worker processes`);
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // We’re not actually listening on the same port four times.
  // It turns out Node.js does some magic for us in cluster.
  app.listen(3000, () => {
    console.log(`server is listening`);
  });

  app.get("/", (req, res) => {
    res.send({ pid: process.pid });
  });
}
