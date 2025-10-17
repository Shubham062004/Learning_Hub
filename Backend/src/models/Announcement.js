const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Announcement title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Announcement content is required'],
    maxlength: [2000, 'Content cannot exceed 2000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  type: {
    type: String,
    enum: ['general', 'assignment', 'quiz', 'lecture', 'system'],
    default: 'general'
  },
  attachments: [{
    filename: String,
    url: String,
    size: Number,
    type: String
  }],
  isPinned: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  scheduledFor: Date,
  expiresAt: Date,
  // Analytics
  views: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    viewedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalViews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
announcementSchema.index({ course: 1 });
announcementSchema.index({ author: 1 });
announcementSchema.index({ isPublished: 1 });
announcementSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);