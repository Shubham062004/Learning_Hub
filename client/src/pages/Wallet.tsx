import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Wallet as WalletIcon,
  Sparkles,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  ShoppingCart
} from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "earned",
    title: "E-commerce Project Completed",
    amount: 5000,
    points: 500,
    date: "2 hours ago",
    status: "Completed"
  },
  {
    id: 2,
    type: "spent",
    title: "Machine Learning Course Purchased",
    amount: -2000,
    points: -200,
    date: "1 day ago",
    status: "Completed"
  },
  {
    id: 3,
    type: "earned",
    title: "Data Analysis Dashboard",
    amount: 3500,
    points: 350,
    date: "3 days ago",
    status: "Completed"
  },
  {
    id: 4,
    type: "withdrawal",
    title: "UPI Withdrawal to Paytm",
    amount: -4000,
    points: 0,
    date: "5 days ago",
    status: "Completed"
  },
  {
    id: 5,
    type: "earned",
    title: "UI/UX Design Project",
    amount: 4000,
    points: 400,
    date: "1 week ago",
    status: "Completed"
  }
];

const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [walletBalance] = useState(12500);
  const [pointsBalance] = useState(1250);
  const nextRewardAt = 2000;
  const progressToReward = (pointsBalance / nextRewardAt) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background to-primary/5">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              {/* Header */}
              <div className="text-center mb-12 animate-fade-in">
                <WalletIcon className="h-16 w-16 mx-auto mb-6 text-primary animate-float" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Your <span className="text-gradient">WorkLearn Wallet</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Manage your earnings, points, and rewards all in one place
                </p>
              </div>

              {/* Balance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-scale-in">
                <Card className="border-2 hover:border-primary/50 transition-all card-hover gradient-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary-foreground">
                      <DollarSign className="h-6 w-6" />
                      Cash Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-primary-foreground mb-4">
                      ₹{walletBalance.toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1 group">
                        Withdraw
                        <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Button>
                      <Button variant="secondary" size="sm" className="flex-1">
                        Add Funds
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-secondary/50 transition-all card-hover bg-gradient-to-br from-secondary/20 to-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-accent" />
                      WorkLearn Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">
                      {pointsBalance} <span className="text-lg text-muted-foreground">WLP</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Next reward at {nextRewardAt} WLP</span>
                        <span className="font-medium">{Math.round(progressToReward)}%</span>
                      </div>
                      <Progress value={progressToReward} className="h-2" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full group">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Use Points for Course
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
                      <div className="text-2xl font-bold">₹21,500</div>
                      <div className="text-sm text-muted-foreground">Total Earned</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <ArrowDownLeft className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">₹9,000</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Gift className="h-8 w-8 mx-auto mb-2 text-accent" />
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Projects Done</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Sparkles className="h-8 w-8 mx-auto mb-2 text-secondary" />
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Courses Bought</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent earnings and spending activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <Skeleton className="h-12 w-12 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                          <Skeleton className="h-6 w-20" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions.map((transaction, index) => (
                        <div
                          key={transaction.id}
                          className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                            transaction.type === 'earned' 
                              ? 'bg-success/10' 
                              : transaction.type === 'withdrawal'
                              ? 'bg-accent/10'
                              : 'bg-primary/10'
                          }`}>
                            {transaction.type === 'earned' ? (
                              <TrendingUp className="h-6 w-6 text-success" />
                            ) : transaction.type === 'withdrawal' ? (
                              <ArrowUpRight className="h-6 w-6 text-accent" />
                            ) : (
                              <ShoppingCart className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold group-hover:text-primary transition-colors">
                              {transaction.title}
                            </div>
                            <div className="text-sm text-muted-foreground">{transaction.date}</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              transaction.amount > 0 ? 'text-success' : 'text-muted-foreground'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                            </div>
                            {transaction.points !== 0 && (
                              <div className="text-sm text-muted-foreground">
                                {transaction.points > 0 ? '+' : ''}{transaction.points} WLP
                              </div>
                            )}
                          </div>
                          <Badge variant="outline">{transaction.status}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Withdrawal Options */}
              <Card className="mt-8 border-2 border-accent/20 animate-scale-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle>Withdrawal Options</CardTitle>
                  <CardDescription>Choose how you want to withdraw your earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary group">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-8 group-hover:scale-110 transition-transform" />
                      <span>Paytm UPI</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary group">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Google_Pay_%28GPay%29_Logo_%282020%29.svg" alt="Google Pay" className="h-8 group-hover:scale-110 transition-transform" />
                      <span>Google Pay</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary group">
                      <DollarSign className="h-8 w-8 group-hover:scale-110 transition-transform" />
                      <span>Bank Transfer</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wallet;
