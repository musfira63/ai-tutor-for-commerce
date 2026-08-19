import React, { useState, useEffect, useRef } from 'react';
import { syllabusModules } from '../data/syllabus';
import { financeFormulas } from '../data/formulas';
import { initialFlashcards } from '../data/flashcards';
import { caseStudies } from '../data/caseStudies';
import { ActiveTab } from './Navbar';
import { SubjectType } from '../types';
import { 
  Search, 
  BookOpen, 
  Calculator, 
  Binary, 
  Layers, 
  FileText, 
  X,
  ArrowRight,
  Sparkles,
  Landmark,
  Briefcase,
  TrendingUp
} from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab, subTarget?: string, subject?: SubjectType) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global key listener for Escape and Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search across syllabus modules & subtopics
  const matchedModules = cleanQuery
    ? syllabusModules.filter(
        (m) =>
          m.title.toLowerCase().includes(cleanQuery) ||
          m.subtitle.toLowerCase().includes(cleanQuery) ||
          m.code.toLowerCase().includes(cleanQuery) ||
          m.keyConcepts.some((kc) => kc.term.toLowerCase().includes(cleanQuery)) ||
          m.subTopics.some((st) => st.title.toLowerCase().includes(cleanQuery))
      )
    : [];

  // Search across formulas
  const matchedFormulas = cleanQuery
    ? financeFormulas.filter(
        (f) =>
          f.name.toLowerCase().includes(cleanQuery) ||
          f.formula.toLowerCase().includes(cleanQuery) ||
          f.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Search across flashcards
  const matchedFlashcards = cleanQuery
    ? initialFlashcards.filter(
        (fc) =>
          fc.question.toLowerCase().includes(cleanQuery) ||
          fc.answer.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Search across case studies
  const matchedCases = cleanQuery
    ? caseStudies.filter(
        (cs) =>
          cs.title.toLowerCase().includes(cleanQuery) ||
          cs.company.toLowerCase().includes(cleanQuery) ||
          cs.industry.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults =
    matchedModules.length +
    matchedFormulas.length +
    matchedFlashcards.length +
    matchedCases.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Header Input */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3 bg-slate-950">
          <Search className="h-5 w-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all Accounting, Business & Economics concepts (e.g., ROCE, Ansoff, PED, Multiplier)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-3 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!cleanQuery && (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <p>Type keywords to search across 24 modules, formulas, flashcards, and exam cases.</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['ROCE', 'Ansoff Matrix', 'PED', 'Break-Even', 'Keynesian Multiplier', 'Variance Analysis', 'Herzberg'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => setQuery(hint)}
                    className="rounded bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-slate-700"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          )}

          {cleanQuery && (
            <div className="rounded-xl border border-blue-500/40 bg-blue-950/40 p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-blue-200">
                <Sparkles className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Ask Accounting AI Tutor: <strong>"{query}"</strong></span>
              </div>
              <button
                onClick={() => {
                  onNavigate('ai-assistant');
                  onClose();
                }}
                className="flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-500 transition shrink-0"
              >
                <span>Ask AI Tutor</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}

          {cleanQuery && totalResults === 0 && (
            <div className="text-center py-10 text-xs text-slate-400">
              No direct curriculum index matching "{query}". Click above to ask the AI Examiner!
            </div>
          )}

          {/* Matched Syllabus Modules */}
          {matchedModules.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Syllabus Modules ({matchedModules.length})</span>
              </div>
              <div className="space-y-1">
                {matchedModules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onNavigate('syllabus', m.id, m.subject);
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs hover:bg-slate-800 text-slate-200 group transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-bold text-[11px]">{m.code}</span>
                        <span className="font-semibold text-white">{m.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.subtitle}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Formulas */}
          {matchedFormulas.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                <Binary className="h-3.5 w-3.5" />
                <span>Formulas & Calculations ({matchedFormulas.length})</span>
              </div>
              <div className="space-y-1">
                {matchedFormulas.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onNavigate('formulas', f.id, f.subject);
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs hover:bg-slate-800 text-slate-200 group transition"
                  >
                    <div>
                      <div className="font-semibold text-white">{f.name}</div>
                      <div className="font-mono text-[11px] text-emerald-300 mt-0.5">{f.formula}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Case Studies */}
          {matchedCases.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span>Exam Case Studies ({matchedCases.length})</span>
              </div>
              <div className="space-y-1">
                {matchedCases.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => {
                      onNavigate('case-studies', cs.id, cs.subject);
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs hover:bg-slate-800 text-slate-200 group transition"
                  >
                    <div>
                      <div className="font-semibold text-white">{cs.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{cs.company} • {cs.industry}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-4 py-2 text-[11px] text-slate-500">
          <span>Navigate with mouse or Tab</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
