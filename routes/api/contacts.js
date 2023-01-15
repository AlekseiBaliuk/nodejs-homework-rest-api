const express = require("express");

const ctrl = require("../../controllers/contacts");

const { isValidId, validation } = require("../../middlewares");

const {
  contactsJoiSchema,
  contactsJoiStatusSchema,
} = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsJoiSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  isValidId,
  validation(contactsJoiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(contactsJoiStatusSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
