export type SubjectType = 'all' | 'accounting' | 'business' | 'economics';

export type ModuleId =
  // Accounting Modules
  | 'acc-double-entry'
  | 'acc-financial-statements'
  | 'acc-incomplete-records'
  | 'acc-partnerships'
  | 'acc-company-accounts'
  | 'acc-marginal-costing'
  | 'acc-standard-costing'
  | 'acc-ethics-standards'
  | 'acc-manufacturing-accounts'
  | 'acc-clubs-societies'
  | 'acc-business-mergers'
  | 'acc-budgeting-investment-abc'
  // Business Modules
  | 'bus-decision-making'
  | 'bus-marketing-strategy'
  | 'bus-operations-lean'
  | 'bus-hrm-motivation'
  | 'bus-finance-sources'
  | 'bus-strategic-position'
  | 'bus-strategic-direction'
  | 'bus-managing-change'
  // Economics Modules
  | 'econ-scarcity-price-mechanism'
  | 'econ-elasticities-consumer'
  | 'econ-market-failure-externalities'
  | 'econ-costs-market-structures'
  | 'econ-macro-model-ad-as'
  | 'econ-macro-objectives'
  | 'econ-macro-policy'
  | 'econ-trade-global-markets';

export interface KeyConcept {
  term: string;
  definition: string;
  importance: string;
  examinerTip?: string;
}

export interface AdvantageDisadvantage {
  point: string;
  analysis: string;
  evaluation: string;
}

export interface SubTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  workedExample?: {
    scenario: string;
    calculation: string;
    answer: string;
    explanation: string;
  };
  prosAndCons?: {
    advantages: AdvantageDisadvantage[];
    disadvantages: AdvantageDisadvantage[];
  };
  examinerTrap?: string;
  evaluationTips?: string[];
}

export interface SyllabusModule {
  id: ModuleId;
  subject: SubjectType;
  code: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'Foundation' | 'Core' | 'Advanced' | 'Synoptic';
  overview: string;
  examWeight: string;
  keyConcepts: KeyConcept[];
  subTopics: SubTopic[];
  synopticLinks: string[];
}

export interface FormulaItem {
  id: string;
  subject: SubjectType;
  name: string;
  category: 
    | 'Financial Accounting'
    | 'Management Accounting & Costing'
    | 'Business Operations & Workforce'
    | 'Business Strategy & Finance'
    | 'Microeconomics & Elasticities'
    | 'Macroeconomics & International';
  formula: string;
  symbolicFormula?: string;
  unit: string;
  explanation: string;
  idealTarget: string;
  whatHigherMeans: string;
  whatLowerMeans: string;
  examinerTip: string;
  inputs: {
    key: string;
    label: string;
    defaultValue: number;
    prefix?: string;
    suffix?: string;
  }[];
  calculate: (inputs: Record<string, number>) => { 
    result: number; 
    formatted: string; 
    status: 'good' | 'warning' | 'neutral' | 'poor'; 
    note: string 
  };
}

export interface Flashcard {
  id: string;
  subject: SubjectType;
  moduleId: string;
  category: string;
  question: string;
  answer: string;
  explanation?: string;
  formula?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
  id: string;
  subject: SubjectType;
  moduleId: string;
  type: 'multiple-choice' | 'calculation';
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  stepByStep?: string[];
  markSchemePoints?: string[];
}

export interface CaseStudyQuestion {
  id: string;
  marks: number;
  commandWord: 'State' | 'Calculate' | 'Explain' | 'Analyse' | 'Evaluate' | 'Recommend';
  question: string;
  guidance: string;
  modelAnswerGradeC: string;
  modelAnswerGradeAStar: string;
  examinerCommentary: string;
  markingCriteria: {
    ao1_knowledge: string;
    ao2_application: string;
    ao3_analysis: string;
    ao4_evaluation: string;
  };
}

export interface CaseStudy {
  id: string;
  subject: SubjectType;
  title: string;
  company: string;
  industry: string;
  context: string;
  financialData: {
    metric: string;
    year1: string;
    year2: string;
    year3?: string;
  }[];
  qualitativeFactors: string[];
  questions: CaseStudyQuestion[];
}

export interface CriticalEvaluationScenario {
  id: string;
  subject: SubjectType;
  title: string;
  companyOrTopic: string;
  scenario: string;
  apparentBenefit: string;
  realUnderlyingTruth: string;
  techniqueOrPhenomenon: string;
  howToDetectOrEvaluate: string;
  stakeholderOrEconomicImpact: string;
}
