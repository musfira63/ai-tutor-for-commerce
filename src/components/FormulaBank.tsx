import React, { useState } from 'react';
import { financeFormulas } from '../data/formulas';
import { FormulaItem, SubjectType } from '../types';
import { 
  Binary, 
  Search, 
  Lightbulb, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Landmark,
  Briefcase
} from 'lucide-react';

interface FormulaBankProps {
  selectedSubject?: SubjectType;
}

export const FormulaBank: React.FC<FormulaBankProps> = ({ selectedSubject: initialSubject = 'all' }) => {
  const [subjectFilter, setSubjectFilter] = useState<SubjectType>(initialSubject);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFormulaId, setActiveFormulaId] = useState<string>(financeFormulas[0].id);

  // Dynamic user input state for the active formula sandbox
  const [customInputs, setCustomInputs] = useState<Record<string, number>>({});

  const filteredFormulas = financeFormulas.filter((item) => {
    const matchesSubject = subjectFilter === 'all' || item.subject === subjectFilter;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesCategory && matchesSearch;
  });

  const activeFormula = 
    filteredFormulas.find((f) => f.id === activeFormulaId) || 
    filteredFormulas[0] || 
    financeFormulas[0];

  const handleInputChange = (key: string, value: number) => {
    setCustomInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Get current inputs merged with default values
  const currentInputs = activeFormula.inputs.reduce((acc, input) => {
    acc[input.key] = customInputs[input.key] !== undefined ? customInputs[input.key] : input.defaultValue;
    return acc;
  }, {} as Record<string, number>);

  const calculationResult = activeFormula.calculate(currentInputs);

  const categories = ['All', ...Array.from(new Set(financeFormulas.map((f) => f.category)))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                Formula Bank & Interactive Sandbox
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {financeFormulas.length} Official Formulas
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              A-Level Formula Bank & Quantitative Sandbox
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Official formulas for Accounting, Business Studies, and Economics with live interactive calculation sandboxes and examiner interpretation tips.
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
              All
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

        {/* Search & Category Filter Bar */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search formulas (e.g. ROCE, Break-Even, Multiplier, PED)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left List of Formulas */}
        <div className="lg:col-span-4 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm max-h-[75vh] overflow-y-auto space-y-1">
            <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Formula
            </div>
            {filteredFormulas.map((item) => {
              const isSelected = item.id === activeFormula.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveFormulaId(item.id);
                    setCustomInputs({});
                  }}
                  className={`w-full rounded-lg p-3 text-left transition ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate">{item.name}</span>
                    <span className={`text-[10px] uppercase font-bold rounded px-1.5 py-0.5 border ${
                      isSelected 
                        ? 'border-slate-700 bg-slate-800 text-slate-300' 
                        : item.subject === 'accounting' ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : item.subject === 'business' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {item.subject}
                    </span>
                  </div>
                  <div className={`mt-1 font-mono text-[11px] truncate ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`}>
                    {item.formula}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Sandbox Container */}
        <div className="lg:col-span-8 space-y-6">
          {activeFormula && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              {/* Formula Header Card */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeFormula.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 uppercase">
                    {activeFormula.subject}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {activeFormula.name}
                </h2>
                <div className="mt-3 rounded-lg bg-slate-900 p-3 font-mono text-sm text-emerald-400">
                  {activeFormula.formula}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {activeFormula.explanation}
                </p>
              </div>

              {/* Interactive Calculation Inputs & Result */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Binary className="h-4 w-4 text-emerald-600" />
                    Interactive Sandbox Calculator
                  </h3>
                  <span className="text-[11px] text-slate-500">Edit values to recalculate</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {activeFormula.inputs.map((inp) => (
                    <div key={inp.key}>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {inp.label}
                      </label>
                      <div className="relative rounded-md shadow-xs">
                        {inp.prefix && (
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-xs text-slate-500">
                            {inp.prefix}
                          </span>
                        )}
                        <input
                          type="number"
                          step="any"
                          value={currentInputs[inp.key] ?? inp.defaultValue}
                          onChange={(e) => handleInputChange(inp.key, Number(e.target.value))}
                          className={`w-full rounded-md border border-slate-300 bg-white py-1.5 text-xs font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none ${
                            inp.prefix ? 'pl-7' : 'pl-3'
                          } ${inp.suffix ? 'pr-7' : 'pr-3'}`}
                        />
                        {inp.suffix && (
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-slate-500">
                            {inp.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Result Banner */}
                <div className="mt-5 rounded-lg bg-white p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Calculated Metric Result</span>
                    <div className="text-2xl font-bold font-mono text-slate-900 mt-0.5">
                      {calculationResult.formatted}
                    </div>
                  </div>
                  <div className="max-w-md text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <strong className="text-slate-900">Diagnosis: </strong>
                    {calculationResult.note}
                  </div>
                </div>
              </div>

              {/* Examiner Guide & Interpretation Tips */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-2">
                <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Ideal Benchmark Target
                  </div>
                  <p className="mt-1 text-slate-600">{activeFormula.idealTarget}</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                    What Higher Means
                  </div>
                  <p className="mt-1 text-slate-600">{activeFormula.whatHigherMeans}</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1">
                    <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
                    What Lower Means
                  </div>
                  <p className="mt-1 text-slate-600">{activeFormula.whatLowerMeans}</p>
                </div>
              </div>

              {/* Examiner Gold Dust Tip */}
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Official Examiner Mark Scheme Guidance: </strong>
                  {activeFormula.examinerTip}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
