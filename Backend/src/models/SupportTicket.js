const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    enum: ['technical', 'billing', 'course-content', 'account', 'other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    isStaffReply: {
      type: Boolean,
      default: false
    },
    attachments: [{
      filename: String,
      url: String,
      size: Number
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  resolvedAt: Date,
  closedAt: Date,
  tags: [String]
}, {
  timestamps: true
});

// Generate ticket ID before saving
supportTicketSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('SupportTicket').countDocuments();
    this.ticketId = `TICKET-${Date.now()}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Indexes
supportTicketSchema.index({ user: 1 });
supportTicketSchema.index({ status: 1 });
supportTicketSchema.index({ category: 1 });
supportTicketSchema.index({ ticketId: 1 });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);