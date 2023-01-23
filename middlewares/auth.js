const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer" && !token) {
      throw HttpError(401, "Not authorized");
    }

    // const payload = jwt.verify(token, SECRET_KEY);
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = auth;
