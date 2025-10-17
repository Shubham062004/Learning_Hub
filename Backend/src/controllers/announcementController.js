const Announcement = require('../models/Announcement');
const { validationResult } = require('express-validator');

exports.getAnnouncements = async (req, res) => {
  try {
    const { type, priority, course, page = 1, limit = 10 } = req.query;

    const filter = { isPublished: true };
    
    if (type) filter.type = type;
    if (priority) filter.priority = priority;
    if (course) filter.course = course;

    const announcements = await Announcement.find(filter)
      .populate('author', 'name email profilePic')
      .populate('course', 'title')
      .sort({ publishDate: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Announcement.countDocuments(filter);

    res.json({
      announcements,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch announcements', 
      error: error.message 
    });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('author', 'name email profilePic')
      .populate('course', 'title')
      .populate('readBy.user', 'name email');
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    console.error('Get announcement error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch announcement', 
      error: error.message 
    });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const announcementData = {
      ...req.body,
      author: req.user.id
    };

    const announcement = new Announcement(announcementData);
    await announcement.save();

    res.status(201).json({
      message: 'Announcement created successfully',
      announcement
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ 
      message: 'Failed to create announcement', 
      error: error.message 
    });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({
      message: 'Announcement updated successfully',
      announcement
    });
  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({ 
      message: 'Failed to update announcement', 
      error: error.message 
    });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ 
      message: 'Failed to delete announcement', 
      error: error.message 
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    // Check if already read
    const alreadyRead = announcement.readBy.some(
      r => r.user.toString() === req.user.id
    );

    if (!alreadyRead) {
      announcement.readBy.push({
        user: req.user.id,
        readAt: new Date()
      });
      await announcement.save();
    }

    res.json({ message: 'Announcement marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ 
      message: 'Failed to mark announcement as read', 
      error: error.message 
    });
  }
};

