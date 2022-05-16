'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Foods', [{
      name: 'филе куриное запеченное',
      protein_a: 22.5,
      protein_v: 0,
      fats_a: 2.38,
      fats_v: 0,
      carbohydrates_f: 0,
      carbohydrates_s: 0.81,
      calories: 116.51,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Foods', null, {});
  }
};
