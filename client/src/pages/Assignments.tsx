import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Upload,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const assignments = [
  {
    id: 1,
    title: "React Components Assignment",
    course: "Web Development",
    dueDate: "2025-10-15",
    status: "pending",
    points: 100,
    description: "Create a functional React component with props and state management"
  },
  {
    id: 2,
    title: "Data Analysis Project",
    course: "Data Science",
    dueDate: "2025-10-18",
    status: "in-progress",
    points: 150,
    description: "Analyze the provided dataset and create visualizations"
  },
  {
    id: 3,
    title: "ML Model Implementation",
    course: "Machine Learning",
    dueDate: "2025-10-20",
    status: "not-started",
    points: 200,
    description: "Implement and train a machine learning model for classification"
  }
];

const completedAssignments = [
  {
    id: 4,
    title: "HTML/CSS Portfolio",
    course: "Web Development",
    submittedDate: "2025-10-05",
    grade: 95,
    points: 100
  },
  {
    id: 5,
    title: "Python Basics Quiz",
    course: "Data Science",
    submittedDate: "2025-10-08",
    grade: 88,
    points: 50
  }
];

export const Assignments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-accent text-accent">Pending</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return null;
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Assignments</h1>
                <p className="text-muted-foreground">Manage and track your course assignments</p>
              </div>
              <Link to="/learning/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
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
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">Due Soon</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">450</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="active" className="animate-slide-up">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Assignments</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {assignments.map((assignment, index) => {
                const daysRemaining = getDaysRemaining(assignment.dueDate);
                return (
                  <div
                    key={assignment.id}
                    className="bg-card border-2 rounded-lg p-6 card-hover animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                            <p className="text-muted-foreground mb-3">{assignment.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <span className="text-muted-foreground">
                                <strong>Course:</strong> {assignment.course}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">
                                <strong>Points:</strong> {assignment.points}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        {getStatusBadge(assignment.status)}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span className={daysRemaining <= 2 ? "text-destructive font-semibold" : "text-muted-foreground"}>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Upload className="h-4 w-4 mr-2" />
                            Submit
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedAssignments.map((assignment, index) => (
                <div
                  key={assignment.id}
                  className="bg-card border rounded-lg p-6 card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-success mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-muted-foreground">
                              <strong>Course:</strong> {assignment.course}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              <strong>Submitted:</strong> {assignment.submittedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <Badge variant="default" className="bg-success">
                        Grade: {assignment.grade}%
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {assignment.points} points earned
                      </span>
                      <Button size="sm" variant="outline">View Feedback</Button>
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

export default Assignments;
