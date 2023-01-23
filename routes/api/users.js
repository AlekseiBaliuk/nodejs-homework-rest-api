const express = require("express");

const { users: ctrl } = require("../../controllers");

const { auth } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

// const { joiSignUpSchema, joiLoginSchema } = require("../../models");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
