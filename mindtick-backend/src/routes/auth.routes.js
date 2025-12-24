const router = require("express").Router();
const {
  signup,
  login,
  logout,
  profile,
} = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, profile);

module.exports = router;
