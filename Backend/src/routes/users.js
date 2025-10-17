const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All routes require authentication
router.use(auth);

// User routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/dashboard', userController.getDashboard);
router.get('/courses', userController.getUserCourses);
router.get('/assignments', userController.getUserAssignments);
router.get('/quizzes', userController.getUserQuizzes);
router.get('/points', userController.getUserPoints);
router.get('/achievements', userController.getUserAchievements);

// Admin routes
router.get('/', admin, userController.getAllUsers);
router.get('/:id', admin, userController.getUserById);
router.put('/:id', admin, userController.updateUser);
router.delete('/:id', admin, userController.deleteUser);
router.put('/:id/role', admin, userController.updateUserRole);

module.exports = router;

