import { readFile } from "fs";
import { readFile as readFilePromise } from "fs/promises";
import fs from "fs/promises";

const filePath = "./file.txt";

async function readFileAsync() {
  const data = await readFilePromise(filePath);
  console.log("@@ promise way");
  console.log(data.toString("utf8"));
}

readFile(filePath, (err, data) => {
  console.log("@@ callback way");
  console.log(data.toString("utf8"));
});

readFileAsync();

async function getNum(filename) {
  console.log(`@@ before reading ${filename}`);
  const result = parseInt(await fs.readFile(filename, "utf8"), 10);
  console.log(`^^ after reading ${filename}`, result);
  return result;
}

async function addNumbers() {
  try {
    const numberPromises = [1, 2].map((i) => getNum(`${i}.txt`));
    const numbers = await Promise.all(numberPromises);
    console.log(
      `^^ sum: `,
      numbers.reduce((a, b) => a + b)
    );
  } catch (err) {
    console.error("Something went wrong:");
    console.error(err);
  }
}

addNumbers();

console.log(`PID: `, process.pid);

setTimeout(() => {
  console.log("^^ DONE");
}, 60 * 1000);
