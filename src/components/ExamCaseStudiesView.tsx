import React, { useState } from 'react';
import { caseStudies } from '../data/caseStudies';
import { CaseStudy, SubjectType } from '../types';
import { 
  FileText, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  PenTool, 
  AlertTriangle,
  Landmark,
  Briefcase,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface ExamCaseStudiesViewProps {
  selectedSubject?: SubjectType;
}

export const ExamCaseStudiesView: React.FC<ExamCaseStudiesViewProps> = ({ selectedSubject: initialSubject = 'all' }) => {
  const [subjectFilter, setSubjectFilter] = useState<SubjectType>(initialSubject);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseStudies[0].id);
  const [showModelAnswer, setShowModelAnswer] = useState<Record<string, boolean>>({});

  const filteredCases = caseStudies.filter(
    (cs) => subjectFilter === 'all' || cs.subject === subjectFilter
  );

  const activeCase = filteredCases.find((cs) => cs.id === selectedCaseId) || filteredCases[0] || caseStudies[0];

  const toggleModelAnswer = (questionId: string) => {
    setShowModelAnswer((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                Exam Case Studies & AJIM Evaluation Scaffolds
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {caseStudies.length} Full Past Exam Papers
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              A-Level Exam Case Studies & Model Essays
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Real exam case scenarios with comparative Grade C vs Grade A* model answers, examiner marking grids, and AJIM evaluation scaffolding.
            </p>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setSubjectFilter('all')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                subjectFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Cases
            </button>
            <button
              onClick={() => setSubjectFilter('accounting')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                subjectFilter === 'accounting' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Accounting
            </button>
            <button
              onClick={() => setSubjectFilter('business')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                subjectFilter === 'business' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Business
            </button>
            <button
              onClick={() => setSubjectFilter('economics')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                subjectFilter === 'economics' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Economics
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Case Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm space-y-1">
            <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Exam Case
            </div>
            {filteredCases.map((cs) => {
              const isSelected = cs.id === activeCase.id;
              return (
                <button
                  key={cs.id}
                  onClick={() => setSelectedCaseId(cs.id)}
                  className={`w-full rounded-lg p-3 text-left transition ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate">{cs.company}</span>
                    <span className={`text-[10px] uppercase font-bold rounded px-1.5 py-0.5 border ${
                      isSelected 
                        ? 'border-slate-700 bg-slate-800 text-slate-300' 
                        : cs.subject === 'accounting' ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : cs.subject === 'business' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {cs.subject}
                    </span>
                  </div>
                  <div className={`mt-1 text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {cs.industry}
                  </div>
                </button>
              );
            })}
          </div>

          {/* AJIM Essay Evaluation Framework Card */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-600" />
              The AJIM Grade A* Essay Framework
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <p><strong>A - Answer: </strong>Directly answer the question in the opening sentence.</p>
              <p><strong>J - Justify: </strong>Provide quantitative & qualitative supporting rationale.</p>
              <p><strong>I - It Depends On: </strong>State key conditions (timeframes, elasticities, competitive responses).</p>
              <p><strong>M - Most Important: </strong>Weigh the single overriding strategic priority that determines success.</p>
            </div>
          </div>
        </div>

        {/* Right Case Content */}
        <div className="lg:col-span-8 space-y-6">
          {activeCase && (
            <div className="space-y-6">
              {/* Case Context & Data Table */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold uppercase text-slate-700">
                      {activeCase.subject} Case Study
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {activeCase.title}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{activeCase.industry}</span>
                </div>

                <p className="text-xs leading-relaxed text-slate-700">
                  {activeCase.context}
                </p>

                {/* Financial Data Table */}
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Financial / Economic Indicator</th>
                        <th className="px-3 py-2 text-right">Year 1</th>
                        <th className="px-3 py-2 text-right">Year 2</th>
                        {activeCase.financialData[0]?.year3 && (
                          <th className="px-3 py-2 text-right">Year 3</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activeCase.financialData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-3 py-2 font-medium text-slate-800">{row.metric}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{row.year1}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{row.year2}</td>
                          {row.year3 && (
                            <td className="px-3 py-2 text-right font-mono text-slate-700">{row.year3}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Qualitative Considerations */}
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 block mb-1">Qualitative & Contextual Notes:</span>
                  <ul className="space-y-1 text-slate-600 list-disc pl-4">
                    {activeCase.qualitativeFactors.map((qf, i) => (
                      <li key={i}>{qf}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Questions & Model Answers */}
              <div className="space-y-6">
                {activeCase.questions.map((q) => {
                  const isExpanded = !!showModelAnswer[q.id];

                  return (
                    <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800 text-[11px]">
                              {q.commandWord} ({q.marks} Marks)
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {q.question}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleModelAnswer(q.id)}
                          className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition whitespace-nowrap shadow-xs"
                        >
                          {isExpanded ? 'Hide Model Answer' : 'View Grade A* Answer'}
                        </button>
                      </div>

                      <div className="text-xs text-slate-500 italic">
                        <strong>Exam Guidance: </strong>{q.guidance}
                      </div>

                      {isExpanded && (
                        <div className="space-y-4 pt-2 border-t border-slate-100">
                          {/* Comparative Answers */}
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Grade C Answer */}
                            <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-4 text-xs space-y-2">
                              <div className="font-bold text-amber-950 flex items-center gap-1.5">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                Grade C Model Response (Descriptive / Siloed)
                              </div>
                              <p className="text-slate-700 leading-relaxed">
                                {q.modelAnswerGradeC}
                              </p>
                            </div>

                            {/* Grade A* Answer */}
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 text-xs space-y-2">
                              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                                <Award className="h-4 w-4 text-emerald-600" />
                                Grade A* Model Response (AJIM Evaluated)
                              </div>
                              <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                                {q.modelAnswerGradeAStar}
                              </p>
                            </div>
                          </div>

                          {/* Examiner Commentary & Marking Grid */}
                          <div className="rounded-lg bg-slate-900 p-4 text-white text-xs space-y-2">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                              <Sparkles className="h-4 w-4" />
                              Lead Examiner Commentary & Marking Breakdown:
                            </div>
                            <p className="text-slate-300">
                              {q.examinerCommentary}
                            </p>
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                              <div><strong>AO1 Knowledge: </strong>{q.markingCriteria.ao1_knowledge}</div>
                              <div><strong>AO2 Application: </strong>{q.markingCriteria.ao2_application}</div>
                              <div><strong>AO3 Analysis: </strong>{q.markingCriteria.ao3_analysis}</div>
                              <div><strong>AO4 Evaluation: </strong>{q.markingCriteria.ao4_evaluation}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
