import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Crown,
  Zap,
  Calendar,
  Users,
  Target,
  ArrowRight,
  Star,
  PlayCircle,
  Lock,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showBlurred, setShowBlurred] = useState(true);
  
  const [dashboardData, setDashboardData] = useState({
    stats: {
      enrolledCourses: 2, // Free courses only
      completedCourses: 0,
      totalHours: 3,
      certificates: 0,
      currentStreak: 2,
      weeklyGoal: 10
    },
    freeCourses: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        progress: 45,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        instructor: 'John Doe',
        nextLesson: 'CSS Fundamentals',
        isLocked: false
      },
      {
        id: 2,
        title: 'Python Basics',
        progress: 20,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        instructor: 'Jane Smith',
        nextLesson: 'Variables and Data Types',
        isLocked: false
      }
    ],
    lockedCourses: [
      {
        id: 3,
        title: 'Advanced React Patterns',
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        instructor: 'Mike Johnson',
        nextLesson: 'Custom Hooks Deep Dive',
        isLocked: true,
        isPremium: true
      },
      {
        id: 4,
        title: 'Full Stack Development',
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400',
        instructor: 'Sarah Wilson',
        nextLesson: 'Database Design',
        isLocked: true,
        isPremium: true
      },
      {
        id: 5,
        title: 'Machine Learning Mastery',
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
        instructor: 'Dr. Alex Chen',
        nextLesson: 'Neural Networks',
        isLocked: true,
        isPremium: true
      },
      {
        id: 6,
        title: 'DevOps and Cloud Computing',
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        instructor: 'David Kumar',
        nextLesson: 'Docker Containers',
        isLocked: true,
        isPremium: true
      }
    ]
  });

  const [subscriptionStatus, setSubscriptionStatus] = useState({
    plan: 'free',
    status: 'active',
    coursesAccess: 2,
    totalCourses: 50
  });

  useEffect(() => {
    if (user?.subscription) {
      setSubscriptionStatus({
        plan: user.subscription.plan,
        status: user.subscription.status,
        coursesAccess: user.subscription.plan === 'premium' ? 999 : user.subscription.plan === 'pro' ? 20 : 2,
        totalCourses: 50
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to Learning Hub</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your dashboard</p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600">
              You're on the <strong>Free Plan</strong>. Upgrade to unlock all premium courses!
            </p>
          </div>
          
          {/* Subscription Status Card */}
          <Card className="mt-4 lg:mt-0 lg:w-80 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">Free Plan</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                Access to {subscriptionStatus.coursesAccess} of {subscriptionStatus.totalCourses} courses
              </div>
              
              <Button 
                onClick={() => navigate('/pricing')} 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Free Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.enrolledCourses}</div>
              <p className="text-xs text-muted-foreground">Active learning paths</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.totalHours}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.currentStreak}</div>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Courses</CardTitle>
              <Crown className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">48</div>
              <p className="text-xs text-purple-600">Unlock with upgrade</p>
            </CardContent>
          </Card>
        </div>

        {/* Free Courses Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                Your Free Courses
              </span>
              <Badge className="bg-green-100 text-green-800">FREE ACCESS</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.freeCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {course.progress}%</span>
                        <span className="text-blue-600">Next: {course.nextLesson}</span>
                      </div>
                      <Progress value={course.progress} className="mt-1" />
                    </div>
                  </div>
                  <Button className="shrink-0">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Premium Courses Section (Locked) */}
        <Card className="mb-8 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Crown className="h-5 w-5 mr-2 text-purple-600" />
                Premium Courses
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowBlurred(!showBlurred)}
                  className="text-xs"
                >
                  {showBlurred ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                  {showBlurred ? 'Hide' : 'Show'} Preview
                </Button>
                <Badge className="bg-purple-500 text-white">PREMIUM ONLY</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {dashboardData.lockedCourses.map((course) => (
                <div key={course.id} className="relative">
                  <div className={`flex items-center space-x-4 p-4 border rounded-lg transition-all ${
                    showBlurred ? 'filter blur-sm' : ''
                  }`}>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Next: {course.nextLesson}</span>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            Premium
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" disabled className="shrink-0">
                      <Lock className="h-4 w-4 mr-1" />
                      Locked
                    </Button>
                  </div>
                  
                  {/* Overlay */}
                  {showBlurred && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
                      <div className="text-center">
                        <Lock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="font-semibold text-purple-900">Premium Course</p>
                        <p className="text-sm text-purple-700">Upgrade to unlock</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Upgrade CTA */}
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-center">
              <Crown className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Unlock All Premium Courses</h3>
              <p className="mb-4 opacity-90">
                Get access to 48+ premium courses, certificates, and advanced features
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => navigate('/pricing')}
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  Start 7-Day Free Trial
                </Button>
                <Button 
                  onClick={() => navigate('/pricing')}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  View Pricing
                </Button>
              </div>
              <p className="text-xs opacity-75 mt-2">
                No credit card required • Cancel anytime
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Continue Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/my-learning')} 
                className="w-full mb-3"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Resume Courses
              </Button>
              <Button 
                onClick={() => navigate('/courses')} 
                variant="outline" 
                className="w-full"
              >
                Browse Free Courses
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Goal</span>
                    <span>{dashboardData.stats.totalHours}/{dashboardData.stats.weeklyGoal}h</span>
                  </div>
                  <Progress value={(dashboardData.stats.totalHours / dashboardData.stats.weeklyGoal) * 100} />
                </div>
                <p className="text-xs text-gray-600">
                  Keep it up! You're making great progress.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Crown className="h-5 w-5 mr-2 text-purple-600" />
                Go Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  48+ Premium Courses
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Completion Certificates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Priority Support
                </li>
              </ul>
              <Button 
                onClick={() => navigate('/pricing')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;