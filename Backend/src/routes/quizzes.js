const express = require('express');
const quizController = require('../controllers/quizController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Quiz routes
router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getQuizById);
router.post('/', admin, quizController.createQuiz);
router.put('/:id', admin, quizController.updateQuiz);
router.delete('/:id', admin, quizController.deleteQuiz);
router.post('/:id/start', quizController.startQuiz);
router.post('/:id/submit', quizController.submitQuiz);
router.get('/:id/results', quizController.getQuizResults);

module.exports = router;

