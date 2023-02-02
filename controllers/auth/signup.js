const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = v4();

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Confirm registration",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Press co confirm your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

module.exports = signup;
