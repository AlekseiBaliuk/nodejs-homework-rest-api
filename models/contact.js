const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactModel = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);


const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
});

const contactsJoiStatusSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error("missing field favorite")),
});

// module.exports = { contactsJoiSchema, contactsJoiStatusSchema };

const Contact = model("contact", contactModel);

module.exports = { Contact, contactsJoiSchema, contactsJoiStatusSchema };
