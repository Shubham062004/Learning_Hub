const express = require('express');
const lectureController = require('../controllers/lectureController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Lecture routes
router.get('/', lectureController.getLectures);
router.get('/:id', lectureController.getLectureById);
router.post('/', admin, lectureController.createLecture);
router.put('/:id', admin, lectureController.updateLecture);
router.delete('/:id', admin, lectureController.deleteLecture);
router.post('/:id/watch', lectureController.markAsWatched);

module.exports = router;

