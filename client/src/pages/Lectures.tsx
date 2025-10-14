import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, PlayCircle, CheckCircle2, Clock, Search, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";

const lectures = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    course: "Web Development",
    duration: "45 min",
    watched: false,
    progress: 0,
    description: "Learn the fundamentals of React Hooks and how they revolutionize component development",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
  },
  {
    id: 2,
    title: "Advanced useState Patterns",
    course: "Web Development",
    duration: "38 min",
    watched: false,
    progress: 65,
    description: "Deep dive into advanced useState patterns and best practices",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop"
  },
  {
    id: 3,
    title: "Data Cleaning with Pandas",
    course: "Data Science",
    duration: "52 min",
    watched: false,
    progress: 30,
    description: "Master data cleaning techniques using Python Pandas library",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop"
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    course: "Machine Learning",
    duration: "1h 15min",
    watched: false,
    progress: 0,
    description: "Introduction to machine learning concepts and algorithms",
    thumbnail: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=225&fit=crop"
  }
];

const completedLectures = [
  {
    id: 5,
    title: "HTML & CSS Basics",
    course: "Web Development",
    duration: "42 min",
    completedDate: "2025-10-08",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop"
  },
  {
    id: 6,
    title: "JavaScript ES6 Features",
    course: "Web Development",
    duration: "55 min",
    completedDate: "2025-10-05",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=225&fit=crop"
  },
  {
    id: 7,
    title: "Python for Data Analysis",
    course: "Data Science",
    duration: "48 min",
    completedDate: "2025-10-03",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop"
  }
];

export const Lectures = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Video Lectures</h1>
                <p className="text-muted-foreground">Access your course video content</p>
              </div>
              <Link to="/learning/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lectures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-scale-in">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-muted-foreground">Total Lectures</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <PlayCircle className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-sm text-muted-foreground">Watch Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="current" className="animate-slide-up">
            <TabsList className="mb-6">
              <TabsTrigger value="current">Current Lectures</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              {lectures.map((lecture, index) => (
                <div
                  key={lecture.id}
                  className="bg-card border rounded-lg overflow-hidden card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Thumbnail */}
                    <div className="relative md:w-80 h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={lecture.thumbnail} 
                        alt={lecture.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white" />
                      </div>
                      {lecture.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${lecture.progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{lecture.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                              <Badge variant="outline">{lecture.course}</Badge>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {lecture.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{lecture.description}</p>
                        
                        {lecture.progress > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{lecture.progress}%</span>
                            </div>
                            <Progress value={lecture.progress} className="h-2" />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          {lecture.progress > 0 ? 'Continue Watching' : 'Start Watching'}
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {completedLectures.map((lecture, index) => (
                <div
                  key={lecture.id}
                  className="bg-card border rounded-lg overflow-hidden card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Thumbnail */}
                    <div className="relative md:w-80 h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={lecture.thumbnail} 
                        alt={lecture.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="default" className="bg-success">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{lecture.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                          <Badge variant="outline">{lecture.course}</Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {lecture.duration}
                          </span>
                          <span>Completed on {lecture.completedDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Rewatch
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lectures;
