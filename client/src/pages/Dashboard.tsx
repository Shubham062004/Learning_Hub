import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Trophy,
  Clock,
  Bell,
  Search,
  CheckCircle2,
  MessageSquare,
  FileText,
  Award,
  Users,
  BarChart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const assignments = [
  { id: 1, title: "HTML Project - Personal Portfolio", due: "2024-03-25", status: "pending", subject: "Frontend" },
  { id: 2, title: "CSS Animation Challenge", due: "2024-03-28", status: "submitted", subject: "Frontend" },
  { id: 3, title: "JavaScript Calculator", due: "2024-03-30", status: "pending", subject: "Programming" }
];

const announcements = [
  { id: 1, title: "New Course: React Fundamentals", date: "2024-03-20", type: "course" },
  { id: 2, title: "Weekly Quiz Tomorrow", date: "2024-03-21", type: "quiz" },
  { id: 3, title: "Office Hours: Thursday 3PM", date: "2024-03-22", type: "event" }
];

const recentActivities = [
  { id: 1, action: "Completed", item: "CSS Flexbox Lesson", time: "2 hours ago" },
  { id: 2, action: "Submitted", item: "HTML Assignment", time: "1 day ago" },
  { id: 3, action: "Scored 95%", item: "JavaScript Quiz", time: "2 days ago" }
];

export const LearningPortal = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: assignmentsRef, isVisible: assignmentsVisible } = useScrollAnimation();
  const { ref: announcementsRef, isVisible: announcementsVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-card p-6 space-y-8 overflow-y-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Learning Portal</h2>
            <p className="text-sm text-muted-foreground">Your education dashboard</p>
          </div>

          <nav className="space-y-2">
            <Link
              to="/learning/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1 text-primary font-medium bg-primary/10"
            >
              <BarChart className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/learning/unit"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <BookOpen className="h-4 w-4" />
              Learning Units
            </Link>
            <Link
              to="/learning/assignments"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <FileText className="h-4 w-4" />
              Assignments
            </Link>
            <Link
              to="/learning/announcements"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <Bell className="h-4 w-4" />
              Announcements
            </Link>
            <Link
              to="/learning/points"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <Trophy className="h-4 w-4" />
              Points
            </Link>
            <Link
              to="/learning/lectures"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <BookOpen className="h-4 w-4" />
              Lectures
            </Link>
            <Link
              to="/learning/quiz"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <Award className="h-4 w-4" />
              Quiz
            </Link>
            <Link
              to="/learning/discussion"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <MessageSquare className="h-4 w-4" />
              Discussion
            </Link>
            <Link
              to="/learning/support"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-all duration-300 hover:translate-x-1"
            >
              <Users className="h-4 w-4" />
              Support
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Track your progress and stay updated.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 transition-all duration-300 focus:w-72"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-700 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 in progress</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450</div>
              <p className="text-xs text-muted-foreground">+180 this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completion</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignments */}
          <div
            ref={assignmentsRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-2 transition-all duration-700 delay-100 ${
              assignmentsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Assignments</CardTitle>
                  <Link to="/learning/assignments">
                    <Button variant="ghost" size="sm" className="hover:translate-x-1 transition-transform duration-300">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-1 truncate hover:text-primary transition-colors">
                        {assignment.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {assignment.subject}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due {assignment.due}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={assignment.status === "submitted" ? "default" : "secondary"}
                      className="transition-all duration-300 hover:scale-110 ml-4"
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:translate-x-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span> {activity.item}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Announcements */}
          <div
            ref={announcementsRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 delay-200 ${
              announcementsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="capitalize">
                        {announcement.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {announcement.date}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm">{announcement.title}</h4>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningPortal;
