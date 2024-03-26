const mssql = require("mssql");
const dbconfig = require("../dbconfig");

const getUsers = async () => {
  try {
    await mssql.connect(dbconfig);
    const result = await mssql.query`select * from Users`;
    return result.recordsets;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUser = async (id) => {
  try {
    await mssql.connect(dbconfig);
    const result = await mssql.query`select * from Users where UserId = ${id}`;
    return result.recordsets;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
};
