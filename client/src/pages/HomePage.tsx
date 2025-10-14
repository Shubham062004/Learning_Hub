import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  MessageCircle,
  FolderKanban,
  Award,
  Zap,
  Target,
  Users,
  Check,
  Rocket,
  TrendingUp,
  Users2,
  ArrowRight,
  Calendar,
  Code,
  Briefcase,
  DollarSign,
  Repeat
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-learning.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const howItWorksSteps = [
  {
    number: "1",
    title: "Join a Course",
    description: "Choose from Web Dev, Data Science, ML, AI and more",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "2",
    title: "Learn & Practice",
    description: "Complete assignments, quizzes, and hands-on projects",
    icon: Code,
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "3",
    title: "1-Week Exam",
    description: "Prove your skills through comprehensive assessment",
    icon: Calendar,
    color: "from-orange-500 to-red-500"
  },
  {
    number: "4",
    title: "Join Work Team",
    description: "Start working on real freelance projects",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "5",
    title: "Earn & Upskill",
    description: "Get paid in WLP or cash, reinvest in new skills",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-500"
  },
  {
    number: "6",
    title: "Continuous Growth",
    description: "Withdraw earnings or unlock advanced courses",
    icon: Repeat,
    color: "from-indigo-500 to-purple-500"
  }
];

const examSchedule = [
  { day: "Day 1", activity: "Assignment Round", icon: "📝" },
  { day: "Day 2-3", activity: "Coding Rounds (Live + Notepad)", icon: "💻" },
  { day: "Day 4-5", activity: "Interview Rounds", icon: "🎙️" },
  { day: "Day 6", activity: "HR Round", icon: "👔" },
  { day: "Day 7", activity: "Break Day", icon: "🎉" }
];

const services = [
  {
    icon: BookOpen,
    title: "LMS with SaaS Integration",
    description: "Comprehensive Learning Management System with quizzes, projects, real-time mentoring, and AI-powered doubt solving available 24/7.",
    features: ["Video Lectures", "Interactive Quizzes", "Live Coding", "AI Tutors"]
  },
  {
    icon: FolderKanban,
    title: "Freelance Project Hub",
    description: "Work on real client projects, earn WorkLearn Points or real money, and build a professional portfolio while gaining industry experience.",
    features: ["Real Projects", "Earn WLP", "Build Portfolio", "Client Work"]
  }
];

const whyChooseUs = [
  {
    icon: Rocket,
    title: "Fast Learning",
    description: "Accelerated curriculum designed to get you from beginner to professional in months, not years."
  },
  {
    icon: Target,
    title: "Real-World Experience",
    description: "Work on actual freelance projects and gain practical experience that employers value."
  },
  {
    icon: DollarSign,
    title: "Automated Payouts",
    description: "Earn WorkLearn Points and cash. Withdraw via UPI or reinvest in upskilling."
  },
  {
    icon: TrendingUp,
    title: "Continuous Upskilling",
    description: "Use your earnings to unlock new courses and stay ahead in the ever-evolving tech landscape."
  }
];

const features = [
  "Theory + Practicals for complete understanding",
  "Quiz after every topic to track progress",
  "Real-time doubt solving & discussions",
  "Industry mentorship from experienced professionals",
  "WorkLearn Points (WLP) reward system",
  "UPI withdrawal & course purchase options"
];

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-20 md:py-32">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center space-y-6">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
                <Skeleton className="h-12 w-full max-w-xl mx-auto" />
                <div className="flex gap-4 justify-center">
                  <Skeleton className="h-12 w-40" />
                  <Skeleton className="h-12 w-40" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-12 w-24 mx-auto" />
                      <Skeleton className="h-4 w-32 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-muted/30">
            <div className="container">
              <div className="text-center mb-16 space-y-4">
                <Skeleton className="h-12 w-64 mx-auto" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background" />
            <img 
              src={heroImage} 
              alt="WorkLearn Hero" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="text-gradient">WorkLearn</span>
                </h1>
                <p className="text-2xl md:text-3xl font-semibold mb-4">
                  Learn. Work. Earn. <span className="text-gradient">Upskill.</span>
                </p>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  All in one ecosystem. Master cutting-edge technologies, work on real projects, and earn while you learn.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link to="/learning/dashboard">
                  <Button variant="hero" size="lg" className="group gap-2">
                    Start Learning
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="group gap-2">
                    Start Working
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient">500+</div>
                  <div className="text-sm text-muted-foreground mt-1">Active Learners</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient">50+</div>
                  <div className="text-sm text-muted-foreground mt-1">Live Projects</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient">95%</div>
                  <div className="text-sm text-muted-foreground mt-1">Job Success</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient">24/7</div>
                  <div className="text-sm text-muted-foreground mt-1">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How It <span className="text-gradient">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your complete journey from learning to earning
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {howItWorksSteps.map((step, index) => (
                <Card
                  key={step.number}
                  className="p-6 card-hover overflow-hidden relative"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-10 rounded-full -mr-16 -mt-16`} />
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white font-bold mb-4`}>
                      {step.number}
                    </div>
                    <step.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* 1-Week Exam Timeline */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">1-Week Comprehensive Exam</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {examSchedule.map((item, index) => (
                  <Card
                    key={item.day}
                    className="p-4 text-center card-hover"
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-semibold text-sm mb-1">{item.day}</div>
                    <div className="text-xs text-muted-foreground">{item.activity}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Our <span className="text-gradient">Services</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Two powerful ecosystems working together for your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <Card
                  key={service.title}
                  className="p-8 card-hover border-2 group hover:shadow-xl"
                >
                  <div className="h-14 w-14 rounded-lg gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="justify-center">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* WorkLearn Points */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-3xl font-bold mb-6">
                  WLP
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  WorkLearn Points <span className="text-gradient">(WLP)</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Earn points from projects, use them to buy new courses or convert to cash via UPI
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6">
                    <div className="text-3xl mb-2">💰</div>
                    <h4 className="font-semibold mb-2">Earn Points</h4>
                    <p className="text-sm text-muted-foreground">Complete projects and assignments</p>
                  </Card>
                  <Card className="p-6">
                    <div className="text-3xl mb-2">🎓</div>
                    <h4 className="font-semibold mb-2">Buy Courses</h4>
                    <p className="text-sm text-muted-foreground">Use points to unlock new skills</p>
                  </Card>
                  <Card className="p-6">
                    <div className="text-3xl mb-2">💳</div>
                    <h4 className="font-semibold mb-2">Withdraw Cash</h4>
                    <p className="text-sm text-muted-foreground">Convert to ₹ via UPI</p>
                  </Card>
                </div>
                <Link to="/wallet">
                  <Button size="lg" variant="hero" className="gap-2">
                    View Your Wallet
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose <span className="text-gradient">WorkLearn</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're revolutionizing education by combining learning with real-world earning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {whyChooseUs.map((item, index) => (
                <Card
                  key={item.title}
                  className="p-6 card-hover text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
                <h3 className="text-2xl font-semibold mb-6 text-center">What You Get:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/learning/dashboard">
                    <Button variant="hero" size="lg" className="gap-2">
                      Start Your Journey
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg">
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
