# Learning Hub Backend

A comprehensive backend API for the Learning Hub educational platform built with Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication & Authorization
- 📚 Course Management
- 🎯 Learning Units & Progress Tracking
- 📝 Assignments & Quizzes
- 💬 Discussions & Forums
- 🏆 Points & Achievement System
- 📢 Announcements
- 🎥 Lecture Management
- 🎓 Support Tickets
- 📊 Analytics & Reporting

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `env.example` to `.env`
   - Update the environment variables with your actual values:
   ```bash
   cp env.example .env
   ```

4. **Configure Environment Variables**
   Edit `.env` file with your actual values:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.7ydpad4.mongodb.net/Learning_Hub
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex_for_learning_hub
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (instructor/admin)
- `PUT /api/courses/:id` - Update course (instructor/admin)
- `DELETE /api/courses/:id` - Delete course (instructor/admin)
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/students` - Get course students

### Learning Units
- `GET /api/learning-units` - Get learning units
- `GET /api/learning-units/:id` - Get learning unit by ID
- `POST /api/learning-units` - Create learning unit
- `PUT /api/learning-units/:id` - Update learning unit
- `DELETE /api/learning-units/:id` - Delete learning unit

### Assignments
- `GET /api/assignments` - Get assignments
- `GET /api/assignments/:id` - Get assignment by ID
- `POST /api/assignments` - Create assignment
- `PUT /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment
- `POST /api/assignments/:id/submit` - Submit assignment

### Quizzes
- `GET /api/quizzes` - Get quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes` - Create quiz
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz
- `POST /api/quizzes/:id/submit` - Submit quiz

### Points & Achievements
- `GET /api/points` - Get user points
- `GET /api/points/leaderboard` - Get leaderboard
- `GET /api/points/achievements` - Get achievements

### Discussions
- `GET /api/discussions` - Get discussions
- `POST /api/discussions` - Create discussion
- `GET /api/discussions/:id` - Get discussion by ID
- `POST /api/discussions/:id/replies` - Add reply

### Announcements
- `GET /api/announcements` - Get announcements
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement

## Database Models

- **User** - User accounts and profiles
- **Course** - Course information and enrollment
- **LearningUnit** - Individual learning modules
- **Assignment** - Course assignments
- **Quiz** - Quizzes and assessments
- **Announcement** - System announcements
- **Discussion** - Forum discussions
- **Points** - User points and achievements

## Socket.IO Events

- `join-user-room` - Join user's personal room
- `join-course` - Join course discussion room
- `send-message` - Send message in course discussion
- `new-message` - Receive new message

## Development

### Project Structure
```
Backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── ...
│   ├── utils/
│   │   ├── jwt.js
│   │   └── seed.js
│   ├── app.js
│   └── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

