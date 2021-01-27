'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsToMany(models.Book, {
        through: models.Rental,
        foreignKey: 'memberId'
      })
    }
  };
  Member.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(member, options) {
        if (member.phone_number.substr(0, 2) == '08') {
          member.phone_number = '+62' + member.phone_number.slice(1);
        }
      }
    },
    sequelize,
    modelName: 'Member',
  });
  return Member;
};