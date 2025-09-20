import React, { useState, useEffect, useCallback } from 'react';
import { getTerminologyFlashcard } from '../services/geminiService';
import Spinner from './ui/Spinner';

interface CardData {
  term: string;
  definition: string;
}

const TerminologyView: React.FC = () => {
  const [card, setCard] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const fetchNewCard = useCallback(async () => {
    setIsLoading(true);
    // Ensure card is flipped back to front before fetching new content
    if (isFlipped) {
      setIsFlipped(false);
      // Wait for flip animation to complete
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    const newCard = await getTerminologyFlashcard();
    setCard(newCard);
    setIsLoading(false);
  }, [isFlipped]);

  useEffect(() => {
    fetchNewCard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cardContent = (
    <>
      {/* Front of the card */}
      <div className="w-full h-full bg-surface p-6 rounded-lg border border-subtle flex flex-col justify-center items-center flashcard-face shadow-sm">
        <span className="text-sm font-semibold text-primary mb-4">TERM</span>
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-text">{card?.term}</h3>
      </div>
      {/* Back of the card */}
      <div className="w-full h-full bg-overlay p-6 rounded-lg border border-subtle flex flex-col justify-center items-center flashcard-face flashcard-back shadow-sm">
         <span className="text-sm font-semibold text-primary mb-4">DEFINITION</span>
        <p className="text-center text-text text-lg">{card?.definition}</p>
      </div>
    </>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-text">Terminology Flashcards</h2>
      <p className="text-muted mb-8 text-sm sm:text-base">Master key philosophical terms with classic flashcards.</p>

      <div className="flashcard-container w-full h-64 sm:h-72 mb-8">
        <div 
            className={`relative w-full h-full flashcard ${isFlipped ? 'is-flipped' : ''}`}
            aria-live="polite"
        >
          {isLoading ? (
            <div className="w-full h-full bg-surface p-6 rounded-lg border border-subtle flex flex-col justify-center items-center shadow-sm">
              <Spinner />
              <p className="mt-4 text-muted">Fetching new term...</p>
            </div>
          ) : cardContent }
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
            onClick={() => !isLoading && setIsFlipped(!isFlipped)}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-transparent text-primary font-semibold rounded-md hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-primary"
            aria-label="Flip card"
        >
            Flip Card
        </button>
        <button
            onClick={fetchNewCard}
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover disabled:bg-gray-300 disabled:text-muted disabled:cursor-not-allowed transition-colors"
            aria-label="Get next term"
        >
            Next Term
        </button>
      </div>
    </div>
  );
};

export default TerminologyView;