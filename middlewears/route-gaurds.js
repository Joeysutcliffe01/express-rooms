const requireLogin = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/login");
    return;
  }

  next();
};

const requireToBeLogedOut = (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect("/profile");
  }

  next();
};

const objectWeWanrToExport = {
  requireLogin,
  requireToBeLogedOut,
};

module.exports = objectWeWanrToExport;
