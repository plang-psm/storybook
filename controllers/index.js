const Story = require('../models/Story');

//@desc Login/Landing Page
//@Route GET /
const getHome = (req, res) => {
  res.render('login', { layout: 'login' });
};

//@desc Dashboard
//@Route GET /dashboard
const getDashboard = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
};

module.exports = {
  getHome,
  getDashboard,
};
