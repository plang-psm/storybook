const express = require('express');
const router = express.Router();
const stories = require('../controllers/stories');
const { ensureAuth } = require('../middleware/auth');

router.get('/add', ensureAuth, stories.addStoryPage);
router.post('/', ensureAuth, stories.postStory);
router.get('/', ensureAuth, stories.getAllStories);
router.get('/:id', ensureAuth, stories.getSingleStory);
router.get('/edit/:id', ensureAuth, stories.getEditStoryPage);
router.put('/:id', ensureAuth, stories.putStory);
router.delete('/:id', ensureAuth, stories.deleteStory);
router.get('/user/:userId', ensureAuth, stories.getUserStory);

module.exports = router;
