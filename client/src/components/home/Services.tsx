import { BookOpen, MessageCircle, FolderKanban, Award } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Interactive LMS",
    description: "Access our comprehensive Learning Management System with video lectures, interactive quizzes, and hands-on coding exercises available 24/7."
  },
  {
    icon: MessageCircle,
    title: "Live Mentorship",
    description: "One-on-one sessions with industry experts, instant doubt clearing through discussion forums, and regular code review sessions."
  },
  {
    icon: FolderKanban,
    title: "Real Projects",
    description: "Build portfolio-worthy projects from scratch. Get detailed feedback on your code, architecture decisions, and deployment strategies."
  },
  {
    icon: Award,
    title: "Career Support",
    description: "Resume building, mock interviews, job referrals, and career guidance to help you land your dream role in tech."
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to accelerate your tech career, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-card border-2 rounded-lg p-8 card-hover"
              >
                <div className="h-14 w-14 rounded-lg gradient-primary flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
