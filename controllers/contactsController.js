// const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { NotFound } = require("http-errors");

// const contactsSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().pattern(/^\d+$/).required(),
// });

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);
    if (!contactById) {
      throw new NotFound("Not found");
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    // const { error } = contactsSchema.validate(req.body);
    // if (error) {
    //   throw new BadRequest("missing required name field");
    // }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      throw new NotFound("Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    // const { error } = contactsSchema.validate(req.body);
    // if (error) {
    //   throw new BadRequest("missing fields");
    // }
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      throw new NotFound("Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getById,
  add,
  removeById,
  updateById,
};
