import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Award, Star, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const pointsHistory = [
  { activity: "Completed React Hooks Assignment", points: 100, date: "2025-10-10", type: "assignment" },
  { activity: "Participated in Discussion Forum", points: 25, date: "2025-10-09", type: "discussion" },
  { activity: "Watched Data Science Lecture", points: 15, date: "2025-10-09", type: "lecture" },
  { activity: "Submitted Data Analysis Project", points: 150, date: "2025-10-08", type: "assignment" },
  { activity: "Completed Python Quiz", points: 50, date: "2025-10-07", type: "quiz" },
  { activity: "Peer Review Contribution", points: 30, date: "2025-10-06", type: "discussion" }
];

const achievements = [
  { title: "Early Bird", description: "Complete 5 assignments before the deadline", icon: Award, earned: true, points: 50 },
  { title: "Discussion Champion", description: "Participate in 20 forum discussions", icon: Star, earned: true, points: 100 },
  { title: "Quiz Master", description: "Score 90% or above on 10 quizzes", icon: Target, earned: false, points: 150 },
  { title: "Knowledge Seeker", description: "Watch 50 lecture videos", icon: Zap, earned: false, points: 75 }
];

const leaderboard = [
  { rank: 1, name: "Alex Johnson", points: 2450, avatar: "AJ" },
  { rank: 2, name: "Sarah Chen", points: 2280, avatar: "SC" },
  { rank: 3, name: "You", points: 850, avatar: "ME", isCurrentUser: true },
  { rank: 4, name: "Mike Wilson", points: 820, avatar: "MW" },
  { rank: 5, name: "Emma Davis", points: 780, avatar: "ED" }
];

export const Points = () => {
  const totalPoints = 850;
  const nextMilestone = 1000;
  const progressToMilestone = (totalPoints / nextMilestone) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Points & Achievements</h1>
                <p className="text-muted-foreground">Track your learning progress and earn rewards</p>
              </div>
              <Link to="/learning/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>

          {/* Points Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Points Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/60 rounded-lg p-8 text-white animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 mb-2">Total Points Earned</p>
                  <h2 className="text-5xl font-bold">{totalPoints}</h2>
                </div>
                <Trophy className="h-16 w-16 text-white/80" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">Progress to next milestone</span>
                  <span className="font-semibold">{nextMilestone} points</span>
                </div>
                <Progress value={progressToMilestone} className="h-3 bg-white/20" />
              </div>
              <p className="text-sm text-white/80">{nextMilestone - totalPoints} points until next reward</p>
            </div>

            {/* Rank Card */}
            <div className="bg-card border rounded-lg p-6 animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                  <h3 className="text-3xl font-bold">#3</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Keep going to climb the leaderboard!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Points History */}
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="bg-card border rounded-lg divide-y">
                {pointsHistory.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.activity}</h4>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          +{item.points}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
              <div className="bg-card border rounded-lg divide-y">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index} 
                    className={`p-4 hover:bg-muted/50 transition-colors ${user.isCurrentUser ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-bold w-8 ${
                        user.rank === 1 ? 'text-yellow-500' : 
                        user.rank === 2 ? 'text-gray-400' : 
                        user.rank === 3 ? 'text-amber-600' : 
                        'text-muted-foreground'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{user.name}</h4>
                      </div>
                      <Badge variant="outline">{user.points} pts</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`bg-card border-2 rounded-lg p-6 card-hover ${
                      achievement.earned ? 'border-primary/50' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`h-14 w-14 rounded-lg ${
                        achievement.earned ? 'bg-primary/10' : 'bg-muted'
                      } flex items-center justify-center`}>
                        <Icon className={`h-7 w-7 ${
                          achievement.earned ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{achievement.title}</h3>
                          {achievement.earned && (
                            <Badge variant="default" className="bg-success">Earned</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <p className="text-sm font-medium text-primary">{achievement.points} points</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Points;
