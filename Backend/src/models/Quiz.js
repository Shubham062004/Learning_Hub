const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: [true, 'Question text is required']
    },
    type: {
      type: String,
      enum: ['multiple-choice', 'true-false', 'short-answer', 'essay'],
      default: 'multiple-choice'
    },
    options: [String], // For multiple choice questions
    correctAnswer: String, // or Number for option index
    points: {
      type: Number,
      default: 1,
      min: [1, 'Points must be at least 1']
    },
    explanation: String
  }],
  settings: {
    timeLimit: {
      type: Number, // in minutes
      default: 30
    },
    attemptsAllowed: {
      type: Number,
      default: 1,
      min: [1, 'At least 1 attempt must be allowed']
    },
    randomizeQuestions: {
      type: Boolean,
      default: false
    },
    randomizeOptions: {
      type: Boolean,
      default: false
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true
    },
    showScoreImmediately: {
      type: Boolean,
      default: true
    }
  },
  // Quiz attempts
  attempts: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    submittedAt: Date,
    answers: [{
      questionIndex: Number,
      answer: String,
      isCorrect: Boolean,
      pointsEarned: Number
    }],
    score: {
      type: Number,
      default: 0
    },
    totalPoints: Number,
    percentage: Number,
    timeSpent: Number, // in minutes
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress'
    }
  }],
  // Status
  isPublished: {
    type: Boolean,
    default: false
  },
  availableFrom: Date,
  availableUntil: Date,
  // Analytics
  totalAttempts: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
quizSchema.index({ course: 1 });
quizSchema.index({ instructor: 1 });
quizSchema.index({ 'attempts.student': 1 });

module.exports = mongoose.model('Quiz', quizSchema);