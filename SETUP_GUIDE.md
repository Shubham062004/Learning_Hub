# Oven Express - Complete Setup Guide

This guide will help you set up the complete Oven Express food delivery platform with both frontend and backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to Backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration:
# NODE_ENV=development
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/oven_express
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# JWT_EXPIRE=7d

# Seed the database with initial data
npm run seed

# Start the backend server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start the frontend development server
npm run dev
```

## 📁 Project Structure

```
Learning_Hub/
├── Backend/                 # Express.js Backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/          # Database config
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── .env
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── lib/             # API client
│   │   └── hooks/           # Custom hooks
│   ├── package.json
│   └── .env
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/categories` - Get categories
- `GET /api/menu/featured` - Get featured items
- `GET /api/menu/:id` - Get specific menu item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get specific order

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

## 🗄️ Database Models

### User Model
- Basic user information
- Authentication fields
- Address and preferences
- Order history

### MenuItem Model
- Food item details
- Pricing and categories
- Nutritional information
- Reviews and ratings

### Order Model
- Order details and items
- Delivery information
- Payment and status tracking
- Customer feedback

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token is generated and stored
3. Token is sent with each API request
4. Backend validates token for protected routes

## 🎨 Frontend Features

- **Authentication**: Login/Register with form validation
- **API Integration**: Complete API client with error handling
- **Context Management**: React Context for state management
- **Toast Notifications**: User feedback for actions
- **Responsive Design**: Mobile-friendly interface

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to Heroku, Railway, or similar platform

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform
3. Update API URL in environment variables

## 🧪 Testing

### Test Credentials
- **Admin**: admin@ovenexpress.com / admin123
- **Customer**: john@example.com / password123

### API Testing
- Use Postman or similar tool
- Test all endpoints with proper authentication
- Verify error handling and validation

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env

2. **CORS Issues**
   - Verify frontend URL in backend CORS config
   - Check if both servers are running

3. **Authentication Issues**
   - Verify JWT secret is set
   - Check token expiration settings

4. **Import Errors**
   - Ensure all dependencies are installed
   - Check file paths and imports

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/oven_express
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🎯 Next Steps

1. **Add Payment Integration**: Stripe, Razorpay, etc.
2. **Implement Real-time Updates**: Socket.io for order tracking
3. **Add Image Upload**: Cloudinary for menu item images
4. **Enhance UI/UX**: Better styling and animations
5. **Add Testing**: Unit and integration tests
6. **Deploy to Production**: Configure production environment

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running and accessible
4. Check network connectivity between frontend and backend

Happy coding! 🚀
