const LearningUnit = require('../models/LearningUnit');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.getLearningUnits = async (req, res) => {
  try {
    const { course, week, type, search, page = 1, limit = 10 } = req.query;

    const filter = { isPublished: true };
    
    if (course) filter.course = course;
    if (week) filter.week = Number(week);
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const learningUnits = await LearningUnit.find(filter)
      .populate('course', 'title category')
      .sort({ week: 1, order: 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await LearningUnit.countDocuments(filter);

    res.json({
      learningUnits,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get learning units error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch learning units', 
      error: error.message 
    });
  }
};

exports.getLearningUnitById = async (req, res) => {
  try {
    const learningUnit = await LearningUnit.findById(req.params.id)
      .populate('course', 'title category')
      .populate('assignments', 'title dueDate points')
      .populate('quizzes', 'title type points timeLimit');
    
    if (!learningUnit) {
      return res.status(404).json({ message: 'Learning unit not found' });
    }

    res.json(learningUnit);
  } catch (error) {
    console.error('Get learning unit error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch learning unit', 
      error: error.message 
    });
  }
};

exports.createLearningUnit = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const learningUnit = new LearningUnit(req.body);
    await learningUnit.save();

    res.status(201).json({
      message: 'Learning unit created successfully',
      learningUnit
    });
  } catch (error) {
    console.error('Create learning unit error:', error);
    res.status(500).json({ 
      message: 'Failed to create learning unit', 
      error: error.message 
    });
  }
};

exports.updateLearningUnit = async (req, res) => {
  try {
    const learningUnit = await LearningUnit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!learningUnit) {
      return res.status(404).json({ message: 'Learning unit not found' });
    }

    res.json({
      message: 'Learning unit updated successfully',
      learningUnit
    });
  } catch (error) {
    console.error('Update learning unit error:', error);
    res.status(500).json({ 
      message: 'Failed to update learning unit', 
      error: error.message 
    });
  }
};

exports.deleteLearningUnit = async (req, res) => {
  try {
    const learningUnit = await LearningUnit.findByIdAndDelete(req.params.id);

    if (!learningUnit) {
      return res.status(404).json({ message: 'Learning unit not found' });
    }

    res.json({ message: 'Learning unit deleted successfully' });
  } catch (error) {
    console.error('Delete learning unit error:', error);
    res.status(500).json({ 
      message: 'Failed to delete learning unit', 
      error: error.message 
    });
  }
};

exports.markAsComplete = async (req, res) => {
  try {
    const learningUnit = await LearningUnit.findById(req.params.id);
    
    if (!learningUnit) {
      return res.status(404).json({ message: 'Learning unit not found' });
    }

    // Check if user is enrolled in the course
    const course = await Course.findById(learningUnit.course);
    const isEnrolled = course.students.some(
      student => student.user.toString() === req.user.id
    );

    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Update or create student progress
    const existingProgress = learningUnit.studentProgress.find(
      p => p.student.toString() === req.user.id
    );

    if (existingProgress) {
      existingProgress.status = 'completed';
      existingProgress.completedAt = new Date();
    } else {
      learningUnit.studentProgress.push({
        student: req.user.id,
        status: 'completed',
        completedAt: new Date()
      });
    }

    await learningUnit.save();

    res.json({ message: 'Learning unit marked as complete' });
  } catch (error) {
    console.error('Mark as complete error:', error);
    res.status(500).json({ 
      message: 'Failed to mark learning unit as complete', 
      error: error.message 
    });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const learningUnit = await LearningUnit.findById(req.params.id);
    
    if (!learningUnit) {
      return res.status(404).json({ message: 'Learning unit not found' });
    }

    const userProgress = learningUnit.studentProgress.find(
      p => p.student.toString() === req.user.id
    );

    res.json({
      learningUnit: {
        _id: learningUnit._id,
        title: learningUnit.title,
        week: learningUnit.week,
        order: learningUnit.order
      },
      progress: userProgress || {
        status: 'not-started',
        timeSpent: 0,
        score: 0
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch progress', 
      error: error.message 
    });
  }
};

