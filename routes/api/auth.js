const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validation, auth, passport } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const {
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscrSchema,
} = require("../../models");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlWrapper(ctrl.google)
);

router.post("/signup", validation(joiSignUpSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/:id/users",
  auth,
  validation(joiSubscrSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
