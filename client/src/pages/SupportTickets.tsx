import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ticket, Search, Plus, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const openTickets = [
  { id: 1, title: "Cannot access course materials", priority: "High", status: "In Progress", created: "2025-10-10", updated: "2 hours ago" },
  { id: 2, title: "Quiz submission error", priority: "Medium", status: "Pending", created: "2025-10-09", updated: "1 day ago" },
  { id: 3, title: "Video playback issues", priority: "Low", status: "Pending", created: "2025-10-08", updated: "2 days ago" }
];

const closedTickets = [
  { id: 4, title: "Login issues resolved", priority: "High", status: "Resolved", created: "2025-10-05", resolved: "2025-10-06" },
  { id: 5, title: "Certificate download fixed", priority: "Medium", status: "Resolved", created: "2025-10-02", resolved: "2025-10-03" }
];

export const SupportTickets = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-accent/10 text-accent border-accent/20";
      case "Low": return "bg-muted text-muted-foreground border-muted";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container max-w-7xl">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Support Tickets</h1>
                <p className="text-muted-foreground">Get help with technical issues</p>
              </div>
              <div className="flex gap-2">
                <Link to="/learning/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
                <Button><Plus className="h-4 w-4 mr-2" />New Ticket</Button>
              </div>
            </div>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-scale-in">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Open Tickets</div>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Resolved</div>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1.5h</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="open" className="animate-slide-up">
            <TabsList className="mb-6">
              <TabsTrigger value="open">Open Tickets</TabsTrigger>
              <TabsTrigger value="closed">Closed Tickets</TabsTrigger>
            </TabsList>
            <TabsContent value="open" className="space-y-4">
              {openTickets.map((ticket, index) => (
                <div key={ticket.id} className="bg-card border rounded-lg p-6 card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Ticket className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getPriorityColor(ticket.priority)} variant="outline">{ticket.priority}</Badge>
                          <Badge variant="secondary">{ticket.status}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Created: {ticket.created}</span>
                          <span>•</span>
                          <span>Updated: {ticket.updated}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="closed" className="space-y-4">
              {closedTickets.map((ticket, index) => (
                <div key={ticket.id} className="bg-card border rounded-lg p-6 card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <CheckCircle2 className="h-6 w-6 text-success mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getPriorityColor(ticket.priority)} variant="outline">{ticket.priority}</Badge>
                          <Badge variant="default" className="bg-success">Resolved</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Created: {ticket.created}</span>
                          <span>•</span>
                          <span>Resolved: {ticket.resolved}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportTickets;
