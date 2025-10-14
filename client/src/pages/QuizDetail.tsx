import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  Clock,
  AlertCircle
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const quizData: Record<string, any> = {
  "intro-to-html": {
    title: "Intro to HTML Quiz",
    subject: "Frontend",
    week: 1,
    totalQuestions: 5,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language"
        ],
        correct: 0
      },
      {
        id: 2,
        question: "Which tag is used for the largest heading?",
        options: ["<h6>", "<h1>", "<heading>", "<head>"],
        correct: 1
      },
      {
        id: 3,
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correct: 2
      },
      {
        id: 4,
        question: "Which HTML attribute specifies an alternate text for an image?",
        options: ["title", "alt", "src", "longdesc"],
        correct: 1
      },
      {
        id: 5,
        question: "Which doctype is correct for HTML5?",
        options: [
          "<!DOCTYPE HTML5>",
          "<!DOCTYPE html>",
          "<!DOCTYPE>",
          "<DOCTYPE html>"
        ],
        correct: 1
      }
    ]
  },
  "css-fundamentals": {
    title: "CSS Fundamentals Quiz",
    subject: "Frontend",
    week: 2,
    totalQuestions: 5,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Colorful Style Sheets"
        ],
        correct: 1
      },
      {
        id: 2,
        question: "Which property is used to change the background color?",
        options: ["color", "bg-color", "background-color", "backgroundColor"],
        correct: 2
      },
      {
        id: 3,
        question: "How do you select an element with id 'header'?",
        options: ["#header", ".header", "header", "*header"],
        correct: 0
      },
      {
        id: 4,
        question: "Which CSS property controls the text size?",
        options: ["text-size", "font-style", "text-style", "font-size"],
        correct: 3
      },
      {
        id: 5,
        question: "How do you make text bold in CSS?",
        options: [
          "font-weight: bold;",
          "text: bold;",
          "font: bold;",
          "style: bold;"
        ],
        correct: 0
      }
    ]
  }
};

export const QuizDetail = () => {
  const navigate = useNavigate();
  const { topic = "intro-to-html" } = useParams();
  const quiz = quizData[topic] || quizData["intro-to-html"];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: questionRef, isVisible: questionVisible } = useScrollAnimation();

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const score = calculateScore();
  const percentage = (score / quiz.questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="hover:translate-x-1 transition-transform duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <Card className="animate-scale-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                {percentage >= 70 ? (
                  <Trophy className="h-20 w-20 text-yellow-500 animate-pulse" />
                ) : (
                  <AlertCircle className="h-20 w-20 text-orange-500" />
                )}
              </div>
              <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
              <CardDescription className="text-lg">
                {percentage >= 70 
                  ? "Congratulations! You passed!" 
                  : "Keep practicing, you'll get there!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-primary">
                  {score}/{quiz.questions.length}
                </div>
                <p className="text-muted-foreground">Correct Answers</p>
                <div className="text-2xl font-semibold">{Math.round(percentage)}%</div>
              </div>

              <Progress value={percentage} className="h-4" />

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold text-lg">Review Answers</h3>
                {quiz.questions.map((q: any, index: number) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correct;
                  
                  return (
                    <div
                      key={q.id}
                      className={`p-4 border rounded-lg transition-all duration-300 ${
                        isCorrect 
                          ? 'border-green-500/50 bg-green-50 dark:bg-green-900/10' 
                          : 'border-red-500/50 bg-red-50 dark:bg-red-900/10'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            {index + 1}. {q.question}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">
                              Your answer: <span className={isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                {q.options[userAnswer] || "Not answered"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-muted-foreground">
                                Correct answer: <span className="text-green-600 dark:text-green-400">
                                  {q.options[q.correct]}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => navigate(-1)} 
                  variant="outline" 
                  className="flex-1 hover:scale-105 transition-transform duration-300"
                >
                  Back to Learning
                </Button>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="flex-1 hover:scale-105 transition-transform duration-300"
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="hover:translate-x-1 transition-transform duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Quiz
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </Badge>
              <Badge>
                Question {currentQuestion + 1}/{quiz.questions.length}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Quiz Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-8 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Badge className="mb-2">{quiz.subject}</Badge>
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-muted-foreground">Week {quiz.week}</p>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-medium">Quiz Progress</span>
              <span className="text-muted-foreground">
                {currentQuestion + 1} of {quiz.questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card
          ref={questionRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${
            questionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <CardHeader>
            <CardTitle className="text-xl">
              Question {currentQuestion + 1}
            </CardTitle>
            <CardDescription className="text-lg font-medium text-foreground pt-2">
              {currentQ.question}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedAnswers[currentQ.id]?.toString()}
              onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
            >
              {currentQ.options.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    selectedAnswers[currentQ.id] === index
                      ? 'border-primary bg-primary/5'
                      : 'hover:border-muted-foreground/50'
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="hover:scale-105 transition-transform duration-300"
              >
                Previous
              </Button>
              
              {currentQuestion === quiz.questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Next Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default QuizDetail;
