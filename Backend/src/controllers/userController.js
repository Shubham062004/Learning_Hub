const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Quiz = require('../models/Quiz');
const Points = require('../models/Points');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('courses', 'title category level')
      .populate('enrolledCourses', 'title category level progress');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch profile', 
      error: error.message 
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, bio, skills, interests, learningGoals, socialLinks, address, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        ...(name && { name }),
        ...(phone && { phone }),
        ...(bio !== undefined && { bio }),
        ...(skills && { skills }),
        ...(interests && { interests }),
        ...(learningGoals && { learningGoals }),
        ...(socialLinks && { socialLinks }),
        ...(address && { address }),
        ...(preferences && { preferences })
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Failed to update profile', 
      error: error.message 
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get user's courses
    const courses = await Course.find({
      'students.user': req.user.id
    }).populate('instructor', 'name email profilePic');

    // Get recent assignments
    const assignments = await Assignment.find({
      course: { $in: courses.map(c => c._id) }
    }).populate('course', 'title').sort({ dueDate: 1 }).limit(5);

    // Get recent announcements
    const announcements = await require('../models/Announcement').find({
      $or: [
        { targetAudience: 'all' },
        { targetAudience: 'students' },
        { specificRecipients: req.user.id }
      ]
    }).sort({ publishDate: -1 }).limit(5);

    // Get user's points
    const points = await Points.findOne({ user: req.user.id });

    res.json({
      user,
      courses,
      assignments,
      announcements,
      points: points || { totalPoints: 0, availablePoints: 0, spentPoints: 0 }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch dashboard', 
      error: error.message 
    });
  }
};

exports.getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      'students.user': req.user.id
    })
    .populate('instructor', 'name email profilePic')
    .sort({ 'students.enrolledAt': -1 });

    res.json(courses);
  } catch (error) {
    console.error('Get user courses error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user courses', 
      error: error.message 
    });
  }
};

exports.getUserAssignments = async (req, res) => {
  try {
    const userCourses = await Course.find({
      'students.user': req.user.id
    }).select('_id');

    const assignments = await Assignment.find({
      course: { $in: userCourses.map(c => c._id) }
    })
    .populate('course', 'title')
    .populate('instructor', 'name email')
    .sort({ dueDate: 1 });

    res.json(assignments);
  } catch (error) {
    console.error('Get user assignments error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user assignments', 
      error: error.message 
    });
  }
};

exports.getUserQuizzes = async (req, res) => {
  try {
    const userCourses = await Course.find({
      'students.user': req.user.id
    }).select('_id');

    const quizzes = await Quiz.find({
      course: { $in: userCourses.map(c => c._id) }
    })
    .populate('course', 'title')
    .populate('instructor', 'name email')
    .sort({ 'availability.endDate': 1 });

    res.json(quizzes);
  } catch (error) {
    console.error('Get user quizzes error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user quizzes', 
      error: error.message 
    });
  }
};

exports.getUserPoints = async (req, res) => {
  try {
    const points = await Points.findOne({ user: req.user.id });
    
    if (!points) {
      return res.json({
        totalPoints: 0,
        availablePoints: 0,
        spentPoints: 0,
        transactions: [],
        achievements: [],
        badges: []
      });
    }

    res.json(points);
  } catch (error) {
    console.error('Get user points error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user points', 
      error: error.message 
    });
  }
};

exports.getUserAchievements = async (req, res) => {
  try {
    const points = await Points.findOne({ user: req.user.id });
    
    if (!points) {
      return res.json({ achievements: [], badges: [] });
    }

    res.json({
      achievements: points.achievements,
      badges: points.badges
    });
  } catch (error) {
    console.error('Get user achievements error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user achievements', 
      error: error.message 
    });
  }
};

// Admin functions
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    const filter = {};
    if (role) filter.role = role;
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
    console.error('Get all users error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch users', 
      error: error.message 
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user', 
      error: error.message 
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      message: 'Failed to update user', 
      error: error.message 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      message: 'Failed to delete user', 
      error: error.message 
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['student', 'instructor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ 
      message: 'Failed to update user role', 
      error: error.message 
    });
  }
};

