'use strict';
const { Model } = require('sequelize');

module.exports = class Meals extends Model {
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
      },
      meal: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Meals',
    })
  }
  static associate(models) {
    this.belongsToMany(models.Users, {through: models.JoinUserAndMeals, foreignKey: 'mealsId'});
  }
}