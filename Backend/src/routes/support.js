const express = require('express');
const supportController = require('../controllers/supportController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Support ticket routes
router.get('/', supportController.getTickets);
router.get('/:id', supportController.getTicketById);
router.post('/', supportController.createTicket);
router.put('/:id', supportController.updateTicket);
router.delete('/:id', supportController.deleteTicket);
router.post('/:id/messages', supportController.addMessage);
router.put('/:id/status', admin, supportController.updateTicketStatus);
router.put('/:id/priority', admin, supportController.updateTicketPriority);

module.exports = router;

