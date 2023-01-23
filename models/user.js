const Joi = require("joi");
const bcrypt = require("bcrypt");

const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
const emailRegexp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.post("save", handleMongooseError);

const joiSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .error(new Error("Invalid email format example@example.com")),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string().required().valid(Joi.ref("password")),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const joiSubscrSchema = Joi.object({
  subscription: Joi.string()
    .trim()
    .valid("starter", "pro", "business")
    .required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscrSchema
};
