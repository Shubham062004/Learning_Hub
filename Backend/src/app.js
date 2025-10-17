const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration - FIXED for your frontend port
app.use(cors({
  origin: function (origin, callback) {
    console.log('🌐 Request from origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',   // Vite default
      'http://localhost:3000',   // Alternative
      'http://127.0.0.1:5173',   // IP version
      'http://localhost:5174',   // Alternative Vite port
      'http://localhost:8080',   // Common dev port
      'http://localhost:8081',   // YOUR CURRENT PORT
      'http://127.0.0.1:8081',   // IP version of your port
      'http://localhost:8082',   // Alternative port
      'http://localhost:4173',   // Vite preview
      'http://localhost:3001'    // Alternative port
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS: Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('✅ CORS: Allowing origin (development mode):', origin);
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests explicitly
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/learning', require('./routes/learning'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/points', require('./routes/points'));
app.use('/api/lectures', require('./routes/lectures'));
app.use('/api/support', require('./routes/support'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/users', require('./routes/users'));

// Root route redirect
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Learning Hub API Server',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        profile: 'GET /api/auth/profile'
      },
      courses: {
        list: 'GET /api/courses',
        featured: 'GET /api/courses/featured',
        categories: 'GET /api/courses/categories'
      },
      learning: {
        dashboard: 'GET /api/learning/dashboard',
        assignments: 'GET /api/learning/assignments',
        quizzes: 'GET /api/learning/quizzes'
      }
    },
    documentation: 'Visit /api/health for server status'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Learning Hub API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: 'enabled',
    origin: req.headers.origin
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Learning Hub Backend is working!',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

module.exports = app;

