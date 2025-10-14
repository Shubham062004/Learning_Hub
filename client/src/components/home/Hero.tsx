import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background" />
        <img 
          src={heroImage} 
          alt="Learning Hub Hero" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">WorkLearn</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Learn. Work. Earn. <span className="text-gradient">Upskill.</span>
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              All in one ecosystem. Master cutting-edge technologies through hands-on projects, work on real freelance projects, and earn while you learn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learning">
              <Button variant="hero" size="lg" className="group">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="group">
                Join Projects
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
