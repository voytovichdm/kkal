'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      protein_a: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      protein_v: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      fats_a: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      fats_v: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      carbohydrates_f: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      carbohydrates_s: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      calories: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      meal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meals');
  }
};