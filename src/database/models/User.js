const {DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../config/config.js");


const User = sequelize.define("User",{
  //Definiendo Campos
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      } 
},{
    tableName: 'users',
    timestamps: false

});

module.exports = User
  