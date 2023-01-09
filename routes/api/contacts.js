const express = require("express");
const ctrl = require("../../controllers");
const validation = require("../../middlewares/validation");
const contactsSchema = require("../../validationSchemas/contactsSchema");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validation(contactsSchema), ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put(
  "/:contactId",
  validation(contactsSchema, "missing required name field"),
  ctrl.updateById
);

module.exports = router;
