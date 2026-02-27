const express = require("express");
const { login, signup, logoutUser, getProfile} = require("../controllers/userController.js");
const  auth = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);  // login should usually be POST, not GET
router.get("/profile", auth, getProfile);
router.post("/logout", auth, logoutUser); // logout better as POST


module.exports = router;