import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  PlayCircle,
  Clock,
  Award,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const MyLearning = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Mock enrolled courses data
    const mockCourses = [
      {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        instructor: 'John Instructor',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        progress: 65,
        totalLessons: 45,
        completedLessons: 29,
        lastWatched: '2025-10-16',
        timeSpent: 24,
        status: 'in-progress',
        expiresAt: '2026-01-15',
        nextLesson: 'Advanced React Patterns',
        category: 'Web Development'
      },
      {
        id: 2,
        title: 'Python for Data Science',
        instructor: 'Jane Smith',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        progress: 30,
        totalLessons: 38,
        completedLessons: 11,
        lastWatched: '2025-10-15',
        timeSpent: 12,
        status: 'in-progress',
        expiresAt: '2026-01-10',
        nextLesson: 'Pandas Data Manipulation',
        category: 'Data Science'
      },
      {
        id: 3,
        title: 'JavaScript Fundamentals',
        instructor: 'Mike Johnson',
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
        progress: 100,
        totalLessons: 25,
        completedLessons: 25,
        lastWatched: '2025-10-10',
        timeSpent: 18,
        status: 'completed',
        expiresAt: '2025-12-25',
        nextLesson: null,
        category: 'Web Development',
        completedAt: '2025-10-10'
      }
    ];

    setTimeout(() => {
      setEnrolledCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const filteredCourses = enrolledCourses.filter(course => {
    switch (activeTab) {
      case 'in-progress':
        return course.status === 'in-progress';
      case 'completed':
        return course.status === 'completed';
      case 'expired':
        return new Date(course.expiresAt) < new Date();
      default:
        return true;
    }
  });

  const getStatusBadge = (course) => {
    if (course.status === 'completed') {
      return <Badge className="bg-green-500 text-white">Completed</Badge>;
    }
    if (new Date(course.expiresAt) < new Date()) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
  };

  const getDaysUntilExpiry = (expiresAt) => {
    const days = Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (!user) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning</h1>
          <p className="text-gray-600">Track your progress and continue learning</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrolledCourses.filter(c => c.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrolledCourses.reduce((total, course) => total + course.timeSpent, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(enrolledCourses.reduce((total, course) => total + course.progress, 0) / enrolledCourses.length || 0)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'all', name: 'All Courses', count: enrolledCourses.length },
                { id: 'in-progress', name: 'In Progress', count: enrolledCourses.filter(c => c.status === 'in-progress').length },
                { id: 'completed', name: 'Completed', count: enrolledCourses.filter(c => c.status === 'completed').length },
                { id: 'expired', name: 'Expired', count: enrolledCourses.filter(c => new Date(c.expiresAt) < new Date()).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-32 h-32 object-cover flex-shrink-0"
                />
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                    </div>
                    {getStatusBadge(course)}
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        {course.completedLessons} of {course.totalLessons} lessons
                      </span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  {/* Course Info */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.timeSpent} hours spent</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {getDaysUntilExpiry(course.expiresAt) > 0 
                            ? `${getDaysUntilExpiry(course.expiresAt)} days left`
                            : 'Expired'
                          }
                        </span>
                      </div>
                    </div>
                    
                    {course.nextLesson && (
                      <div className="flex items-center">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        <span>Next: {course.nextLesson}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex space-x-3">
                    {course.status === 'completed' ? (
                      <Button variant="outline" className="flex-1">
                        <Award className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    ) : getDaysUntilExpiry(course.expiresAt) <= 0 ? (
                      <Button 
                        onClick={() => navigate('/pricing')}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Renew Access
                      </Button>
                    ) : (
                      <Button className="flex-1">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'all' ? 'No courses enrolled' : `No ${activeTab.replace('-', ' ')} courses`}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'all' 
                ? 'Start your learning journey by enrolling in a course.'
                : `You don't have any ${activeTab.replace('-', ' ')} courses yet.`
              }
            </p>
            <Button onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
