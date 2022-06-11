import express from "express";

const app1 = express();
const app2 = express();

// Parse the request body as JSON
app1.use(express.json());
app2.use(express.json());

const handler = (serverNum: number) => (req, res) => {
  console.log(`server ${serverNum}`, req.method, req.url, req.body);
  res.send(`Hello from server ${serverNum}!`);
};

// Only handle GET and POST requests
app1.get("*", handler(1)).post("*", handler(1));
app2.get("*", handler(2)).post("*", handler(2));

app1.listen(3000, () => {
  console.log(`@@ server is listening on port 3000`);
});

app2.listen(3001, () => {
  console.log(`@@ server is listening on port 3001`);
});
