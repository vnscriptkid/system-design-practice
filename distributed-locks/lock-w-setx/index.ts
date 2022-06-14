import cluster from "cluster";
import { createClient } from "redis";
import { Lock } from "./lib";

if (cluster.isMaster) {
  // primary process listening on port 3000 and
  // passing connections off to all the workers in round-robin fashion via IPC

  (async () => {
    try {
      const client = createClient();
      await client.connect();
      await client.set("apple", 100);
      const value = await client.get("apple");
      console.log(`^^ apple value: `, value);

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
  // Each worker tries to add 100 to apple one by one concurrently
  // Original apple is 100
  // Expected output is 500
  console.log("@@ doing something on " + process.pid);
  (async () => {
    try {
      const client = createClient();
      await client.connect();
      const locker = new Lock(client);
      for (let _ of Array(100)) {
        await locker.acquire("lock.apple");
        const value = await client.get("apple");
        await client.set("apple", parseInt(value!) + 1);
        await locker.release("lock.apple");
      }
      const value = await client.get("apple");
      console.log(`^^ [${process.pid}] done. apple now is ${value}`);
      await client.disconnect();
    } catch (err) {
      console.log(`!! err from worker ${process.pid}`);
    }
  })();
}
