import React, { useState } from 'react';
import { criticalEvaluationScenarios } from '../data/caseStudies';
import { CriticalEvaluationScenario, SubjectType } from '../types';
import { 
  Eye, 
  ShieldAlert, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  Landmark,
  Briefcase,
  TrendingUp,
  FileSearch
} from 'lucide-react';

interface AccountingSleuthProps {
  selectedSubject?: SubjectType;
}

export const AccountingSleuth: React.FC<AccountingSleuthProps> = ({ selectedSubject: initialSubject = 'all' }) => {
  const [subjectFilter, setSubjectFilter] = useState<SubjectType>(initialSubject);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(criticalEvaluationScenarios[0].id);
  const [revealedAnalysis, setRevealedAnalysis] = useState<Record<string, boolean>>({});

  const filteredScenarios = criticalEvaluationScenarios.filter(
    (sc) => subjectFilter === 'all' || sc.subject === subjectFilter
  );

  const activeScenario = filteredScenarios.find((sc) => sc.id === activeScenarioId) || filteredScenarios[0] || criticalEvaluationScenarios[0];

  const toggleReveal = (id: string) => {
    setRevealedAnalysis((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-rose-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                Critical Evaluation Sleuth
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Window Dressing • Greenwashing • Market Distortions
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              The Critical Sleuth: Unmasking Distortions & Illusions
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Train yourself to look beyond superficial published accounts and corporate PR to identify window dressing, greenwashing, and government policy failures.
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
              All Scenarios
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
        {/* Left Scenario Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm space-y-1">
            <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Investigation Scenarios
            </div>
            {filteredScenarios.map((sc) => {
              const isSelected = sc.id === activeScenario.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={`w-full rounded-lg p-3 text-left transition ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate">{sc.companyOrTopic}</span>
                    <span className={`text-[10px] uppercase font-bold rounded px-1.5 py-0.5 border ${
                      isSelected 
                        ? 'border-slate-700 bg-slate-800 text-slate-300' 
                        : sc.subject === 'accounting' ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : sc.subject === 'business' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {sc.subject}
                    </span>
                  </div>
                  <div className={`mt-1 text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {sc.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Investigation */}
        <div className="lg:col-span-8 space-y-6">
          {activeScenario && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold uppercase text-slate-700">
                      {activeScenario.subject} Investigation
                    </span>
                    <span className="text-xs font-mono text-rose-600 font-bold">
                      {activeScenario.techniqueOrPhenomenon}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    {activeScenario.title}
                  </h2>
                </div>
              </div>

              {/* Scenario Context */}
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 text-xs leading-relaxed text-slate-800">
                <strong className="block text-slate-900 mb-1 font-bold">Case Scenario:</strong>
                {activeScenario.scenario}
              </div>

              {/* The Illusion vs Reality */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    Apparent Superficial Benefit
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {activeScenario.apparentBenefit}
                  </p>
                </div>

                <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-4 text-xs space-y-1.5">
                  <div className="font-bold text-rose-950 flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-rose-600" />
                    The Hidden Underlying Reality
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {activeScenario.realUnderlyingTruth}
                  </p>
                </div>
              </div>

              {/* Reveal Sleuth Audit Mechanism */}
              <div>
                <button
                  onClick={() => toggleReveal(activeScenario.id)}
                  className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs"
                >
                  <FileSearch className="h-4 w-4 text-emerald-400" />
                  <span>{revealedAnalysis[activeScenario.id] ? 'Hide Audit Detection Protocol' : 'Reveal How To Detect & Audit in Exams'}</span>
                </button>

                {revealedAnalysis[activeScenario.id] && (
                  <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 p-5 space-y-3 text-xs">
                    <div>
                      <strong className="text-blue-950 font-bold block mb-1">
                        Auditor & Examiner Detection Protocol:
                      </strong>
                      <p className="text-slate-800 leading-relaxed">
                        {activeScenario.howToDetectOrEvaluate}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-blue-200/80">
                      <strong className="text-blue-950 font-bold block mb-1">
                        Stakeholder & Economic Welfare Impact:
                      </strong>
                      <p className="text-slate-800 leading-relaxed">
                        {activeScenario.stakeholderOrEconomicImpact}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
