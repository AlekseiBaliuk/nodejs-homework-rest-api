const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const signup = async (req, res) => {
  const {name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `User with ${email} already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({name, email, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
