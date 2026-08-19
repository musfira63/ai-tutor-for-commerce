import React, { useState } from 'react';
import { quizQuestions } from '../data/quizzes';
import { QuizQuestion, SubjectType } from '../types';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles,
  BookOpen,
  Calculator,
  Landmark,
  Briefcase,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface QuizViewProps {
  selectedSubject?: SubjectType;
}

export const QuizView: React.FC<QuizViewProps> = ({ selectedSubject: initialSubject = 'all' }) => {
  const [subjectFilter, setSubjectFilter] = useState<SubjectType>(initialSubject);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const questions = quizQuestions.filter(
    (q) => subjectFilter === 'all' || q.subject === subjectFilter
  );

  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
    setShowExplanation((prev) => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / (questions.length || 1)) * 100);

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setIsQuizSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                Exam Mode Practice & Calculations
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {questions.length} Scenario Questions
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              A-Level Calculation & Multiple Choice Exam Bank
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Step-by-step arithmetic workings and official mark schemes across Accounting, Business, and Economics.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs self-start sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Quiz</span>
          </button>
        </div>

        {/* Subject Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
          <button
            onClick={() => {
              setSubjectFilter('all');
              handleReset();
            }}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Questions ({quizQuestions.length})
          </button>
          <button
            onClick={() => {
              setSubjectFilter('accounting');
              handleReset();
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'accounting' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Landmark className="h-3 w-3" />
            <span>Accounting</span>
          </button>
          <button
            onClick={() => {
              setSubjectFilter('business');
              handleReset();
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'business' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Briefcase className="h-3 w-3" />
            <span>Business</span>
          </button>
          <button
            onClick={() => {
              setSubjectFilter('economics');
              handleReset();
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition ${
              subjectFilter === 'economics' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <TrendingUp className="h-3 w-3" />
            <span>Economics</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      {currentQ ? (
        <div className="space-y-6">
          {/* Question Index Navigator */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-bold uppercase text-slate-700">
              {currentQ.subject}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            {currentQ.context && (
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
                <strong>Context: </strong>{currentQ.context}
              </div>
            )}

            <h3 className="text-base font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isAnswered = selectedAnswers[currentQ.id] !== undefined;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyle = 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800';
                if (isAnswered) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-xs transition ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isSelected 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswered && (
                      <div>
                        {isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-600" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Step-by-Step Mark Scheme Breakdown */}
            {showExplanation[currentQ.id] && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-5 space-y-4 text-xs">
                <div className="flex items-center gap-2 font-bold text-blue-950 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  Official Mark Scheme & Step-by-Step Working
                </div>

                <div className="text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                  {currentQ.explanation}
                </div>

                {currentQ.stepByStep && (
                  <div className="space-y-1.5 pt-2 border-t border-blue-200/80">
                    <div className="font-bold text-blue-900">Step-by-Step Math:</div>
                    {currentQ.stepByStep.map((step, sIdx) => (
                      <div key={sIdx} className="font-mono text-slate-700 bg-white/80 p-2 rounded border border-blue-100">
                        {step}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50 hover:bg-slate-50 transition"
            >
              ← Previous
            </button>

            <span className="text-xs text-slate-500 font-medium">
              Score: <strong>{score}</strong> / {questions.length}
            </span>

            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50 hover:bg-slate-50 transition"
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          No questions available for this filter.
        </div>
      )}
    </div>
  );
};
