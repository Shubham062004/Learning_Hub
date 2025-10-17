const express = require('express');
const learningUnitController = require('../controllers/learningUnitController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Learning unit routes
router.get('/', learningUnitController.getLearningUnits);
router.get('/:id', learningUnitController.getLearningUnitById);
router.post('/', admin, learningUnitController.createLearningUnit);
router.put('/:id', admin, learningUnitController.updateLearningUnit);
router.delete('/:id', admin, learningUnitController.deleteLearningUnit);
router.post('/:id/complete', learningUnitController.markAsComplete);
router.get('/:id/progress', learningUnitController.getProgress);

module.exports = router;

