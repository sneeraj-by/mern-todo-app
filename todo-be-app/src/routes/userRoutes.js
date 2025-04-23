const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get_users", getUsers);
router.post("/logout", logoutUser);

module.exports = router;
