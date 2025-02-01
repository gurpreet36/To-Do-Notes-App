"use strict";
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Note", {
      Id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Note');
  },
};
