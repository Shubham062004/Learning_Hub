import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Pin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const announcements = [
  {
    id: 1,
    title: "New Course Material Available",
    message: "We've added comprehensive React Hooks tutorials to the Web Development course. Check out the new video lectures and interactive exercises in the course dashboard.",
    category: "Course Update",
    date: "2025-10-11",
    time: "2 hours ago",
    pinned: true,
    priority: "high"
  },
  {
    id: 2,
    title: "Quiz Schedule Update",
    message: "The Data Science quiz originally scheduled for Friday has been postponed to next Monday. This gives you more time to prepare and review the material.",
    category: "Schedule Change",
    date: "2025-10-10",
    time: "1 day ago",
    pinned: true,
    priority: "medium"
  },
  {
    id: 3,
    title: "Guest Lecture: Industry Expert Session",
    message: "Join us this Friday at 3 PM for a special guest lecture from a senior ML engineer at a Fortune 500 company. Topics will include real-world ML applications and career advice.",
    category: "Event",
    date: "2025-10-09",
    time: "2 days ago",
    pinned: false,
    priority: "high"
  },
  {
    id: 4,
    title: "Platform Maintenance Notice",
    message: "Scheduled maintenance will occur this Sunday from 2 AM to 4 AM. The platform may be temporarily unavailable during this time.",
    category: "Maintenance",
    date: "2025-10-09",
    time: "2 days ago",
    pinned: false,
    priority: "medium"
  },
  {
    id: 5,
    title: "New Discussion Forum Features",
    message: "We've added new features to the discussion forum including code syntax highlighting and the ability to attach files to your posts.",
    category: "Feature",
    date: "2025-10-08",
    time: "3 days ago",
    pinned: false,
    priority: "low"
  },
  {
    id: 6,
    title: "Assignment Submission Reminder",
    message: "Don't forget to submit your React Components assignment by October 15th. Late submissions will incur a 10% penalty per day.",
    category: "Reminder",
    date: "2025-10-07",
    time: "4 days ago",
    pinned: false,
    priority: "high"
  }
];

export const Announcements = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Course Update": "bg-primary/10 text-primary border-primary/20",
      "Schedule Change": "bg-accent/10 text-accent border-accent/20",
      "Event": "bg-secondary/10 text-secondary border-secondary/20",
      "Maintenance": "bg-muted text-muted-foreground border-muted",
      "Feature": "bg-success/10 text-success border-success/20",
      "Reminder": "bg-accent/10 text-accent border-accent/20"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const pinnedAnnouncements = announcements.filter(a => a.pinned);
  const regularAnnouncements = announcements.filter(a => !a.pinned);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Announcements</h1>
                <p className="text-muted-foreground">Stay updated with the latest news and updates</p>
              </div>
              <Link to="/learning/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-scale-in">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm text-muted-foreground">Total Announcements</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Pin className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Pinned</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned Announcements */}
          {pinnedAnnouncements.length > 0 && (
            <div className="mb-8 animate-slide-up">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Pin className="h-6 w-6 text-primary" />
                Pinned Announcements
              </h2>
              <div className="space-y-4">
                {pinnedAnnouncements.map((announcement, index) => (
                  <div
                    key={announcement.id}
                    className="bg-card border-2 border-primary/20 rounded-lg p-6 card-hover animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <Bell className="h-6 w-6 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={getCategoryColor(announcement.category)} variant="outline">
                              {announcement.category}
                            </Badge>
                            {getPriorityBadge(announcement.priority)}
                          </div>
                        </div>
                      </div>
                      <Pin className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">{announcement.message}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{announcement.time}</span>
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Announcements */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-4">Recent Announcements</h2>
            <div className="space-y-4">
              {regularAnnouncements.map((announcement, index) => (
                <div
                  key={announcement.id}
                  className="bg-card border rounded-lg p-6 card-hover animate-scale-in"
                  style={{ animationDelay: `${(index + pinnedAnnouncements.length) * 0.1}s` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Bell className="h-6 w-6 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={getCategoryColor(announcement.category)} variant="outline">
                          {announcement.category}
                        </Badge>
                        {getPriorityBadge(announcement.priority)}
                      </div>
                      <p className="text-muted-foreground mb-4">{announcement.message}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{announcement.time}</span>
                        <span>{announcement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Announcements;
