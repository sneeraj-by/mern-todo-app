const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = null;

  // First try Authorization header
  const authHeader = req.header("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Fallback to token in cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token is not valid" });
  }
};
// const authMiddleware = (req, res, next) => {

//   const authHeader = req.header("Authorization");
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Token malformed, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Token is not valid" });
//   }
// };

module.exports = authMiddleware;
