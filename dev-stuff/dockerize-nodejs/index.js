const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send({ hello: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
