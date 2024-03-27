import Sequelize from "sequelize";
import sequelize from '../dbconfig.js';

export const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


import User from "./User.js";
db.User = User(sequelize, Sequelize);

export default db;