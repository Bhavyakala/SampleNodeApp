const express = require("express");
const app = express();
const users = require("./controllers/Users");
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/Users", (req, res) => {
  console.log("GET /Users");
  users
    .getUsers()
    .then((result) => {
      res.status(200);
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send(err);
    });
});

app.get("/Users/:id", (req, res) => {
  console.log(`GET /Users/${req.params.id}`);
  users
    .getUser(req.params.id)
    .then((result) => {
      res.status(200);
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send(err);
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
