const express = require('express');
const discussionController = require('../controllers/discussionController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Discussion routes
router.get('/', discussionController.getDiscussions);
router.get('/:id', discussionController.getDiscussionById);
router.post('/', discussionController.createDiscussion);
router.put('/:id', discussionController.updateDiscussion);
router.delete('/:id', discussionController.deleteDiscussion);
router.post('/:id/replies', discussionController.addReply);
router.put('/:id/replies/:replyId', discussionController.updateReply);
router.delete('/:id/replies/:replyId', discussionController.deleteReply);
router.post('/:id/like', discussionController.likeDiscussion);
router.post('/:id/replies/:replyId/like', discussionController.likeReply);

module.exports = router;

