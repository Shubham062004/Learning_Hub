const express = require('express');
const { body } = require('express-validator');
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Validation rules
const courseValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be less than 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description is required and must be less than 1000 characters'),
  body('category')
    .isIn(['Frontend', 'Backend', 'Programming Skills', 'Data Science', 'Machine Learning', 'AI', 'Web Development', 'Mobile Development', 'DevOps', 'Other'])
    .withMessage('Invalid category'),
  body('level')
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Invalid level'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('duration.weeks')
    .isInt({ min: 1 })
    .withMessage('Duration in weeks must be at least 1'),
  body('duration.hoursPerWeek')
    .isInt({ min: 1 })
    .withMessage('Hours per week must be at least 1')
];

// Public routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

// Protected routes
router.post('/', auth, admin, courseValidation, courseController.createCourse);
router.put('/:id', auth, admin, courseController.updateCourse);
router.delete('/:id', auth, admin, courseController.deleteCourse);
router.post('/:id/enroll', auth, courseController.enrollInCourse);
router.get('/:id/students', auth, courseController.getCourseStudents);
router.get('/user/my-courses', auth, courseController.getUserCourses);
router.get('/instructor/my-courses', auth, courseController.getInstructorCourses);

module.exports = router;

