const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateFavoriteById = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = updateFavoriteById;
