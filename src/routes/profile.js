const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName},Your Profile Updated Successfull!!!`,
      data: loggedInUser,
    });

    console.log(loggedInuser);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//forgot password
profileRouter.patch("/profile/change-password", userAuth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = req.user;
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: "Password changed successfully." });
    } catch (err) {
      res.status(500).send("ERROR: " + err.message);
    }
  });

module.exports = profileRouter;
