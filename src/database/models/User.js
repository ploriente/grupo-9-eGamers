module.exports = function(sequelize, DataTypes) {

    const alias = 'Users';

    const cols = {
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
      };
    
    const config = {
        tableName: 'users',
        timestamps: false

    }

    const Users = sequelize.define(alias, cols, config );
  
    return Users;
  };


 