import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, FileQuestion, Search, Award, AlertCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const upcomingQuizzes = [
  {
    id: 1,
    title: "React Hooks Assessment",
    course: "Web Development",
    questions: 20,
    duration: "30 min",
    dueDate: "2025-10-14",
    attempts: 2,
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "Data Visualization Quiz",
    course: "Data Science",
    questions: 15,
    duration: "25 min",
    dueDate: "2025-10-17",
    attempts: 3,
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Neural Networks Fundamentals",
    course: "Machine Learning",
    questions: 25,
    duration: "45 min",
    dueDate: "2025-10-20",
    attempts: 1,
    difficulty: "Hard"
  }
];

const completedQuizzes = [
  {
    id: 4,
    title: "JavaScript ES6 Features",
    course: "Web Development",
    score: 95,
    questions: 20,
    completedDate: "2025-10-08",
    timeSpent: "22 min"
  },
  {
    id: 5,
    title: "Python Basics",
    course: "Data Science",
    score: 88,
    questions: 15,
    completedDate: "2025-10-05",
    timeSpent: "18 min"
  },
  {
    id: 6,
    title: "HTML & CSS Fundamentals",
    course: "Web Development",
    score: 92,
    questions: 18,
    completedDate: "2025-10-02",
    timeSpent: "20 min"
  }
];

export const Quiz = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-success/10 text-success border-success/20";
      case "Medium":
        return "bg-accent/10 text-accent border-accent/20";
      case "Hard":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-accent";
    return "text-destructive";
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const averageScore = completedQuizzes.reduce((acc, quiz) => acc + quiz.score, 0) / completedQuizzes.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Quizzes</h1>
                <p className="text-muted-foreground">Test your knowledge and track your progress</p>
              </div>
              <Link to="/learning/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
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
                  <FileQuestion className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Upcoming</div>
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
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{averageScore.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Perfect Scores</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="upcoming" className="animate-slide-up">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming Quizzes</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingQuizzes.map((quiz, index) => {
                const daysRemaining = getDaysRemaining(quiz.dueDate);
                return (
                  <div
                    key={quiz.id}
                    className="bg-card border-2 rounded-lg p-6 card-hover animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <FileQuestion className="h-6 w-6 text-primary mt-1" />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <Badge variant="outline">{quiz.course}</Badge>
                              <Badge className={getDifficultyColor(quiz.difficulty)} variant="outline">
                                {quiz.difficulty}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span>{quiz.questions} questions</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {quiz.duration}
                              </span>
                              <span>•</span>
                              <span>{quiz.attempts} attempts allowed</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          {daysRemaining <= 2 ? (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Due in {daysRemaining} days
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              Due in {daysRemaining} days
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">Due: {quiz.dueDate}</span>
                        <Button>
                          Start Quiz
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedQuizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="bg-card border rounded-lg p-6 card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <CheckCircle2 className="h-6 w-6 text-success mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Badge variant="outline">{quiz.course}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span>{quiz.questions} questions</span>
                            <span>•</span>
                            <span>Completed on {quiz.completedDate}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {quiz.timeSpent}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className={`text-4xl font-bold ${getScoreColor(quiz.score)}`}>
                        {quiz.score}%
                      </div>
                      <Badge variant="default" className="bg-success">
                        Completed
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Results</Button>
                        <Button size="sm" variant="outline">Retake</Button>
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

export default Quiz;
