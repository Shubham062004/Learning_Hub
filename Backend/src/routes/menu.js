const express = require('express');
const menuController = require('../controllers/menuController');

const router = express.Router();

// Public routes
router.get('/', menuController.getMenuItems);
router.get('/categories', menuController.getCategories);
router.get('/featured', menuController.getFeaturedItems);
router.get('/:id', menuController.getMenuItemById);

module.exports = router;
