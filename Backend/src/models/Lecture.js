const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lecture title is required'],
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
  section: {
    type: String,
    required: [true, 'Section is required']
  },
  order: {
    type: Number,
    required: [true, 'Lecture order is required']
  },
  type: {
    type: String,
    enum: ['video', 'text', 'quiz', 'assignment', 'live'],
    default: 'video'
  },
  content: {
    // For video lectures
    videoUrl: String,
    videoDuration: Number, // in seconds
    videoQuality: [String], // ['720p', '1080p']
    
    // For text lectures
    textContent: String,
    
    // For downloadable resources
    resources: [{
      title: String,
      url: String,
      type: String, // 'pdf', 'doc', 'zip', etc.
      size: Number // in bytes
    }]
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  notes: String,
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
    watchTime: Number // in seconds for videos
  }],
  // Analytics
  totalViews: {
    type: Number,
    default: 0
  },
  averageWatchTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
lectureSchema.index({ course: 1, order: 1 });
lectureSchema.index({ section: 1 });
lectureSchema.index({ isPublished: 1 });

module.exports = mongoose.model('Lecture', lectureSchema);