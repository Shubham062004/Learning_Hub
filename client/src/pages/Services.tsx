import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Briefcase,
  Code,
  PenTool,
  Database,
  Sparkles,
  Clock,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const projects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description: "Build a full-stack e-commerce platform with React, Node.js, and payment integration",
    reward: 5000,
    points: 500,
    deadline: "15 days",
    category: "Web Development",
    level: "Intermediate",
    icon: Code,
    status: "Open"
  },
  {
    id: 2,
    title: "Data Analysis Dashboard",
    description: "Create an interactive analytics dashboard using Python, Pandas, and Plotly",
    reward: 3500,
    points: 350,
    deadline: "10 days",
    category: "Data Science",
    level: "Intermediate",
    icon: Database,
    status: "Open"
  },
  {
    id: 3,
    title: "AI Chatbot Integration",
    description: "Integrate AI-powered chatbot with natural language processing capabilities",
    reward: 7000,
    points: 700,
    deadline: "20 days",
    category: "AI/ML",
    level: "Advanced",
    icon: Sparkles,
    status: "Open"
  },
  {
    id: 4,
    title: "Mobile App UI/UX Design",
    description: "Design modern UI/UX for iOS and Android fitness tracking app",
    reward: 4000,
    points: 400,
    deadline: "12 days",
    category: "Design",
    level: "Beginner",
    icon: PenTool,
    status: "Open"
  },
  {
    id: 5,
    title: "Business Analytics Report",
    description: "Analyze sales data and create comprehensive business intelligence report",
    reward: 3000,
    points: 300,
    deadline: "8 days",
    category: "Data Analytics",
    level: "Beginner",
    icon: TrendingUp,
    status: "Open"
  },
  {
    id: 6,
    title: "ML Model Development",
    description: "Build and train machine learning model for predictive analytics",
    reward: 8000,
    points: 800,
    deadline: "25 days",
    category: "Machine Learning",
    level: "Advanced",
    icon: Sparkles,
    status: "Open"
  }
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || project.category === category;
    const matchesLevel = level === "all" || project.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center animate-fade-in">
              <Briefcase className="h-16 w-16 mx-auto mb-6 text-primary animate-float" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Turn Your Skills into <span className="text-gradient">Real Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Work on real-world projects, earn WorkLearn Points (WLP) and money. Build your portfolio while getting paid.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects by title or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 animate-typing"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Skeleton Loading
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader>
                      <Skeleton className="h-8 w-8 rounded-lg mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredProjects.map((project, index) => {
                  const Icon = project.icon;
                  return (
                    <Card
                      key={project.id}
                      className="card-hover border-2 hover:border-primary/50 transition-all duration-300 animate-scale-in group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader>
                        <div className={`h-12 w-12 rounded-lg ${project.level === 'Advanced' ? 'bg-accent/10' : project.level === 'Intermediate' ? 'bg-secondary/10' : 'bg-primary/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-6 w-6 ${project.level === 'Advanced' ? 'text-accent' : project.level === 'Intermediate' ? 'text-secondary' : 'text-primary'}`} />
                        </div>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                          <Badge variant="outline" className="ml-2">{project.status}</Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge>{project.category}</Badge>
                          <Badge variant="secondary">{project.level}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-success" />
                            <span className="font-semibold">₹{project.reward}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <span className="font-semibold">{project.points} WLP</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{project.deadline}</span>
                          </div>
                        </div>
                        <Button className="w-full btn-shine group">
                          Apply Now
                          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            {filteredProjects.length === 0 && !loading && (
              <div className="text-center py-12 animate-fade-in">
                <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not Found Your Perfect Project?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our learning paths to upskill and unlock more advanced projects
              </p>
              <Button size="lg" variant="default" className="btn-shine">
                Explore Courses
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
