const jwt = require("jsonwebtoken");
const Member = require("../apis/models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thuongthuong");
    const member = await Member.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!member) {
      throw new Error();
    }

    req.token = token;
    req.member = member;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate.", message: e.message });
  }
};

module.exports = auth;
