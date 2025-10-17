const express = require('express');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Upload routes
router.post('/image', upload.single('image'), uploadController.uploadImage);
router.post('/document', upload.single('document'), uploadController.uploadDocument);
router.post('/video', upload.single('video'), uploadController.uploadVideo);
router.delete('/:filename', uploadController.deleteFile);

module.exports = router;

