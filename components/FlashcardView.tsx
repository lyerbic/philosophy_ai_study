import React, { useState } from 'react';
import { generateAntithesis, generateSynthesis } from '../services/geminiService';
import Spinner from './ui/Spinner';

const FlashcardView: React.FC = () => {
  const [thesis, setThesis] = useState('');
  const [antithesis, setAntithesis] = useState('');
  const [synthesis, setSynthesis] = useState('');
  
  const [isGeneratingAntithesis, setIsGeneratingAntithesis] = useState(false);
  const [isGeneratingSynthesis, setIsGeneratingSynthesis] = useState(false);

  const handleGenerateAntithesis = async () => {
    if (!thesis.trim()) return;
    setIsGeneratingAntithesis(true);
    setAntithesis('');
    setSynthesis('');
    const result = await generateAntithesis(thesis);
    setAntithesis(result);
    setIsGeneratingAntithesis(false);
  };

  const handleGenerateSynthesis = async () => {
    if (!thesis.trim() || !antithesis.trim()) return;
    setIsGeneratingSynthesis(true);
    setSynthesis('');
    const result = await generateSynthesis(thesis, antithesis);
    setSynthesis(result);
    setIsGeneratingSynthesis(false);
  };
  
  const handleReset = () => {
    setThesis('');
    setAntithesis('');
    setSynthesis('');
  }
  
  const isLoading = isGeneratingAntithesis || isGeneratingSynthesis;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-text">Hegelian Synthesis</h2>
          <p className="text-muted text-sm sm:text-base">Discover new truths by resolving philosophical conflict.</p>
        </div>
        <button 
          onClick={handleReset} 
          className="px-4 py-2 text-sm text-muted hover:text-text hover:bg-overlay rounded-md transition-colors"
          aria-label="Reset fields"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* THESIS INPUT */}
        <div className="bg-surface p-6 rounded-lg border border-subtle shadow-sm">
          <label htmlFor="thesis" className="block text-sm font-semibold text-primary mb-2">1. START WITH A THESIS</label>
          <div className="flex">
            <input
              id="thesis"
              type="text"
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              className="w-full bg-white text-text p-3 rounded-l-md border border-subtle focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder="Enter a concept, e.g., 'Determinism'"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerateAntithesis}
              disabled={!thesis.trim() || isLoading}
              className="px-5 py-2 bg-primary text-white font-semibold rounded-r-md hover:bg-primary-hover disabled:bg-gray-300 disabled:text-muted disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isGeneratingAntithesis ? <Spinner size="sm" /> : '→'}
            </button>
          </div>
        </div>

        {/* ANTITHESIS DISPLAY */}
        {(antithesis || isGeneratingAntithesis) && (
          <div className="bg-surface p-6 rounded-lg border border-subtle animate-fade-in shadow-sm">
            <label className="block text-sm font-semibold text-primary mb-2">2. CONFRONT THE ANTITHESIS</label>
            {isGeneratingAntithesis ? (
              <div className="flex items-center text-muted italic">
                <Spinner size="sm" className="mr-3" /> Pondering an opposing view...
              </div>
            ) : (
              <p className="text-lg bg-overlay p-4 rounded-md border border-subtle">{antithesis}</p>
            )}
            {antithesis && !antithesis.startsWith("Error") && (
                 <div className="mt-4 text-right">
                    <button
                        onClick={handleGenerateSynthesis}
                        disabled={isLoading}
                        className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover disabled:bg-gray-300 disabled:text-muted disabled:cursor-not-allowed transition-colors flex items-center ml-auto"
                    >
                        {isGeneratingSynthesis && <Spinner size="sm" className="mr-2" />}
                        Create Synthesis
                    </button>
                 </div>
            )}
          </div>
        )}
        
        {/* SYNTHESIS DISPLAY */}
        {(synthesis || isGeneratingSynthesis) && (
             <div className="bg-surface p-6 rounded-lg border border-subtle animate-fade-in shadow-sm">
                <label className="block text-sm font-semibold text-primary mb-2">3. FORM A SYNTHESIS</label>
                 {isGeneratingSynthesis ? (
                    <div className="flex items-center text-muted italic">
                        <Spinner size="sm" className="mr-3" /> Forging a higher truth...
                    </div>
                ) : (
                    <p className="text-text bg-overlay p-4 rounded-md border border-subtle whitespace-pre-wrap">{synthesis}</p>
                )}
             </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardView;