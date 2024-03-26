const express = require("express");
const app = express();
const users = require("./controllers/Users");
app.use(express.json());

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
