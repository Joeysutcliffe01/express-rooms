const router = require("express").Router();
const { requireLogin } = require("../middlewears/route-gaurds");

router.use(requireLogin);
const renderProfilePage = (req, res) => {
  res.render("profile", { user: req.session.currentUser });
};

router.get("profile", renderProfilePage);

// const rednerDetailspage = (req, res) => {
//   res.send("this is a route that we can only see if we are loged in");
// };

// router.get("/details", rednerDetailspage);

module.exports = router;
