const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 1,
      maxlength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of the user!",
      maxlength: 500,
    },
    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.every(
            (skill) => typeof skill === "string" && skill.length <= 50
          );
        },
        message: "Each skill must be a string with max length 50",
      },
    },
    contact: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[6-9]\d{9}$/.test(value); // Indian mobile number pattern
        },
        message: "Invalid contact number",
      },
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatedPassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
