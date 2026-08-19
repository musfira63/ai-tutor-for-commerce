import React, { useState, useEffect } from 'react';
import { syllabusModules } from '../data/syllabus';
import { SyllabusModule, ModuleId, SubjectType } from '../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  ChevronRight, 
  Sparkles,
  Calculator,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Award,
  Landmark,
  Briefcase
} from 'lucide-react';

interface SyllabusViewProps {
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
  onSelectCalculator?: () => void;
  onSelectFormula?: () => void;
  onSelectCaseStudy?: () => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  selectedSubject,
  setSelectedSubject,
  onSelectCalculator,
  onSelectFormula,
  onSelectCaseStudy
}) => {
  const filteredModules = syllabusModules.filter(
    (m) => selectedSubject === 'all' || m.subject === selectedSubject
  );

  const [activeModuleId, setActiveModuleId] = useState<string>(filteredModules[0]?.id || syllabusModules[0].id);

  useEffect(() => {
    if (!filteredModules.some((m) => m.id === activeModuleId)) {
      if (filteredModules.length > 0) {
        setActiveModuleId(filteredModules[0].id);
      }
    }
  }, [selectedSubject, filteredModules, activeModuleId]);

  const [completedSubTopics, setCompletedSubTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('alevel_hub_completed_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarkedTopics, setBookmarkedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('alevel_hub_bookmarks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const activeModule = filteredModules.find((m) => m.id === activeModuleId) || filteredModules[0] || syllabusModules[0];

  const toggleComplete = (topicId: string) => {
    const updated = { ...completedSubTopics, [topicId]: !completedSubTopics[topicId] };
    setCompletedSubTopics(updated);
    try {
      localStorage.setItem('alevel_hub_completed_topics', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleBookmark = (topicId: string) => {
    const updated = { ...bookmarkedTopics, [topicId]: !bookmarkedTopics[topicId] };
    setBookmarkedTopics(updated);
    try {
      localStorage.setItem('alevel_hub_bookmarks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Calculate overall syllabus progress
  const totalSubTopics = filteredModules.reduce((acc, mod) => acc + mod.subTopics.length, 0);
  const completedCount = filteredModules.reduce((acc, mod) => {
    return acc + mod.subTopics.filter((st) => completedSubTopics[st.id]).length;
  }, 0);
  const progressPercent = Math.round((completedCount / (totalSubTopics || 1)) * 100);

  const getSubjectBadge = (subject: SubjectType) => {
    if (subject === 'accounting') return { label: 'Accounting', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    if (subject === 'business') return { label: 'Business', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    return { label: 'Economics', color: 'bg-purple-100 text-purple-800 border-purple-200' };
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner / Progress overview */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                {selectedSubject === 'all' ? 'Complete 3-Subject Curriculum' : `${selectedSubject.toUpperCase()} Specification`}
              </span>
              <span className="text-xs text-slate-500">{filteredModules.length} In-Depth Modules</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {selectedSubject === 'accounting' && 'A-Level Accounting Syllabus Notes & Worked Examples'}
              {selectedSubject === 'business' && 'A-Level Business Studies Specification & Strategy Frameworks'}
              {selectedSubject === 'economics' && 'A-Level Economics Micro & Macro Core Specification'}
              {selectedSubject === 'all' && 'A-Level Accounting, Business & Economics Curriculum Hub'}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Master core concepts, quantitative calculations, analytical diagrams, and Level 4 AJIM essay evaluation.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4 border border-slate-200/80 min-w-[240px]">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>{selectedSubject === 'all' ? 'All Subjects Progress' : `${selectedSubject} Progress`}</span>
                <span className="text-emerald-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                {completedCount} of {totalSubTopics} sub-topics completed
              </p>
            </div>
          </div>
        </div>

        {/* Quick Subject Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
              selectedSubject === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Modules ({syllabusModules.length})
          </button>
          <button
            onClick={() => setSelectedSubject('accounting')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              selectedSubject === 'accounting'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Landmark className="h-3 w-3" />
            <span>Accounting ({syllabusModules.filter(m => m.subject === 'accounting').length} Modules)</span>
          </button>
          <button
            onClick={() => setSelectedSubject('business')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              selectedSubject === 'business'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Briefcase className="h-3 w-3" />
            <span>Business ({syllabusModules.filter(m => m.subject === 'business').length} Modules)</span>
          </button>
          <button
            onClick={() => setSelectedSubject('economics')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              selectedSubject === 'economics'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <TrendingUp className="h-3 w-3" />
            <span>Economics ({syllabusModules.filter(m => m.subject === 'economics').length} Modules)</span>
          </button>
        </div>
      </div>

      {/* Cambridge 9706 Accounting Assessment Structure Banner when Accounting is selected */}
      {selectedSubject === 'accounting' && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-950">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                <span className="rounded bg-blue-700 px-2 py-0.5 text-xs text-white">Cambridge 9706</span>
                <span>AS & A Level Accounting Specification (2026, 2027, 2028)</span>
              </div>
              <p className="mt-1 text-blue-800">
                Mapped to Papers 1 & 2 (AS Level) and Papers 3 & 4 (A Level). Incorporates all IFRS/IAS standards and official ratio formula guidelines.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="rounded bg-white px-2 py-1 border border-blue-200 shadow-2xs">P1: MCQ (28% AS)</span>
              <span className="rounded bg-white px-2 py-1 border border-blue-200 shadow-2xs">P2: Fundamentals (72% AS)</span>
              <span className="rounded bg-white px-2 py-1 border border-blue-200 shadow-2xs">P3: Financial (30% AL)</span>
              <span className="rounded bg-white px-2 py-1 border border-blue-200 shadow-2xs">P4: Management (20% AL)</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar: Module Selector */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm max-h-[80vh] overflow-y-auto">
            <div className="px-3 py-2 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Course Modules
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">
                {filteredModules.length} Available
              </span>
            </div>
            <div className="space-y-1">
              {filteredModules.map((module, idx) => {
                const isActive = module.id === activeModuleId;
                const moduleSubtopicIds = module.subTopics.map((st) => st.id);
                const isModuleDone = moduleSubtopicIds.length > 0 && moduleSubtopicIds.every((id) => completedSubTopics[id]);
                const badge = getSubjectBadge(module.subject);

                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModuleId(module.id)}
                    className={`flex w-full items-start gap-2.5 rounded-lg p-2.5 text-left transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'hover:bg-slate-50 border border-transparent text-slate-700'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded font-semibold text-[11px] ${
                      isActive 
                        ? 'bg-emerald-400 text-slate-950' 
                        : isModuleDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isModuleDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-emerald-300' : 'text-slate-500'}`}>
                          {module.code}
                        </span>
                        <span className={`text-[9px] uppercase font-bold rounded px-1 py-0.2 border ${
                          isActive 
                            ? 'border-slate-700 bg-slate-800 text-slate-300'
                            : badge.color
                        }`}>
                          {module.subject}
                        </span>
                      </div>
                      <div className={`font-semibold text-xs truncate mt-0.5 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {module.title}
                      </div>
                      <div className={`text-[11px] truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                        {module.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick jump to interactive tools */}
            <div className="mt-4 pt-4 border-t border-slate-100 px-2 space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Module Quick Tools
              </div>
              <div className="grid grid-cols-2 gap-2">
                {onSelectCalculator && (
                  <button
                    onClick={onSelectCalculator}
                    className="flex items-center gap-1.5 rounded bg-slate-100 hover:bg-slate-200 px-2.5 py-2 text-xs font-medium text-slate-800 transition"
                  >
                    <Calculator className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Simulators</span>
                  </button>
                )}
                {onSelectCaseStudy && (
                  <button
                    onClick={onSelectCaseStudy}
                    className="flex items-center gap-1.5 rounded bg-slate-100 hover:bg-slate-200 px-2.5 py-2 text-xs font-medium text-slate-800 transition"
                  >
                    <Award className="h-3.5 w-3.5 text-blue-600" />
                    <span>Case Studies</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: Active Module Detailed Notes */}
        <div className="lg:col-span-8 space-y-8">
          {activeModule && (
            <>
              {/* Module Header Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-600 uppercase">
                        {activeModule.code} • {activeModule.difficulty} Tier
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 uppercase">
                        {activeModule.subject}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {activeModule.title}
                    </h2>
                    <p className="text-sm font-medium text-slate-600">
                      {activeModule.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {activeModule.examWeight}
                    </span>
                    <div className="text-xs text-slate-400 mt-1">{activeModule.duration}</div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  {activeModule.overview}
                </p>

                {/* Synoptic Connections */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    Synoptic Links:
                  </span>
                  {activeModule.synopticLinks.map((link) => (
                    <span key={link} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700 border border-slate-200">
                      {link}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Definitions & Concepts with Examiner Gold Dust */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900">
                    Key Concepts & Examiner Traps
                  </h3>
                </div>

                <div className="space-y-4">
                  {activeModule.keyConcepts.map((concept, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">
                          {concept.term}
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-slate-700">
                        {concept.definition}
                      </p>
                      <p className="mt-2 text-xs text-slate-600 italic">
                        <strong className="font-semibold text-slate-800 not-italic">Strategic / Economic Significance: </strong>
                        {concept.importance}
                      </p>
                      {concept.examinerTip && (
                        <div className="mt-3 flex items-start gap-2 rounded bg-amber-50 p-2.5 text-xs text-amber-900 border border-amber-200">
                          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-semibold">Examiner Gold Dust: </strong>
                            {concept.examinerTip}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtopics Deep Dive */}
              <div className="space-y-6">
                {activeModule.subTopics.map((subtopic) => {
                  const isCompleted = !!completedSubTopics[subtopic.id];
                  const isBookmarked = !!bookmarkedTopics[subtopic.id];

                  return (
                    <div 
                      key={subtopic.id} 
                      className={`rounded-xl border transition-all bg-white p-6 shadow-sm ${
                        isCompleted ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'
                      }`}
                    >
                      {/* Subtopic Header with Action Buttons */}
                      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {subtopic.title}
                          </h3>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {subtopic.summary}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleBookmark(subtopic.id)}
                            className={`rounded p-1.5 text-xs transition ${
                              isBookmarked 
                                ? 'bg-amber-100 text-amber-700' 
                                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                            }`}
                            title="Bookmark subtopic"
                          >
                            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                          </button>

                          <button
                            onClick={() => toggleComplete(subtopic.id)}
                            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition ${
                              isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Core Key Points */}
                      <div className="mt-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Core Theory & Mechanisms
                        </h4>
                        <ul className="mt-2 space-y-2">
                          {subtopic.keyPoints.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Table Data if available */}
                      {subtopic.tableData && (
                        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                              <tr>
                                {subtopic.tableData.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="px-3 py-2.5">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                              {subtopic.tableData.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-3 py-2 text-slate-700 font-medium">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Worked Calculation Example if present */}
                      {subtopic.workedExample && (
                        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider">
                            <Calculator className="h-4 w-4 text-blue-600" />
                            Worked Calculation & Exam Working
                          </div>
                          <div className="mt-2 text-xs font-medium text-slate-800">
                            <strong>Scenario: </strong>{subtopic.workedExample.scenario}
                          </div>
                          <div className="mt-2 rounded bg-white p-3 font-mono text-xs text-slate-900 border border-blue-100 whitespace-pre-line">
                            {subtopic.workedExample.calculation}
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="font-semibold text-emerald-700">
                              {subtopic.workedExample.answer}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-600">
                            {subtopic.workedExample.explanation}
                          </p>
                        </div>
                      )}

                      {/* Examiner Trap */}
                      {subtopic.examinerTrap && (
                        <div className="mt-4 flex items-start gap-2 rounded bg-rose-50 p-3 text-xs text-rose-900 border border-rose-200">
                          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-semibold">Common Examiner Trap: </strong>
                            {subtopic.examinerTrap}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
