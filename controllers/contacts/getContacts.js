const { Contact } = require("../../models");

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const contacts = await Contact.find(
      { owner: _id, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id name email");
    res.json(contacts);
  } else {
    const contacts = await Contact.find(
      { owner: _id },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id name email");
    res.json(contacts);
  }
};

module.exports = getContacts;
