const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Quiz = require('../models/Quiz');
const SupportTicket = require('../models/SupportTicket');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate('enrolledCourses.course', 'title thumbnail instructor totalEnrollments')
      .populate('enrolledCourses.course.instructor', 'name');

    // Get recent assignments
    const recentAssignments = await Assignment.find({
      'submissions.student': { $ne: userId },
      course: { $in: user.enrolledCourses.map(e => e.course._id) }
    })
    .populate('course', 'title')
    .sort({ dueDate: 1 })
    .limit(5);

    // Get recent quizzes
    const recentQuizzes = await Quiz.find({
      'attempts.student': { $ne: userId },
      course: { $in: user.enrolledCourses.map(e => e.course._id) }
    })
    .populate('course', 'title')
    .sort({ createdAt: -1 })
    .limit(5);

    // Calculate overall progress
    const totalCourses = user.enrolledCourses.length;
    const totalProgress = user.enrolledCourses.reduce((sum, e) => sum + e.progress, 0);
    const overallProgress = totalCourses > 0 ? totalProgress / totalCourses : 0;

    res.json({
      user: {
        name: user.name,
        email: user.email,
        totalPoints: user.totalPoints,
        level: user.level,
        achievements: user.achievements
      },
      stats: {
        enrolledCourses: totalCourses,
        overallProgress: Math.round(overallProgress),
        totalPoints: user.totalPoints,
        completedAssignments: user.enrolledCourses.reduce((sum, e) => sum + e.completedAssignments.length, 0),
        completedQuizzes: user.enrolledCourses.reduce((sum, e) => sum + e.completedQuizzes.length, 0)
      },
      enrolledCourses: user.enrolledCourses,
      recentAssignments,
      recentQuizzes
    });
  } catch (error) {
    console.error('❌ Get dashboard error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch dashboard data', 
      error: error.message 
    });
  }
};

exports.getOverallProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const progressData = user.enrolledCourses.map(enrollment => ({
      courseId: enrollment.course,
      progress: enrollment.progress,
      completedLectures: enrollment.completedLectures.length,
      completedAssignments: enrollment.completedAssignments.length,
      completedQuizzes: enrollment.completedQuizzes.length
    }));

    res.json(progressData);
  } catch (error) {
    console.error('❌ Get overall progress error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch progress data', 
      error: error.message 
    });
  }
};

exports.markLectureComplete = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    
    // Find the course enrollment
    const Lecture = require('../models/Lecture');
    const lecture = await Lecture.findById(lectureId);
    
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    const enrollment = user.enrolledCourses.find(
      e => e.course.toString() === lecture.course.toString()
    );

    if (!enrollment) {
      return res.status(400).json({ message: 'Not enrolled in this course' });
    }

    // Check if already completed
    if (!enrollment.completedLectures.includes(lectureId)) {
      enrollment.completedLectures.push(lectureId);
      
      // Award points
      user.totalPoints += 10;
      
      // Update progress (simplified calculation)
      const course = await Course.findById(lecture.course);
      const totalLectures = course.lectures.length;
      const completedLectures = enrollment.completedLectures.length;
      enrollment.progress = Math.round((completedLectures / totalLectures) * 100);
      
      await user.save();
    }

    res.json({ 
      message: 'Lecture marked as complete',
      pointsAwarded: 10,
      newProgress: enrollment.progress
    });
  } catch (error) {
    console.error('❌ Mark lecture complete error:', error);
    res.status(500).json({ 
      message: 'Failed to mark lecture complete', 
      error: error.message 
    });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    const assignments = await Assignment.find({
      course: { $in: user.enrolledCourses.map(e => e.course) }
    })
    .populate('course', 'title')
    .sort({ dueDate: 1 });

    res.json(assignments);
  } catch (error) {
    console.error('❌ Get assignments error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch assignments', 
      error: error.message 
    });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('course', 'title')
      .populate('instructor', 'name');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    console.error('❌ Get assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch assignment', 
      error: error.message 
    });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      s => s.student.toString() === userId
    );

    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }

    // Add submission
    assignment.submissions.push({
      student: userId,
      submittedAt: new Date(),
      content,
      status: 'submitted'
    });

    await assignment.save();

    // Update user's completed assignments
    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      e => e.course.toString() === assignment.course.toString()
    );

    if (enrollment && !enrollment.completedAssignments.includes(assignmentId)) {
      enrollment.completedAssignments.push(assignmentId);
      user.totalPoints += 20; // Award points for assignment submission
      await user.save();
    }

    res.json({ 
      message: 'Assignment submitted successfully',
      pointsAwarded: 20
    });
  } catch (error) {
    console.error('❌ Submit assignment error:', error);
    res.status(500).json({ 
      message: 'Failed to submit assignment', 
      error: error.message 
    });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    const quizzes = await Quiz.find({
      course: { $in: user.enrolledCourses.map(e => e.course) }
    })
    .populate('course', 'title')
    .sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (error) {
    console.error('❌ Get quizzes error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch quizzes', 
      error: error.message 
    });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('course', 'title')
      .populate('instructor', 'name');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Remove correct answers from questions for security
    const sanitizedQuiz = quiz.toObject();
    sanitizedQuiz.questions = quiz.questions.map(q => ({
      question: q.question,
      type: q.type,
      options: q.options,
      points: q.points
    }));

    res.json(sanitizedQuiz);
  } catch (error) {
    console.error('❌ Get quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch quiz', 
      error: error.message 
    });
  }
};

