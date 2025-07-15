import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { assessmentQuestions } from '../data/mockData';
import { 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown,
  Target,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

const Assessment = () => {
  const { assessmentResults, setAssessmentResults } = useUser();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const goToNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const categories = {
      'digital-habits': [],
      'focus-ability': [],
      'digital-dependence': [],
      'goal-completion': [],
      'mental-clarity': []
    };

    assessmentQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        categories[question.category].push(answer);
      }
    });

    const categoryScores = {};
    let totalScore = 0;

    Object.keys(categories).forEach(category => {
      const categoryAnswers = categories[category];
      if (categoryAnswers.length > 0) {
        const average = categoryAnswers.reduce((sum, score) => sum + score, 0) / categoryAnswers.length;
        categoryScores[category] = Math.round(average);
        totalScore += average;
      }
    });

    const overallScore = Math.round(((5 - (totalScore / Object.keys(categories).length)) / 4) * 100);
    
    const results = {
      overallScore,
      categoryScores,
      recommendations: generateRecommendations(categoryScores),
      completedAt: new Date().toISOString()
    };

    setAssessmentResults(results);
    setShowResults(true);
    
    toast({
      title: "Assessment Complete",
      description: "Your personalized wellness report is ready!",
    });
  };

  const generateRecommendations = (scores) => {
    const recommendations = [];

    if (scores['digital-habits'] >= 4) {
      recommendations.push({
        category: 'Digital Habits',
        priority: 'high',
        title: 'Reduce Digital Overwhelm',
        description: 'Consider implementing regular digital detox periods and mindful device usage.',
        actions: ['Start with 30-minute phone-free periods', 'Use app timers to limit usage', 'Practice mindful scrolling']
      });
    }

    if (scores['focus-ability'] >= 4) {
      recommendations.push({
        category: 'Focus Training',
        priority: 'high',
        title: 'Build Sustained Attention',
        description: 'Develop your ability to maintain focus for extended periods.',
        actions: ['Try the Pomodoro Technique', 'Practice meditation daily', 'Create a distraction-free workspace']
      });
    }

    if (scores['digital-dependence'] >= 4) {
      recommendations.push({
        category: 'Digital Wellness',
        priority: 'medium',
        title: 'Reduce Digital Anxiety',
        description: 'Learn to feel comfortable without constant connectivity.',
        actions: ['Practice leaving your phone in another room', 'Try breathing exercises when feeling device urges', 'Engage in offline activities']
      });
    }

    if (scores['goal-completion'] >= 4) {
      recommendations.push({
        category: 'Goal Setting',
        priority: 'medium',
        title: 'Improve Goal Achievement',
        description: 'Strengthen your ability to follow through on long-term objectives.',
        actions: ['Break large goals into smaller tasks', 'Track progress daily', 'Celebrate small wins']
      });
    }

    if (scores['mental-clarity'] >= 4) {
      recommendations.push({
        category: 'Mental Clarity',
        priority: 'high',
        title: 'Enhance Cognitive Function',
        description: 'Improve your mental sharpness and decision-making abilities.',
        actions: ['Practice mindfulness meditation', 'Ensure adequate sleep', 'Reduce information overload']
      });
    }

    return recommendations;
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setAssessmentResults(null);
  };

  const getCategoryName = (category) => {
    const names = {
      'digital-habits': 'Digital Habits',
      'focus-ability': 'Focus Ability',
      'digital-dependence': 'Digital Dependence',
      'goal-completion': 'Goal Completion',
      'mental-clarity': 'Mental Clarity'
    };
    return names[category] || category;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (showResults || assessmentResults) {
    const results = assessmentResults;
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Your Wellness Report
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Personalized insights and recommendations for your digital wellness journey
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Overall Wellness Score</CardTitle>
            <CardDescription>
              Based on your responses across all categories
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-2">
                <div className="bg-white dark:bg-slate-900 rounded-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {getScoreDescription(results.overallScore)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 max-w-md mx-auto">
              Your score indicates {results.overallScore >= 80 ? 'excellent' : results.overallScore >= 60 ? 'good' : 'room for improvement'} digital wellness habits.
            </p>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(results.categoryScores).map(([category, score]) => (
                <div key={category} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {getCategoryName(category)}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Score: {score}/5
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${score <= 2 ? 'from-green-500 to-green-600' : score <= 3 ? 'from-yellow-500 to-yellow-600' : 'from-red-500 to-red-600'} transition-all duration-300`}
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${score <= 2 ? 'text-green-600' : score <= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {score <= 2 ? 'Good' : score <= 3 ? 'Fair' : 'Needs Work'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Based on your assessment, here are targeted suggestions for improvement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {rec.title}
                    </h4>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    {rec.description}
                  </p>
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                      <Lightbulb className="w-4 h-4" />
                      Suggested Actions:
                    </h5>
                    <ul className="space-y-1">
                      {rec.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <span className="text-blue-500">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button onClick={resetAssessment} variant="outline">
            Retake Assessment
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
            Start Your Journey
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Digital Wellness Assessment
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Understand your current relationship with technology
        </p>
      </div>

      {/* Progress */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={answers[currentQ.id]?.toString()} 
            onValueChange={(value) => handleAnswer(currentQ.id, value)}
          >
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                <Label htmlFor={option.value.toString()} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPrevious}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={goToNext}
          disabled={!answers[currentQ.id]}
          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
        >
          {currentQuestion === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Assessment;