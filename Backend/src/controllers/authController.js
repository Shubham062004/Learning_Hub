const User = require('../models/User');
const jwt = require('../utils/jwt');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, password, phone, bio, skills, interests } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email 
          ? 'Email already registered' 
          : 'Phone number already registered' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      bio,
      skills: skills || [],
      interests: interests || []
    });

    await user.save();

    // Generate JWT token
    const token = jwt.generateToken(user._id);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePic: user.profilePic,
        bio: user.bio,
        skills: user.skills,
        interests: user.interests
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        message: 'Account is deactivated. Please contact support.' 
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePic: user.profilePic,
        bio: user.bio,
        skills: user.skills,
        interests: user.interests,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed', 
      error: error.message 
    });
  }
};

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

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      message: 'Failed to change password', 
      error: error.message 
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token (in a real app, you'd send this via email)
    const resetToken = jwt.generateToken(user._id, '1h');
    
    // TODO: Send email with reset link
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({ 
      message: 'Password reset instructions sent to your email',
      resetToken // Remove this in production
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'Failed to process password reset', 
      error: error.message 
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verifyToken(token);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      message: 'Failed to reset password', 
      error: error.message 
    });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { googleToken, userData } = req.body;
    
    // In a real implementation, you would verify the Google token
    // For now, we'll create/login the user with Google data
    
    const { name, email, picture } = userData;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      // User exists, log them in
      const token = jwt.generateToken(user._id);
      
      res.json({
        message: 'Google login successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          role: user.role,
          profilePic: user.profilePic || picture
        }
      });
    } else {
      // Create new user
      user = new User({
        name,
        email,
        password: 'google_auth_' + Date.now(), // Temporary password
        phone: '0000000000', // Default phone
        profilePic: picture
      });
      
      await user.save();
      
      const token = jwt.generateToken(user._id);
      
      res.status(201).json({
        message: 'Google registration successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profilePic: user.profilePic
        }
      });
    }
  } catch (error) {
    console.error('❌ Google auth error:', error);
    res.status(500).json({ 
      message: 'Google authentication failed', 
      error: error.message 
    });
  }
};

