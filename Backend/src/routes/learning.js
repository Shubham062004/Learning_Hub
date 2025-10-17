const express = require('express');
const learningController = require('../controllers/learningController');
const auth = require('../middleware/auth');

const router = express.Router();

// All learning routes require authentication
router.use(auth);

// Dashboard and progress
router.get('/dashboard', learningController.getDashboard);
router.get('/progress', learningController.getOverallProgress);
router.post('/lectures/:id/complete', learningController.markLectureComplete);

// Assignments
router.get('/assignments', learningController.getAssignments);
router.get('/assignments/:id', learningController.getAssignmentById);
router.post('/assignments/:id/submit', learningController.submitAssignment);

// Quizzes
router.get('/quizzes', learningController.getQuizzes);
router.get('/quizzes/:id', learningController.getQuizById);
router.post('/quizzes/:id/start', learningController.startQuiz);
router.post('/quizzes/:id/submit', learningController.submitQuiz);

// Support
router.get('/support/tickets', learningController.getSupportTickets);
router.post('/support/tickets', learningController.createSupportTicket);
router.post('/support/tickets/:id/reply', learningController.replySupportTicket);

module.exports = router;
