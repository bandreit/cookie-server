require("dotenv").config();
const express = require("express");
const firebase = require("firebase-admin");
const app = express();
const admin = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert({
    type: "service_account",
    project_id: "cookies-database",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
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
  const data = req.body;
  const userId = data.pop();
  cookiesRef.child(userId).set(
    {
      data,
    },
    function (error) {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    }
  );
});
// app.post("/cookies", (req, res) => {
//   cookiesRef.set(req.body, function (error) {
//     if (error) {
//       res.send("Data could not be saved." + error);
//     } else {
//       res.send("Data saved successfully.");
//     }
//   });
// });

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
