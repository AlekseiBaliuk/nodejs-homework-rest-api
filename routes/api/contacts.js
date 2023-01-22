const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { isValidId, validation, auth } = require("../../middlewares");

const {
  contactsJoiSchema,
  contactsJoiStatusSchema,
} = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  auth,
  validation(contactsJoiSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(contactsJoiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(contactsJoiStatusSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
