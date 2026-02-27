const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) return res.status(401).send("No token");

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch {
//     res.status(400).send("Invalid token");
//   }
// };

  

module.exports = async (req, res, next) => {
  try {
    const cookieHeader = req.headers.cookie || "";
    const tokenFromHeader = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("refreshToken="))
      ?.split("=")[1];

    const token = req.cookies?.refreshToken || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

   
