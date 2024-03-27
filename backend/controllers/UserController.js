import { db } from "../models/index.js";

export const getUsers = async (req, res) => {
  try {
    const result = await db.User.findAll();
    res.status(200);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await db.User.findByPk(req.params.id);
    res.status(200);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const result = await db.User.create(req.body);
    res.status(201);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = await db.User.update(req.body, {
      where: { UserId: req.params.id },
    });
    res.status(200);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await db.User.destroy({
      where: { UserId: req.params.id },
    });
    res.status(200);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
};
