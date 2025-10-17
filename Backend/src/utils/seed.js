require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learning_hub');
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createUsers = async () => {
  try {
    await User.deleteMany({});
    console.log('🗑️ Cleared existing users');

    const users = [
      {
        name: 'Admin User',
        email: 'admin@learninghub.com',
        password: 'admin123',
        phone: '9999999999',
        role: 'admin'
      },
      {
        name: 'John Instructor',
        email: 'instructor@learninghub.com',
        password: 'instructor123',
        phone: '8888888888',
        role: 'instructor',
        bio: 'Experienced software developer and educator with 10+ years in the industry.'
      },
      {
        name: 'Jane Student',
        email: 'student@learninghub.com',
        password: 'student123',
        phone: '7777777777',
        role: 'student'
      }
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.email}`);
    }
    console.log(`✅ Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error('❌ Error creating users:', error);
  }
};

const createCourses = async (users) => {
  try {
    await Course.deleteMany({});
    console.log('🗑️ Cleared existing courses');

    const instructor = users.find(u => u.role === 'instructor');

    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB to become a full-stack web developer.',
        shortDescription: 'Comprehensive web development course covering frontend and backend technologies.',
        instructor: instructor._id,
        category: 'Web Development',
        level: 'Beginner',
        price: 2999,
        currency: 'USD',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        duration: { weeks: 12, hoursPerWeek: 8 },
        prerequisites: ['Basic computer knowledge'],
        learningOutcomes: [
          'Build responsive websites with HTML, CSS, and JavaScript',
          'Create dynamic web applications with React',
          'Develop backend APIs with Node.js and Express',
          'Work with databases using MongoDB'
        ],
        tags: ['html', 'css', 'javascript', 'react', 'nodejs', 'mongodb'],
        isPublished: true,
        isFeatured: true
      },
      {
        title: 'Python for Data Science',
        description: 'Master Python programming for data analysis, visualization, and machine learning.',
        shortDescription: 'Learn Python programming specifically for data science applications.',
        instructor: instructor._id,
        category: 'Data Science',
        level: 'Intermediate',
        price: 3499,
        currency: 'USD',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        duration: { weeks: 10, hoursPerWeek: 6 },
        prerequisites: ['Basic programming knowledge'],
        learningOutcomes: [
          'Master Python syntax and programming concepts',
          'Use NumPy and Pandas for data manipulation',
          'Create visualizations with Matplotlib and Seaborn',
          'Build machine learning models with Scikit-learn'
        ],
        tags: ['python', 'data-science', 'numpy', 'pandas', 'matplotlib', 'ml'],
        isPublished: true,
        isFeatured: true
      },
      {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile applications using React Native and JavaScript.',
        shortDescription: 'Create mobile apps for iOS and Android using React Native.',
        instructor: instructor._id,
        category: 'Mobile Development',
        level: 'Intermediate',
        price: 3999,
        currency: 'USD',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
        duration: { weeks: 8, hoursPerWeek: 5 },
        prerequisites: ['JavaScript knowledge', 'React basics'],
        learningOutcomes: [
          'Set up React Native development environment',
          'Build native mobile app components',
          'Handle navigation and state management',
          'Deploy apps to App Store and Google Play'
        ],
        tags: ['react-native', 'mobile', 'ios', 'android', 'javascript'],
        isPublished: true
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ Created ${createdCourses.length} courses`);
    return createdCourses;
  } catch (error) {
    console.error('❌ Error creating courses:', error);
  }
};

const seedDatabase = async () => {
  await connectDB();
  const users = await createUsers();
  const courses = await createCourses(users);
  
  console.log('🎉 Learning Hub database seeding completed!');
  console.log('');
  console.log('📧 Test Accounts:');
  console.log('Admin: admin@learninghub.com / admin123');
  console.log('Instructor: instructor@learninghub.com / instructor123');
  console.log('Student: student@learninghub.com / student123');
  
  process.exit(0);
};

seedDatabase();