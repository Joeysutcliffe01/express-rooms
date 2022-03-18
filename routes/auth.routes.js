const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { requireToBeLogedOut } = require("../middlewears/route-gaurds");
// const { route } = require("./index.routes");

// add the required midde wear here later

router.get("/signup", (req, res) => {
  console.log("wtf");

  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const userExists = await User.exists({
      email: req.body.email,
    });

    if (userExists) {
      res.render("signup", { error: "Hey, this username already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });

    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.render("signup", { error: " We have an error here" });
  }
});

router.use("/login", requireToBeLogedOut);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const user = await user.findOne({ email: req.body.email });
    const hashFromDb = user.password;
    const passwordCorrect = await bcrypt.compare(req.body.password, hashFromDb);

    if (passwordCorrect) {
      throw Error("Password incorect");
    }

    req.session.currentUser = user;
    res.redirect("/profile");
  } catch (err) {
    res.render("login", {
      error: "Check either your email or password, you messed up somewhere",
    });
  }
});

router.post("login");

module.exports = router;
