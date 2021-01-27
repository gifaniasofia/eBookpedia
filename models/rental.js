'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Rental.init({
    memberId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    expired_date: DataTypes.DATE,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rental',
  });
  return Rental;
};