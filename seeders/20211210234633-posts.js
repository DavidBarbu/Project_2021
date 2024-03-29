'use strict';
const { query } = require('express');
const { database } = require('faker');
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const posts = [];

    for (let i = 0; i < 200; i++) {
      const userId=Math.floor(Math.random()*(allUsers.length-1));
      posts.push({
        userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Posts', null, {});
     
  }
};
