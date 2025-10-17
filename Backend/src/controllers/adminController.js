const User = require('../models/User');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
      topMenuItems
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.countDocuments({ status: 'pending' }),
      Order.find()
        .populate('user', 'name email')
        .populate('items.menuItem', 'name')
        .sort({ createdAt: -1 })
        .limit(5),
      Order.aggregate([
        { $unwind: '$items' },
        { $group: { _id: '$items.menuItem', count: { $sum: '$items.quantity' } } },
        { $lookup: { from: 'menuitems', localField: '_id', foreignField: '_id', as: 'menuItem' } },
        { $unwind: '$menuItem' },
        { $project: { name: '$menuItem.name', count: 1 } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingOrders
      },
      recentOrders,
      topMenuItems
    });
  } catch (error) {
    console.error('❌ Get dashboard stats error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch dashboard stats', 
      error: error.message 
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch users', 
      error: error.message 
    });
  }
};

exports.getAdminOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, dateFrom, dateTo } = req.query;
    
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('❌ Get admin orders error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch orders', 
      error: error.message 
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { 
        status,
        ...(status === 'delivered' && { actualDeliveryTime: new Date() })
      },
      { new: true }
    ).populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('❌ Update order status error:', error);
    res.status(500).json({ 
      message: 'Failed to update order status', 
      error: error.message 
    });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();

    res.status(201).json({
      message: 'Menu item created successfully',
      menuItem
    });
  } catch (error) {
    console.error('❌ Create menu item error:', error);
    res.status(500).json({ 
      message: 'Failed to create menu item', 
      error: error.message 
    });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({
      message: 'Menu item updated successfully',
      menuItem
    });
  } catch (error) {
    console.error('❌ Update menu item error:', error);
    res.status(500).json({ 
      message: 'Failed to update menu item', 
      error: error.message 
    });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete menu item error:', error);
    res.status(500).json({ 
      message: 'Failed to delete menu item', 
      error: error.message 
    });
  }
};
