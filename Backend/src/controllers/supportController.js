const SupportTicket = require('../models/SupportTicket');
const { validationResult } = require('express-validator');

exports.getTickets = async (req, res) => {
  try {
    const { status, priority, category, page = 1, limit = 10 } = req.query;

    const filter = {};
    
    // If not admin, only show user's tickets
    if (req.user.role !== 'admin') {
      filter.user = req.user.id;
    }
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const tickets = await SupportTicket.find(filter)
      .populate('user', 'name email')
      .populate('assignedTo', 'name email')
      .populate('messages.author', 'name email profilePic')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await SupportTicket.countDocuments(filter);

    res.json({
      tickets,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch tickets', 
      error: error.message 
    });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id)
      .populate('user', 'name email')
      .populate('assignedTo', 'name email')
      .populate('messages.author', 'name email profilePic');
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user can access this ticket
    if (req.user.role !== 'admin' && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this ticket' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch ticket', 
      error: error.message 
    });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const ticketData = {
      ...req.body,
      user: req.user.id
    };

    const ticket = new SupportTicket(ticketData);
    await ticket.save();

    res.status(201).json({
      message: 'Support ticket created successfully',
      ticket
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ 
      message: 'Failed to create ticket', 
      error: error.message 
    });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user can update this ticket
    if (req.user.role !== 'admin' && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this ticket' });
    }

    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Ticket updated successfully',
      ticket: updatedTicket
    });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ 
      message: 'Failed to update ticket', 
      error: error.message 
    });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user can delete this ticket
    if (req.user.role !== 'admin' && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this ticket' });
    }

    await SupportTicket.findByIdAndDelete(req.params.id);

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({ 
      message: 'Failed to delete ticket', 
      error: error.message 
    });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { content, isInternal } = req.body;
    
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user can add message to this ticket
    if (req.user.role !== 'admin' && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add message to this ticket' });
    }

    const message = {
      author: req.user.id,
      content,
      isInternal: isInternal || false,
      createdAt: new Date()
    };

    ticket.messages.push(message);
    ticket.lastActivity = new Date();
    await ticket.save();

    res.json({
      message: 'Message added successfully',
      message: ticket.messages[ticket.messages.length - 1]
    });
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ 
      message: 'Failed to add message', 
      error: error.message 
    });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status, lastActivity: new Date() },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({
      message: 'Ticket status updated successfully',
      ticket
    });
  } catch (error) {
    console.error('Update ticket status error:', error);
    res.status(500).json({ 
      message: 'Failed to update ticket status', 
      error: error.message 
    });
  }
};

exports.updateTicketPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { priority, lastActivity: new Date() },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({
      message: 'Ticket priority updated successfully',
      ticket
    });
  } catch (error) {
    console.error('Update ticket priority error:', error);
    res.status(500).json({ 
      message: 'Failed to update ticket priority', 
      error: error.message 
    });
  }
};

