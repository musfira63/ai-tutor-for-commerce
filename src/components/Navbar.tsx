import React from 'react';
import { SubjectType } from '../types';
import { 
  BookOpen, 
  Calculator, 
  Binary, 
  Layers, 
  HelpCircle, 
  FileText, 
  Search,
  Eye,
  Briefcase,
  TrendingUp,
  Landmark,
  Sparkles,
  Bot
} from 'lucide-react';

export type ActiveTab = 
  | 'syllabus' 
  | 'ai-assistant'
  | 'calculators' 
  | 'formulas' 
  | 'flashcards' 
  | 'quiz' 
  | 'case-studies'
  | 'accounting-sleuth';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedSubject,
  setSelectedSubject,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950 text-white shadow-md">
      {/* Top Primary Bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand Title (One line, strictly one text element) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('syllabus')}
            className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500 font-bold text-slate-950">
              A*
            </div>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              A-Level Curriculum Hub
            </span>
          </button>
          <span className="hidden sm:inline-flex items-center rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 whitespace-nowrap">
            AQA • Edexcel • OCR • CIE
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 'syllabus'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Syllabus</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'ai-assistant'
                ? 'bg-blue-600 text-white shadow-xs border border-blue-400'
                : 'bg-blue-950/60 text-blue-300 hover:bg-blue-900 hover:text-white border border-blue-800/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>AI Tutor</span>
          </button>

          <button
            onClick={() => setActiveTab('calculators')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 'calculators'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Simulators</span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 'formulas'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Binary className="h-3.5 w-3.5" />
            <span>Formulas</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 'quiz'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Quiz Bank</span>
          </button>

          <button
            onClick={() => setActiveTab('case-studies')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 'case-studies'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Exam Cases</span>
          </button>

          <button
            onClick={() => setActiveTab('accounting-sleuth')}
            className={`hidden xl:flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 'accounting-sleuth'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Evaluation Sleuth</span>
          </button>
        </nav>

        {/* Zone 3: Search Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
            title="Search curriculum (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden md:inline whitespace-nowrap">Search (⌘K)</span>
          </button>
        </div>
      </div>

      {/* Secondary Subject Switcher Strip */}
      <div className="border-t border-slate-800/80 bg-slate-900/90 px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-400">Subject:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition ${
                  selectedSubject === 'all'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                All 3 Subjects (24 Modules)
              </button>

              <button
                onClick={() => setSelectedSubject('accounting')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition ${
                  selectedSubject === 'accounting'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-blue-300'
                }`}
              >
                <Landmark className="h-3.5 w-3.5" />
                <span>📘 Accounting</span>
              </button>

              <button
                onClick={() => setSelectedSubject('business')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition ${
                  selectedSubject === 'business'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-emerald-300'
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>🏢 Business</span>
              </button>

              <button
                onClick={() => setSelectedSubject('economics')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition ${
                  selectedSubject === 'economics'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-purple-300'
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                <span>📈 Economics</span>
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
            <span>Official Exam Specs:</span>
            <span className="font-mono text-slate-300">AQA (7127 / 7132 / 7136)</span>
            <span>•</span>
            <span className="font-mono text-slate-300">Edexcel (9BS0 / 9EC0)</span>
            <span>•</span>
            <span className="font-mono text-slate-300">CIE (9706 / 9609 / 9708)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
