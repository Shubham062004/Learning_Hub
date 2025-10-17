const Discussion = require('../models/Discussion');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.getDiscussions = async (req, res) => {
  try {
    const { course, type, category, search, page = 1, limit = 10 } = req.query;

    const filter = {};
    
    if (course) filter.course = course;
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const discussions = await Discussion.find(filter)
      .populate('author', 'name email profilePic')
      .populate('course', 'title category')
      .populate('replies.author', 'name email profilePic')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Discussion.countDocuments(filter);

    res.json({
      discussions,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get discussions error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch discussions', 
      error: error.message 
    });
  }
};

exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'name email profilePic')
      .populate('course', 'title category')
      .populate('replies.author', 'name email profilePic')
      .populate('participants.user', 'name email profilePic');
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Increment view count
    discussion.engagement.views += 1;
    await discussion.save();

    res.json(discussion);
  } catch (error) {
    console.error('Get discussion error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch discussion', 
      error: error.message 
    });
  }
};

exports.createDiscussion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const discussionData = {
      ...req.body,
      author: req.user.id
    };

    const discussion = new Discussion(discussionData);
    await discussion.save();

    // Add author as participant
    discussion.participants.push({
      user: req.user.id,
      joinedAt: new Date()
    });
    await discussion.save();

    res.status(201).json({
      message: 'Discussion created successfully',
      discussion
    });
  } catch (error) {
    console.error('Create discussion error:', error);
    res.status(500).json({ 
      message: 'Failed to create discussion', 
      error: error.message 
    });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this discussion' });
    }

    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Discussion updated successfully',
      discussion: updatedDiscussion
    });
  } catch (error) {
    console.error('Update discussion error:', error);
    res.status(500).json({ 
      message: 'Failed to update discussion', 
      error: error.message 
    });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this discussion' });
    }

    await Discussion.findByIdAndDelete(req.params.id);

    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    console.error('Delete discussion error:', error);
    res.status(500).json({ 
      message: 'Failed to delete discussion', 
      error: error.message 
    });
  }
};

exports.addReply = async (req, res) => {
  try {
    const { content, parentReply } = req.body;
    
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    if (discussion.isLocked) {
      return res.status(400).json({ message: 'Discussion is locked' });
    }

    const reply = {
      author: req.user.id,
      content,
      parentReply: parentReply || null,
      createdAt: new Date()
    };

    discussion.replies.push(reply);
    discussion.engagement.replies += 1;
    
    // Add user as participant if not already
    const isParticipant = discussion.participants.some(
      p => p.user.toString() === req.user.id
    );
    
    if (!isParticipant) {
      discussion.participants.push({
        user: req.user.id,
        joinedAt: new Date()
      });
    }

    await discussion.save();

    res.json({
      message: 'Reply added successfully',
      reply: discussion.replies[discussion.replies.length - 1]
    });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({ 
      message: 'Failed to add reply', 
      error: error.message 
    });
  }
};

exports.updateReply = async (req, res) => {
  try {
    const { content } = req.body;
    
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const reply = discussion.replies.id(req.params.replyId);
    
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Check if user is author or admin
    if (reply.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this reply' });
    }

    reply.content = content;
    reply.updatedAt = new Date();
    reply.isEdited = true;

    await discussion.save();

    res.json({ message: 'Reply updated successfully' });
  } catch (error) {
    console.error('Update reply error:', error);
    res.status(500).json({ 
      message: 'Failed to update reply', 
      error: error.message 
    });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const reply = discussion.replies.id(req.params.replyId);
    
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Check if user is author or admin
    if (reply.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this reply' });
    }

    reply.remove();
    discussion.engagement.replies -= 1;
    await discussion.save();

    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    console.error('Delete reply error:', error);
    res.status(500).json({ 
      message: 'Failed to delete reply', 
      error: error.message 
    });
  }
};

exports.likeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Toggle like
    const likeIndex = discussion.engagement.likes.indexOf(req.user.id);
    if (likeIndex > -1) {
      discussion.engagement.likes.splice(likeIndex, 1);
    } else {
      discussion.engagement.likes.push(req.user.id);
    }

    await discussion.save();

    res.json({ 
      message: 'Like toggled successfully',
      likes: discussion.engagement.likes.length
    });
  } catch (error) {
    console.error('Like discussion error:', error);
    res.status(500).json({ 
      message: 'Failed to like discussion', 
      error: error.message 
    });
  }
};

exports.likeReply = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const reply = discussion.replies.id(req.params.replyId);
    
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Toggle like
    const likeIndex = reply.likes.indexOf(req.user.id);
    if (likeIndex > -1) {
      reply.likes.splice(likeIndex, 1);
    } else {
      reply.likes.push(req.user.id);
    }

    await discussion.save();

    res.json({ 
      message: 'Reply like toggled successfully',
      likes: reply.likes.length
    });
  } catch (error) {
    console.error('Like reply error:', error);
    res.status(500).json({ 
      message: 'Failed to like reply', 
      error: error.message 
    });
  }
};

