'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // RentalDetail.belongsTo(models.Book, { foreignKey: 'bookId' })
      // RentalDetail.belongsTo(models.Rental, { foreignKey: 'rentalId' })
    }
  };
  RentalDetail.init({
    rentalId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RentalDetail',
  });
  return RentalDetail;
};