const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 5002;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/cookies", (req, res) => {
  console.log("Got body:", req.body);
  res.send("Got the cookies :-)");
});
