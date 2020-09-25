const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("pizdet");
  res.send("Hello world");
});

app.post("/cookies", (req, res) => {
  console.log("pizdet");
  console.log("Got body:", req.body);
  res.send("Got the cookies :-)");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
