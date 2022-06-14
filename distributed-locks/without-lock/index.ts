import cluster from "cluster";
import { createClient } from "redis";

if (cluster.isMaster) {
  // primary process listening on port 3000 and
  // passing connections off to all the workers in round-robin fashion via IPC

  (async () => {
    try {
      const client = createClient();
      await client.connect();
      await client.set("orange", 100);
      const value = await client.get("orange");
      console.log(`^^ orange value: `, value);

      console.log(`@@ Spawning 4 worker processes`);

      cluster.fork();
      cluster.fork();
      cluster.fork();
      cluster.fork();
    } catch (err) {
      console.log(`!! err from master`, err);
    }
  })();
} else {
  // We have 4 workers
  // Each worker tries to add 100 to orange one by one concurrently
  // Original orange is 100
  // Expected output is 500
  console.log("@@ doing something on " + process.pid);
  (async () => {
    try {
      const client = createClient();
      await client.connect();
      for (let _ of Array(100)) {
        const value = await client.get("orange");
        await client.set("orange", parseInt(value!) + 1);
      }
      const value = await client.get("orange");
      console.log(`^^ [${process.pid}] done. orange now is ${value}`);
      await client.disconnect();
    } catch (err) {
      console.log(`!! err from worker ${process.pid}`);
    }
  })();
}
