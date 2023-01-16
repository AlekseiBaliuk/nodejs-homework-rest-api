const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
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

contactSchema.post("save", handleMongooseError);

const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
});

const contactsJoiStatusSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error("missing field favorite")),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactsJoiSchema, contactsJoiStatusSchema };
