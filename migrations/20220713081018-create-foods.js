'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Foods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      protein_a: {
        type: Sequelize.DOUBLE
      },
      protein_v: {
        type: Sequelize.DOUBLE
      },
      fats_a: {
        type: Sequelize.DOUBLE
      },
      fats_v: {
        type: Sequelize.DOUBLE
      },
      carbohydrates_f: {
        type: Sequelize.DOUBLE
      },
      carbohydrates_s: {
        type: Sequelize.DOUBLE
      },
      calories: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Foods');
  }
};