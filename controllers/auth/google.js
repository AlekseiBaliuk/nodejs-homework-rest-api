const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const google = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`http://localhost:8085/?token=${token}`);
};

module.exports = google;
