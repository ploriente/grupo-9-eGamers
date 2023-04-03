const { Sequelize } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const alias = 'User';
    const cols = {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        usuario: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    };
    
    const config = {
        tableName: 'user',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);
  
    return User;
};
