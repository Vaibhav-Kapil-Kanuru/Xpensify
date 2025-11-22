"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { 
  Target, 
  TrendingUp, 
  GraduationCap, 
  Plus,
  MessageCircle 
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardNav from '@/components/DashboardNav';
import { DashboardSkeleton } from '@/components/DashboardSkeletons';
import FinancialNews from '@/components/FinancialNews';
import type { DashboardProfile, DashboardGoal, DashboardStreak } from '@/types/dashboard';
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { insightsSchema } from '../api/ai/dashboard-insights/schema';
import { useTheme } from 'next-themes';


interface InsightsType {
  todaysFocus: string;
  motivationalMessage: string;
  financialWellnessScore: number;
  nextMilestone: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useRouter();
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [goals, setGoals] = useState<DashboardGoal[]>([]);
  const [streak, setStreak] = useState<DashboardStreak | null>(null);
  const [insights, setInsights] = useState<InsightsType | null>(null);
  const [loading, setLoading] = useState(true);

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/ai/dashboard-insights",
    schema: insightsSchema,
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Call dashboard API endpoint
      const response = await fetch('/api/dashboard', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load dashboard data');
      }

      const { data } = await response.json();

      setProfile(data.profile);
      setGoals(data.goals || []);
      setStreak(data.streak);
      submit({
        profile: data.profile,
        goals: data.goals,
        streak: data.streak,
      });

    } catch (error: any) {
      console.error('Error loading dashboard:', error);
      toast.error(error.message || 'Failed to load dashboard data');
      
      // If unauthorized, redirect to login
      if (error.message === 'Unauthorized') {
        navigate.push('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (object) {
      setInsights(object as InsightsType);
    }
  }, [object]);

  if (loading || !insights) {
    return <DashboardSkeleton />;
  }

  const wellnessScore = insights?.financialWellnessScore || 50;

  return (
    <div className="min-h-screen mac-bg">

      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2 mac-text-primary">
            Welcome back, {profile?.full_name || 'there'}! 👋
          </h2>
          <p className="mac-text-secondary">
            {insights?.motivationalMessage || 'Let\'s continue building your financial future together.'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Today's Focus, Learning Streak & Financial Wellness Score */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Today's Focus */}
              <Card className="mac-card p-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mac-text-primary">Today's Focus</h3>
                </div>
                <p className="mac-text-secondary">
                  {insights?.todaysFocus || 'Set your first financial goal to get started!'}
                </p>
              </Card>

              {/* Learning Streak */}
              <Card className="mac-card p-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mac-text-primary">Learning Streak</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {streak?.current_streak || 0}
                  </span>
                  <span className="mac-text-secondary">days</span>
                </div>
                <p className="text-sm mac-text-tertiary mt-1">
                  Longest streak: {streak?.longest_streak || 0} days 🔥
                </p>
              </Card>

              {/* Financial Wellness Score - Compact, aligned with Learning Streak */}
              <Card className="mac-card p-4 animate-fade-in flex flex-col justify-between">
                <h3 className="text-sm font-semibold mb-3 mac-text-primary">Wellness Score</h3>
                <div className="flex items-center justify-center flex-1">
                  <span className="text-2xl font-bold text-green-600">{wellnessScore}/100</span>
                </div>
                <Progress value={wellnessScore} className="h-2 mt-3" />
              </Card>
            </div>

            {/* Active Goals */}
            <Card className="mac-card p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold mac-text-primary">Your Goals</h3>
                <Button variant="ghost" size="sm" onClick={() => navigate.push('/goals')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </div>
              
              {goals.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 mac-text-tertiary mx-auto mb-3" />
                  <p className="mac-text-secondary mb-4">No active goals yet</p>
                  <Button variant="outline" onClick={() => navigate.push('/goals')}>Create Your First Goal</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {goals.map((goal) => {
                    const targetAmount = Number(goal.target_amount || 0);
                    const currentAmount = Number(goal.current_amount);
                    const progress = targetAmount > 0 
                      ? (currentAmount / targetAmount) * 100 
                      : 0;
                    
                    return (
                      <Card 
                        key={goal.id} 
                        className="p-4 mac-card transition-all cursor-pointer"
                        onClick={() => navigate.push('/goals')}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold mac-text-primary">{goal.title}</h4>
                            <p className="text-sm mac-text-secondary">{goal.category}</p>
                          </div>
                          <span className="text-sm font-medium text-blue-600">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2 mb-2" />
                        <p className="text-sm mac-text-tertiary">
                          {profile?.currency || 'USD'} {currentAmount.toLocaleString()} / {targetAmount.toLocaleString()}
                        </p>
                      </Card>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Next Milestone */}
            <Card className="mac-card p-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mac-text-primary">Next Milestone</h3>
              </div>
              <p className="mac-text-secondary mb-4">
                {insights?.nextMilestone || 'Complete your onboarding to unlock personalized milestones!'}
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate.push('/milestones')}>
                View All Milestones
              </Button>
            </Card>
          </div>

          {/* Right Column - Financial News */}
          <div className="lg:col-span-1 animate-fade-in">
            <FinancialNews />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6 z-40">
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white"
            onClick={() => navigate.push('/chat')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with Finley
          </Button>
        </div>
      </main>
    </div>
    )}
    </>
    
  );
}