const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourses = async (req, res) => {
  try {
    const { 
      category, 
      level, 
      featured, 
      search, 
      page = 1,
      limit = 12
    } = req.query;

    const filter = { isPublished: true };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (level && level !== 'all') {
      filter.level = level;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(filter)
      .populate('instructor', 'name profilePic bio')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Course.countDocuments(filter);

    res.json({
      courses,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('❌ Get courses error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch courses', 
      error: error.message 
    });
  }
};

exports.getFeaturedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ 
      isFeatured: true, 
      isPublished: true 
    })
    .populate('instructor', 'name profilePic')
    .sort({ 'rating.average': -1 })
    .limit(8);

    res.json(courses);
  } catch (error) {
    console.error('❌ Get featured courses error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch featured courses', 
      error: error.message 
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category', { isPublished: true });
    res.json(categories);
  } catch (error) {
    console.error('❌ Get categories error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch categories', 
      error: error.message 
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name profilePic bio')
      .populate('lectures')
      .populate('assignments')
      .populate('quizzes');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Increment view count
    course.totalViews += 1;
    await course.save();

    res.json(course);
  } catch (error) {
    console.error('❌ Get course error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch course', 
      error: error.message 
    });
  }
};

exports.getCourseLectures = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('lectures', 'title description order section duration isPreview');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course.lectures);
  } catch (error) {
    console.error('❌ Get course lectures error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch course lectures', 
      error: error.message 
    });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(userId);
    
    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.course.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add to user's enrolled courses
    user.enrolledCourses.push({
      course: courseId,
      enrolledAt: new Date(),
      progress: 0
    });

    // Add to course's enrolled students
    course.enrolledStudents.push({
      student: userId,
      enrolledAt: new Date()
    });
    course.totalEnrollments += 1;

    await user.save();
    await course.save();

    res.json({ 
      message: 'Successfully enrolled in course',
      course: {
        _id: course._id,
        title: course.title,
        enrolledAt: new Date()
      }
    });
  } catch (error) {
    console.error('❌ Course enrollment error:', error);
    res.status(500).json({ 
      message: 'Failed to enroll in course', 
      error: error.message 
    });
  }
};

exports.getCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      e => e.course.toString() === courseId
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    res.json({
      progress: enrollment.progress,
      completedLectures: enrollment.completedLectures,
      completedAssignments: enrollment.completedAssignments,
      completedQuizzes: enrollment.completedQuizzes
    });
  } catch (error) {
    console.error('❌ Get course progress error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch course progress', 
      error: error.message 
    });
  }
};

exports.addCourseReview = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    const { rating, review } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is enrolled
    const user = await User.findById(userId);
    const isEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.course.toString() === courseId
    );

    if (!isEnrolled) {
      return res.status(400).json({ message: 'Must be enrolled to review' });
    }

    // Check if already reviewed
    const existingReview = course.rating.reviews.find(
      r => r.student.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({ message: 'Already reviewed this course' });
    }

    // Add review
    course.rating.reviews.push({
      student: userId,
      rating,
      review,
      createdAt: new Date()
    });

    // Update average rating
    const totalRating = course.rating.reviews.reduce((sum, r) => sum + r.rating, 0);
    course.rating.average = totalRating / course.rating.reviews.length;
    course.rating.count = course.rating.reviews.length;

    await course.save();

    res.json({ 
      message: 'Review added successfully',
      rating: course.rating
    });
  } catch (error) {
    console.error('❌ Add course review error:', error);
    res.status(500).json({ 
      message: 'Failed to add review', 
      error: error.message 
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user.id
    };

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('❌ Create course error:', error);
    res.status(500).json({ 
      message: 'Failed to create course', 
      error: error.message 
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error('❌ Update course error:', error);
    res.status(500).json({ 
      message: 'Failed to update course', 
      error: error.message 
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete course error:', error);
    res.status(500).json({ 
      message: 'Failed to delete course', 
      error: error.message 
    });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('enrolledStudents.student', 'name email phone');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course.enrolledStudents);
  } catch (error) {
    console.error('❌ Get course students error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch course students', 
      error: error.message 
    });
  }
};

exports.getUserCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate('enrolledCourses.course', 'title thumbnail instructor category level price')
      .populate('enrolledCourses.course.instructor', 'name');

    res.json(user.enrolledCourses);
  } catch (error) {
    console.error('❌ Get user courses error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user courses', 
      error: error.message 
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courses = await Course.find({ instructor: instructorId })
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    console.error('❌ Get instructor courses error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch instructor courses', 
      error: error.message 
    });
  }
};