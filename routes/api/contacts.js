const express = require("express");
const contactsController = require("../../controllers/contactsController");
const validation = require("../../middlewares/validation");
const contactsSchema = require("../../validationSchemas/contactsSchema");

const router = express.Router();

router.get("/", contactsController.getContacts);

router.get("/:contactId", contactsController.getById);

router.post("/", validation(contactsSchema), contactsController.add);

router.delete("/:contactId", contactsController.removeById);

router.put(
  "/:contactId",
  validation(contactsSchema),
  contactsController.updateById
);

module.exports = router;
