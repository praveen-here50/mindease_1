import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface SidebarProps {
  onNavigate: (page: string) => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay when sidebar is open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center h-14 px-4 border-b border-border">
          <span className="font-semibold text-foreground">Menu</span>
          <button onClick={() => setOpen(false)}>
            <FiX className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col p-4 space-y-2">
          <button onClick={() => { onNavigate("home"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1">Home</button>
          <button onClick={() => { onNavigate("game"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1">Stress Relief Games</button>
          <button onClick={() => { onNavigate("academic"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1">Academic life</button>
          <button onClick={() => { onNavigate("pomodoro"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1">Pomodoro Timer</button>
          <button onClick={() => { onNavigate("story"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1"> Self Help Library</button>
          <button onClick={() => { onNavigate("chat"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1">Chatroom</button>
          <button onClick={() => { onNavigate("mood"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1">MoodTracker</button>
          <button onClick={() => { onNavigate("feed"); setOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-accent text-foreground transition-all duration-300 hover:translate-x-1">How's Your Day</button>
          
          
          
        </nav>
      </div>

      {/* Hamburger button (to open sidebar) */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md hover:bg-accent"
      >
        <FiMenu className="w-6 h-6 text-foreground" />
      </button>
    </>
  );
}