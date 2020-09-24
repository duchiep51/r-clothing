const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.methods.toJSON = function () {
  const member = this;
  const memberObject = member.toObject();

  delete memberObject.password;
  delete memberObject.tokens;

  return memberObject;
};

// generate jwt
schema.methods.generateJWT = async function () {
  const member = this;
  const token = jwt.sign({ id: member.id.toString() }, "thuongthuong");

  member.tokens = member.tokens.concat({ token });
  await member.save();

  return token;
};

// check login
schema.statics.findByCredentials = async (email, password) => {
  const member = await Member.findOne({ email });

  if (!member) {
    throw new Error("Unable to login!");
  }

  const isMatch = await bcrypt.compare(password, member.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return member;
};

// hash the password before saving
schema.pre("save", async function (next) {
  const member = this;

  if (member.isModified("password")) {
    member.password = await bcrypt.hash(member.password, 8);
  }

  next();
});

const Member = mongoose.model("Member", schema);

module.exports = Member;
