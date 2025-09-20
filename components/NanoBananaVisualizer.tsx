
import React, { useState } from 'react';
import { generateAbsurdImage } from '../services/geminiService';
import Spinner from './ui/Spinner';
import { WHITE_CANVAS_BASE64 } from '../constants';

const NanoBananaVisualizer: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [result, setResult] = useState<{imageUrl: string | null; text: string | null} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVisualize = async () => {
    if (!concept.trim()) return;
    setIsLoading(true);
    setResult(null);
    const generated = await generateAbsurdImage(concept, WHITE_CANVAS_BASE64);
    setResult(generated);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleVisualize();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-text">The "Nano-Banana" Visualizer</h2>
      <p className="text-muted mb-6">Forge unconventional (and unforgettable) mental connections.</p>
      
      <div className="flex mb-6">
        <input
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an abstract concept (e.g., Solipsism)"
          className="flex-1 bg-surface text-text p-3 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-highlight-med focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleVisualize}
          disabled={isLoading}
          className="px-6 py-2 bg-highlight-med text-white font-semibold rounded-r-md hover:bg-highlight-high disabled:bg-muted disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isLoading && <Spinner size="sm" className="mr-2"/>}
          Visualize
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-lg p-6 min-h-[300px] flex justify-center items-center border border-gray-200">
        {isLoading ? (
          <div className="text-center">
            <Spinner />
            <p className="mt-4 text-subtle">Summoning the digital muse...</p>
          </div>
        ) : result ? (
          <div className="text-center">
            {result.imageUrl ? (
              <img src={result.imageUrl} alt={`Visualization of ${concept}`} className="max-w-full h-auto rounded-md shadow-xl mb-4" />
            ) : (
              <div className="w-full h-64 bg-overlay rounded-md flex items-center justify-center border border-gray-200">
                <p className="text-muted">Image could not be generated.</p>
              </div>
            )}
            {result.text && <p className="text-lg italic text-gold-600">"{result.text}"</p>}
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>Your mnemonic visualization will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NanoBananaVisualizer;