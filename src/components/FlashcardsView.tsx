import React, { useState } from 'react';
import { initialFlashcards } from '../data/flashcards';
import { Flashcard, SubjectType } from '../types';
import { 
  Layers, 
  RotateCw, 
  Check, 
  X, 
  Sparkles, 
  HelpCircle, 
  Award,
  Filter,
  RefreshCw,
  Landmark,
  Briefcase,
  TrendingUp
} from 'lucide-react';

interface FlashcardsViewProps {
  selectedSubject?: SubjectType;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ selectedSubject: initialSubject = 'all' }) => {
  const [subjectFilter, setSubjectFilter] = useState<SubjectType>(initialSubject);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('alevel_hub_mastered_flashcards');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const cards = initialFlashcards.filter(
    (card) => subjectFilter === 'all' || card.subject === subjectFilter
  );

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % (cards.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % (cards.length || 1));
  };

  const markMastery = (isMastered: boolean) => {
    if (!currentCard) return;
    const updated = { ...masteredCards, [currentCard.id]: isMastered };
    setMasteredCards(updated);
    try {
      localStorage.setItem('alevel_hub_mastered_flashcards', JSON.stringify(updated));
    } catch {
      // ignore
    }
    handleNext();
  };

  const masteredCount = cards.filter((c) => masteredCards[c.id]).length;
  const masteryPercentage = Math.round((masteredCount / (cards.length || 1)) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                Active Recall & Spaced Repetition
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {cards.length} Cards in Deck
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              A-Level Spaced Repetition Flashcards
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Test your recall of key accounting rules, business theories, and micro/macroeconomic mechanisms.
            </p>
          </div>

          {/* Mastery Progress Badge */}
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 min-w-[200px]">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Deck Mastery</span>
              <span className="font-bold text-emerald-600">{masteryPercentage}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {masteredCount} of {cards.length} cards mastered
            </p>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
          <button
            onClick={() => {
              setSubjectFilter('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Cards ({initialFlashcards.length})
          </button>
          <button
            onClick={() => {
              setSubjectFilter('accounting');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'accounting' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Landmark className="h-3 w-3" />
            <span>Accounting Deck</span>
          </button>
          <button
            onClick={() => {
              setSubjectFilter('business');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'business' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Briefcase className="h-3 w-3" />
            <span>Business Deck</span>
          </button>
          <button
            onClick={() => {
              setSubjectFilter('economics');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'economics' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <TrendingUp className="h-3 w-3" />
            <span>Economics Deck</span>
          </button>
        </div>
      </div>

      {/* Main Flip Card */}
      {currentCard ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-100 px-2 py-0.5 font-bold uppercase text-slate-700">
                {currentCard.subject}
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                {currentCard.category}
              </span>
            </div>
          </div>

          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-bold tracking-wider">
                <span>{isFlipped ? 'Model Answer & Mark Scheme' : 'Question Prompt'}</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                  <RotateCw className="h-3.5 w-3.5" /> Click anywhere to flip
                </span>
              </div>

              <div className="mt-6">
                {!isFlipped ? (
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {currentCard.question}
                  </h3>
                ) : (
                  <div className="space-y-4">
                    <p className="text-base text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                      {currentCard.answer}
                    </p>
                    {currentCard.formula && (
                      <div className="rounded-lg bg-slate-900 p-3 font-mono text-sm text-emerald-400">
                        {currentCard.formula}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 pt-4">
              <span>Difficulty: <strong className="capitalize text-slate-700">{currentCard.difficulty}</strong></span>
              <span className="text-[11px]">
                {masteredCards[currentCard.id] ? '✓ Mastered' : '○ Needs Review'}
              </span>
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => markMastery(false)}
                className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
              >
                <X className="h-4 w-4" />
                <span>Still Learning</span>
              </button>

              <button
                onClick={() => markMastery(true)}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <Check className="h-4 w-4" />
                <span>Mastered (A*)</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          No flashcards found for this subject filter.
        </div>
      )}
    </div>
  );
};
