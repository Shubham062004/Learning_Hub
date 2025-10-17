import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Crown,
  Zap,
  BookOpen,
  Calendar,
  CreditCard,
  Download,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState({
    plan: 'free',
    status: 'active',
    currentPeriodStart: '2025-10-17',
    currentPeriodEnd: '2025-11-17',
    trialEnd: null,
    cancelAtPeriodEnd: false,
    coursesUsed: 2,
    coursesLimit: 2,
    billingHistory: []
  });
  
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Mock subscription data - replace with actual API call
    if (user?.subscription) {
      setSubscriptionData({
        plan: user.subscription.plan,
        status: user.subscription.status,
        currentPeriodStart: user.subscription.currentPeriodStart,
        currentPeriodEnd: user.subscription.currentPeriodEnd,
        trialEnd: user.subscription.trialEnd,
        cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd || false,
        coursesUsed: 3,
        coursesLimit: user.subscription.plan === 'premium' ? 999 : user.subscription.plan === 'pro' ? 20 : 2,
        billingHistory: [
          {
            id: 1,
            date: '2025-10-17',
            amount: 0,
            status: 'paid',
            description: 'Free Trial Started'
          }
        ]
      });
    }
  }, [user]);

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case 'premium':
        return {
          name: 'Premium',
          price: '₹79/month',
          color: 'from-purple-500 to-pink-500',
          icon: <Crown className="h-5 w-5" />
        };
      case 'pro':
        return {
          name: 'Pro',
          price: '₹29/month',
          color: 'from-blue-500 to-cyan-500',
          icon: <Zap className="h-5 w-5" />
        };
      default:
        return {
          name: 'Free',
          price: '₹0/month',
          color: 'from-gray-400 to-gray-500',
          icon: <BookOpen className="h-5 w-5" />
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'trial':
        return <Badge className="bg-blue-500 text-white">Free Trial</Badge>;
      case 'active':
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Canceled</Badge>;
      case 'past_due':
        return <Badge className="bg-orange-500 text-white">Past Due</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubscriptionData(prev => ({
        ...prev,
        cancelAtPeriodEnd: true
      }));
      
      toast({
        title: "Subscription Canceled",
        description: "Your subscription will end at the current billing period.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubscriptionData(prev => ({
        ...prev,
        cancelAtPeriodEnd: false
      }));
      
      toast({
        title: "Subscription Reactivated",
        description: "Your subscription will continue as normal.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reactivate subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const planDetails = getPlanDetails(subscriptionData.plan);
  const daysUntilExpiry = subscriptionData.currentPeriodEnd 
    ? Math.ceil((new Date(subscriptionData.currentPeriodEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your subscription</p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your Learning Hub subscription and billing</p>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <div className={`p-2 rounded-full bg-gradient-to-r ${planDetails.color} text-white mr-3`}>
                  {planDetails.icon}
                </div>
                Current Plan: {planDetails.name}
              </span>
              {getStatusBadge(subscriptionData.status)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{planDetails.price}</h3>
                <p className="text-gray-600 text-sm">
                  {subscriptionData.status === 'trial' 
                    ? `Trial ends in ${daysUntilExpiry} days`
                    : `Renews on ${new Date(subscriptionData.currentPeriodEnd).toLocaleDateString()}`
                  }
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Course Access</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used: {subscriptionData.coursesUsed}</span>
                    <span>Limit: {subscriptionData.coursesLimit === 999 ? 'Unlimited' : subscriptionData.coursesLimit}</span>
                  </div>
                  <Progress 
                    value={subscriptionData.coursesLimit === 999 ? 30 : (subscriptionData.coursesUsed / subscriptionData.coursesLimit) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Access Validity</h3>
                <p className="text-gray-600 text-sm">
                  90 days from enrollment
                </p>
              </div>
            </div>

            {subscriptionData.cancelAtPeriodEnd && (
              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">Subscription Canceled</h4>
                  <p className="text-orange-700 text-sm mt-1">
                    Your subscription will end on {new Date(subscriptionData.currentPeriodEnd).toLocaleDateString()}. 
                    You'll still have access until then.
                  </p>
                  <Button 
                    onClick={handleReactivateSubscription}
                    disabled={loading}
                    size="sm" 
                    className="mt-3"
                  >
                    {loading ? 'Processing...' : 'Reactivate Subscription'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Plan Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/pricing')} 
                variant="outline" 
                className="w-full justify-start"
              >
                <Crown className="h-4 w-4 mr-2" />
                Change Plan
              </Button>
              
              <Button 
                onClick={() => navigate('/billing')} 
                variant="outline" 
                className="w-full justify-start"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Update Payment Method
              </Button>
              
              <Button 
                onClick={() => navigate('/invoices')} 
                variant="outline" 
                className="w-full justify-start"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoices
              </Button>

              {subscriptionData.plan !== 'free' && !subscriptionData.cancelAtPeriodEnd && (
                <Button 
                  onClick={handleCancelSubscription}
                  disabled={loading}
                  variant="destructive" 
                  className="w-full justify-start"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {loading ? 'Processing...' : 'Cancel Subscription'}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Recent Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptionData.billingHistory.length > 0 ? (
                  subscriptionData.billingHistory.map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{bill.description}</p>
                        <p className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">₹{bill.amount}</span>
                        {bill.status === 'paid' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No billing history available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plan Features Comparison */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Plan Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Feature</th>
                    <th className="text-center py-3">Free</th>
                    <th className="text-center py-3">Pro</th>
                    <th className="text-center py-3">Premium</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b">
                    <td className="py-3">Course Access</td>
                    <td className="text-center">2 courses</td>
                    <td className="text-center">20 courses</td>
                    <td className="text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Video Quality</td>
                    <td className="text-center">Basic</td>
                    <td className="text-center">HD</td>
                    <td className="text-center">4K</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Offline Download</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">✓</td>
                    <td className="text-center">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Certificate</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">✓</td>
                    <td className="text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3">Support</td>
                    <td className="text-center">Community</td>
                    <td className="text-center">Priority</td>
                    <td className="text-center">24/7 Premium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
