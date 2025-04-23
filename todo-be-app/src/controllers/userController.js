const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const response = await User.find();
    const usersWithoutPasswords = response.map((user) => {
      const { password, ...userDetails } = user.toObject();
      return userDetails;
    });
    res.status(200).send(usersWithoutPasswords);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    // no need to hash password here, we are doing it at the model level
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong, please try again." });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    res
      .cookie("token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Logged in successfully", userId: user._id });
    // res.json({ accessToken });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong, please try again." });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};
