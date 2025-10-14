import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail, Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Lead Instructor - Web Development",
    expertise: ["React", "Node.js", "TypeScript"],
    initials: "SC",
    color: "bg-primary"
  },
  {
    name: "Michael Rodriguez",
    role: "Data Science Lead",
    expertise: ["Python", "ML", "Statistics"],
    initials: "MR",
    color: "bg-secondary"
  },
  {
    name: "Priya Sharma",
    role: "AI/ML Specialist",
    expertise: ["Deep Learning", "NLP", "TensorFlow"],
    initials: "PS",
    color: "bg-accent"
  },
  {
    name: "David Kim",
    role: "Full Stack Mentor",
    expertise: ["MERN Stack", "DevOps", "AWS"],
    initials: "DK",
    color: "bg-primary"
  },
  {
    name: "Emily Watson",
    role: "Data Analytics Expert",
    expertise: ["SQL", "Tableau", "Power BI"],
    initials: "EW",
    color: "bg-secondary"
  },
  {
    name: "Alex Thompson",
    role: "Career Advisor",
    expertise: ["Resume Building", "Interviews", "Job Search"],
    initials: "AT",
    color: "bg-accent"
  }
];

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
          <div className="container relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering The Future Of <span className="text-gradient">Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to revolutionize education by combining learning with real-world earning opportunities
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 card-hover animate-scale-in">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  Empowering learners to work, and workers to learn. We bridge the gap between education and employment.
                </p>
              </Card>

              <Card className="p-8 card-hover animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-4">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  A world where every skill earns real value. Where learning is directly connected to earning opportunities.
                </p>
              </Card>

              <Card className="p-8 card-hover animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Our Values</h3>
                <p className="text-muted-foreground">
                  Excellence, integrity, and continuous innovation in everything we do. Your success is our success.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground text-lg">
                We're revolutionizing the future of education and work
              </p>
            </div>

            <div className="space-y-6 animate-slide-up">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">🎓 Comprehensive LMS Platform</h3>
                <p className="text-muted-foreground">
                  Our Learning Management System combines theory, practicals, quizzes, and real-world projects. 
                  Learn Web Development, Data Science, Machine Learning, AI, and more with industry experts.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">💼 Freelance Project Hub</h3>
                <p className="text-muted-foreground">
                  Work on real client projects and earn WorkLearn Points (WLP) or cash. Build your portfolio while 
                  gaining practical experience that employers value.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">🎯 Skills Assessment System</h3>
                <p className="text-muted-foreground">
                  Our comprehensive 1-week exam includes assignments, coding rounds, interviews, and HR rounds to 
                  ensure you're truly job-ready before joining our work team.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">💰 WorkLearn Points Ecosystem</h3>
                <p className="text-muted-foreground">
                  Earn points through projects, use them to unlock new courses or withdraw as cash via UPI. 
                  Your learning literally pays for itself.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="container">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">
                Meet Our <span className="text-gradient">Team</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn from industry experts with years of real-world experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card 
                  key={member.name} 
                  className="card-hover border-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className={`h-24 w-24 mb-4 ${member.color}`}>
                        <AvatarFallback className="text-2xl font-bold text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Github className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-scale-in">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Join thousands of learners who are building their future with WorkLearn
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/learning/dashboard">
                  <Button size="lg" variant="hero" className="gap-2">
                    Start Learning Today
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="gap-2">
                    Browse Projects
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
