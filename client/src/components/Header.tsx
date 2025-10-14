import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, Briefcase, Wallet } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105 group">
          <GraduationCap className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-bold text-gradient">WorkLearn</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/" && "text-primary"
            )}
          >
            Home
          </Link>
          <Link 
            to="/learning/dashboard" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/learning/dashboard" && "text-primary"
            )}
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/about" && "text-primary"
            )}
          >
            About
          </Link>
          <Link 
            to="/services" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
              location.pathname === "/services" && "text-primary"
            )}
          >
            <Briefcase className="h-4 w-4" />
            Projects
          </Link>
          <Link 
            to="/wallet" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
              location.pathname === "/wallet" && "text-primary"
            )}
          >
            <Wallet className="h-4 w-4" />
            Wallet
          </Link>
          <Link to="/login">
            <Button variant="hero" className="ml-4">
              Sign In
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t animate-slide-up">
          <nav className="container flex flex-col space-y-4 py-4">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/learning/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Briefcase className="h-4 w-4" />
              Projects
            </Link>
            <Link
              to="/wallet"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Wallet className="h-4 w-4" />
              Wallet
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="hero" className="w-full">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
