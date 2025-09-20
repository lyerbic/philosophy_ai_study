import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import FlashcardView from './components/FlashcardView';
import SocraticDebaterView from './components/SocraticDebaterView';
import MindMapView from './components/MindMapView';
import TerminologyView from './components/DashboardView';
import { View } from './types';
import { BrainCircuit } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('flashcards');

  const renderView = useCallback(() => {
    switch (currentView) {
      case 'flashcards':
        return <FlashcardView />;
      case 'debater':
        return <SocraticDebaterView />;
      case 'mind-map':
        return <MindMapView />;
      case 'terminology':
        return <TerminologyView />;
      default:
        return <FlashcardView />;
    }
  }, [currentView]);

  return (
    <div className="flex h-screen bg-base font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-surface border-b border-subtle p-4 flex items-center z-10 shadow-sm">
           <div className="w-8 h-8 mr-3 text-primary">
            <BrainCircuit />
           </div>
           <h1 className="text-lg md:text-xl font-bold text-text">Philosophical Synthesis AI</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;