const mssql = require("mssql");
const dbconfig = require("../dbconfig");

const getWorkloads = async () => {
  try {
    await mssql.connect(dbconfig);
    const result =
      await mssql.query`select * from [AIOpsWorkloads].[entitlementInstance]`;
    return result.recordsets;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getWorkloads,
};
