import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Brain, 
  Target, 
  Clock, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Shield,
  BookOpen,
  Timer,
  TrendingUp,
  Waves
} from 'lucide-react';

const Home = () => {
  const { calmMode } = useTheme();

  const features = [
    {
      icon: BookOpen,
      title: 'Understand Your Brain',
      description: 'Learn about dopamine, attention, and how modern technology affects your mental well-being.',
      link: '/education',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Timer,
      title: 'Focus Tools',
      description: 'Timers, meditation guides, and exercises to help you build sustained attention.',
      link: '/tools',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Set Mindful Goals',
      description: 'Create and track meaningful objectives for your digital wellness journey.',
      link: '/goals',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Visualize your growth with detailed analytics and insights.',
      link: '/progress',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: 'Improved Focus',
      description: 'Develop the ability to concentrate deeply on important tasks'
    },
    {
      icon: Heart,
      title: 'Reduced Anxiety',
      description: 'Feel calmer and more centered throughout your day'
    },
    {
      icon: Shield,
      title: 'Digital Balance',
      description: 'Create a healthier relationship with technology'
    },
    {
      icon: Sparkles,
      title: 'Mental Clarity',
      description: 'Experience clearer thinking and better decision-making'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Reclaim Your Focus
              </span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">
                Find Inner Peace
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Break free from digital overwhelm and dopamine addiction. 
              Discover tools and techniques to build sustained focus, 
              reduce anxiety, and cultivate lasting well-being.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/assessment">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Take Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/education">
                <Button variant="outline" size="lg" className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  Learn More
                  <BookOpen className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Waves className="w-4 h-4 mr-2" />
                Science-Based
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Privacy-First
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Mindful Design
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Your Journey to Digital Wellness
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Discover powerful tools and insights to transform your relationship with technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-slate-600 dark:text-slate-400 mb-4">
                      {feature.description}
                    </CardDescription>
                    <Link to={feature.link}>
                      <Button variant="ghost" className="group-hover:bg-slate-50 dark:group-hover:bg-slate-800">
                        Explore
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Transform Your Mental Well-being
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Experience the profound benefits of mindful technology use
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards digital wellness and discover your path to sustained focus and inner peace.
          </p>
          <Link to="/assessment">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200">
              Begin Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;