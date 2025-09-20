import React from 'react';
import { NAV_ITEMS } from '../constants';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="w-16 md:w-64 bg-surface flex flex-col h-full shadow-md">
      <div className="flex-1 mt-8 space-y-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex items-center w-full px-4 py-3 transition-colors duration-200 ease-in-out
              ${currentView === item.id 
                ? 'bg-blue-50 text-primary border-l-4 border-primary' 
                : 'text-muted hover:bg-overlay hover:text-text'}`}
          >
            <item.icon />
            <span className="ml-4 hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-subtle hidden md:block">
        <p className="text-xs text-muted">"The only true wisdom is in knowing you know nothing."</p>
        <p className="text-xs text-muted font-bold">- Socrates</p>
      </div>
    </nav>
  );
};

export default Sidebar;