import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Sun, Moon } from "lucide-react";
import mindeaseIcon from "@/assets/mindease-logo.png";

import UserOnboarding from "./components/UserOnboarding";
import Sidebar from "./components/Sidebar";
import MindEaseChatroom from "./components/MindEaseChatroom";
import ChatPage from "./components/ChatPage";


import HomePage from "./components/HomePage";
import TodoPage from "./components/TodoPage";
import MeditationPage from "./components/MeditationPage";
import ExercisePage from "./components/ExercisePage";
import MusicPage from "./components/MusicPage";

import StressReliefLauncher from "./components/Game";
import PomodoroTimer from "./components/PomodoroTimer";
import Story from "./components/story";
import Academic from "./components/Academic";
import MoodTracker from "./components/MoodTracker";
import Feedback from "./components/Feedback";
const queryClient = new QueryClient();

type Page =
  | "home"
  | "todo"
  | "meditate"
  | "music"
  | "exercise"
  | "profile"
  | "chat"
  | "game"
  | "pomodoro"
  | "story"
  | "academic"
  | "graph"
  | "mood"
  |"feed"
  |"chatbot";

interface OnboardingData {
  userType: string;
  stressLevel: string;
  goals: string[];
  personalInfo: {
    name: string;
    age: string;
    occupation: string;
    stressFactors: string;
  };
}

const App = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const savedUserData = localStorage.getItem("mindease-user-data");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setIsOnboarded(true);
    }
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    setIsOnboarded(true);
    localStorage.setItem("mindease-user-data", JSON.stringify(data));
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    if (!isOnboarded || !userData) {
      return <UserOnboarding onComplete={handleOnboardingComplete} />;
    }

    switch (currentPage) {
      case "home":
        return (
          <HomePage
            userName={userData.personalInfo.name}
            onNavigate={handleNavigation}
          />
        );
     
      case "chat":
        return <MindEaseChatroom onBack={() => handleNavigation("home")} />;
    case "todo":
  case "todo":
  return (
    <TodoPage onBack={() => setCurrentPage("home")} />
  );


 case "chatbot":
  return (
    <ChatPage 
      onBack={() => handleNavigation("home")} 
      userName={userData.personalInfo.name}
    />
  );



case "meditate":
  return (
    <MeditationPage onBack={() => setCurrentPage("home")} />
  );

case "exercise":
  return (
    <ExercisePage onBack={() => setCurrentPage("home")} />
  );

case "music":
  return (
    <MusicPage onBack={() => setCurrentPage("home")} />
  );

      case "game":
        return <StressReliefLauncher />;
      case "story":
        return <Story />;
      case "pomodoro":
        return <PomodoroTimer />;
      case "academic":
        return <Academic />;
     case "mood":
      return <MoodTracker/>;
      case "feed":
        return <Feedback/>;
      
      case "profile":
        return (
          <div className="min-h-screen bg-gradient-background flex items-center justify-center">
            <div className="text-center max-w-md">
              <h1 className="text-2xl font-bold mb-4">
                Profile & Dashboard
              </h1>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-card rounded-lg border text-left">
                  <div className="font-medium">
                    Welcome, {userData.personalInfo.name}!
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    User Type: {userData.userType}
                    <br />
                    Stress Level: {userData.stressLevel}
                    <br />
                    Goals: {userData.goals.join(", ")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation("home")}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            userName={userData.personalInfo.name}
            onNavigate={handleNavigation}
          />
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* ✅ Topbar + Sidebar trigger (overlay drawer) */}
        <header className="bg-card/80 backdrop-blur-sm border-b shadow-soft sticky top-0 z-30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Sidebar + Logo */}
              <div className="flex items-center space-x-2">
                <Sidebar onNavigate={handleNavigation} />
                <img 
                  src={mindeaseIcon} 
                  alt="Mindease Logo" 
                  className="w-8 h-8"
                />
                <span className="text-lg font-semibold text-foreground">MINDEASE</span>
              </div>

              {/* Right: Theme, Notifications, Profile */}
              {isOnboarded && userData && (
                <div className="flex items-center space-x-4">
                  {/* Theme Toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>
                  
                  {/* Notifications */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative"
                    onClick={() => handleNavigation('notifications' as Page)}
                  >
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-energy text-energy-foreground p-0 flex items-center justify-center text-xs">
                      2
                    </Badge>
                  </Button>
                  
                  {/* Profile */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleNavigation('profile')}
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ✅ Page Content (does not shift with sidebar) */}
        <main className="flex-1 bg-background min-h-screen">
          {renderCurrentPage()}
        </main>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
