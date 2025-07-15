import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { progressData } from '../data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Brain, 
  Smartphone,
  Calendar,
  Award,
  Activity,
  BarChart3
} from 'lucide-react';

const Progress = () => {
  const { goals } = useUser();
  const [timeRange, setTimeRange] = useState('week');

  const metrics = [
    {
      title: 'Focus Time',
      value: timeRange === 'week' ? '6.5 hours' : '28 hours',
      change: '+12%',
      trend: 'up',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Screen Time',
      value: timeRange === 'week' ? '18.5 hours' : '82 hours',
      change: '-23%',
      trend: 'down',
      icon: Smartphone,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Meditation Streak',
      value: `${progressData.meditationStreak} days`,
      change: '+3 days',
      trend: 'up',
      icon: Brain,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Goal Progress',
      value: `${progressData.goalCompletionRate}%`,
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const achievements = [
    {
      title: 'Digital Detox Champion',
      description: 'Completed 7 days of mindful phone usage',
      date: '2024-01-15',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Focus Master',
      description: 'Achieved 100+ minutes of deep work daily',
      date: '2024-01-12',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Mindfulness Practitioner',
      description: 'Maintained 7-day meditation streak',
      date: '2024-01-10',
      icon: '🧘',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Goal Setter',
      description: 'Created your first wellness goal',
      date: '2024-01-08',
      icon: '⭐',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const chartData = progressData.focusMinutes[timeRange];
  const screenTimeData = progressData.screenTime[timeRange];
  const maxValue = Math.max(...chartData);

  const SimpleBarChart = ({ data, color, title }) => (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">{title}</h4>
      <div className="flex items-end gap-2 h-32">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className={`w-full bg-gradient-to-t ${color} rounded-t-sm transition-all duration-300 hover:opacity-80`}
              style={{ height: `${(value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-slate-500 mt-1">
              {progressData.focusMinutes.labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Your Progress
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Track your journey towards digital wellness and sustained focus
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center mb-8">
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-sm">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  )}
                  <span className="text-green-600">{metric.change}</span>
                  <span className="text-slate-500 ml-1">from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Focus Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Focus Time Trends
            </CardTitle>
            <CardDescription>
              Your daily focus sessions over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarChart 
              data={chartData} 
              color="from-blue-500 to-cyan-500"
              title="Minutes per day"
            />
          </CardContent>
        </Card>

        {/* Screen Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-red-500" />
              Screen Time Reduction
            </CardTitle>
            <CardDescription>
              Your digital consumption patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarChart 
              data={screenTimeData} 
              color="from-red-500 to-pink-500"
              title="Minutes per day"
            />
          </CardContent>
        </Card>
      </div>

      {/* Goals Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Goals Progress
          </CardTitle>
          <CardDescription>
            Track your progress towards wellness goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No goals set yet. Start by creating your first goal!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {goal.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 w-12">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Recent Achievements
          </CardTitle>
          <CardDescription>
            Celebrate your wellness milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-xl`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Score */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Overall Wellness Score
          </CardTitle>
          <CardDescription>
            Your comprehensive digital wellness rating
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-1">
                <div className="bg-white dark:bg-slate-900 rounded-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">
                      {progressData.wellnessScore}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Excellent
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">87%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Focus</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">92%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Mindfulness</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">76%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Balance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;