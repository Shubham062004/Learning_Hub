const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Programming Skills', 'Data Science', 'Machine Learning', 'AI', 'Web Development', 'Mobile Development', 'DevOps', 'Other']
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    weeks: { type: Number, required: true, min: 1 },
    hoursPerWeek: { type: Number, required: true, min: 1 }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  thumbnail: {
    type: String,
    required: true
  },
  banner: String,
  tags: [String],
  prerequisites: [String],
  learningOutcomes: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  enrollmentCount: {
    type: Number,
    default: 0
  },
  maxEnrollment: {
    type: Number,
    default: null
  },
  startDate: Date,
  endDate: Date,
  enrollmentDeadline: Date,
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  learningUnits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningUnit'
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  students: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrolledAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    completedAt: Date,
    certificateIssued: { type: Boolean, default: false }
  }],
  requirements: {
    minPoints: { type: Number, default: 0 },
    prerequisites: [String],
    skills: [String]
  },
  resources: [{
    title: String,
    type: { type: String, enum: ['document', 'video', 'link', 'file'] },
    url: String,
    description: String
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
courseSchema.index({ category: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ isFeatured: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ 'rating.average': -1 });
courseSchema.index({ createdAt: -1 });

// Virtual for formatted price
courseSchema.virtual('priceDisplay').get(function() {
  return `${this.currency} ${this.price}`;
});

// Virtual for enrollment status
courseSchema.virtual('enrollmentStatus').get(function() {
  if (this.maxEnrollment && this.enrollmentCount >= this.maxEnrollment) {
    return 'full';
  }
  if (this.enrollmentDeadline && new Date() > this.enrollmentDeadline) {
    return 'closed';
  }
  return 'open';
});

module.exports = mongoose.model('Course', courseSchema);

