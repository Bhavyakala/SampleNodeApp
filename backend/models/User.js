const User = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      Username: {
        type: Sequelize.STRING,
      },

      Email: {
        type: Sequelize.STRING,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      tableName: "Users",
      timestamps: false,

    }
  );
  return User;
};

export default User;
