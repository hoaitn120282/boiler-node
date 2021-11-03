'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    vat_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      validate: {
        len: {
          args: [10, 15],
          msg: "members.name.validation.nameLenght"
        }
      },
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      validate: {
        len: {
          args: [11, 15],
          msg: "members.name.validation.nameLenght"
        }
      },
    },
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    language_default: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};