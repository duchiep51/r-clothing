const express = require("express");
const router = express.Router();
const Member = require("../models/user");
const auth = require("../../middlewares/auth");
const controller = require("../controllers/user");

router.get("/users/me", auth, controller.getProfile);

router.post("/users/login", controller.login);

router.post("/users/logout", auth, controller.logout);

router.post("/users/logout-all", auth);

router.post("/users/members", controller.logoutAll);

router.patch("/users/me", auth, controller.editProfile);

router.delete("/users/me", auth, controller.deleteProfile);

module.exports = router;
