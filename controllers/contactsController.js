const { NotFound } = require("http-errors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);
    if (!contactById) {
      throw new NotFound("Not found");
    }
    res.send(contactById);
  } catch (error) {
    next(error);
  }
};

exports.add = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
};

exports.removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      throw new NotFound("Not found");
    }
    res.send({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      throw new NotFound("Not found");
    }
    res.send(updatedContact);
  } catch (error) {
    next(error);
  }
};
