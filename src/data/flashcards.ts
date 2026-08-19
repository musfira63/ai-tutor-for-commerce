import { Flashcard } from '../types';

export const initialFlashcards: Flashcard[] = [
  // ==========================================
  // 📘 ACCOUNTING FLASHCARDS
  // ==========================================
  {
    id: 'fc-acc-1',
    subject: 'accounting',
    moduleId: 'acc-double-entry',
    category: 'Bookkeeping & Ledgers',
    question: 'State the Duality Rule for Drawings, Assets, Expenses, and Liabilities.',
    answer: 'Debit entries increase Expenses, Assets, and Drawings (DEAD).\nCredit entries increase Liabilities, Income, and Capital (CLIC).',
    difficulty: 'easy'
  },
  {
    id: 'fc-acc-2',
    subject: 'accounting',
    moduleId: 'acc-double-entry',
    category: 'Error Correction',
    question: 'Explain the difference between an Error of Commission and an Error of Principle.',
    answer: '• Error of Commission: Transaction is posted to the correct category of account but the WRONG personal account (e.g. debited to J. Smith instead of A. Smith).\n• Error of Principle: Transaction violates fundamental accounting rules by posting to the WRONG class of account (e.g. debited a vehicle repair revenue expense to the Motor Vehicles capital asset account).',
    difficulty: 'medium'
  },
  {
    id: 'fc-acc-3',
    subject: 'accounting',
    moduleId: 'acc-financial-statements',
    category: 'Accruals & Prepayments',
    question: 'How is an accrued expense classified in the Statement of Financial Position?',
    answer: 'An accrued expense is classified as a CURRENT LIABILITY because it represents an expense incurred during the period that remains unpaid at the year-end balance sheet date.',
    difficulty: 'easy'
  },
  {
    id: 'fc-acc-4',
    subject: 'accounting',
    moduleId: 'acc-standard-costing',
    category: 'Variance Analysis',
    question: 'What is the formula for Direct Material Price Variance?',
    answer: '(Standard Price per unit - Actual Price paid per unit) × Actual Quantity of Materials Purchased.\nIf Standard > Actual = Favourable (F); if Actual > Standard = Adverse (A).',
    formula: 'MPV = (SP - AP) × AQ',
    difficulty: 'medium'
  },
  {
    id: 'fc-acc-5',
    subject: 'accounting',
    moduleId: 'acc-marginal-costing',
    category: 'Marginal Costing',
    question: 'What is the decision rule for allocating scarce resources in limiting factor analysis?',
    answer: 'Rank products based on the Contribution per Unit of Limiting Factor (Unit Contribution / Amount of scarce resource required per unit) from highest to lowest, and produce to meet maximum market demand in that order.',
    difficulty: 'hard'
  },
  {
    id: 'fc-acc-6',
    subject: 'accounting',
    moduleId: 'acc-company-accounts',
    category: 'Share Capital & Reserves',
    question: 'Can Share Premium or Revaluation Reserves be distributed as cash dividends?',
    answer: 'NO. Share Premium and Revaluation Reserves are CAPITAL RESERVES created from non-trading capital transactions. Statutory capital maintenance rules prohibit them from being distributed as cash dividends. Only REVENUE RESERVES (Retained Earnings) are distributable.',
    difficulty: 'hard'
  },
  {
    id: 'fc-acc-depr-1',
    subject: 'accounting',
    moduleId: 'acc-financial-statements',
    category: 'Depreciation & Disposals',
    question: 'Distinguish between the "Depreciation Expense" and the "Provision for Depreciation" account.',
    answer: '• Depreciation Expense is a nominal expense account appearing in the Income Statement representing the cost allocation for the single current accounting year.\n• Provision for Depreciation is a contra-asset account on the Statement of Financial Position accumulating the total historical depreciation charges from all past years up to date, deducted from historical cost to yield Net Book Value (Carrying Amount).',
    difficulty: 'medium'
  },
  {
    id: 'fc-acc-depr-2',
    subject: 'accounting',
    moduleId: 'acc-financial-statements',
    category: 'Asset Disposal Protocol',
    question: 'State the 4-step ledger entries required to record the disposal of a non-current asset for cash.',
    answer: '1. Transfer Cost: Debit Disposal A/c, Credit Asset at Cost A/c (removes original cost).\n2. Transfer Accumulated Depreciation: Debit Provision for Depreciation A/c, Credit Disposal A/c (removes accumulated depr).\n3. Record Proceeds: Debit Bank A/c, Credit Disposal A/c (records cash received).\n4. Transfer Balancing Figure: If Profit -> Debit Disposal A/c, Credit Income Statement (Other Income). If Loss -> Debit Income Statement (Operating Expense), Credit Disposal A/c.',
    difficulty: 'hard'
  },
  {
    id: 'fc-acc-depr-3',
    subject: 'accounting',
    moduleId: 'acc-financial-statements',
    category: 'Accounting Principles',
    question: 'Which accounting concepts mandate charging depreciation on non-current assets?',
    answer: '1. Accruals (Matching) Concept: Spreads the asset capital cost over the accounting periods that benefit from revenue generation.\n2. Prudence Concept: Prevents overstatement of asset values (Net Book Value) and overstatement of annual net profit.\n3. Going Concern Concept: Justifies carrying assets at amortised historical cost rather than immediate forced liquidation breakup value.',
    difficulty: 'medium'
  },
  {
    id: 'fc-acc-9706-part1890',
    subject: 'accounting',
    moduleId: 'acc-partnerships',
    category: 'Partnership Act 1890',
    question: 'Under the UK Partnership Act 1890, what are the statutory default rules if no partnership agreement exists?',
    answer: '1. Profits and losses are shared EQUALLY among all partners.\n2. NO partner salaries are allowed.\n3. NO interest is allowed on capital.\n4. NO interest is charged on drawings.\n5. Interest on partner loans to the firm is fixed at 5% per annum.',
    difficulty: 'medium'
  },
  {
    id: 'fc-acc-9706-bonus-issue',
    subject: 'accounting',
    moduleId: 'acc-company-accounts',
    category: 'Bonus Issue Regulations',
    question: 'Which reserves may be used for a bonus issue of shares under Cambridge 9706, and which reserve is strictly PROHIBITED?',
    answer: '• Allowed: Share Premium, Retained Earnings, General Reserve (best practice is to use non-distributable Share Premium first to preserve distributable retained earnings for cash dividends).\n• PROHIBITED: Under the Cambridge 9706 syllabus, the Revaluation Reserve is NOT to be used for a bonus issue of shares.',
    difficulty: 'hard'
  },
  {
    id: 'fc-acc-9706-mfg-pup',
    subject: 'accounting',
    moduleId: 'acc-manufacturing-accounts',
    category: 'Manufacturing Accounts',
    question: 'Why and how is a Provision for Unrealised Profit (PUP) created in a manufacturing business?',
    answer: 'When finished goods are transferred from factory to trading at cost plus factory profit, any unsold closing inventory contains unrealised internal profit. To comply with IAS 2 (Inventories) and the Realisation Concept, closing inventory on the Statement of Financial Position must be reduced by the PUP to reflect its true manufacturing cost.',
    difficulty: 'hard'
  },
  {
    id: 'fc-acc-9706-ias-standards',
    subject: 'accounting',
    moduleId: 'acc-ethics-standards',
    category: 'International Accounting Standards',
    question: 'State the core requirement of IAS 2 (Inventories) and IAS 10 (Events after the Reporting Period).',
    answer: '• IAS 2: Inventories must be valued at the lower of historical cost and Net Realisable Value (NRV = Estimated selling price - completion/selling costs).\n• IAS 10: Events occurring between balance sheet date and authorization date are split into: Adjusting Events (evidence of conditions existing at reporting date -> adjust accounts) vs Non-Adjusting Events (conditions arising after date e.g. post-year-end fire/dividend proposals -> disclose in notes only).',
    difficulty: 'medium'
  },
  {
    id: 'fc-acc-9706-ethics',
    subject: 'accounting',
    moduleId: 'acc-ethics-standards',
    category: 'IESBA Professional Ethics',
    question: 'List the 5 fundamental ethical principles that govern professional accountants.',
    answer: '1. Integrity (straightforward, honest, truthful).\n2. Objectivity (unbiased, free from conflicts of interest).\n3. Professional Competence and Due Care (maintaining requisite skills, diligence).\n4. Confidentiality (protecting non-public proprietary client/business data).\n5. Professional Behaviour (compliance with laws and avoiding actions discrediting the profession).',
    difficulty: 'easy'
  },
  {
    id: 'fc-acc-9706-abc',
    subject: 'accounting',
    moduleId: 'acc-budgeting-investment-abc',
    category: 'Activity Based Costing',
    question: 'Explain why Activity Based Costing (ABC) provides more accurate product costs than traditional absorption costing.',
    answer: 'Traditional costing uses a single volume-based driver (e.g. direct labour hours) to absorb overheads, which over-costs simple high-volume products and under-costs complex low-volume customized products. ABC allocates overheads to specific activity cost pools (e.g. machine setups, quality inspections) and uses causal cost drivers, eliminating product cross-subsidisation.',
    difficulty: 'hard'
  },
  {
    id: 'fc-acc-9706-arr',
    subject: 'accounting',
    moduleId: 'acc-budgeting-investment-abc',
    category: 'Investment Appraisal',
    question: 'State the exact Cambridge 9706 formula for Accounting Rate of Return (ARR).',
    answer: 'ARR (%) = (Average Annual Accounting Profit / Average Investment) × 100\nWhere: Average Annual Profit = Total Net Profit over project life / Project life (years)\nAverage Investment = Initial Capital Outlay / 2 (per Cambridge syllabus, project residual scrap value is not tested).',
    difficulty: 'medium'
  },

  // ==========================================
  // 🏢 BUSINESS STUDIES FLASHCARDS
  // ==========================================
  {
    id: 'fc-bus-1',
    subject: 'business',
    moduleId: 'bus-marketing-strategy',
    category: 'Boston Matrix',
    question: 'What are the 4 quadrants of the Boston Matrix, and what strategy applies to Cash Cows?',
    answer: '1. Stars (High Growth, High Share)\n2. Cash Cows (Low Growth, High Share)\n3. Question Marks / Problem Children (High Growth, Low Share)\n4. Dogs (Low Growth, Low Share)\nStrategy for Cash Cows: "Milk" their steady cash inflows to finance R&D and promotion for Question Marks and Stars; do not reinvest heavy capital in low-growth markets.',
    difficulty: 'easy'
  },
  {
    id: 'fc-bus-2',
    subject: 'business',
    moduleId: 'bus-hrm-motivation',
    category: 'Motivation Theory',
    question: 'According to Herzberg, what happens if hygiene factors are provided vs motivators?',
    answer: '• Hygiene factors (fair wages, safe working conditions, company policy) prevent job dissatisfaction, but do NOT actively motivate workers.\n• Motivators (achievement, recognition, meaningful work, responsibility, promotion) actively inspire higher productivity and job satisfaction.',
    difficulty: 'medium'
  },
  {
    id: 'fc-bus-3',
    subject: 'business',
    moduleId: 'bus-strategic-direction',
    category: 'Ansoff Matrix',
    question: 'Which Ansoff Matrix strategy carries the highest risk, and why?',
    answer: 'DIVERSIFICATION (launching new products into new markets). It carries the highest risk because the business enters an unfamiliar market environment where it lacks established brand reputation, customer relationships, and operational expertise.',
    difficulty: 'medium'
  },
  {
    id: 'fc-bus-4',
    subject: 'business',
    moduleId: 'bus-operations-lean',
    category: 'Operations Management',
    question: 'Why is operating at 100% capacity utilisation potentially dangerous for a firm?',
    answer: '1. Machinery experiences excessive wear-and-tear without scheduled downtime for maintenance.\n2. Staff suffer fatigue, stress, and higher absenteeism.\n3. The firm has zero flexibility to accept lucrative rush orders or absorb sudden equipment breakdowns.',
    difficulty: 'medium'
  },
  {
    id: 'fc-bus-5',
    subject: 'business',
    moduleId: 'bus-managing-change',
    category: 'Critical Path Analysis',
    question: 'Define the Critical Path and state how Total Float is calculated.',
    answer: 'The Critical Path is the sequence of dependent activities in a network diagram that determines the shortest possible time to complete the overall project. Every activity on it has ZERO float.\nTotal Float = Latest Finish Time (LFT) - Duration - Earliest Start Time (EST).',
    formula: 'Total Float = LFT - Duration - EST',
    difficulty: 'hard'
  },

  // ==========================================
  // 📈 ECONOMICS FLASHCARDS
  // ==========================================
  {
    id: 'fc-econ-1',
    subject: 'economics',
    moduleId: 'econ-elasticities-consumer',
    category: 'Microeconomics Elasticities',
    question: 'What is the relationship between PED and Total Revenue when demand is price inelastic?',
    answer: 'When demand is Price Inelastic (|PED| < 1), a price increase leads to a proportionately smaller percentage drop in quantity demanded. Therefore, TOTAL REVENUE RISES when price increases.',
    difficulty: 'medium'
  },
  {
    id: 'fc-econ-2',
    subject: 'economics',
    moduleId: 'econ-market-failure-externalities',
    category: 'Market Failure',
    question: 'What are the two defining characteristics of a Pure Public Good?',
    answer: '1. Non-Excludability: Once provided, non-payers cannot be prevented from benefiting (leading to the Free-Rider Problem).\n2. Non-Rivalry: Consumption by one individual does not diminish the quantity or quality available to another (Marginal Cost of an extra consumer = £0).',
    difficulty: 'easy'
  },
  {
    id: 'fc-econ-3',
    subject: 'economics',
    moduleId: 'econ-costs-market-structures',
    category: 'Theory of the Firm',
    question: 'State the conditions for Allocative Efficiency and Productive Efficiency.',
    answer: '• Allocative Efficiency occurs where Price = Marginal Cost (P = MC), meaning societal welfare is maximized.\n• Productive Efficiency occurs at the minimum point of the Average Total Cost curve (ATC min), where output is produced at the lowest possible unit cost.',
    difficulty: 'medium'
  },
  {
    id: 'fc-econ-4',
    subject: 'economics',
    moduleId: 'econ-macro-model-ad-as',
    category: 'Macroeconomics Multiplier',
    question: 'How is the Keynesian National Income Multiplier calculated in an open economy?',
    answer: 'Multiplier (k) = 1 / (1 - MPC) = 1 / MPW, where Marginal Propensity to Withdraw (MPW) = MPS (Savings) + MPT (Taxes) + MPM (Imports).',
    formula: 'k = 1 / (MPS + MPT + MPM)',
    difficulty: 'hard'
  },
  {
    id: 'fc-econ-5',
    subject: 'economics',
    moduleId: 'econ-trade-global-markets',
    category: 'International Trade',
    question: 'Explain the Marshall-Lerner Condition and the J-Curve effect.',
    answer: '• The Marshall-Lerner Condition states that a currency depreciation will improve the current account deficit only if |PEDx + PEDm| > 1.\n• The J-Curve effect shows that in the short run, trade balances initially deteriorate (deficit deepens) because import contracts are fixed and demand is inelastic, before export volumes expand in the long run.',
    difficulty: 'hard'
  }
];
