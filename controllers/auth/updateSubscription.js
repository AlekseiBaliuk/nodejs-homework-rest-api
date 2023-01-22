const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const updUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updUser) {
    throw HttpError(404, "Not found");
  }
  res.json(updUser);
};

module.exports = updateSubscription;
