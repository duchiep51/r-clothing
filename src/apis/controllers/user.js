const User = require("../models/user");
const auth = require("../../middlewares/auth");

module.exports.getProfile = async (req, res) => {
  res.send(req.user);
};

module.exports.login = async (req, res) => {
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
};

module.exports.logout = async (req, res) => {
  try {
    req.member.tokens = req.member.tokens.filter((item) => {
      return item.token !== req.token;
    });

    await req.member.save();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports.logoutAll = async (req, res) => {
  try {
    req.member.tokens = [];
    await req.member.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.editProfile = async (req, res) => {
  const properties = Object.keys(req.body);

  try {
    const member = req.member;

    properties.forEach((prop) => (member[prop] = req.body[prop]));

    member.save();
    res.send(member);
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports.deleteProfile = async (req, res) => {
  try {
    req.member.remove();
    res.send(req.member);
  } catch (e) {
    res.status(500).send({ e: e.message });
  }
};
