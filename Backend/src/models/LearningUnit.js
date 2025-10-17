const mongoose = require('mongoose');

const learningUnitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Learning unit title is required'],
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
  order: {
    type: Number,
    required: [true, 'Learning unit order is required']
  },
  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  resources: [{
    title: String,
    url: String,
    type: String,
    description: String
  }],
  objectives: [String],
  prerequisites: [String],
  estimatedTime: {
    type: Number, // in minutes
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  // Student progress tracking
  completedBy: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  }]
}, {
  timestamps: true
});

// Indexes
learningUnitSchema.index({ course: 1, order: 1 });
learningUnitSchema.index({ isPublished: 1 });

module.exports = mongoose.model('LearningUnit', learningUnitSchema);