import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4 group">
              <GraduationCap className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold text-gradient">WorkLearn</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Learn. Work. Earn. Upskill — All in one ecosystem. Empowering learners and workers to achieve their goals through innovation and real-world projects.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                Home
              </Link>
              <Link to="/learning/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                Dashboard
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                About
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                Projects
              </Link>
              <Link to="/wallet" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                Wallet
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WorkLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
