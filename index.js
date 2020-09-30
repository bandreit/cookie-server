const express = require("express");
const firebase = require("firebase-admin");
const serviceAccount = require("./cookies-database-firebase-adminsdk-tmeah-a6eb68f4a9.json");
const app = express();
const admin = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://cookies-database.firebaseio.com/",
});

const db = admin.database();
const cookiesRef = db.ref("cookies-database/cookies");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/cookies", (req, res) => {
  cookiesRef.push(req.body, function (error) {
    if (error) {
      alert("Data could not be saved." + error);
    } else {
      alert("Data saved successfully.");
    }
  });
  res.send("Got the cookies :-)");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
