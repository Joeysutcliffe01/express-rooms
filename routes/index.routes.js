const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index", { user: req.session.currentUser });
  // res.render("index");
});

module.exports = router;
