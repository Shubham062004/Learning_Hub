import { Zap, Target, Users } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About <span className="text-gradient">WorkLearn</span></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            We're revolutionizing the future of education and work. WorkLearn is an all-in-one ecosystem 
            where you can either <span className="text-primary font-semibold">learn to work</span> or{" "}
            <span className="text-secondary font-semibold">work to learn</span>.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master cutting-edge technologies through our intensive LMS, then apply your skills on real freelance projects. 
            Earn WorkLearn Points (WLP) and real money while building your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-8 card-hover border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fast-Track Learning</h3>
            <p className="text-muted-foreground">
              Our accelerated curriculum is designed to get you from beginner to professional in months, not years. Every lesson is optimized for maximum retention and practical application.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 card-hover border">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Project-Based Approach</h3>
            <p className="text-muted-foreground">
              Learn by doing. Build real-world projects that showcase your skills to potential employers. From concept to deployment, experience the full development lifecycle.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 card-hover border">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Mentorship</h3>
            <p className="text-muted-foreground">
              Get personalized guidance from industry professionals. Regular code reviews, one-on-one sessions, and instant doubt clearing ensure you're never stuck.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
