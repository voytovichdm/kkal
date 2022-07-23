'use strict';
const { Model } = require('sequelize');

module.exports = class JoinUserAndMeals extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      mealsId: {
        type:DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'JoinUserAndMeals',
    });
  }
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'userId'});
    this.belongsTo(models.Meals, { foreignKey: 'mealsId'});
  }
}
