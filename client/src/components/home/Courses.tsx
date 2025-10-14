import { Code, Database, Brain, LineChart, Sparkles, Cpu, Smartphone, TabletSmartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript, React, and modern web technologies",
    icon: Code,
    color: "text-primary",
    bgColor: "bg-primary/10",
    duration: "90 days",
    level: "Beginner to Advanced"
  },
  {
    title: "Data Science",
    description: "Python, statistics, data analysis, and visualization techniques",
    icon: LineChart,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    duration: "90 days",
    level: "Intermediate"
  },
  {
    title: "Data Analytics",
    description: "SQL, Excel, Tableau, Power BI, and business intelligence",
    icon: Database,
    color: "text-accent",
    bgColor: "bg-accent/10",
    duration: "90 days",
    level: "Beginner"
  },
  {
    title: "Machine Learning",
    description: "Algorithms, model training, deployment, and ML engineering",
    icon: Brain,
    color: "text-primary",
    bgColor: "bg-primary/10",
    duration: "90 days",
    level: "Advanced"
  },
  {
    title: "Generative AI",
    description: "LLMs, prompt engineering, RAG, and AI application development",
    icon: Sparkles,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    duration: "90 days",
    level: "Intermediate"
  },
  {
    title: "Predictive AI",
    description: "Time series, forecasting, and predictive modeling techniques",
    icon: Cpu,
    color: "text-accent",
    bgColor: "bg-accent/10",
    duration: "90 days",
    level: "Advanced"
  },
  {
    title: "Android Development",
    description: "Kotlin, Android Studio, Material Design, and native app development",
    icon: Smartphone,
    color: "text-primary",
    bgColor: "bg-primary/10",
    duration: "90 days",
    level: "Beginner to Advanced"
  },
  {
    title: "iOS Development",
    description: "Swift, Xcode, SwiftUI, and native iOS app development",
    icon: TabletSmartphone,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    duration: "90 days",
    level: "Beginner to Advanced"
  }
];

export const Courses = () => {
  return (
    <section id="courses" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            What We <span className="text-gradient">Teach</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive courses designed to take you from fundamentals to industry-ready expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Card 
                key={course.title} 
                className="card-hover border-2"
              >
                <CardHeader>
                  <div className={`h-14 w-14 rounded-lg ${course.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-7 w-7 ${course.color}`} />
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{course.duration}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
