import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { educationalContent } from '../data/mockData';
import { 
  Clock, 
  BookOpen, 
  Search, 
  Filter, 
  ArrowRight,
  Brain,
  Lightbulb,
  Target
} from 'lucide-react';

const Education = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen },
    { id: 'neuroscience', name: 'Neuroscience', icon: Brain },
    { id: 'digital-wellness', name: 'Digital Wellness', icon: Target },
    { id: 'focus-training', name: 'Focus Training', icon: Lightbulb }
  ];

  const filteredContent = educationalContent.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           article.category.toLowerCase().replace(' ', '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CategoryIcon = ({ category }) => {
    const categoryData = categories.find(c => c.id === category);
    const Icon = categoryData?.icon || BookOpen;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Learn & Grow
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Discover the science behind digital wellness and learn practical strategies 
          to reclaim your focus and mental clarity.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="w-5 h-5 text-slate-400 mt-2" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.map((article) => (
          <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CategoryIcon category={article.category.toLowerCase().replace(' ', '-')} />
                  {article.category}
                </Badge>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 dark:text-slate-400 mb-4">
                {article.excerpt}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-slate-50 dark:group-hover:bg-slate-800"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {selectedArticle?.title}
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CategoryIcon category={selectedArticle?.category.toLowerCase().replace(' ', '-')} />
                          {selectedArticle?.category}
                        </Badge>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedArticle?.readTime}
                        </div>
                      </div>
                      <img 
                        src={selectedArticle?.image} 
                        alt={selectedArticle?.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {selectedArticle?.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                        {selectedArticle?.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No articles found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Education;