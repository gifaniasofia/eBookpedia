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
      Member.hasMany(models.Rental, { foreignKey: 'memberId' })
    }

    withPrefixName() {
      if (this.gender === 'male') {
        return `Mr. ${this.name}`
      } else if (this.gender ==='female') {
        return `Mrs. ${this.name}`
      }
    }
  };
  Member.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please enter a member's name`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please enter a member's email`
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please enter a member's address`
        }
      }
    },
    phone_number: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Please enter a member's phone number`
        },
        checkPhoneCode(value) {
          if (!(value.includes('+628'))) {
            throw new Error('The phone number must begin with (628)');
          }
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please select a member's gender`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};