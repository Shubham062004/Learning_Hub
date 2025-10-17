const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  source: {
    type: String,
    enum: ['assignment', 'quiz', 'lecture', 'participation', 'bonus', 'other'],
    required: true
  },
  sourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  awardedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  awardedAt: {
    type: Date,
    default: Date.now
  },
  isBonus: {
    type: Boolean,
    default: false
  },
  multiplier: {
    type: Number,
    default: 1,
    min: 0.1,
    max: 5
  }
}, {
  timestamps: true
});

// Indexes
pointsSchema.index({ user: 1 });
pointsSchema.index({ course: 1 });
pointsSchema.index({ source: 1 });
pointsSchema.index({ awardedAt: -1 });

// Virtual for total points with multiplier
pointsSchema.virtual('totalPoints').get(function() {
  return Math.round(this.points * this.multiplier);
});

module.exports = mongoose.model('Points', pointsSchema);