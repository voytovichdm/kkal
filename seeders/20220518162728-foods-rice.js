'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Foods', [{
      name: 'рис вареный',
      protein_a: 0,
      protein_v: 2.87,
      fats_a: 0,
      fats_v: 0.73,
      carbohydrates_f: 0,
      carbohydrates_s: 28.22,
      calories: 125.57,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Foods', null, {});
  }
};
