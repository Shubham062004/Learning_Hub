import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  PlayCircle,
  Crown
} from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock courses data
    const mockCourses = [
      {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB to become a full-stack web developer.',
        instructor: 'John Instructor',
        rating: 4.8,
        students: 12543,
        duration: '40 hours',
        level: 'Beginner',
        price: 2999,
        originalPrice: 4999,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        isFeatured: true,
        isFree: true
      },
      {
        id: 2,
        title: 'Python for Data Science',
        description: 'Master Python programming for data analysis, visualization, and machine learning.',
        instructor: 'Jane Smith',
        rating: 4.9,
        students: 8765,
        duration: '35 hours',
        level: 'Intermediate',
        price: 3499,
        originalPrice: 5999,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        isFeatured: true,
        isFree: true
      },
      {
        id: 3,
        title: 'React Advanced Patterns',
        description: 'Master advanced React patterns and best practices for building scalable applications.',
        instructor: 'Mike Johnson',
        rating: 4.7,
        students: 5432,
        duration: '30 hours',
        level: 'Advanced',
        price: 3999,
        originalPrice: 6999,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        isFeatured: false,
        isFree: false,
        isPremium: true
      }
    ];

    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Handle enrollment logic
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover world-class courses taught by industry experts. Start your learning journey today!
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {course.isFree && (
                  <Badge className="absolute top-2 left-2 bg-green-500">
                    FREE
                  </Badge>
                )}
                {course.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {/* Instructor */}
                  <p className="text-sm text-gray-600">by {course.instructor}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    {course.isFree ? (
                      <div className="text-2xl font-bold text-green-600">FREE</div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">₹{course.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{course.originalPrice}</span>
                      </div>
                    )}
                    {!course.isFree && (
                      <Badge className="bg-green-100 text-green-800">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Enroll Button */}
                  <Button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {course.isFree ? 'Start Free' : 'Enroll Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all courses.</p>
            <Button
              onClick={() => setSearchTerm('')}
              variant="outline"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;