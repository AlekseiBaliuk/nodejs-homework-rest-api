const { Contact } = require("../../models");

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt"); 
  res.json(contacts);
};

module.exports = getContacts;
