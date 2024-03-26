const mssql = require("mssql");
const dbconfig = require("../dbconfig");

const getUsers = async () => {
  try {
    await mssql.connect(dbconfig);
    const result =
      await mssql.query`select * from Users`;
    return result.recordsets;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getUsers: getUsers,
};
