const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validation, auth } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const {
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscrSchema,
  joiVerifyEmailSchema
} = require("../../models");

const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), ctrlWrapper(ctrl.signup));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", validation(joiVerifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/:id/users",
  auth,
  validation(joiSubscrSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
