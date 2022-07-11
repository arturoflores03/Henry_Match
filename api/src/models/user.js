const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  birthday: {
    type: String,
  },
  nickname: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  gender: {
    type: String,
  },
  genderInt: {
    type: String,
    enum: ["male", "female", "both"],
  },
  description: {
    type: String,
  },
  henryLevel: {
    type: String,
    enum: ["m1", "m2", "m3", "m4", "m5", "m6", "pi", "pf", "graduate"],
  },
  likeReceived: {
    type: [String],
  },
  likeGiven: {
    type: [String],
  },
  dislike: {
    type: [String],
  },
  matches: {
    type: [String],
  },
  city: {
    type: String,
  },
  job: {
    type: String,
  },
  career: {
    type: String,
    enum: ["fullstack", "datascience"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  interests: {
    type: [String],
  },
  review: {
    type: [String],
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Users", userSchema);
