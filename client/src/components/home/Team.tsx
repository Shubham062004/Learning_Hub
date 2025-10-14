import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Github } from "lucide-react";

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

export const Team = () => {
  return (
    <section id="team" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
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
              className="card-hover border-2"
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
                    <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                      <Github className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
