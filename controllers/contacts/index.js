const addContact = require("./addContact");
const getContacts = require("./getContacts");
const getById = require("./getById");
const updateById = require("./updateById");
const updateFavoriteById = require('./updateFavoriteById');
const removeById = require('./removeById.js');

module.exports = {
  getContacts,
  getById,
  addContact,
  updateById,
  updateFavoriteById,
  removeById,
};
