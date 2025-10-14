import { Check, Rocket, TrendingUp, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  "Learn 3x faster with our accelerated curriculum",
  "Build real projects that impress employers",
  "Get personalized feedback from industry experts",
  "Access lifetime updates and new course content",
  "Join a thriving community of learners",
  "Guaranteed job support and career guidance"
];

export const WhyUs = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">Us</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just another online course platform. We're your partner in building a successful tech career.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fast-Track Your Career</h3>
                  <p className="text-muted-foreground">
                    Our intensive, project-based approach gets you job-ready in months, not years. Start building your future today.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Industry-Relevant Skills</h3>
                  <p className="text-muted-foreground">
                    Learn the exact technologies and tools used by top companies. Our curriculum is updated quarterly to match industry trends.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community & Support</h3>
                  <p className="text-muted-foreground">
                    Join thousands of learners and get help whenever you need it. Discussion forums, live sessions, and peer learning.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">What You Get:</h3>
              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/learning">
                <Button variant="hero" size="lg" className="w-full">
                  Start Your Journey Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
