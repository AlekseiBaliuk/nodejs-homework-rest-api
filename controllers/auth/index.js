const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./verifyEmail");

module.exports = {
  signup,
  login,
  logout,
  updateSubscription,
  verifyEmail,
  resendVerifyEmail,
};
