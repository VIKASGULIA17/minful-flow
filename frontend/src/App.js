import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Education from './pages/Education';
import Tools from './pages/Tools';
import Progress from './pages/Progress';
import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Assessment from './pages/Assessment';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <UserProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
              <Navigation />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/assessment" element={<Assessment />} />
                </Routes>
              </main>
              <Toaster />
            </div>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;