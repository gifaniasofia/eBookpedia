'use strict';
const members = require('../data/members.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    members.forEach(member => {
      member.createdAt = new Date();
      member.updatedAt = new Date();
    })

    return queryInterface.bulkInsert('Members', members, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Members', null, {});
  }
};
