const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, contactInfo, paymentMethod, specialInstructions } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem || !menuItem.isAvailable) {
        return res.status(400).json({ 
          message: `Item ${menuItem?.name || 'Unknown'} is not available` 
        });
      }

      const itemTotal = menuItem.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price,
        specialInstructions: item.specialInstructions
      });
    }

    // Calculate tax (assuming 8% tax rate)
    const tax = subtotal * 0.08;
    const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery over ₹500
    const total = subtotal + tax + deliveryFee;

    // Create order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      deliveryAddress,
      contactInfo,
      paymentMethod,
      subtotal,
      tax,
      deliveryFee,
      total,
      specialInstructions,
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000) // 45 minutes from now
    });

    await order.save();

    // Populate the order with menu item details
    await order.populate('items.menuItem', 'name price image');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({ 
      message: 'Failed to create order', 
      error: error.message 
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = { user: req.user.id };
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('items.menuItem', 'name price image')
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
    console.error('❌ Get user orders error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch orders', 
      error: error.message 
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate('items.menuItem', 'name price image description');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('❌ Get order error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch order', 
      error: error.message 
    });
  }
};
