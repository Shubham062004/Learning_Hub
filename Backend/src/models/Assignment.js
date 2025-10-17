const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Assignment description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
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
  type: {
    type: String,
    enum: ['essay', 'project', 'coding', 'presentation', 'other'],
    default: 'essay'
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required']
  },
  resources: [{
    title: String,
    url: String,
    type: String
  }],
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  maxScore: {
    type: Number,
    required: [true, 'Maximum score is required'],
    min: [1, 'Maximum score must be at least 1']
  },
  submissionType: {
    type: String,
    enum: ['text', 'file', 'url', 'both'],
    default: 'text'
  },
  allowedFileTypes: [String], // ['pdf', 'doc', 'zip']
  maxFileSize: {
    type: Number, // in MB
    default: 10
  },
  // Submissions
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    content: {
      text: String,
      fileUrl: String,
      fileName: String,
      url: String
    },
    status: {
      type: String,
      enum: ['submitted', 'graded', 'returned'],
      default: 'submitted'
    },
    score: {
      type: Number,
      min: 0
    },
    feedback: String,
    gradedAt: Date,
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  // Settings
  isPublished: {
    type: Boolean,
    default: false
  },
  allowLateSubmission: {
    type: Boolean,
    default: true
  },
  latePenalty: {
    type: Number, // percentage per day
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
assignmentSchema.index({ course: 1 });
assignmentSchema.index({ instructor: 1 });
assignmentSchema.index({ dueDate: 1 });
assignmentSchema.index({ 'submissions.student': 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);
