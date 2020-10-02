const User = require("../models/user");
const auth = require("../../middlewares/auth");
const Error = require("../utils/error");

module.exports.getProfile = async (req, res) => {
  res.send(req.user);
};

module.exports.signUp = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });

    const token = await user.generateJWT();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(Error(e));
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateJWT();
    res.send({ user, token });
  } catch (e) {
    res.status(401).send(Error(e));
  }
};

module.exports.signOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((item) => {
      return item.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(Error(e));
  }
};

module.exports.signOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.editProfile = async (req, res) => {
  const properties = Object.keys(req.body);

  try {
    const user = req.user;

    properties.forEach((prop) => (user[prop] = req.body[prop]));

    user.save();
    res.send(user);
  } catch (e) {
    res.status(404).send(Error(e));
  }
};

module.exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.isDeleted = true;

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(500).send(Error(e));
  }
};
