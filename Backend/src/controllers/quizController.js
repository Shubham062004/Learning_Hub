const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.getQuizzes = async (req, res) => {
  try {
    const { course, type, difficulty, page = 1, limit = 10 } = req.query;

    const filter = { 'availability.isPublished': true };
    
    if (course) filter.course = course;
    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;

    const quizzes = await Quiz.find(filter)
      .populate('course', 'title category')
      .populate('instructor', 'name email')
      .sort({ 'availability.startDate': -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Quiz.countDocuments(filter);

    res.json({
      quizzes,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch quizzes', 
      error: error.message 
    });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('course', 'title category')
      .populate('instructor', 'name email profilePic');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch quiz', 
      error: error.message 
    });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const quizData = {
      ...req.body,
      instructor: req.user.id
    };

    const quiz = new Quiz(quizData);
    await quiz.save();

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz
    });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to create quiz', 
      error: error.message 
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({
      message: 'Quiz updated successfully',
      quiz
    });
  } catch (error) {
    console.error('Update quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to update quiz', 
      error: error.message 
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to delete quiz', 
      error: error.message 
    });
  }
};

exports.startQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if user is enrolled in the course
    const course = await Course.findById(quiz.course);
    const isEnrolled = course.students.some(
      student => student.user.toString() === req.user.id
    );

    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Check if quiz is available
    const now = new Date();
    if (quiz.availability.startDate && now < quiz.availability.startDate) {
      return res.status(400).json({ message: 'Quiz not yet available' });
    }
    if (quiz.availability.endDate && now > quiz.availability.endDate) {
      return res.status(400).json({ message: 'Quiz has ended' });
    }

    // Check attempts
    const userAttempts = quiz.submissions.filter(
      s => s.student.toString() === req.user.id
    );

    if (userAttempts.length >= quiz.attempts.maxAttempts) {
      return res.status(400).json({ message: 'Maximum attempts reached' });
    }

    // Create new submission
    const submission = {
      student: req.user.id,
      attempt: userAttempts.length + 1,
      startedAt: new Date(),
      status: 'in-progress',
      answers: []
    };

    quiz.submissions.push(submission);
    await quiz.save();

    res.json({
      message: 'Quiz started successfully',
      submissionId: submission._id,
      timeLimit: quiz.timeLimit,
      questions: quiz.questions.map(q => ({
        _id: q._id,
        question: q.question,
        type: q.type,
        options: q.options,
        points: q.points,
        order: q.order
      }))
    });
  } catch (error) {
    console.error('Start quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to start quiz', 
      error: error.message 
    });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Find user's current submission
    const submission = quiz.submissions.find(
      s => s.student.toString() === req.user.id && s.status === 'in-progress'
    );

    if (!submission) {
      return res.status(400).json({ message: 'No active quiz session found' });
    }

    // Calculate score
    let totalScore = 0;
    const processedAnswers = answers.map(answer => {
      const question = quiz.questions.id(answer.questionId);
      const isCorrect = question.correctAnswer === answer.answer;
      const points = isCorrect ? question.points : 0;
      totalScore += points;

      return {
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        points
      };
    });

    const percentage = Math.round((totalScore / quiz.maxScore) * 100);

    // Update submission
    submission.answers = processedAnswers;
    submission.submittedAt = new Date();
    submission.timeSpent = timeSpent;
    submission.score = totalScore;
    submission.percentage = percentage;
    submission.status = 'submitted';

    // Update quiz statistics
    quiz.statistics.totalAttempts += 1;
    const allScores = quiz.submissions
      .filter(s => s.status === 'submitted')
      .map(s => s.score);
    quiz.statistics.averageScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;

    await quiz.save();

    res.json({
      message: 'Quiz submitted successfully',
      score: totalScore,
      percentage,
      maxScore: quiz.maxScore,
      correctAnswers: processedAnswers.filter(a => a.isCorrect).length,
      totalQuestions: quiz.questions.length
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to submit quiz', 
      error: error.message 
    });
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const userSubmissions = quiz.submissions.filter(
      s => s.student.toString() === req.user.id
    );

    if (userSubmissions.length === 0) {
      return res.status(404).json({ message: 'No submissions found' });
    }

    const latestSubmission = userSubmissions[userSubmissions.length - 1];

    res.json({
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        type: quiz.type,
        maxScore: quiz.maxScore
      },
      submission: latestSubmission,
      allSubmissions: userSubmissions,
      statistics: quiz.statistics
    });
  } catch (error) {
    console.error('Get quiz results error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch quiz results', 
      error: error.message 
    });
  }
};