exports.startQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const userId = req.user.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check attempts limit
    const userAttempts = quiz.attempts.filter(
      a => a.student.toString() === userId
    );

    if (userAttempts.length >= quiz.settings.attemptsAllowed) {
      return res.status(400).json({ message: 'Maximum attempts reached' });
    }

    // Create new attempt
    quiz.attempts.push({
      student: userId,
      startedAt: new Date(),
      status: 'in-progress'
    });

    await quiz.save();

    res.json({ 
      message: 'Quiz started successfully',
      attemptId: quiz.attempts[quiz.attempts.length - 1]._id,
      timeLimit: quiz.settings.timeLimit
    });
  } catch (error) {
    console.error('❌ Start quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to start quiz', 
      error: error.message 
    });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const userId = req.user.id;
    const { answers, attemptId } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const attempt = quiz.attempts.id(attemptId);
    if (!attempt || attempt.student.toString() !== userId) {
      return res.status(404).json({ message: 'Quiz attempt not found' });
    }

    // Calculate score
    let totalPoints = 0;
    let earnedPoints = 0;

    const gradedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index];
      const isCorrect = answer === question.correctAnswer;
      const pointsEarned = isCorrect ? question.points : 0;
      
      totalPoints += question.points;
      earnedPoints += pointsEarned;

      return {
        questionIndex: index,
        answer,
        isCorrect,
        pointsEarned
      };
    });

    const percentage = Math.round((earnedPoints / totalPoints) * 100);

    // Update attempt
    attempt.submittedAt = new Date();
    attempt.answers = gradedAnswers;
    attempt.score = earnedPoints;
    attempt.totalPoints = totalPoints;
    attempt.percentage = percentage;
    attempt.status = 'completed';

    await quiz.save();

    // Update user progress
    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      e => e.course.toString() === quiz.course.toString()
    );

    if (enrollment) {
      const existingQuiz = enrollment.completedQuizzes.find(
        q => q.quiz.toString() === quizId
      );

      if (!existingQuiz) {
        enrollment.completedQuizzes.push({
          quiz: quizId,
          score: percentage,
          completedAt: new Date()
        });
        user.totalPoints += Math.round(earnedPoints); // Award points based on score
        await user.save();
      }
    }

    res.json({ 
      message: 'Quiz submitted successfully',
      score: earnedPoints,
      totalPoints,
      percentage,
      pointsAwarded: Math.round(earnedPoints)
    });
  } catch (error) {
    console.error('❌ Submit quiz error:', error);
    res.status(500).json({ 
      message: 'Failed to submit quiz', 
      error: error.message 
    });
  }
};

exports.getSupportTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await SupportTicket.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    console.error('❌ Get support tickets error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch support tickets', 
      error: error.message 
    });
  }
};

exports.createSupportTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subject, description, category, priority } = req.body;

    const ticket = new SupportTicket({
      user: userId,
      subject,
      description,
      category,
      priority: priority || 'medium',
      messages: [{
        author: userId,
        message: description,
        isStaffReply: false
      }]
    });

    await ticket.save();

    res.status(201).json({ 
      message: 'Support ticket created successfully',
      ticket
    });
  } catch (error) {
    console.error('❌ Create support ticket error:', error);
    res.status(500).json({ 
      message: 'Failed to create support ticket', 
      error: error.message 
    });
  }
};

exports.replySupportTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const userId = req.user.id;
    const { message } = req.body;

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Support ticket not found' });
    }

    if (ticket.user.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    ticket.messages.push({
      author: userId,
      message,
      isStaffReply: false
    });

    ticket.status = 'in-progress';
    await ticket.save();

    res.json({ 
      message: 'Reply added successfully',
      ticket
    });
  } catch (error) {
    console.error('❌ Reply support ticket error:', error);
    res.status(500).json({ 
      message: 'Failed to add reply', 
      error: error.message 
    });
  }
};
