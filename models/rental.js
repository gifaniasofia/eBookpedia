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
      Rental.belongsTo(models.User, { foreignKey: 'userId' });
      Rental.belongsToMany(models.Book, {
        through: models.RentalDetail,
        foreignKey: 'rentalId'
      });
      // Rental.hasMany(models.RentalDetail, { foreignKey: 'rentalId' })
      Rental.belongsTo(models.Member, { foreignKey: 'memberId' })
    }
  };
  Rental.init({
    rental_code: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    returned_date: DataTypes.DATE,
    is_returned: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rental',
  });
  return Rental;
};