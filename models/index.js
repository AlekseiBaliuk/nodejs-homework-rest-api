const {
  Contact,
  contactsJoiSchema,
  contactsJoiStatusSchema,
} = require("./contact");

const {
  User,
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscrSchema,
  joiVerifyEmailSchema,
} = require("./user");

module.exports = {
  Contact,
  contactsJoiSchema,
  contactsJoiStatusSchema,
  User,
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscrSchema,
  joiVerifyEmailSchema,
};
