import { useState } from 'react';
import Navbar from "@/components/Sidebar";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  Heart, 
  Music, 
  Dumbbell, 
  MessageCircle
} from 'lucide-react';
import aiMascot from '@/assets/ai-mascot.png';
import yogaIcon from '@/assets/yoga-icon.png';
import mindeaseIcon from '@/assets/mindease-logo.png';

interface HomePageProps {
  userName: string;
  onNavigate: (page: string) => void;
}

const HomePage = ({ userName, onNavigate }: HomePageProps) => {

  const mainFeatures = [
    {
      id: 'todo',
      title: 'To-Do List',
      description: 'Organize tasks and reduce daily stress with focused planning',
      icon: CheckSquare,
      colorClass: 'bg-primary/10 text-primary',
      borderClass: 'border-primary/20'
    },
    {
      id: 'meditate',
      title: 'Meditate & Relax',
      description: 'Breathing exercises, meditation sessions, and mindful yoga practices',
      icon: Heart,
      colorClass: 'bg-wellness/10 text-wellness',
      borderClass: 'border-wellness/20'
    },
    {
      id: 'music',
      title: 'Calming Music',
      description: 'Curated playlists designed for relaxation and deep focus',
      icon: Music,
      colorClass: 'bg-calm/10 text-calm',
      borderClass: 'border-calm/20'
    },
    {
      id: 'exercise',
      title: 'Stress Relief Exercise',
      description: 'Guided physical activities and movements for mental wellness',
      icon: Dumbbell,
      colorClass: 'bg-energy/10 text-energy',
      borderClass: 'border-energy/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Welcome back, <span className="text-primary">{userName}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            " I AM YOUR AI COMPANION " </p>
        </div>

        {/* Main Feature Cards (2x2 Centered Grid) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {mainFeatures.map((feature) => (
              <Card 
                key={feature.id}
                className={`group relative overflow-hidden bg-accent/30 border-2 ${feature.borderClass} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                onClick={() => onNavigate(feature.id)}
              >
                <CardContent className="relative p-8 text-center space-y-6">
                  <div className={`inline-flex p-6 rounded-2xl ${feature.colorClass} transition-transform group-hover:scale-110`}>
                    <feature.icon className="w-12 h-12" strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* AI Chatbot Float */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer transition-transform hover:scale-105"
        onClick={() => onNavigate('chatbot')}
      >
        <Card className="bg-card shadow-lg hover:shadow-xl transition-all border-2 border-primary/20">
          <CardContent className="p-2">
            <div className="relative">
              <img 
                src={aiMascot} 
                alt="AI Assistant" 
                className="w-12 h-12" 
              />
              <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                <MessageCircle className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

