const express = require("express");
const router = express.Router();
const Member = require("../models/user");
const auth = require("../../middlewares/auth");
const controller = require("../controllers/user");

router.get("/me", auth, controller.getProfile);

router.post("/login", controller.login);

router.post("/logout", auth, controller.logout);

router.post("/logoutAll", auth);

router.post("/members", controller.logoutAll);

router.patch("/me", auth, controller.editProfile);

router.delete("/me", auth, controller.deleteProfile);

module.exports = router;
