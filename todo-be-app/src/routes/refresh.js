const express = require("express");
const router = express.Router();

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Look for the refresh token in the cookies
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); // Verify refresh token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Set access token expiration time
      }
    );

    // Send back the new access token in a cookie
    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure for production
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes expiration
    });

    res.json({ message: "Access token refreshed" });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});
module.exports = router;
