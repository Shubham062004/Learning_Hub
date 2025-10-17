const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.getLectures = async (req, res) => {
  try {
    const { course, instructor, search, page = 1, limit = 10 } = req.query;

    const filter = { isPublished: true };
    
    if (course) filter.course = course;
    if (instructor) filter.instructor = instructor;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const lectures = await Lecture.find(filter)
      .populate('course', 'title category')
      .populate('instructor', 'name email profilePic')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Lecture.countDocuments(filter);

    res.json({
      lectures,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get lectures error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch lectures', 
      error: error.message 
    });
  }
};

exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)
      .populate('course', 'title category')
      .populate('instructor', 'name email profilePic')
      .populate('watchedBy.user', 'name email');
    
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    res.json(lecture);
  } catch (error) {
    console.error('Get lecture error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch lecture', 
      error: error.message 
    });
  }
};

exports.createLecture = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const lectureData = {
      ...req.body,
      instructor: req.user.id
    };

    const lecture = new Lecture(lectureData);
    await lecture.save();

    res.status(201).json({
      message: 'Lecture created successfully',
      lecture
    });
  } catch (error) {
    console.error('Create lecture error:', error);
    res.status(500).json({ 
      message: 'Failed to create lecture', 
      error: error.message 
    });
  }
};

exports.updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    res.json({
      message: 'Lecture updated successfully',
      lecture
    });
  } catch (error) {
    console.error('Update lecture error:', error);
    res.status(500).json({ 
      message: 'Failed to update lecture', 
      error: error.message 
    });
  }
};

exports.deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);

    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    res.json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    console.error('Delete lecture error:', error);
    res.status(500).json({ 
      message: 'Failed to delete lecture', 
      error: error.message 
    });
  }
};

exports.markAsWatched = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // Check if user is enrolled in the course
    const course = await Course.findById(lecture.course);
    const isEnrolled = course.students.some(
      student => student.user.toString() === req.user.id
    );

    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Check if already watched
    const alreadyWatched = lecture.watchedBy.some(
      w => w.user.toString() === req.user.id
    );

    if (!alreadyWatched) {
      lecture.watchedBy.push({
        user: req.user.id,
        watchedAt: new Date()
      });
      lecture.statistics.views += 1;
      await lecture.save();
    }

    res.json({ message: 'Lecture marked as watched' });
  } catch (error) {
    console.error('Mark as watched error:', error);
    res.status(500).json({ 
      message: 'Failed to mark lecture as watched', 
      error: error.message 
    });
  }
};

