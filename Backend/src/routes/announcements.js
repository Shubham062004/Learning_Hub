const express = require('express');
const announcementController = require('../controllers/announcementController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Announcement routes
router.get('/', announcementController.getAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.post('/', admin, announcementController.createAnnouncement);
router.put('/:id', admin, announcementController.updateAnnouncement);
router.delete('/:id', admin, announcementController.deleteAnnouncement);
router.post('/:id/read', announcementController.markAsRead);

module.exports = router;

