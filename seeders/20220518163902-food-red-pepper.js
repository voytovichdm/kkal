'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Foods', [{
      name: 'перец красный',
      protein_a: 0,
      protein_v: 1.71,
      fats_a: 0,
      fats_v: 0.80,
      carbohydrates_f: 0,
      carbohydrates_s: 6.44,
      calories: 37.88,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Foods', null, {});
  }
};
