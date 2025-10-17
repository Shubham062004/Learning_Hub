import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Check,
  Crown,
  Zap,
  BookOpen,
  Star
} from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      icon: <BookOpen className="h-6 w-6" />,
      price: { monthly: 0, annual: 0 },
      popular: false,
      features: [
        { text: '2 courses access', included: true },
        { text: 'Basic video quality', included: true },
        { text: 'Community support', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'Certificate of completion', included: false },
        { text: 'Download for offline', included: false },
        { text: 'Priority support', included: false },
        { text: 'Advanced analytics', included: false }
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for serious learners',
      icon: <Zap className="h-6 w-6" />,
      price: { monthly: 29, annual: 290 },
      popular: true,
      features: [
        { text: '20 courses access', included: true },
        { text: 'HD video quality', included: true },
        { text: 'Priority support', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'Certificate of completion', included: true },
        { text: 'Download for offline', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Live Q&A sessions', included: false }
      ],
      buttonText: 'Start 7-Day Free Trial',
      buttonVariant: 'default' as const
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For professionals and teams',
      icon: <Crown className="h-6 w-6" />,
      price: { monthly: 79, annual: 790 },
      popular: false,
      features: [
        { text: 'Unlimited courses access', included: true },
        { text: '4K video quality', included: true },
        { text: '24/7 premium support', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'Certificate of completion', included: true },
        { text: 'Download for offline', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Live Q&A sessions', included: true }
      ],
      buttonText: 'Start 7-Day Free Trial',
      buttonVariant: 'default' as const
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(planId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (planId === 'free') {
        toast({
          title: "Welcome to Learning Hub!",
          description: "You're now on the Free plan. Start learning today!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Free Trial Started!",
          description: `Your 7-day free trial for the ${plans.find(p => p.id === planId)?.name} plan has begun!`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Choose Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start with a 7-day free trial. All plans include 90-day course access validity. Cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'annual' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={billingCycle === 'annual' ? 'text-gray-900 font-medium' : 'text-gray-500'}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <Badge className="bg-green-100 text-green-800">Save 17%</Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const price = plan.price[billingCycle];
            const annualSavings = billingCycle === 'annual' && plan.price.monthly > 0 
              ? (plan.price.monthly * 12) - plan.price.annual 
              : 0;

            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center py-2 text-sm font-medium">
                    <Star className="h-4 w-4 inline mr-1" />
                    Most Popular
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    plan.id === 'premium' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : plan.id === 'pro'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">₹{price}</span>
                      {price > 0 && (
                        <span className="text-gray-500 ml-1">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                    
                    {annualSavings > 0 && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Save ₹{annualSavings} per year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Check className="h-3 w-3" />
                        </div>
                        <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.id === 'premium' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                        : plan.id === 'pro'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                        : ''
                    }`}
                  >
                    {loading === plan.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      plan.buttonText
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;