import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, MessageCircle, Search, Plus, Pin, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const discussions = [
  {
    id: 1,
    title: "How to optimize React component rendering?",
    author: "Sarah Chen",
    course: "Web Development",
    replies: 12,
    likes: 24,
    lastActivity: "2 hours ago",
    pinned: false,
    tags: ["React", "Performance"],
    excerpt: "I'm working on a large React application and noticed some performance issues..."
  },
  {
    id: 2,
    title: "Best practices for data preprocessing",
    author: "Mike Wilson",
    course: "Data Science",
    replies: 8,
    likes: 18,
    lastActivity: "5 hours ago",
    pinned: true,
    tags: ["Python", "Pandas"],
    excerpt: "What are your recommended steps for cleaning and preprocessing large datasets?"
  },
  {
    id: 3,
    title: "Understanding gradient descent algorithms",
    author: "Emma Davis",
    course: "Machine Learning",
    replies: 15,
    likes: 32,
    lastActivity: "1 day ago",
    pinned: true,
    tags: ["ML", "Algorithms"],
    excerpt: "Can someone explain the difference between batch, stochastic, and mini-batch gradient descent?"
  },
  {
    id: 4,
    title: "Deploying React apps to production",
    author: "Alex Johnson",
    course: "Web Development",
    replies: 6,
    likes: 14,
    lastActivity: "2 days ago",
    pinned: false,
    tags: ["Deployment", "Production"],
    excerpt: "What's the best way to deploy a React application? Looking for recommendations..."
  },
  {
    id: 5,
    title: "Feature engineering techniques",
    author: "Lisa Kumar",
    course: "Data Science",
    replies: 10,
    likes: 21,
    lastActivity: "3 days ago",
    pinned: false,
    tags: ["Feature Engineering", "ML"],
    excerpt: "Share your favorite feature engineering techniques for improving model performance..."
  }
];

const myDiscussions = [
  {
    id: 6,
    title: "Need help with useEffect dependencies",
    course: "Web Development",
    replies: 5,
    likes: 8,
    lastActivity: "1 day ago",
    status: "Active"
  },
  {
    id: 7,
    title: "Pandas merge vs join - which to use?",
    course: "Data Science",
    replies: 3,
    likes: 4,
    lastActivity: "4 days ago",
    status: "Resolved"
  }
];

export const Discussion = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const pinnedDiscussions = discussions.filter(d => d.pinned);
  const regularDiscussions = discussions.filter(d => !d.pinned);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Discussion Forum</h1>
                <p className="text-muted-foreground">Connect with peers and get help from the community</p>
              </div>
              <div className="flex gap-2">
                <Link to="/learning/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-scale-in">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">Active Discussions</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">My Discussions</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-sm text-muted-foreground">Likes Received</div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Contributions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="all" className="animate-slide-up">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="my">My Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Pinned Discussions */}
              {pinnedDiscussions.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Pin className="h-5 w-5 text-primary" />
                    Pinned Discussions
                  </h2>
                  <div className="space-y-4 mb-6">
                    {pinnedDiscussions.map((discussion, index) => (
                      <div
                        key={discussion.id}
                        className="bg-card border-2 border-primary/20 rounded-lg p-6 card-hover animate-scale-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-lg font-semibold">{discussion.title}</h3>
                              <Pin className="h-5 w-5 text-primary flex-shrink-0" />
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">{discussion.excerpt}</p>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <Badge variant="outline">{discussion.course}</Badge>
                              {discussion.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>by {discussion.author}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {discussion.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                {discussion.likes}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {discussion.lastActivity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Discussions */}
              <div>
                <h2 className="text-xl font-bold mb-4">Recent Discussions</h2>
                <div className="space-y-4">
                  {regularDiscussions.map((discussion, index) => (
                    <div
                      key={discussion.id}
                      className="bg-card border rounded-lg p-6 card-hover animate-scale-in"
                      style={{ animationDelay: `${(index + pinnedDiscussions.length) * 0.1}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{discussion.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Badge variant="outline">{discussion.course}</Badge>
                            {discussion.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {discussion.likes}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {discussion.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="my" className="space-y-4">
              {myDiscussions.map((discussion, index) => (
                <div
                  key={discussion.id}
                  className="bg-card border rounded-lg p-6 card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold">{discussion.title}</h3>
                        <Badge variant={discussion.status === "Active" ? "default" : "secondary"}>
                          {discussion.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge variant="outline">{discussion.course}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.likes} likes
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {discussion.lastActivity}
                        </span>
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

export default Discussion;
