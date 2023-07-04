//@desc Login/Landing Page
//@Route GET /
const getDashboard = (req, res) => {
  res.redirect('/dashboard');
};

//@desc Dashboard
//@Route GET /dashboard
const getLogout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = {
  getDashboard,
  getLogout,
};
