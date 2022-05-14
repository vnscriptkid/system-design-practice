import { fork } from "child_process";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const NUM_OF_SERVERS = 4;

  for (let i = 0; i < NUM_OF_SERVERS; i++) {
    const childServer = fork("./server.ts");
    childServer.send(9090 + i);
    await wait(1);
  }
}

main();
