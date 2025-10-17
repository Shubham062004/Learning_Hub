const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.getAssignments = async (req, res) => {
  try {
    const { course, type, status, page = 1, limit = 10 } = req.query;

    const filter = { isPublished: true };
    
    if (course) filter.course = course;
    if (type) filter.type = type;

    const assignments = await Assignment.find(filter)
      .populate('course', 'title category')
      .populate('instructor', 'name email')
      .sort({ dueDate: 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Assignment.countDocuments(filter);

    res.json({
      assignments,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch assignments', 
      error: error.message 
    });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('course', 'title category')
      .populate('instructor', 'name email profilePic');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    console.error('Get assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch assignment', 
      error: error.message 
    });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const assignmentData = {
      ...req.body,
      instructor: req.user.id
    };

    const assignment = new Assignment(assignmentData);
    await assignment.save();

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment
    });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to create assignment', 
      error: error.message 
    });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({
      message: 'Assignment updated successfully',
      assignment
    });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to update assignment', 
      error: error.message 
    });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Delete assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to delete assignment', 
      error: error.message 
    });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { files, textSubmission, urlSubmission, comments } = req.body;
    
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if user is enrolled in the course
    const course = await Course.findById(assignment.course);
    const isEnrolled = course.students.some(
      student => student.user.toString() === req.user.id
    );

    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      s => s.student.toString() === req.user.id
    );

    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }

    // Check if submission is late
    const isLate = new Date() > new Date(assignment.dueDate);
    const latePenalty = isLate ? assignment.lateSubmissionPolicy.penalty : 0;

    const submission = {
      student: req.user.id,
      submittedAt: new Date(),
      status: isLate ? 'late' : 'submitted',
      files: files || [],
      textSubmission: textSubmission || '',
      urlSubmission: urlSubmission || '',
      comments: comments || '',
      isLate,
      latePenalty
    };

    assignment.submissions.push(submission);
    assignment.statistics.totalSubmissions += 1;
    
    if (isLate) {
      assignment.statistics.lateSubmissions += 1;
    } else {
      assignment.statistics.onTimeSubmissions += 1;
    }

    await assignment.save();

    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to submit assignment', 
      error: error.message 
    });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('submissions.student', 'name email')
      .populate('submissions.grade.gradedBy', 'name email');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment.submissions);
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch submissions', 
      error: error.message 
    });
  }
};

exports.gradeAssignment = async (req, res) => {
  try {
    const { submissionId, score, feedback } = req.body;
    
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const submission = assignment.submissions.id(submissionId);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.grade = {
      score,
      feedback,
      gradedBy: req.user.id,
      gradedAt: new Date()
    };
    submission.status = 'graded';

    // Update statistics
    const totalScore = assignment.submissions.reduce((sum, s) => {
      return sum + (s.grade?.score || 0);
    }, 0);
    assignment.statistics.averageScore = totalScore / assignment.submissions.length;

    await assignment.save();

    res.json({ message: 'Assignment graded successfully' });
  } catch (error) {
    console.error('Grade assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to grade assignment', 
      error: error.message 
    });
  }
};

