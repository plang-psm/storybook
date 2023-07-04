const Story = require('../models/Story');

//@desc Show add page
//@Route GET /stories/add
const addStoryPage = (req, res) => {
  res.render('stories/add');
};

//@desc Process add form
//@Route POST /stories
const postStory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
};

//@desc Show all stories
//@Route GET /stories
const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('stories/index', {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
  // res.render('stories/')
};

//@desc Show single story
//@Route GET /stories/:id
const getSingleStory = async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate('user').lean();

    if (!story) {
      return res.render('error/404');
    }
    res.render('stories/show', {
      story,
    });
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
};

//@desc Show edit page
//@Route GET /stories/edit/:id
const getEditStoryPage = async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();

    if (!story) {
      return res.render('error/404');
    }

    if (story.user != req.user.id) {
      res.redirect('/stories');
    } else {
      res.render('stories/edit', { story });
    }
  } catch (err) {
    console.error(object);
  }
};

//@desc Update story
//@Route PUT /stories/:id
const putStory = async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render('error/404');
    }

    if (story.user != req.user.id) {
      res.redirect('/stories');
    } else {
      story = await Story.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect('/dashboard');
    }
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
};

//@desc Delete story
//@Route DELETE /stories/:id
const deleteStory = async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
};

//@desc User stories
//@Route GET /stories/users/:userId
const getUserStory = async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean();
    console.log(stories.user);

    res.render('stories/index', {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
};

module.exports = {
  addStoryPage,
  postStory,
  getAllStories,
  getSingleStory,
  getEditStoryPage,
  putStory,
  deleteStory,
  getUserStory,
};
