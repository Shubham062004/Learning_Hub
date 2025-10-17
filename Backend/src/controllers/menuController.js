const MenuItem = require('../models/MenuItem');

exports.getMenuItems = async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      vegetarian, 
      search, 
      page = 1,
      limit = 50
    } = req.query;

    // Build filter object
    const filter = { isAvailable: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (vegetarian === 'true') {
      filter.isVegetarian = true;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const menuItems = await MenuItem.find(filter)
      .sort({ name: 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await MenuItem.countDocuments(filter);

    res.json({
      menuItems,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('❌ Get menu items error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch menu items', 
      error: error.message 
    });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(menuItem);
  } catch (error) {
    console.error('❌ Get menu item error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch menu item', 
      error: error.message 
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category', { isAvailable: true });
    res.json(categories);
  } catch (error) {
    console.error('❌ Get categories error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch categories', 
      error: error.message 
    });
  }
};

exports.getFeaturedItems = async (req, res) => {
  try {
    const featuredItems = await MenuItem.find({ 
      isFeatured: true, 
      isAvailable: true 
    })
    .sort({ 'rating.average': -1 })
    .limit(12);

    res.json(featuredItems);
  } catch (error) {
    console.error('❌ Get featured items error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch featured items', 
      error: error.message 
    });
  }
};
