const express = require("express");
const router = express.Router();
const Member = require("../models/member");
const auth = require("../middlewares/auth");

router.get("/members/me", auth, (req, res) => {
  res.send(req.member);
});

router.post("/members/login", async (req, res) => {
  try {
    const member = await Member.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await member.generateJWT();
    res.send({ member, token });
  } catch (e) {
    res.status(404).send({ e: e.message });
  }
});

router.post("/members/logout", auth, async (req, res) => {
  try {
    req.member.tokens = req.member.tokens.filter((item) => {
      return item.token !== req.token;
    });

    await req.member.save();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/members/logoutAll", auth, async (req, res) => {
  try {
    req.member.tokens = [];
    await req.member.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/members", async (req, res) => {
  const member = new Member(req.body);

  try {
    await member.save();

    const token = await member.generateJWT();

    res.status(201).send({ member, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/members/me", auth, async (req, res) => {
  const properties = Object.keys(req.body);

  try {
    const member = req.member;

    properties.forEach((prop) => (member[prop] = req.body[prop]));

    member.save();
    res.send(member);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/members/me", auth, async (req, res) => {
  try {
    req.member.remove();
    res.send(req.member);
  } catch (e) {
    res.status(500).send({ e: e.message });
  }
});

module.exports = router;
