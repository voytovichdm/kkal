'use strict';
const { Model } = require('sequelize');

module.exports = class Foods extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      protein_a: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      protein_v: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      fats_a: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      fats_v: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      carbohydrates_f: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      carbohydrates_s: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      calories: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Foods',
    })
  }
  static associate(models) {
    // define association here
  }
}