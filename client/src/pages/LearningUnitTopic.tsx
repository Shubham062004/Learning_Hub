import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Video,
  FileText,
  MessageSquare,
  Brain,
  Trophy,
  Clock,
  Play
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const topicContent: Record<string, any> = {
  "intro-to-html": {
    title: "Introduction to HTML",
    week: 1,
    subject: "Frontend",
    description: "HTML (HyperText Markup Language) is the foundation of web development. In this topic, you'll learn the structure of a webpage, HTML tags, attributes, and document hierarchy.",
    duration: "45 min",
    objectives: [
      "Understand what HTML is and its role in web development",
      "Learn basic HTML structure and syntax",
      "Master essential HTML tags for text, links, and images",
      "Create well-structured HTML documents"
    ],
    lessons: [
      { id: 1, title: "What is HTML?", type: "video", duration: "8 min", completed: true },
      { id: 2, title: "HTML Document Structure", type: "reading", duration: "10 min", completed: true },
      { id: 3, title: "Basic HTML Tags", type: "video", duration: "12 min", completed: true },
      { id: 4, title: "Working with Links and Images", type: "interactive", duration: "15 min", completed: false },
      { id: 5, title: "Practice Exercise", type: "quiz", duration: "10 min", completed: false }
    ],
    theoryContent: `HTML stands for HyperText Markup Language. It's the standard language for creating web pages.`,
    quizQuestions: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language"],
        correct: 0
      }
    ]
  }
};

export const LearningUnitTopic = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topicSlug = searchParams.get("topic") || "intro-to-html";
  const week = searchParams.get("week") || "1";
  
  const [discussionText, setDiscussionText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const topic = topicContent[topicSlug] || topicContent["intro-to-html"];
  const completedLessons = topic.lessons.filter((l: any) => l.completed).length;
  const progress = (completedLessons / topic.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="hover:translate-x-1 transition-transform duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={() => navigate(`/learning/quiz/${topicSlug}`)}>
              Start Quiz
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center space-y-4 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-2">{topic.subject}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">{topic.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{topic.description}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        <Tabs defaultValue="lessons">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Lessons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topic.lessons.map((lesson: any) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-100' : 'bg-muted'}`}>
                        {lesson.completed ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <Play className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <Badge variant="outline" className="text-xs">{lesson.type}</Badge>
                      </div>
                    </div>
                    <Button size="sm">{lesson.completed ? "Review" : "Start"}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theory</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{topic.theoryContent}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Check</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate(`/learning/quiz/${topicSlug}`)}>Start Quiz</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Ask a question..." value={discussionText} onChange={(e) => setDiscussionText(e.target.value)} />
                <Button className="mt-3">Post</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LearningUnitTopic;
