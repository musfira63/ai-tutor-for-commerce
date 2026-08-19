import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // ==========================================
  // 📘 ACCOUNTING QUESTIONS
  // ==========================================
  {
    id: 'q-acc-1',
    subject: 'accounting',
    moduleId: 'acc-standard-costing',
    type: 'calculation',
    question: 'A manufacturing firm budgeted to use 4,000 kg of plastic at £5.00/kg to produce 1,000 units. It actually used 4,300 kg purchased at £4.60/kg to produce the 1,000 units. What are the Material Price Variance (MPV) and Material Usage Variance (MUV)?',
    context: 'Standard Costing & Variance Analysis calculation in Paper 2.',
    options: [
      'MPV: £1,720 (F), MUV: £1,500 (A)',
      'MPV: £1,720 (A), MUV: £1,500 (F)',
      'MPV: £1,600 (F), MUV: £1,380 (A)',
      'MPV: £1,500 (F), MUV: £1,720 (A)'
    ],
    correctIndex: 0,
    explanation: 'Step 1: MPV = (Standard Price - Actual Price) × Actual Quantity = (£5.00 - £4.60) × 4,300 kg = £0.40 × 4,300 = £1,720 Favourable (F).\nStep 2: MUV = (Standard Qty for Actual Output - Actual Qty) × Standard Price = (4,000 kg - 4,300 kg) × £5.00 = -300 kg × £5.00 = £1,500 Adverse (A).',
    stepByStep: [
      'MPV = (SP - AP) × AQ = (£5.00 - £4.60) × 4,300 = +£1,720 (Favourable because bought cheaper)',
      'MUV = (SQ - AQ) × SP = (4,000 - 4,300) × £5.00 = -£1,500 (Adverse because excess 300kg wasted)',
      'Total Direct Material Variance = £1,720 (F) - £1,500 (A) = £220 (F favourable net)'
    ],
    markSchemePoints: [
      '1 mark for correct MPV formula and arithmetic (£1,720 F)',
      '1 mark for correct MUV formula using standard price (£1,500 A)',
      'Examiner Tip: Buying cheaper plastic generated a £1,720 price saving but resulted in £1,500 of scrap wastage.'
    ]
  },
  {
    id: 'q-acc-2',
    subject: 'accounting',
    moduleId: 'acc-financial-statements',
    type: 'calculation',
    question: 'A business has Current Assets of £360,000 including Inventory of £140,000 and Trade Receivables of £160,000. Its Current Liabilities are £200,000. What is its Acid Test (Quick Ratio)?',
    options: [
      '1.80 : 1',
      '1.10 : 1',
      '0.80 : 1',
      '2.25 : 1'
    ],
    correctIndex: 1,
    explanation: 'Acid Test Ratio = (Current Assets - Inventory) / Current Liabilities = (£360,000 - £140,000) / £200,000 = £220,000 / £200,000 = 1.10 : 1.',
    stepByStep: [
      'Liquid Assets = Current Assets (£360k) - Inventory (£140k) = £220,000',
      'Acid Test = £220,000 / £200,000 = 1.10 : 1'
    ],
    markSchemePoints: [
      '1 mark for subtracting inventories from current assets',
      '1 mark for dividing by current liabilities to express ratio as X : 1'
    ]
  },
  {
    id: 'q-acc-9706-gearing',
    subject: 'accounting',
    moduleId: 'acc-company-accounts',
    type: 'calculation',
    question: 'A public limited company has: Issued Ordinary Shares £500,000; Share Premium £100,000; Retained Earnings £200,000; 8% Debentures (repayable 2032) £400,000; Bank Overdraft £80,000. Calculate its Gearing Ratio using the Cambridge 9706 formula.',
    context: 'Capital structure and solvency evaluation for limited companies.',
    options: [
      '33.33%',
      '30.77%',
      '50.00%',
      '40.00%'
    ],
    correctIndex: 0,
    explanation: 'Cambridge 9706 Gearing formula = (Non-current liabilities / Total capital) × 100\nTotal Capital = Issued ordinary share capital + all reserves + non-current liabilities\nTotal Capital = £500k + £100k + £200k + £400k = £1,200,000.\nGearing = (£400,000 / £1,200,000) × 100 = 33.33%. (Note: Bank overdraft is a Current Liability and excluded).',
    stepByStep: [
      'Shareholders Equity = £500k (Shares) + £100k (Premium) + £200k (Retained) = £800,000',
      'Non-Current Liabilities = £400,000 (8% Debentures)',
      'Total Capital Employed = £800,000 + £400,000 = £1,200,000',
      'Gearing = (£400,000 / £1,200,000) × 100 = 33.33%'
    ],
    markSchemePoints: [
      '1 mark for calculating total capital employed (£1.2m)',
      '1 mark for excluding bank overdraft from capital employed',
      '1 mark for dividing non-current liabilities by total capital to get 33.33%'
    ]
  },
  {
    id: 'q-acc-9706-pup',
    subject: 'accounting',
    moduleId: 'acc-manufacturing-accounts',
    type: 'calculation',
    question: 'A manufacturing firm transfers manufactured goods to the trading warehouse at cost plus a 20% factory markup. On 31 December, closing finished goods inventory held is valued at £48,000 (at transfer price). What is the Provision for Unrealised Profit (PUP) to be deducted in the Statement of Financial Position?',
    context: 'Manufacturing account inventory valuation under IAS 2.',
    options: [
      '£8,000',
      '£9,600',
      '£40,000',
      '£6,000'
    ],
    correctIndex: 0,
    explanation: 'Because transfer price includes a 20% mark-up on cost, the transfer price represents 120% of cost.\nPUP = Closing Inventory × (Mark-up / (100 + Mark-up)) = £48,000 × (20 / 120) = £8,000.\nThe inventory is reported at actual manufacturing cost of £40,000 (£48k - £8k).',
    stepByStep: [
      'Transfer Price = Cost (100%) + Factory Markup (20%) = 120%',
      'Unrealised Profit = £48,000 × (20 / 120) = £8,000',
      'Cost Valuation on SOFP = £48,000 - £8,000 = £40,000'
    ],
    markSchemePoints: [
      '1 mark for recognizing that margin fraction is 20/120 (1/6)',
      '1 mark for calculating PUP of £8,000',
      'Examiner Tip: If you simply took 20% × £48,000 = £9,600, that is the most common error of confusing markup with margin!'
    ]
  },
  {
    id: 'q-acc-9706-wcc',
    subject: 'accounting',
    moduleId: 'acc-incomplete-records',
    type: 'calculation',
    question: 'A company reports: Trade Receivables turnover = 42 days, Inventory turnover = 58 days, Trade Payables turnover = 35 days. What is its Working Capital Cycle in days?',
    context: 'Working capital cycle analysis under Cambridge 9706 Section 3.5.',
    options: [
      '65 days',
      '135 days',
      '51 days',
      '23 days'
    ],
    correctIndex: 0,
    explanation: 'Cambridge 9706 Formula: Working capital cycle (days) = Trade receivables turnover (days) + Inventory turnover (days) - Trade payables turnover (days) = 42 + 58 - 35 = 65 days.',
    stepByStep: [
      'WCC = Receivables Days (42) + Inventory Days (58) - Payables Days (35)',
      'WCC = 100 - 35 = 65 days'
    ],
    markSchemePoints: [
      '1 mark for adding receivables and inventory days',
      '1 mark for subtracting payables days to arrive at 65 days'
    ]
  },

  // ==========================================
  // 🏢 BUSINESS QUESTIONS
  // ==========================================
  {
    id: 'q-bus-1',
    subject: 'business',
    moduleId: 'bus-decision-making',
    type: 'calculation',
    question: 'A retail chain evaluates two strategy options using a Decision Tree. Strategy A has an initial cost of £400,000. There is a 60% probability of High Demand (£900,000 payoff) and a 40% probability of Low Demand (£200,000 payoff). What is the Expected Monetary Value (EMV) and Net Gain for Strategy A?',
    context: 'Quantitative decision tree analysis.',
    options: [
      'EMV: £620,000 | Net Gain: £220,000',
      'EMV: £550,000 | Net Gain: £150,000',
      'EMV: £620,000 | Net Gain: £620,000',
      'EMV: £700,000 | Net Gain: £300,000'
    ],
    correctIndex: 0,
    explanation: 'EMV = (0.60 × £900,000) + (0.40 × £200,000) = £540,000 + £80,000 = £620,000.\nNet Gain = EMV (£620,000) - Initial Cost (£400,000) = £220,000.',
    stepByStep: [
      'Calculate branch 1: 0.60 × £900,000 = £540,000',
      'Calculate branch 2: 0.40 × £200,000 = £80,000',
      'Sum node EMV = £540,000 + £80,000 = £620,000',
      'Net Gain = £620,000 - £400,000 initial outlay = £220,000'
    ],
    markSchemePoints: [
      '1 mark for probability weighted calculation of EMV node (£620,000)',
      '1 mark for subtracting capital expenditure to obtain Net Gain (£220,000)'
    ]
  },
  {
    id: 'q-bus-2',
    subject: 'business',
    moduleId: 'bus-managing-change',
    type: 'calculation',
    question: 'In a Critical Path network, Activity C has an Earliest Start Time (EST) of Day 4, a Duration of 6 days, and a Latest Finish Time (LFT) of Day 14. What is the Total Float for Activity C?',
    options: [
      '4 Days',
      '0 Days (On Critical Path)',
      '10 Days',
      '2 Days'
    ],
    correctIndex: 0,
    explanation: 'Total Float = LFT - Duration - EST = 14 - 6 - 4 = 4 Days. This means Activity C can be delayed by up to 4 days without delaying the overall project finish time.',
    stepByStep: [
      'Total Float Formula = LFT - Duration - EST',
      'Total Float = 14 - 6 - 4 = 4 days'
    ],
    markSchemePoints: [
      '1 mark for correctly applying the float formula',
      'Examiner Tip: If Total Float is zero, the task lies on the Critical Path.'
    ]
  },

  // ==========================================
  // 📈 ECONOMICS QUESTIONS
  // ==========================================
  {
    id: 'q-econ-1',
    subject: 'economics',
    moduleId: 'econ-elasticities-consumer',
    type: 'calculation',
    question: 'A coffee chain increases the price of a cappuccino from £3.00 to £3.60 (+20%). As a result, weekly sales volume drops from 5,000 cups to 4,200 cups (-16%). Calculate the Price Elasticity of Demand (PED) and explain the effect on Total Revenue.',
    options: [
      'PED = -0.80 (Inelastic); Total Revenue increases from £15,000 to £15,120',
      'PED = -1.25 (Elastic); Total Revenue drops from £15,000 to £12,600',
      'PED = -0.80 (Inelastic); Total Revenue decreases from £15,000 to £14,200',
      'PED = -1.00 (Unitary); Total Revenue remains unchanged'
    ],
    correctIndex: 0,
    explanation: 'PED = % Change in Qty Demanded / % Change in Price = -16% / +20% = -0.80.\nSince |PED| < 1 (Price Inelastic), demand is inelastic. Total Revenue rises from (£3.00 × 5,000 = £15,000) to (£3.60 × 4,200 = £15,120), a net gain of £120.',
    stepByStep: [
      '% Change in Price = (£3.60 - £3.00)/£3.00 × 100 = +20%',
      '% Change in Qty = (4,200 - 5,000)/5,000 × 100 = -16%',
      'PED = -16% / +20% = -0.80',
      'Initial Revenue = 5,000 × £3 = £15,000; New Revenue = 4,200 × £3.60 = £15,120'
    ],
    markSchemePoints: [
      '1 mark for calculating PED coefficient of -0.80',
      '1 mark for correctly stating Total Revenue increases due to price inelasticity'
    ]
  },
  {
    id: 'q-econ-2',
    subject: 'economics',
    moduleId: 'econ-macro-model-ad-as',
    type: 'calculation',
    question: 'In an economy, the Marginal Propensity to Consume (MPC) is 0.80. The government injects £25 billion into high-speed clean transport infrastructure. What is the Keynesian Multiplier and the total ultimate increase in Real GDP?',
    options: [
      'Multiplier: 5.0x | Total Increase in GDP: £125 billion',
      'Multiplier: 1.25x | Total Increase in GDP: £31.25 billion',
      'Multiplier: 4.0x | Total Increase in GDP: £100 billion',
      'Multiplier: 2.5x | Total Increase in GDP: £62.5 billion'
    ],
    correctIndex: 0,
    explanation: 'Multiplier (k) = 1 / (1 - MPC) = 1 / (1 - 0.80) = 1 / 0.20 = 5.0x.\nTotal Change in GDP = Initial Injection (£25bn) × Multiplier (5.0) = £125 billion.',
    stepByStep: [
      'k = 1 / (1 - 0.80) = 1 / 0.20 = 5.0x',
      'Change in Real GDP = £25bn × 5.0 = £125 billion'
    ],
    markSchemePoints: [
      '1 mark for calculating multiplier k = 5',
      '1 mark for total expansion of national income = £125bn'
    ]
  }
];
