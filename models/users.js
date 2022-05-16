'use strict';
const { Model } = require('sequelize');

module.exports = class Users extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Users',
    });
  }
  static associate(models) {
    this.belongsToMany(models.Meals, {through: models.JoinUserAndMeals, foreignKey: 'userId'});
  }
}
