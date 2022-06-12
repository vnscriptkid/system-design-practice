import { isMainThread, parentPort, Worker } from "worker_threads";
import { random64 } from "./happy-coin.mjs";
import { isHappycoin } from "./happy-coin.mjs";

const THREAD_COUNT = 4;

if (isMainThread) {
  console.log(`@@ main thread`);
  let inFlight = THREAD_COUNT;
  let count = 0;
  for (let i = 0; i < THREAD_COUNT; i++) {
    const worker = new Worker("./index.mjs");
    worker.on("message", (msg) => {
      if (msg === "done") {
        if (--inFlight === 0) {
          process.stdout.write("\ncount " + count + "\n");
        }
      } else if (typeof msg === "bigint") {
        process.stdout.write(msg.toString() + " ");
        count++;
      }
    });
  }
} else {
  console.log(`@@ worker thread`);
  for (let i = 1; i < 10_000_000 / THREAD_COUNT; i++) {
    const randomNum = random64();
    if (isHappycoin(randomNum)) {
      parentPort.postMessage(randomNum);
    }
  }
  parentPort.postMessage("done");
}
