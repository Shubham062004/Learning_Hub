const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(auth);
router.use(admin);

// Dashboard stats
router.get('/dashboard', adminController.getDashboardStats);

// User management
router.get('/users', adminController.getUsers);

// Order management
router.get('/orders', adminController.getAdminOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// Menu management
router.post('/menu', adminController.createMenuItem);
router.put('/menu/:id', adminController.updateMenuItem);
router.delete('/menu/:id', adminController.deleteMenuItem);

module.exports = router;
