import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  CheckCircle2,
  Search,
  Heart,
  Database,
  Code,
  ArrowLeft,
  Trophy
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const subjects = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Heart,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/50",
    iconBg: "bg-pink-100 dark:bg-pink-900/30"
  },
  {
    id: "backend",
    name: "Backend",
    icon: Database,
    color: "from-purple-500/20 to-indigo-500/20",
    borderColor: "border-purple-500/50",
    iconBg: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    id: "programming",
    name: "Programming Skills",
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/50",
    iconBg: "bg-blue-100 dark:bg-blue-900/30"
  }
];

const weeklyModules: Record<string, any[]> = {
  frontend: [
    { week: 1, title: "Intro to HTML", slug: "intro-to-html", progress: 100, completed: true },
    { week: 2, title: "CSS Fundamentals", slug: "css-fundamentals", progress: 75, completed: false },
    { week: 3, title: "JavaScript Basics", slug: "js-basics", progress: 30, completed: false },
    { week: 4, title: "DOM Manipulation", slug: "dom-manipulation", progress: 0, completed: false },
    { week: 5, title: "Responsive Design", slug: "responsive-design", progress: 0, completed: false }
  ],
  backend: [
    { week: 1, title: "Server Fundamentals", slug: "server-fundamentals", progress: 80, completed: true },
    { week: 2, title: "Database Design", slug: "database-design", progress: 50, completed: false },
    { week: 3, title: "REST APIs", slug: "rest-apis", progress: 20, completed: false },
    { week: 4, title: "Authentication", slug: "authentication", progress: 0, completed: false },
    { week: 5, title: "Deployment", slug: "deployment", progress: 0, completed: false }
  ],
  programming: [
    { week: 1, title: "Problem Solving", slug: "problem-solving", progress: 90, completed: true },
    { week: 2, title: "Data Structures", slug: "data-structures", progress: 60, completed: false },
    { week: 3, title: "Algorithms", slug: "algorithms", progress: 40, completed: false },
    { week: 4, title: "Code Optimization", slug: "code-optimization", progress: 0, completed: false },
    { week: 5, title: "Advanced Concepts", slug: "advanced-programming", progress: 0, completed: false }
  ]
};

export const LearningUnit = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("frontend");
  const { ref: subjectsRef, isVisible: subjectsVisible } = useScrollAnimation();
  const { ref: modulesRef, isVisible: modulesVisible } = useScrollAnimation();

  const currentModules = weeklyModules[selectedSubject] || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="hover:translate-x-1 transition-transform duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                className="pl-10 w-64 transition-all duration-300 focus:w-72"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Learning Units</h1>
          <p className="text-muted-foreground text-lg">Choose a subject and explore weekly learning modules</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Subjects */}
          <div
            ref={subjectsRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-1 transition-all duration-700 ${
              subjectsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle>Subjects</CardTitle>
                <CardDescription>Choose your learning path</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjects.map((subject) => {
                  const Icon = subject.icon;
                  const isSelected = selectedSubject === subject.id;
                  
                  return (
                    <div
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all duration-300
                        hover:scale-105 hover:shadow-lg
                        ${isSelected 
                          ? `bg-gradient-to-br ${subject.color} border-2 ${subject.borderColor} shadow-md` 
                          : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${subject.iconBg} transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`font-medium transition-all duration-300 ${isSelected ? 'text-foreground text-lg' : ''}`}>
                          {subject.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Overall Progress */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Trophy className="h-4 w-4" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subjects.map((subject) => {
                    const modules = weeklyModules[subject.id];
                    const totalProgress = modules.reduce((sum, m) => sum + m.progress, 0) / modules.length;
                    return (
                      <div key={subject.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{subject.name}</span>
                          <span className="font-medium">{Math.round(totalProgress)}%</span>
                        </div>
                        <Progress value={totalProgress} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Weekly Modules */}
          <div
            ref={modulesRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              modulesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="capitalize flex items-center justify-between">
                  <span>{selectedSubject}</span>
                  <Badge variant="outline">{currentModules.length} Weeks</Badge>
                </CardTitle>
                <CardDescription>Weekly learning modules - Click to start learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentModules.map((module, index) => (
                    <div
                      key={module.week}
                      onClick={() => navigate(`/learning/unit/topic?topic=${module.slug}&week=${module.week}`)}
                      className={`group p-6 border rounded-lg cursor-pointer transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-translate-y-1 bg-card animate-fade-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 overflow-hidden">
                            <Badge variant="outline" className="mb-2 transition-all duration-300 group-hover:scale-110">
                              Week {module.week}
                            </Badge>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {module.title}
                            </h3>
                          </div>
                          {module.completed && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 animate-scale-in" />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2 transition-all duration-500" />
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full transition-all duration-300 group-hover:scale-105"
                          variant={module.progress > 0 ? "default" : "outline"}
                        >
                          {module.progress === 100 ? "Review" : module.progress > 0 ? "Continue" : "Start Learning"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningUnit;
