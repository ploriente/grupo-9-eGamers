module.exports = function(sequelize, DataTypes) {

    const alias = 'Products';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
          },
          discount: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true,
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          newGame: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          inOffer: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          players: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          genre: {
            type: DataTypes.STRING,
            allowNull: false,
          }
      };
    
    const config = {
        tableName: 'products',
        timestamps: false

    }

    const Products = sequelize.define(alias, cols, config );
  
    return Products;
  };


 