import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { 
  PenTool, 
  Plus, 
  Calendar, 
  Search, 
  Heart, 
  Lightbulb,
  Edit3,
  Trash2,
  BookOpen,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

const Journal = () => {
  const { journal, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useUser();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    triggers: [],
    insights: ''
  });

  const moods = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-500' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-500' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-red-500' },
    { value: 'anxious', label: 'Anxious', icon: Frown, color: 'text-orange-500' },
    { value: 'frustrated', label: 'Frustrated', icon: Frown, color: 'text-red-600' },
    { value: 'accomplished', label: 'Accomplished', icon: Smile, color: 'text-blue-500' },
    { value: 'curious', label: 'Curious', icon: Meh, color: 'text-purple-500' }
  ];

  const commonTriggers = [
    'social media', 'work stress', 'boredom', 'loneliness', 'habit', 
    'notifications', 'evening routine', 'morning routine', 'procrastination'
  ];

  const filteredEntries = journal.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEntry) {
      updateJournalEntry(editingEntry.id, formData);
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been updated.",
      });
    } else {
      addJournalEntry(formData);
      toast({
        title: "Entry Created",
        description: "Your journal entry has been saved.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingEntry(null);
    setFormData({
      title: '',
      content: '',
      mood: 'neutral',
      triggers: [],
      insights: ''
    });
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      triggers: entry.triggers,
      insights: entry.insights
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (entryId) => {
    deleteJournalEntry(entryId);
    toast({
      title: "Entry Deleted",
      description: "Your journal entry has been removed.",
    });
  };

  const getMoodData = (mood) => {
    return moods.find(m => m.value === mood) || moods[1];
  };

  const toggleTrigger = (trigger) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Your Journal
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Reflect on your journey and track your insights
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="What's on your mind today?"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Write about your thoughts, feelings, and experiences..."
                  rows={6}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="mood">How are you feeling?</Label>
                <Select value={formData.mood} onValueChange={(value) => setFormData({...formData, mood: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map(mood => {
                      const Icon = mood.icon;
                      return (
                        <SelectItem key={mood.value} value={mood.value}>
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${mood.color}`} />
                            {mood.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Triggers (select all that apply)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonTriggers.map(trigger => (
                    <Badge
                      key={trigger}
                      variant={formData.triggers.includes(trigger) ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => toggleTrigger(trigger)}
                    >
                      {trigger}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="insights">Key Insights</Label>
                <Textarea
                  id="insights"
                  value={formData.insights}
                  onChange={(e) => setFormData({...formData, insights: e.target.value})}
                  placeholder="What did you learn about yourself today?"
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                {editingEntry ? 'Update Entry' : 'Save Entry'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Search your journal entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Journal Entries */}
      {filteredEntries.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {journal.length === 0 ? 'Start Your Journey' : 'No entries found'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {journal.length === 0 
                ? 'Begin documenting your thoughts and reflections' 
                : 'Try adjusting your search terms'
              }
            </p>
            {journal.length === 0 && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Write Your First Entry
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredEntries.map((entry) => {
            const moodData = getMoodData(entry.mood);
            const MoodIcon = moodData.icon;
            
            return (
              <Card key={entry.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MoodIcon className={`w-5 h-5 ${moodData.color}`} />
                        <Badge variant="outline" className="text-xs">
                          {moodData.label}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{entry.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(entry)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    {entry.content}
                  </p>
                  
                  {entry.triggers.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        Triggers:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.triggers.map((trigger, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {entry.insights && (
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Key Insight:
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        {entry.insights}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Journal;