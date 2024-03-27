import cors from "cors";
import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from "./controllers/UserController.js";
import sequelize from "./dbconfig.js";
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.error(err);
  });

const port = 3001;

app.get("/Users", (req, res) => {
  console.log("GET /Users");
  getUsers(req, res);
});

app.get("/Users/:id", (req, res) => {
  console.log(`GET /Users/${req.params.id}`);
  getUser(req, res);
});

app.post("/User", (req, res) => {
  console.log("POST /User");
  console.log(req.body);
  createUser(req, res);
});

app.put("/User/:id", (req, res) => {
  console.log(`PUT /User/${req.params.id}`);
  console.log(req.body);
  updateUser(req, res);
});

app.delete("/User/:id", (req, res) => {
  console.log(`DELETE /User/${req.params.id}`);
  deleteUser(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
