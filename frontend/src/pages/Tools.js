import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { focusActivities, meditationExercises, detoxChallenges, ambientSounds } from '../data/mockData';
import { 
  Timer, 
  Play, 
  Pause, 
  Square, 
  Brain, 
  Heart, 
  Headphones,
  CheckCircle2,
  Circle,
  RotateCcw,
  Volume2,
  VolumeX
} from 'lucide-react';

const Tools = () => {
  const { currentFocusSession, startFocusSession, pauseFocusSession, resumeFocusSession, endFocusSession } = useUser();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [selectedSound, setSelectedSound] = useState(null);
  const [soundPlaying, setSoundPlaying] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval;
    if (currentFocusSession && !currentFocusSession.isPaused) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - currentFocusSession.startTime) / 1000);
        const total = currentFocusSession.duration * 60;
        setTimeLeft(Math.max(0, total - elapsed));
        
        if (total - elapsed <= 0) {
          setIsBreakTime(true);
          // Auto-pause when time is up
          pauseFocusSession();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentFocusSession, pauseFocusSession]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'deep-work': return Brain;
      case 'pomodoro': return Timer;
      case 'reading': return Brain;
      case 'creative': return Heart;
      default: return Timer;
    }
  };

  const handleStartActivity = (activity) => {
    setSelectedActivity(activity);
    startFocusSession(activity);
    setTimeLeft(activity.duration * 60);
    setIsBreakTime(false);
  };

  const handleEndSession = () => {
    endFocusSession();
    setSelectedActivity(null);
    setTimeLeft(0);
    setIsBreakTime(false);
  };

  const toggleSound = (sound) => {
    if (selectedSound?.id === sound.id) {
      setSelectedSound(null);
      setSoundPlaying(false);
    } else {
      setSelectedSound(sound);
      setSoundPlaying(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Focus Tools
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Practical tools to help you build sustained focus, reduce distractions, and cultivate mindfulness.
        </p>
      </div>

      {/* Active Session Display */}
      {currentFocusSession && (
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Timer className="w-5 h-5" />
              Active Session: {selectedActivity?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="mb-4">
                <Progress 
                  value={((selectedActivity?.duration * 60 - timeLeft) / (selectedActivity?.duration * 60)) * 100} 
                  className="h-2"
                />
              </div>
              <div className="flex justify-center gap-4">
                {currentFocusSession.isPaused ? (
                  <Button onClick={resumeFocusSession} className="bg-green-500 hover:bg-green-600">
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                ) : (
                  <Button onClick={pauseFocusSession} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={handleEndSession} variant="destructive">
                  <Square className="w-4 h-4 mr-2" />
                  End Session
                </Button>
              </div>
              {isBreakTime && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <p className="text-green-700 dark:text-green-300 font-semibold">
                    Great job! Time for a break. 🎉
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="focus" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="focus">Focus Timer</TabsTrigger>
          <TabsTrigger value="meditation">Meditation</TabsTrigger>
          <TabsTrigger value="detox">Detox Challenges</TabsTrigger>
          <TabsTrigger value="ambient">Ambient Sounds</TabsTrigger>
        </TabsList>

        {/* Focus Timer Tab */}
        <TabsContent value="focus">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <Card key={activity.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className="w-8 h-8 text-blue-500" />
                      <Badge variant="secondary">{activity.duration}m</Badge>
                    </div>
                    <CardTitle className="text-lg">{activity.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {activity.description}
                    </CardDescription>
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                      <div>Work: {activity.breakInterval}m intervals</div>
                      <div>Break: {activity.breakDuration}m</div>
                    </div>
                    <Button 
                      onClick={() => handleStartActivity(activity)}
                      disabled={currentFocusSession}
                      className="w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Session
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Meditation Tab */}
        <TabsContent value="meditation">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meditationExercises.map((exercise) => (
              <Card key={exercise.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Heart className="w-8 h-8 text-green-500" />
                    <Badge variant="secondary">{exercise.duration}</Badge>
                  </div>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {exercise.description}
                  </CardDescription>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Meditation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-green-500" />
                          {exercise.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-400">
                          {exercise.description}
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Instructions:</h4>
                          <ol className="space-y-2">
                            {exercise.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 font-semibold">{index + 1}.</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="flex justify-center pt-4">
                          <Button className="bg-green-500 hover:bg-green-600">
                            <Play className="w-4 h-4 mr-2" />
                            Begin Meditation
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Detox Challenges Tab */}
        <TabsContent value="detox">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detoxChallenges.map((challenge) => (
              <Card key={challenge.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {challenge.completed ? (
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    ) : (
                      <Circle className="w-8 h-8 text-slate-400" />
                    )}
                    <div className="flex gap-2">
                      <Badge variant="secondary">{challenge.duration}</Badge>
                      <Badge 
                        variant={challenge.difficulty === 'Easy' ? 'default' : 
                                challenge.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {challenge.description}
                  </CardDescription>
                  <Button 
                    variant={challenge.completed ? 'secondary' : 'default'}
                    disabled={challenge.completed}
                    className="w-full"
                  >
                    {challenge.completed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Challenge
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Ambient Sounds Tab */}
        <TabsContent value="ambient">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ambientSounds.map((sound) => (
              <Card key={sound.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{sound.icon}</div>
                  <CardTitle className="text-lg">{sound.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {sound.description}
                  </CardDescription>
                  <Badge variant="secondary" className="mb-4">
                    {sound.duration}
                  </Badge>
                  <Button 
                    onClick={() => toggleSound(sound)}
                    variant={selectedSound?.id === sound.id && soundPlaying ? 'secondary' : 'default'}
                    className="w-full"
                  >
                    {selectedSound?.id === sound.id && soundPlaying ? (
                      <>
                        <VolumeX className="w-4 h-4 mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tools;