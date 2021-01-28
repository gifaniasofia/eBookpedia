'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsToMany(models.Rental, {
        through: models.RentalDetail,
        foreignKey: 'bookId'
      })
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter a book title'
        }
      }
    },
    isbn: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please enter the book's ISBN`
        }
      }
    },
    published_year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Please enter the year of release`
        },
        greaterThan1900(value) {
          if (parseInt(value) < 1900) {
            throw new Error(`The minimum published year is 1900`);
          }
        }
      }
    },
    publisher: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please enter the publisher's name`
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please enter the author's name`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Please select a book category`
        }
      }
    },
    rent_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Please specify the book rental price`
        },
        greaterThanZero(value) {
          if (parseInt(value) <= 0) {
            throw new Error(`The minimum of rental price is 0`);
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};