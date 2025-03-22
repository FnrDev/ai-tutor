'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BrainCog, Code2, Sparkles, Terminal, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Card } from '@/components/ui/card';
import axios from 'axios';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/tutor', {
        question
      });
      
      if (response.status === 200) {
        setAnswer(response.data.answer);
      } else {
        setAnswer('Error: ' + response.data.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAnswer('Error: ' + (error.response?.data?.error || error.message));
      } else {
        setAnswer('Error: Failed to get response');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex justify-center mb-6 animate-float">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-lg border border-white/20">
                <BrainCog className="h-16 w-16 text-purple-300" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              AI Programming Tutor
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your personal AI mentor for mastering programming concepts
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Code2 className="h-6 w-6" />,
              title: 'Smart Code Analysis',
              description: 'Get detailed explanations of code snippets and concepts',
            },
            {
              icon: <Terminal className="h-6 w-6" />,
              title: 'Real-time Solutions',
              description: 'Instant answers to your programming questions',
            },
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: 'Best Practices',
              description: 'Learn industry-standard coding practices',
            },
          ].map((feature, index) => (
            <Card key={index} className="p-6 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-purple-300 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Question Form */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Textarea
                placeholder="What would you like to learn about programming?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg relative overflow-hidden group"
              disabled={loading || !question.trim()}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Answer...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Get AI Response
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </form>
        </Card>

        {/* Answer Section */}
        {answer && (
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Terminal className="h-6 w-6 text-purple-400" />
              Solution
            </h2>
            <div className="prose prose-invert max-w-none relative">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}