const express = require('express');
const assignmentController = require('../controllers/assignmentController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Assignment routes
router.get('/', assignmentController.getAssignments);
router.get('/:id', assignmentController.getAssignmentById);
router.post('/', admin, assignmentController.createAssignment);
router.put('/:id', admin, assignmentController.updateAssignment);
router.delete('/:id', admin, assignmentController.deleteAssignment);
router.post('/:id/submit', assignmentController.submitAssignment);
router.get('/:id/submissions', admin, assignmentController.getSubmissions);
router.put('/:id/grade', admin, assignmentController.gradeAssignment);

module.exports = router;

