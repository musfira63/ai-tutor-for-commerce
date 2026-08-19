import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { SyllabusView } from './components/SyllabusView';
import { AccountingAssistantView } from './components/AccountingAssistantView';
import { CalculatorsLab } from './components/CalculatorsLab';
import { FormulaBank } from './components/FormulaBank';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { ExamCaseStudiesView } from './components/ExamCaseStudiesView';
import { AccountingSleuth } from './components/AccountingSleuth';
import { QuickSearchModal } from './components/QuickSearchModal';
import { SubjectType } from './types';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  ExternalLink,
  Layers,
  GraduationCap,
  Bot
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('syllabus');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateFromSearch = (tab: ActiveTab, subTarget?: string, subject?: SubjectType) => {
    setActiveTab(tab);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation Bar with Subject Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'syllabus' && (
          <SyllabusView 
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onSelectCalculator={() => setActiveTab('calculators')}
            onSelectFormula={() => setActiveTab('formulas')}
            onSelectCaseStudy={() => setActiveTab('case-studies')}
          />
        )}

        {activeTab === 'ai-assistant' && (
          <AccountingAssistantView selectedSubject={selectedSubject} />
        )}

        {activeTab === 'calculators' && (
          <CalculatorsLab selectedSubject={selectedSubject} />
        )}

        {activeTab === 'formulas' && (
          <FormulaBank selectedSubject={selectedSubject} />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView selectedSubject={selectedSubject} />
        )}

        {activeTab === 'quiz' && (
          <QuizView selectedSubject={selectedSubject} />
        )}

        {activeTab === 'case-studies' && (
          <ExamCaseStudiesView selectedSubject={selectedSubject} />
        )}

        {activeTab === 'accounting-sleuth' && (
          <AccountingSleuth selectedSubject={selectedSubject} />
        )}
      </main>

      {/* Floating AI Tutor Quick Trigger Button when on other tabs */}
      {activeTab !== 'ai-assistant' && (
        <aside aria-label="Accounting AI Assistant floating launcher" className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl hover:bg-blue-700 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5 border border-blue-400/40"
          >
            <Bot className="h-4 w-4 text-blue-200" />
            <span>Ask Accounting AI Tutor</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
          </button>
        </aside>
      )}

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigateFromSearch}
      />

      {/* Clean Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-600 font-bold text-white text-[10px]">
              A*
            </span>
            <span className="font-semibold text-slate-800">
              A-Level Curriculum Suite: Accounting • Business Studies • Economics
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>AQA • Edexcel • OCR • Cambridge CIE Alignment</span>
            <span>•</span>
            <span>AJIM Evaluation Scaffolding</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
