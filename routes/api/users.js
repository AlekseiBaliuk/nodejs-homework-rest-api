const express = require("express");

const { users: ctrl } = require("../../controllers");

const { auth, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

// const { joiSignUpSchema, joiLoginSchema } = require("../../models");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/avatars", auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
