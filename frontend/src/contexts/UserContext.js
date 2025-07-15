import React, { createContext, useContext, useState, useEffect } from 'react';
import { userGoals, journalEntries, progressData } from '../data/mockData';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [goals, setGoals] = useState(userGoals);
  const [journal, setJournal] = useState(journalEntries);
  const [progress, setProgress] = useState(progressData);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [currentFocusSession, setCurrentFocusSession] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('userGoals');
    const savedJournal = localStorage.getItem('journalEntries');
    const savedProgress = localStorage.getItem('progressData');
    const savedAssessment = localStorage.getItem('assessmentResults');
    const savedChallenges = localStorage.getItem('completedChallenges');

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    if (savedJournal) {
      setJournal(JSON.parse(savedJournal));
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedAssessment) {
      setAssessmentResults(JSON.parse(savedAssessment));
    }
    if (savedChallenges) {
      setCompletedChallenges(JSON.parse(savedChallenges));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem('progressData', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (assessmentResults) {
      localStorage.setItem('assessmentResults', JSON.stringify(assessmentResults));
    }
  }, [assessmentResults]);

  useEffect(() => {
    localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
  }, [completedChallenges]);

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      progress: 0,
      status: 'active'
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id, updates) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const addJournalEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setJournal(prev => [newEntry, ...prev]);
  };

  const updateJournalEntry = (id, updates) => {
    setJournal(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };

  const deleteJournalEntry = (id) => {
    setJournal(prev => prev.filter(entry => entry.id !== id));
  };

  const startFocusSession = (activity) => {
    setCurrentFocusSession({
      ...activity,
      startTime: Date.now(),
      isPaused: false,
      timeElapsed: 0
    });
  };

  const pauseFocusSession = () => {
    setCurrentFocusSession(prev => ({ ...prev, isPaused: true }));
  };

  const resumeFocusSession = () => {
    setCurrentFocusSession(prev => ({ ...prev, isPaused: false }));
  };

  const endFocusSession = () => {
    if (currentFocusSession) {
      // Update progress data
      const sessionMinutes = Math.round((Date.now() - currentFocusSession.startTime) / (1000 * 60));
      setProgress(prev => ({
        ...prev,
        focusMinutes: {
          ...prev.focusMinutes,
          week: prev.focusMinutes.week.map((value, index) => 
            index === 6 ? value + sessionMinutes : value
          )
        }
      }));
    }
    setCurrentFocusSession(null);
  };

  const completeChallenge = (challengeId) => {
    setCompletedChallenges(prev => [...prev, challengeId]);
  };

  const value = {
    goals,
    setGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    journal,
    setJournal,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    progress,
    setProgress,
    assessmentResults,
    setAssessmentResults,
    currentFocusSession,
    startFocusSession,
    pauseFocusSession,
    resumeFocusSession,
    endFocusSession,
    completedChallenges,
    completeChallenge
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};