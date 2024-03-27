import Sequelize from "sequelize";

const config = {
  user: "CloudSAc6ba4498", // better stored in an app setting such as process.env.DB_USER
  password: "userAdmin_123", // better stored in an app setting such as process.env.DB_PASSWORD
  server: "sampledbbhavya.database.windows.net", // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: "test", // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.server,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
    throw err;
  });

export default sequelize;
