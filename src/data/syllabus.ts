import { SyllabusModule } from '../types';

export const syllabusModules: SyllabusModule[] = [
  // ==========================================
  // 📘 ACCOUNTING CURRICULUM (8 High-Yield Modules)
  // ==========================================
  {
    id: 'acc-double-entry',
    subject: 'accounting',
    code: 'ACC-01',
    title: 'Double-Entry Bookkeeping & Trial Balance',
    subtitle: 'Ledger Accounts, Duality Principle & Error Correction (Suspense Accounts)',
    duration: '6-8 Weeks',
    difficulty: 'Foundation',
    overview: 'Double-entry bookkeeping is the universal framework of financial record-keeping founded on the duality concept (Assets = Liabilities + Equity). This module covers ledger postings, trial balance extraction, and the identification/correction of the 6 errors that do not affect the trial balance.',
    examWeight: '15-20% of Accounting Paper 1',
    synopticLinks: ['Financial Statements', 'Control Accounts', 'Incomplete Records'],
    keyConcepts: [
      {
        term: 'The Duality Principle (DEAD CLIC)',
        definition: 'Every financial transaction has an equal and opposite impact. Debit increases Expenses, Assets, and Drawings (DEAD). Credit increases Liabilities, Income, and Capital (CLIC).',
        importance: 'Forms the mathematical foundation of all balance sheets and ledger integrity.',
        examinerTip: 'Remember that Drawings reduce Capital and are therefore entered as a Debit entry in the Drawings account, closed to the Capital account at year-end.'
      },
      {
        term: 'Errors Not Affecting Trial Balance',
        definition: 'Errors where debits and credits still equal: Omission, Commission (wrong personal account), Principle (wrong class e.g. motor vehicle repair debited to asset), Original Entry, Reversal of entries, and Compensating errors.',
        importance: 'Crucial for correcting entries via the Journal and Suspense Account in exams.',
        examinerTip: 'An Error of Principle (e.g. classifying revenue expenditure as capital expenditure) directly distorts both the Income Statement profit and the Balance Sheet asset valuation!'
      }
    ],
    subTopics: [
      {
        id: 'acc-ledger-rules',
        title: 'Ledger Postings & General Journal Rules',
        summary: 'Applying debit and credit rules systematically to Asset, Liability, Expense, and Revenue accounts.',
        keyPoints: [
          'Asset Account: Debit to record additions (purchases), Credit to record disposals or write-offs.',
          'Liability Account: Credit to record new debts/payables, Debit to record repayments.',
          'Trade Receivables Ledger Control (Sales Ledger) records total credit sales, receipts from debtors, bad debts, and discounts allowed.',
          'Trade Payables Ledger Control (Purchases Ledger) records credit purchases, payments to suppliers, returns outwards, and discounts received.'
        ],
        tableData: {
          headers: ['Account Classification', 'Debit Entry (+) / (-)', 'Credit Entry (+) / (-)'],
          rows: [
            ['Assets (Equipment, Bank, Debtors)', 'Increase (+)', 'Decrease (-)'],
            ['Liabilities (Loans, Creditors, Overdraft)', 'Decrease (-)', 'Increase (+)'],
            ['Capital / Equity', 'Decrease (-) [e.g. Drawings, Losses]', 'Increase (+) [e.g. Injections, Net Profit]'],
            ['Expenses (Rent, Wages, Depreciation)', 'Increase (+)', 'Decrease (-) [Transferred to P&L]'],
            ['Revenue (Sales, Interest Received)', 'Decrease (-)', 'Increase (+)']
          ]
        },
        workedExample: {
          scenario: 'Purchased a delivery van for £18,000 paid by bank, and paid £1,200 for annual motor insurance using credit card.',
          calculation: 'Entry 1: Debit Van (Non-Current Asset) £18,000; Credit Bank (Current Asset) £18,000.\nEntry 2: Debit Insurance Expense £1,200; Credit Other Payables (Current Liability) £1,200.',
          answer: 'Trial balance remains balanced at £19,200.',
          explanation: 'Capital expenditure increases non-current assets; revenue expenditure is charged as an operating expense.'
        },
        examinerTrap: 'Students frequently confuse Error of Commission (posting to wrong debtor J. Smith instead of A. Smith) with Error of Principle (posting vehicle fuel to Motor Vehicles account).'
      }
    ]
  },
  {
    id: 'acc-financial-statements',
    subject: 'accounting',
    code: 'ACC-02',
    title: 'Financial Statements & Year-End Adjustments',
    subtitle: 'Income Statement, Statement of Financial Position, Accruals, Prepayments & Depreciation',
    duration: '8-10 Weeks',
    difficulty: 'Core',
    overview: 'Preparation of the Statement of Profit or Loss and Statement of Financial Position for sole traders and businesses, incorporating accruals, prepayments, allowance for doubtful debts, and straight-line vs reducing-balance depreciation.',
    examWeight: '25-30% of Paper 1 & 2',
    synopticLinks: ['Ratio Analysis', 'Window Dressing', 'Working Capital'],
    keyConcepts: [
      {
        term: 'Accruals & Prepayments Concept (Matching)',
        definition: 'Expenses and revenues must be matched to the accounting period in which they are incurred or earned, regardless of when cash changes hands.',
        importance: 'Prevents distorted profit figures and gives a true and fair view.',
        examinerTip: 'Accrued expense is a Current Liability (owed); Prepaid expense is a Current Asset (service paid for in advance).'
      },
      {
        term: 'Allowance for Doubtful Debts',
        definition: 'A contra-asset account representing the estimated portion of trade receivables that will not be recovered.',
        importance: 'Complies with the Prudence concept to ensure assets and profits are not overstated.',
        examinerTip: 'Only the INCREMENTAL change in the allowance is charged or credited to the Income Statement; the total cumulative allowance is deducted from Trade Receivables in the Balance Sheet.'
      },
      {
        term: 'Provision for Depreciation (Accumulated Depreciation)',
        definition: 'A contra-asset account on the Statement of Financial Position accumulating the total historical depreciation charges of a non-current asset to reflect its consumed economic benefits over time without altering the historical cost account.',
        importance: 'Satisfies the Accruals (Matching) principle by spreading asset cost against revenues generated, and the Prudence concept by ensuring assets are not carried above their recoverable carrying amount (Net Book Value).',
        examinerTip: 'Depreciation is an internal non-cash accounting allocation of cost, NOT a cash fund set aside for replacement!'
      },
      {
        term: 'Disposal of Non-Current Asset Account',
        definition: 'A temporary clearing ledger account opened when a tangible asset is sold, scrapped, or part-exchanged to calculate the resulting Profit or Loss on Disposal.',
        importance: 'Allows the complete removal of the asset’s original cost and cumulative accumulated depreciation from the ongoing accounting ledgers.',
        examinerTip: 'Profit on Disposal is a credit balance transferred to Income Statement (Other Income); Loss on Disposal is a debit balance transferred as an Operating Expense.'
      }
    ],
    subTopics: [
      {
        id: 'acc-depreciation-methods',
        title: 'Provision for Depreciation: Principles, Causes & Methods',
        summary: 'Systematic allocation of the depreciable amount of tangible non-current assets over estimated useful economic life.',
        keyPoints: [
          'Causes of Depreciation: 1. Physical wear and tear from active operational usage; 2. Depletion/wasting (mines, quarries); 3. Economic obsolescence from technological advancements or market shifts; 4. Passage of time/effluxion (leases, patents); 5. Inadequacy due to business growth.',
          'Straight Line (Fixed Instalment): (Cost - Estimated Residual Value) / Useful Life in Years. Best for assets delivering constant output across time (buildings, office furniture, fixtures).',
          'Reducing Balance (Diminishing Value): Net Book Value (Carrying Amount) × Fixed Rate %. Best for assets with high early depreciation and rising maintenance costs (motor vehicles, computers, plant machinery).',
          'Revaluation Method: (Opening Value + Additions) - Closing Value. Best for high-volume, low-value items that cannot be individually tracked (loose tools, livestock, crates, laboratory glassware).',
          'Units of Output Method: ((Cost - Residual Value) / Total Lifetime Output Units) × Units Produced in Year.'
        ],
        tableData: {
          headers: ['Method', 'Calculation Formula', 'Best Suited For', 'Annual P&L Impact'],
          rows: [
            ['Straight-Line Method', '(Cost - Residual Value) / Useful Life (Years)', 'Buildings, Fixtures & Fittings, Office Furniture', 'Equal, constant charge every year'],
            ['Reducing Balance Method', 'Net Book Value at start of year × Rate %', 'Motor Vehicles, IT Equipment, High-Speed Machinery', 'High charge in Year 1, decreasing each subsequent year'],
            ['Revaluation Method', 'Opening Valuation + Additions - Closing Valuation', 'Small Loose Tools, Bar Glassware, Factory Crates', 'Flexible charge reflecting physical counts & loss'],
            ['Units of Output', '[(Cost - Salvage) / Total Units] × Units This Year', 'Commercial Aircraft (flight hours), Heavy Mining Trucks', 'Directly variable with production volume']
          ]
        },
        workedExample: {
          scenario: 'A company buys a fleet van on 1 Jan Year 1 for £40,000. Useful life = 4 years; estimated scrap salvage value = £4,000. Compare Year 1 & Year 2 under (a) Straight Line vs (b) Reducing Balance at 40%.',
          calculation: '(a) Straight Line: Annual charge = (£40,000 - £4,000) / 4 = £9,000/year.\n- Year 1: Depr = £9,000; Closing NBV = £31,000.\n- Year 2: Depr = £9,000; Closing NBV = £22,000 (Accumulated Depr = £18,000).\n\n(b) Reducing Balance (40%):\n- Year 1: Depr = £40,000 * 40% = £16,000; Closing NBV = £24,000.\n- Year 2: Depr = £24,000 * 40% = £9,600; Closing NBV = £14,400 (Accumulated Depr = £25,600).',
          answer: 'Straight-line provides smooth costs (£9k vs £9k); Reducing balance charges heavy early depreciation (£16k in Y1 vs £9.6k in Y2).',
          explanation: 'Reducing balance matches high depreciation when repair costs are low, creating a stable total cost of ownership (Depreciation + Maintenance).'
        },
        examinerTrap: 'Never deduct residual salvage value when calculating reducing balance depreciation! Residual value is ONLY deducted in straight-line calculation.'
      },
      {
        id: 'acc-depreciation-ledger-accounting',
        title: 'Double-Entry Ledger Bookkeeping for Depreciation & Year-End Adjustments',
        summary: 'The separation of Non-Current Asset Cost Accounts and Provision for Depreciation Contra-Asset Accounts.',
        keyPoints: [
          'Asset Account remains recorded at historical cost (Gross Book Value) until disposal or revaluation.',
          'Annual Depreciation Journal Entry: Debit Income Statement (Depreciation Expense); Credit Provision for Depreciation Account (Contra-Asset).',
          'Provision for Depreciation account carries a CREDIT balance and accumulates total historical depreciation.',
          'Balance Sheet Presentation: Non-Current Asset Cost MINUS Provision for Depreciation = Net Book Value (Carrying Amount).'
        ],
        tableData: {
          headers: ['Transaction', 'Debit Entry (Dr)', 'Credit Entry (Cr)', 'Financial Statement Impact'],
          rows: [
            ['Purchase of Non-Current Asset', 'Asset at Cost Account (e.g. Machinery)', 'Bank / Trade Payables / Loan', 'Increases Non-Current Assets; Decreases Bank / Increases Liability'],
            ['Annual Depreciation Year-End Adjustment', 'Income Statement (Operating Expense)', 'Provision for Depreciation Account', 'Reduces Net Profit; Increases Accumulated Depreciation (reduces Net Assets)'],
            ['Closing Balance on Provision Account', 'Balance c/d (at year end)', 'Balance b/d (brought down on credit side)', 'Cumulative balance deducted from Cost on Balance Sheet']
          ]
        },
        workedExample: {
          scenario: 'Purchased delivery equipment for £60,000 on 1 Jan 2024. Depreciated at 20% straight line with zero residual value for 2 years.',
          calculation: '2024 Dec 31: Dr Income Statement £12,000 | Cr Provision for Depreciation £12,000.\n2025 Dec 31: Dr Income Statement £12,000 | Cr Provision for Depreciation £12,000.\nProvision for Depreciation Balance b/d on 1 Jan 2026 = £24,000 (Cr).',
          answer: 'Equipment Cost Account = £60,000 (Dr). Provision Account = £24,000 (Cr). Carrying Value on Balance Sheet = £36,000.',
          explanation: 'Preserves the historical cost principle while properly matching economic wear and tear.'
        },
        examinerTrap: 'Students often incorrectly credit the Non-Current Asset account directly instead of crediting the Provision for Depreciation account. Crediting the asset account directly destroys the historical cost audit trail!'
      },
      {
        id: 'acc-asset-disposal-protocol',
        title: 'Disposal of Non-Current Assets & Part-Exchange (The 4-Step Protocol)',
        summary: 'Complete double-entry accounting for the sale, trade-in, scrapping, or write-off of non-current assets.',
        keyPoints: [
          'Step 1 (Remove Original Cost): Debit Disposal Account | Credit Non-Current Asset at Cost Account.',
          'Step 2 (Remove Accumulated Depreciation): Debit Provision for Depreciation Account | Credit Disposal Account.',
          'Step 3 (Record Disposal Proceeds / Part-Exchange): Debit Bank (if cash) or Debit New Asset Cost (if part-exchange allowance) | Credit Disposal Account.',
          'Step 4 (Transfer Balancing Figure / Profit or Loss to P&L): If Credit side > Debit side -> Profit on Disposal (Debit Disposal, Credit P&L Other Income). If Debit side > Credit side -> Loss on Disposal (Credit Disposal, Debit P&L Operating Expense).'
        ],
        tableData: {
          headers: ['Step in Disposal Process', 'Debit (Dr)', 'Credit (Cr)', 'Reasoning / Explanation'],
          rows: [
            ['1. Transfer Original Cost', 'Disposal Account', 'Asset at Cost Account', 'Removes the historical cost of the sold asset from the asset ledger'],
            ['2. Transfer Accumulated Depreciation', 'Provision for Depreciation Account', 'Disposal Account', 'Eliminates all depreciation previously charged on this specific asset'],
            ['3. Record Proceeds / Part-Exchange', 'Bank Account / New Asset Account', 'Disposal Account', 'Records cash received from buyer or trade-in credit against a replacement asset'],
            ['4a. If Sold at a Profit (Proceeds > NBV)', 'Disposal Account', 'Income Statement (Other Income)', 'Balancing figure: closes disposal account, gains recognized in P&L'],
            ['4b. If Sold at a Loss (Proceeds < NBV)', 'Income Statement (Operating Expense)', 'Disposal Account', 'Balancing figure: closes disposal account, loss recognized in P&L']
          ]
        },
        workedExample: {
          scenario: 'A company bought a machine for £50,000 on 1 Jan 2021. Depreciated at 20% reducing balance. On 31 Dec 2023 (after 3 full years of depreciation), the machine is sold for £28,000 cash.\nCalculate:\n1. Accumulated Depreciation at disposal date\n2. Net Book Value\n3. Profit or Loss on Disposal and write out the ledger T-accounts.',
          calculation: 'Depreciation Schedule:\n- Year 1 (2021): £50,000 * 20% = £10,000 (NBV = £40,000)\n- Year 2 (2022): £40,000 * 20% = £8,000 (NBV = £32,000)\n- Year 3 (2023): £32,000 * 20% = £6,400 (NBV = £25,600)\nAccumulated Depreciation = £10,000 + £8,000 + £6,400 = £24,400.\nCarrying Value (NBV) = £50,000 - £24,400 = £25,600.\n\nDisposal Account Ledger Entries:\n- Dr Disposal: Machinery Cost £50,000\n- Cr Disposal: Provision for Depr £24,400\n- Cr Disposal: Bank (Sale Proceeds) £28,000\n- Total Credit Side = £24,400 + £28,000 = £52,400.\n- Total Debit Side = £50,000.\n- Balancing Figure (Profit on Disposal) = £52,400 - £50,000 = £2,400 (Debit Disposal £2,400, Credit Income Statement £2,400).',
          answer: 'Profit on Disposal = £2,400 (Proceeds £28,000 - NBV £25,600). Credited as Other Operating Income in the Income Statement.',
          explanation: 'Because cash received (£28k) exceeded the asset carrying amount (£25.6k), the excess £2,400 represents an accounting profit on disposal.'
        },
        examinerTrap: 'When an asset is part-exchanged for a new asset, do NOT credit the bank! Credit the Disposal account and debit the NEW Asset at Cost account with the part-exchange allowance!'
      }
    ]
  },
  {
    id: 'acc-incomplete-records',
    subject: 'accounting',
    code: 'ACC-03',
    title: 'Incomplete Records & Control Accounts',
    subtitle: 'Statement of Affairs, Mark-up & Margin, Stolen Stock & Reconciliation',
    duration: '4-6 Weeks',
    difficulty: 'Advanced',
    overview: 'Techniques used to construct full financial statements when a business has lost records, suffered fire/theft, or failed to maintain a double-entry ledger. Uses Statements of Affairs and margin/mark-up equations.',
    examWeight: '15% of Accounting Papers',
    synopticLinks: ['Gross Profit Ratios', 'Cash Flow', 'Fraud Detection'],
    keyConcepts: [
      {
        term: 'Statement of Affairs Method',
        definition: 'Calculating net profit by finding the change in Opening vs Closing Net Assets (Capital = Assets - Liabilities), adjusted for Capital Injections and Drawings.',
        importance: 'Calculates profit without needing an itemised sales/purchases ledger.',
        examinerTip: 'Profit = Closing Capital + Drawings - Opening Capital - Additional Capital Introduced.'
      },
      {
        term: 'Margin vs Mark-Up',
        definition: 'Mark-up is profit as a percentage of Cost of Sales (Profit / Cost * 100). Margin is profit as a percentage of Selling Price / Revenue (Profit / Revenue * 100).',
        importance: 'Used to reconstruct missing sales, purchases, or destroyed inventory.',
        examinerTip: 'If Mark-up is 25% (1/4), Margin is 20% (1/5). If Mark-up is 33.33% (1/3), Margin is 25% (1/4).'
      }
    ],
    subTopics: [
      {
        id: 'acc-lost-stock-calc',
        title: 'Reconstructing Destroyed or Stolen Inventory',
        summary: 'Using trading accounts, opening inventory, purchases, and gross margin to derive expected closing stock versus actual stock remaining.',
        keyPoints: [
          'Step 1: Calculate Cost of Sales = Revenue * (1 - Gross Margin).',
          'Step 2: Expected Closing Stock = Opening Stock + Purchases - Cost of Sales.',
          'Step 3: Inventory Loss = Expected Closing Stock - Actual Undamaged Stock counted.'
        ],
        workedExample: {
          scenario: 'Warehouse fire destroyed stock. Opening stock: £14,000; Purchases: £82,000; Sales: £120,000 with a uniform Gross Profit margin of 30%. Salvaged stock valued at £2,000.',
          calculation: 'Cost of Sales = £120,000 * (1 - 0.30) = £84,000.\nExpected Closing Inventory = £14,000 + £82,000 - £84,000 = £12,000.\nStock Lost in Fire = £12,000 - £2,000 = £10,000.',
          answer: 'Insurance claim inventory loss is £10,000.',
          explanation: 'Demonstrates application of margin to find missing inventory figures.'
        }
      }
    ]
  },
  {
    id: 'acc-partnerships',
    subject: 'accounting',
    code: 'ACC-04',
    title: 'Partnership Accounts & Goodwill',
    subtitle: 'Appropriation Accounts, Capital & Current Accounts, Goodwill on Admission/Retirement',
    duration: '4-6 Weeks',
    difficulty: 'Core',
    overview: 'Accounting for unincorporated partnerships governed by the Partnership Act 1890 or a Partnership Agreement. Covers Profit & Loss Appropriation, Interest on Capital/Drawings, Partner Salaries, and Goodwill adjustments.',
    examWeight: '15-20% of Accounting Papers',
    synopticLinks: ['Company Accounts', 'Gearing', 'Appropriation of Profit'],
    keyConcepts: [
      {
        term: 'P&L Appropriation Account',
        definition: 'The secondary stage of the Income Statement showing how net profit is distributed among partners via interest on capital, partner salaries, interest on drawings, and residual profit-sharing ratios (PSR).',
        importance: 'Ensures equitable distribution of earnings based on partner risk and time commitments.',
        examinerTip: 'Interest on Drawings is ADDED to net profit because it is charged to partners; Interest on Capital and Salaries are DEDUCTED.'
      },
      {
        term: 'Goodwill on Admission of a New Partner',
        definition: 'The excess value of an established business over the net book value of its identifiable assets, generated by reputation, customer loyalty, and prime location.',
        importance: 'Compensates existing partners who built the enterprise.',
        examinerTip: 'When goodwill is not retained in the books: Debit Goodwill (old PSR), Credit Old Partners Capital; then Debit All Partners Capital (new PSR), Credit Goodwill.'
      }
    ],
    subTopics: [
      {
        id: 'acc-capital-vs-current',
        title: 'Fixed Capital Accounts vs Fluctuating Current Accounts',
        summary: 'Why partnerships keep separate Capital Accounts (permanent long-term investment) and Current Accounts (day-to-day share of profits, interest, and drawings).',
        keyPoints: [
          'Capital Accounts remain fixed unless permanent capital is injected or withdrawn.',
          'Current Accounts reflect the partner’s working balance: credited with Salary, Interest on Capital, Share of Profit; debited with Drawings and Interest on Drawings.',
          'A debit balance on a Current Account indicates that the partner has overdrawn their account (owing money to the firm).'
        ]
      }
    ]
  },
  {
    id: 'acc-company-accounts',
    subject: 'accounting',
    code: 'ACC-05',
    title: 'Limited Company Accounts & IFRS Standards',
    subtitle: 'Share Capital, Share Premium, Revaluation Reserve, Retained Earnings & SOCIE',
    duration: '6-8 Weeks',
    difficulty: 'Advanced',
    overview: 'Financial reporting for private (Ltd) and public (Plc) companies under IAS 1. Covers the Statement of Changes in Equity (SOCIE), Rights vs Bonus issues, debentures, and dividend distribution limits.',
    examWeight: '20-25% of Papers',
    synopticLinks: ['Gearing', 'Published Accounts', 'Window Dressing'],
    keyConcepts: [
      {
        term: 'Capital Reserves vs Revenue Reserves',
        definition: 'Capital reserves (Share Premium, Revaluation Reserve) arise from non-trading capital transactions and CANNOT be distributed as cash dividends. Revenue reserves (Retained Earnings/General Reserve) arise from trading profits and ARE distributable.',
        importance: 'Protects creditors and maintains statutory capital maintenance rules.',
        examinerTip: 'A Bonus Issue (scrip issue) capitalization of reserves uses Capital Reserves first (Share Premium) to preserve distributable retained earnings for dividends.'
      },
      {
        term: 'Rights Issue vs Bonus Issue',
        definition: 'Rights issue: Offering new shares to existing shareholders for cash at a discount. Bonus issue: Free shares given to existing shareholders by converting reserves into paid-up share capital (no cash inflow).',
        importance: 'Directly impacts company liquidity, gearing, and earnings per share (EPS).',
        examinerTip: 'Rights issue increases bank balance and equity. Bonus issue leaves total equity and bank balance completely unchanged (internal book transfer).'
      }
    ],
    subTopics: [
      {
        id: 'acc-socie-structure',
        title: 'Statement of Changes in Equity (SOCIE) Mechanics',
        summary: 'Tracking movements in Share Capital, Share Premium, Revaluation Reserve, and Retained Earnings across the fiscal year.',
        keyPoints: [
          'Opening Balances + Comprehensive Income for the Year - Dividends Paid + Shares Issued = Closing Balances.',
          'Dividends proposed after the reporting period are NOT recognized as a liability under IAS 10 (disclosed in notes only).'
        ]
      }
    ]
  },
  {
    id: 'acc-marginal-costing',
    subject: 'accounting',
    code: 'ACC-06',
    title: 'Marginal Costing & Absorption Costing',
    subtitle: 'Contribution Analysis, Limiting Factors, Make-or-Buy Decisions & Overhead Absorption',
    duration: '5-7 Weeks',
    difficulty: 'Core',
    overview: 'Management accounting techniques comparing marginal costing (treating fixed costs as period expenses) with absorption costing (absorbing fixed production overheads into product unit costs using predetermined OAR rates).',
    examWeight: '20% of Paper 2',
    synopticLinks: ['Break-Even Analysis', 'Budgeting', 'Pricing Strategies'],
    keyConcepts: [
      {
        term: 'Overhead Absorption Rate (OAR)',
        definition: 'OAR = Budgeted Overhead / Budgeted Activity Level (e.g. Direct Labour Hours or Machine Hours). Absorbs fixed overheads into inventory valuations.',
        importance: 'Determines full production cost for inventory valuation under IAS 2 (Inventories).',
        examinerTip: 'If Actual Overhead > Absorbed Overhead, there is an Under-Absorption (under-recovery) of overheads, debited to P&L.'
      },
      {
        term: 'Marginal Costing for Short-Term Decisions',
        definition: 'Only variable costs change with output. As long as a special order price covers Marginal Cost (Positive Contribution), it increases total operating profit, provided spare capacity exists.',
        importance: 'Key for special pricing, make-or-buy decisions, and shut-down decisions.',
        examinerTip: 'Never use full absorption costing for short-term special order pricing because fixed costs will be incurred regardless!'
      }
    ],
    subTopics: [
      {
        id: 'acc-limiting-factor',
        title: 'Limiting Factor / Key Factor Production Optimization',
        summary: 'Ranking products by Contribution per unit of Scarce Resource (e.g. machine hours, skilled labour, raw material kg) to maximize profit.',
        keyPoints: [
          'Step 1: Identify the scarce resource (limiting factor).',
          'Step 2: Calculate Contribution per unit of each product.',
          'Step 3: Calculate Contribution per Unit of Limiting Factor = Unit Contribution / Scarce Resource required.',
          'Step 4: Rank products highest to lowest and allocate available resource to meet maximum demand.'
        ]
      }
    ]
  },
  {
    id: 'acc-standard-costing',
    subject: 'accounting',
    code: 'ACC-07',
    title: 'Standard Costing & Variance Analysis',
    subtitle: 'Direct Material, Labour, Variable & Fixed Overhead Variances (Favourable vs Adverse)',
    duration: '6-8 Weeks',
    difficulty: 'Advanced',
    overview: 'Comparing budgeted standard costs against actual operational performance to identify deviations. Subdivides variances into price/rate vs usage/efficiency components and explains root business causes.',
    examWeight: '20% of Management Accounting',
    synopticLinks: ['Operations Management', 'Quality Control', 'Budgetary Control'],
    keyConcepts: [
      {
        term: 'Material Price vs Usage Variance',
        definition: 'Material Price Variance = (Standard Price - Actual Price) * Actual Quantity. Material Usage Variance = (Standard Quantity for actual output - Actual Quantity) * Standard Price.',
        importance: 'Separates purchasing department performance from production floor efficiency.',
        examinerTip: 'Buying cheap, low-grade raw materials often creates a Favourable Price Variance but an Adverse Usage Variance and Adverse Labour Efficiency Variance due to machine jams!'
      },
      {
        term: 'Labour Rate vs Efficiency Variance',
        definition: 'Labour Rate Variance = (Standard Rate - Actual Rate) * Actual Hours. Labour Efficiency Variance = (Standard Hours for actual output - Actual Hours) * Standard Rate.',
        importance: 'Pinpoints whether deviations were caused by wage rate changes or worker productivity.',
        examinerTip: 'Using highly skilled technicians for basic assembly creates an Adverse Rate Variance but may create a Favourable Efficiency Variance.'
      }
    ],
    subTopics: [
      {
        id: 'acc-variance-causes',
        title: 'Interrelationships Between Variances',
        summary: 'Examiners award top marks when students analyze trade-offs between purchasing, HR, and production decisions rather than calculating variances in isolation.',
        keyPoints: [
          'Favourable Material Price Variance + Adverse Material Usage Variance = Cheaper, lower quality materials purchased.',
          'Adverse Labour Rate Variance + Favourable Labour Efficiency Variance = Hired higher-skilled workers at premium wage rates.',
          'Adverse Fixed Overhead Expenditure Variance = Unexpected increases in factory rent, insurance, or council tax rates.'
        ]
      }
    ]
  },
  {
    id: 'acc-ethics-standards',
    subject: 'accounting',
    code: 'ACC-08',
    title: 'Accounting Standards, Ethics & Auditing (IAS Framework)',
    subtitle: 'IAS 1, 2, 7, 8, 10, 16, 36, 37, 38, IESBA Ethics & True and Fair View',
    duration: '3-4 Weeks',
    difficulty: 'Synoptic',
    overview: 'Comprehensive coverage of International Accounting Standards (IAS 1, IAS 2, IAS 7, IAS 8, IAS 10, IAS 16, IAS 36, IAS 37, IAS 38), statutory external and internal audit functions, audit reports (unqualified vs qualified), stewardship, and fundamental ethical principles (Integrity, Objectivity, Professional Competence, Confidentiality, Professional Behaviour).',
    examWeight: '15% of Paper 3',
    synopticLinks: ['Corporate Governance', 'Published Accounts', 'Audit Stewardship'],
    keyConcepts: [
      {
        term: 'Fundamental Ethical Principles (IESBA / Cambridge 9706)',
        definition: '1. Integrity (straightforward and honest), 2. Objectivity (no bias/conflict of interest), 3. Professional Competence & Due Care (maintaining technical skill), 4. Confidentiality (protecting data), 5. Professional Behaviour (complying with laws and avoiding disrepute).',
        importance: 'Ensures public trust in published capital markets and corporate accounts.',
        examinerTip: 'Self-interest threat arises when accountants are offered bonuses tied to reported net profit targets, creating incentive to delay write-offs or recognize premature sales.'
      },
      {
        term: 'Key IAS Standards for Cambridge 9706',
        definition: 'IAS 1 (Presentation of Financial Statements), IAS 2 (Inventories at lower of cost and NRV), IAS 7 (Statement of Cash Flows: Operating, Investing, Financing), IAS 8 (Policies, Estimates & Errors), IAS 10 (Events after reporting period: adjusting vs non-adjusting), IAS 16 (Property, Plant and Equipment), IAS 36 (Impairment of Assets), IAS 37 (Provisions & Contingencies), IAS 38 (Intangible Assets: goodwill, R&D criteria).',
        importance: 'Forms the regulatory backbone of Cambridge 9706 Paper 3 assessment.',
        examinerTip: 'Dividends proposed after reporting date are non-adjusting under IAS 10: disclose in notes only, do not enter in Statement of Financial Position as a liability.'
      }
    ],
    subTopics: [
      {
        id: 'acc-ias-breakdown',
        title: 'Core IAS Standards Breakdown for A-Level',
        summary: 'Detailed provisions and treatments required by Cambridge 9706.',
        keyPoints: [
          'IAS 2: Inventory valued at the lower of Cost and Net Realisable Value (NRV = Estimated selling price - estimated costs of completion/sale).',
          'IAS 7: Cash Flow Statement classifies cash movements into 3 headings: Operating Activities, Investing Activities (PPE purchase/sale), and Financing Activities (shares, debentures, dividends paid).',
          'IAS 16: Cost model (Cost - Accumulated Depr) vs Revaluation model (Fair value - subsequent depr). Upward revaluation is credited to Revaluation Reserve.',
          'IAS 37: Provision recognized when there is a present legal/constructive obligation, probable outflow (>50%), and reliable estimate. Contingent liability disclosed in notes if possible (<50%).',
          'IAS 38: Internally generated goodwill is NEVER capitalized. Research expenditure is expensed immediately; Development expenditure is capitalized only if strict PIRATE criteria are met.'
        ]
      }
    ]
  },
  {
    id: 'acc-manufacturing-accounts',
    subject: 'accounting',
    code: 'ACC-09',
    title: 'Manufacturing Accounts & Factory Profit',
    subtitle: 'Prime Cost, Production Overheads, Work-in-Progress & Provision for Unrealised Profit (PUP)',
    duration: '4-5 Weeks',
    difficulty: 'Advanced',
    overview: 'Preparation of the Manufacturing Account to calculate Cost of Production (Prime Cost + Factory Overheads + WIP adjustments). Accounting for Factory Profit (transferring goods to trading at markup/market price) and eliminating Provision for Unrealised Profit (PUP) in unsold closing inventory under IAS 2.',
    examWeight: '25% of Paper 3',
    synopticLinks: ['Inventory Valuation', 'Cost Classification', 'Financial Statements'],
    keyConcepts: [
      {
        term: 'Prime Cost vs Factory Overheads',
        definition: 'Prime Cost = Direct Materials Consumed + Direct Labour + Direct Factory Expenses. Factory Overheads = Indirect factory rent, factory supervisor wages, depreciation of plant, power, and factory insurance.',
        importance: 'Establishes direct product cost before absorbing general factory facility expenses.',
        examinerTip: 'Administrative and selling/distribution expenses must NEVER appear in the Manufacturing Account; they are operating expenses in the Income Statement.'
      },
      {
        term: 'Factory Profit & Provision for Unrealised Profit (PUP)',
        definition: 'Goods transferred from factory to warehouse at cost plus a percentage profit (e.g. 20% factory markup). At year-end, any profit included in unsold finished goods inventory must be eliminated via a Provision for Unrealised Profit to comply with IAS 2 and the Realisation Concept.',
        importance: 'Allows the manufacturing division to be evaluated as a stand-alone profit center without violating prudence on the balance sheet.',
        examinerTip: 'Closing Inventory in Statement of Financial Position = Finished Goods Transfer Value MINUS Provision for Unrealised Profit (carried at actual manufacturing cost).'
      }
    ],
    subTopics: [
      {
        id: 'acc-mfg-format',
        title: 'Manufacturing Account & PUP Schedule',
        summary: 'Standard layout and double-entry elimination of unrealised profit.',
        keyPoints: [
          'Cost of Production = Prime Cost + Factory Overheads + Opening WIP - Closing WIP.',
          'Add Factory Profit (e.g. 20% on production cost) -> Transfer Price of Finished Goods.',
          'PUP adjustment in Income Statement = Change in Provision for Unrealised Profit (Closing PUP - Opening PUP).',
          'Statement of Financial Position: Finished Goods shown at cost (Transfer value less closing PUP).'
        ],
        workedExample: {
          scenario: 'Production cost is £200,000. Factory profit is added at 25% on cost. Closing finished goods inventory at transfer price is £30,000.',
          calculation: 'Transfer Value = £200,000 + (25% * £200,000) = £250,000 (Factory Profit = £50,000).\nClosing Inventory PUP = £30,000 * (25 / 125) = £6,000.\nActual Cost of Inventory for SOFP = £30,000 - £6,000 = £24,000.',
          answer: 'PUP of £6,000 is deducted from Finished Goods inventory on the Statement of Financial Position.',
          explanation: 'Prevents recognizing profit on goods manufactured but not yet sold to third-party external customers.'
        }
      }
    ]
  },
  {
    id: 'acc-clubs-societies',
    subject: 'accounting',
    code: 'ACC-10',
    title: 'Clubs, Societies & Non-Profit Organisations',
    subtitle: 'Receipts & Payments Account, Income & Expenditure Account, Subscriptions & Accumulated Fund',
    duration: '3-4 Weeks',
    difficulty: 'Core',
    overview: 'Accounting for non-profit entities. Contrasts the cash-based Receipts & Payments Account with the accrual-based Income & Expenditure Account (yielding a Surplus or Deficit of Income over Expenditure). Reconstructing the Subscriptions Account and calculating the Accumulated Fund (Net Assets).',
    examWeight: '20% of Paper 3',
    synopticLinks: ['Incomplete Records', 'Accruals Concept', 'Financial Position'],
    keyConcepts: [
      {
        term: 'Accumulated Fund (Capital Equivalent)',
        definition: 'The net assets of a club or society: Total Assets minus Total Liabilities at a specific date. Increases by Surplus of Income over Expenditure; decreases by Deficit.',
        importance: 'Replaces the Capital / Equity section in commercial entities.',
        examinerTip: 'Opening Accumulated Fund = Opening Assets (premises, equipment, subs in arrears, bank balance) minus Opening Liabilities (subs in advance, accrued bar expenses, loans).'
      },
      {
        term: 'Subscriptions Account Ledger Reconstruction',
        definition: 'Debit: Opening Subscriptions in Arrears (Asset) & Income & Expenditure (Current Year Subscriptions Earned). Credit: Opening Subscriptions in Advance (Liability), Bank (Total cash received), and Closing Subscriptions in Arrears.',
        importance: 'Applies accruals to derive the exact subscription income attributable to the current fiscal year.',
        examinerTip: 'Irrecoverable subscriptions written off are credited to the Subscriptions account and debited to Income & Expenditure account as an expense.'
      }
    ],
    subTopics: [
      {
        id: 'acc-club-subs-ledger',
        title: 'Subscriptions Account T-Account Master Layout',
        summary: 'Standard layout for Cambridge 9706 subscriptions ledger questions.',
        keyPoints: [
          'Debit side: Opening Arrears (owing by members), Income & Expenditure (transferred to I&E for the year), Closing Advance (paid for next year).',
          'Credit side: Opening Advance (paid last year for this year), Bank (cash received during year), Bad Debts / Subscriptions written off, Closing Arrears (still owed by members).'
        ]
      }
    ]
  },
  {
    id: 'acc-business-mergers',
    subject: 'accounting',
    code: 'ACC-11',
    title: 'Business Acquisition & Merger Accounting',
    subtitle: 'Purchase Consideration, Goodwill on Acquisition & Post-Merger Financial Statements',
    duration: '4-5 Weeks',
    difficulty: 'Advanced',
    overview: 'Accounting for the merger of sole traders/partnerships to form a limited company, or the acquisition of a business by an existing limited company. Determining the Purchase Consideration (cash, shares, debentures), calculating Goodwill (Purchase Consideration - Fair Value of Net Identifiable Assets), and preparing post-acquisition statements.',
    examWeight: '25% of Paper 3',
    synopticLinks: ['Company Accounts', 'Goodwill', 'Share Issues'],
    keyConcepts: [
      {
        term: 'Purchase Consideration',
        definition: 'The total agreed price paid by the acquiring entity to the vendor business, settled via cash, ordinary shares (at par or premium), and debentures.',
        importance: 'The agreed transaction value needed to close vendor accounts and open acquiring company books.',
        examinerTip: 'When shares are issued at a premium as part of purchase consideration, the par value is credited to Share Capital and the excess to Share Premium.'
      },
      {
        term: 'Purchased Goodwill on Acquisition',
        definition: 'Goodwill = Purchase Consideration MINUS Fair Value of Net Assets Acquired (Revalued Assets - Liabilities Taken Over).',
        importance: 'Recognized as an intangible non-current asset on the acquiring company Statement of Financial Position.',
        examinerTip: 'Under IAS 38, only PURCHASED goodwill arising from an acquisition can be recognized on the Statement of Financial Position; internally generated (inherent) goodwill is never capitalized!'
      }
    ],
    subTopics: [
      {
        id: 'acc-merger-steps',
        title: 'Ledger Procedures for Business Acquisition',
        summary: 'Closing vendor books via Realisation Account and opening acquiring company records.',
        keyPoints: [
          'Vendor Records: Assets and liabilities transferred to Realisation Account; purchase consideration credited to Realisation Account; net profit/loss on realisation distributed to partners in PSR.',
          'Purchasing Company Records: Assets debited at agreed revalued figures; liabilities credited at agreed amounts; Share Capital and Share Premium credited for shares issued; Bank credited for cash paid; Goodwill debited for the balancing figure.'
        ]
      }
    ]
  },
  {
    id: 'acc-budgeting-investment-abc',
    subject: 'accounting',
    code: 'ACC-12',
    title: 'Budgetary Control, Investment Appraisal & ABC',
    subtitle: 'Master & Functional Budgets, Flexible Budgeting, ARR, Payback, NPV, IRR & Activity-Based Costing',
    duration: '6-8 Weeks',
    difficulty: 'Advanced',
    overview: 'A-Level Cost & Management Accounting (Paper 4). Covers preparation of Functional and Cash Budgets, Flexible Budget variance reconciliation, Capital Investment Appraisal (Payback, ARR, Net Present Value, Internal Rate of Return), and Activity-Based Costing (ABC cost pools and cost drivers).',
    examWeight: '100% of Paper 4',
    synopticLinks: ['Standard Costing', 'Marginal Costing', 'Investment Decisions'],
    keyConcepts: [
      {
        term: 'Flexible Budgeting & Variance Reconciliation',
        definition: 'Adjusting the original master budget to match the ACTUAL level of activity achieved, allowing a fair like-for-like comparison to calculate operational efficiency variances.',
        importance: 'Prevents blaming production managers for higher total variable costs caused simply by producing higher volumes.',
        examinerTip: 'In a flexible budget, variable costs adjust proportionally with output; fixed costs remain unchanged unless stepped.'
      },
      {
        term: 'Capital Investment Appraisal Hierarchy',
        definition: 'Payback Period (time to recover cash), ARR (Average Annual Profit / Average Investment * 100), NPV (Discounted Net Cash Flows - Initial Cost), and IRR (discount rate where NPV = 0).',
        importance: 'Provides quantitative financial metrics for multimillion-pound long-term capital investments.',
        examinerTip: 'Cambridge 9706 rule: Questions on discounted payback or project residual values will not be set. ARR must use (Average annual profit / (Initial outlay / 2)) * 100.'
      },
      {
        term: 'Activity-Based Costing (ABC) vs Traditional OAR',
        definition: 'ABC assigns overheads to activity cost pools (e.g. setups, order processing, inspections) and charges them to products based on Cost Driver usage rates, rather than blanket labour hours.',
        importance: 'Eliminates product cost distortion where high-volume simple products cross-subsidize low-volume complex customized products.',
        examinerTip: 'ABC is recommended when overheads are a large % of total costs and product complexity varies widely.'
      }
    ],
    subTopics: [
      {
        id: 'acc-functional-budgets',
        title: 'Master & Functional Budget Sequence',
        summary: 'The logical construction order of interconnected functional budgets.',
        keyPoints: [
          '1. Sales Budget (Starting point determined by principal budget factor/demand).',
          '2. Production Budget = Budgeted Sales + Closing Finished Goods Inventory - Opening Finished Goods Inventory.',
          '3. Raw Materials Purchases Budget = Production Material Usage + Closing Raw Materials Inventory - Opening Raw Materials Inventory.',
          '4. Direct Labour & Overhead Budgets.',
          '5. Trade Receivables & Trade Payables Budgets -> Master Cash Budget.'
        ]
      }
    ]
  },

  // ==========================================
  // 🏢 BUSINESS STUDIES CURRICULUM (8 Core Modules)
  // ==========================================
  {
    id: 'bus-decision-making',
    subject: 'business',
    code: 'BUS-01',
    title: 'Managers, Leaders & Decision Making',
    subtitle: 'Leadership Styles, Blake-Mouton Grid, Tannenbaum-Schmidt Continuum & Decision Trees',
    duration: '4-6 Weeks',
    difficulty: 'Foundation',
    overview: 'Investigates business objectives, corporate governance, leadership theories (autocratic, democratic, paternalistic, laissez-faire), stakeholder mapping (Mendelow’s Matrix), and quantitative decision trees.',
    examWeight: '10-15% of A-Level Business',
    synopticLinks: ['HRM Motivation', 'Change Management', 'Corporate Strategy'],
    keyConcepts: [
      {
        term: 'Tannenbaum-Schmidt Continuum',
        definition: 'A continuum of leadership behaviour ranging from boss-centred (Tells, Sells) to subordinate-centred (Consults, Shares, Delegates).',
        importance: 'Highlights that the optimal leadership style depends on employee skill, urgency, and task complexity.',
        examinerTip: 'In crisis turnaround situations, autocratic/boss-centred leadership is often necessary for speed, whereas innovative tech firms thrive on subordinate-centred delegation.'
      },
      {
        term: 'Decision Trees & Expected Monetary Value (EMV)',
        definition: 'A quantitative decision-making tool that calculates EMV = Sum of (Probability * Outcome) - Initial Cost to find Net Gain.',
        importance: 'Provides a logical, risk-weighted financial basis for strategic choices.',
        examinerTip: 'Always evaluate the qualitative limitations of decision trees: probabilities are estimated guesses, and qualitative factors (brand, staff morale) are ignored.'
      }
    ],
    subTopics: [
      {
        id: 'bus-blake-mouton',
        title: 'Blake-Mouton Managerial Grid',
        summary: 'Categorizing management styles based on Concern for People (Y-axis) versus Concern for Task/Production (X-axis).',
        keyPoints: [
          '1,1 Impoverished: Minimum effort on task and staff (ineffective).',
          '9,1 Produce or Perish (Authoritarian): High task focus, low human concern (risks high labour turnover).',
          '1,9 Country Club: High people focus, low task urgency (comfortable but low output).',
          '5,5 Middle of the Road: Compromise style delivering mediocre performance.',
          '9,9 Team Management (Ideal): High task commitment through motivated, empowered people.'
        ]
      }
    ]
  },
  {
    id: 'bus-marketing-strategy',
    subject: 'business',
    code: 'BUS-02',
    title: 'Marketing Strategy, Segmentation & Positioning',
    subtitle: 'Market Research, PED/YED in Marketing, Extended 7Ps, Boston Matrix & Product Life Cycle',
    duration: '6-8 Weeks',
    difficulty: 'Core',
    overview: 'Analysing markets, consumer behaviour, segmentation (demographic, geographic, psychographic, behavioural), dynamic pricing, branding, digital marketing, and managing product portfolios using the Boston Matrix.',
    examWeight: '20% of Paper 1 & 2',
    synopticLinks: ['Economics Elasticities', 'Operations Capacity', 'Financial Performance'],
    keyConcepts: [
      {
        term: 'Boston Consulting Group (BCG) Matrix',
        definition: 'Portfolio analysis categorizing products by Market Share vs Market Growth Rate: Stars (High/High), Cash Cows (High/Low), Question Marks/Problem Children (Low/High), and Dogs (Low/Low).',
        importance: 'Enables firms to milk Cash Cows to finance the R&D and promotion of Question Marks into Stars.',
        examinerTip: 'A balanced portfolio must have Cash Cows generating steady cash inflows to support future Stars. Dogs should be harvested or divested.'
      },
      {
        term: 'The Extended Marketing Mix (7Ps)',
        definition: 'Product, Price, Promotion, Place, plus the 3 service Ps: People (staff customer service), Process (seamless ordering/delivery), and Physical Evidence (store ambience, packaging, website UI).',
        importance: 'Essential for service and experiential businesses where differentiation relies on human interactions.',
        examinerTip: 'Ensure all 7Ps are internally consistent: a luxury watch cannot use price penetration or budget supermarket retail placement.'
      }
    ],
    subTopics: [
      {
        id: 'bus-pricing-strategies',
        title: 'Strategic Pricing Models',
        summary: 'Price Skimming, Penetration Pricing, Dynamic Pricing, Loss Leaders, and Cost-Plus.',
        keyPoints: [
          'Price Skimming: High initial price to maximize profit from early adopters (requires high brand loyalty and inelastic demand e.g. Apple iPhones).',
          'Penetration Pricing: Low initial price to capture mass market share rapidly in price-elastic markets (e.g. streaming services).'
        ]
      }
    ]
  },
  {
    id: 'bus-operations-lean',
    subject: 'business',
    code: 'BUS-03',
    title: 'Operations Management & Lean Production',
    subtitle: 'Capacity Utilisation, Unit Costs, Quality Management (Kaizen, TQM), JIT & Mass Customisation',
    duration: '5-7 Weeks',
    difficulty: 'Core',
    overview: 'Optimizing operational efficiency, managing capacity, balancing trade-offs between flexibility and unit costs, Just-in-Time (JIT) stock management, Kaizen continuous improvement, and Total Quality Management (TQM).',
    examWeight: '15-20% of Papers',
    synopticLinks: ['Standard Costing', 'Working Capital Cycle', 'Motivation'],
    keyConcepts: [
      {
        term: 'Capacity Utilisation & Over-Utilisation Risks',
        definition: 'Capacity Utilisation = (Actual Output / Maximum Possible Output) * 100.',
        importance: 'Higher utilisation spreads fixed costs over more units, reducing average unit cost (economies of scale).',
        examinerTip: 'Operating at 100% capacity is dangerous: machinery breaks down without maintenance windows, workers suffer burnout, and the business cannot accept sudden rush orders.'
      },
      {
        term: 'Lean Production & Just-In-Time (JIT)',
        definition: 'Eliminating all forms of waste (Muda) — time, inventory, defects, transport, over-processing. JIT pulls inventory only when an order is placed.',
        importance: 'Slashes working capital tied up in buffer stock and warehousing costs.',
        examinerTip: 'JIT leaves the firm critically vulnerable to external supply chain disruptions, port strikes, and sudden demand spikes.'
      }
    ],
    subTopics: [
      {
        id: 'bus-quality-assurance',
        title: 'Quality Control (QC) vs Quality Assurance (QA)',
        summary: 'QC inspects finished goods at the end of the line (reactive, high scrap waste); QA designs zero-defect quality into every process step and empowers workers (proactive).',
        keyPoints: [
          'TQM requires a total cultural commitment where every employee treats the next worker in the process as an internal customer.',
          'Kaizen relies on incremental employee suggestions rather than massive capital expenditures.'
        ]
      }
    ]
  },
  {
    id: 'bus-hrm-motivation',
    subject: 'business',
    code: 'BUS-04',
    title: 'Human Resource Management & Motivation',
    subtitle: 'Taylor, Mayo, Maslow, Herzberg, Financial vs Non-Financial Incentives, Flexible Working',
    duration: '5-6 Weeks',
    difficulty: 'Core',
    overview: 'Workforce planning, organizational structures (tall vs flat, delayering, span of control, centralization vs decentralization), motivation theories, employee engagement, and industrial relations.',
    examWeight: '15% of Papers',
    synopticLinks: ['Labour Productivity', 'Leadership Styles', 'Change Management'],
    keyConcepts: [
      {
        term: 'Herzberg’s Two-Factor Theory',
        definition: 'Hygiene factors (pay, working conditions, company policy) prevent job dissatisfaction but do NOT motivate. Motivators (achievement, recognition, meaningful work, responsibility) actively drive high performance.',
        importance: 'Explains why increasing wages alone fails to sustain long-term employee productivity.',
        examinerTip: 'Distinguish clearly: paying fair wages merely reaches baseline hygiene; job enrichment and empowerment provide true motivation.'
      },
      {
        term: 'Labour Turnover & Labour Productivity Formulas',
        definition: 'Labour Turnover = (Number of staff leaving / Average number of staff) * 100. Labour Productivity = Total Output / Total Number of Employees.',
        importance: 'Key quantitative HR performance indicators.',
        examinerTip: 'High labour turnover inflates recruitment and induction training costs and disrupts customer service continuity.'
      }
    ],
    subTopics: [
      {
        id: 'bus-job-design',
        title: 'Job Enrichment vs Job Enlargement vs Job Rotation',
        summary: 'Non-financial motivation methods designed to increase intrinsic job satisfaction.',
        keyPoints: [
          'Job Enrichment: Giving employees greater responsibility, autonomy, and decision-making authority (vertical loading).',
          'Job Enlargement: Adding more tasks of similar complexity (horizontal loading - risks being seen as extra work for same pay).',
          'Job Rotation: Switching workers between different tasks to reduce boredom.'
        ]
      }
    ]
  },
  {
    id: 'bus-finance-sources',
    subject: 'business',
    code: 'BUS-05',
    title: 'Financial Performance & Sources of Finance',
    subtitle: 'Internal vs External Finance, Gearing, Overtrading, Working Capital & Investment Appraisal',
    duration: '6-8 Weeks',
    difficulty: 'Advanced',
    overview: 'Financial decision-making, evaluating sources of finance (venture capital, peer-to-peer, rights issues, bank debt, sale-and-leaseback), managing liquidity and overtrading, and capital investment appraisal (Payback, ARR, Net Present Value).',
    examWeight: '25% of Papers',
    synopticLinks: ['Accounting Ratios', 'Cash Flow Forecasts', 'Corporate Strategy'],
    keyConcepts: [
      {
        term: 'Overtrading (Working Capital Starvation)',
        definition: 'Expanding sales turnover too rapidly without sufficient long-term working capital, causing cash outflow for stock and wages to exhaust cash reserves before customer receivables are collected.',
        importance: 'A leading cause of profitable business insolvency.',
        examinerTip: 'Profit is not cash! A fast-growing firm offering 60-day credit terms to new clients will run out of cash despite booming sales orders.'
      },
      {
        term: 'Gearing & Financial Risk',
        definition: 'Gearing = (Non-Current Liabilities / Capital Employed) * 100. Measures the proportion of capital funded by debt/borrowing.',
        importance: 'High gearing (>50%) exposes the firm to interest rate hikes and mandatory debt servicing covenants.',
        examinerTip: 'Highly geared companies have vulnerable equity shareholder returns in recessions because debt interest must be paid before any dividends.'
      }
    ],
    subTopics: [
      {
        id: 'bus-npv-analysis',
        title: 'Discounted Cash Flow: Net Present Value (NPV)',
        summary: 'NPV discounts future net cash flows using a required hurdle interest rate to reflect the time value of money and opportunity cost.',
        keyPoints: [
          'If NPV > £0, the project generates returns above the required cost of capital and should be accepted.',
          'NPV accounts for the timing of cash flows, unlike ARR and simple Payback Period.'
        ]
      }
    ]
  },
  {
    id: 'bus-strategic-position',
    subject: 'business',
    code: 'BUS-06',
    title: 'Analysing Strategic Position',
    subtitle: 'SWOT, PESTLE, Porter’s 5 Forces, Core Competencies (Prahalad & Hamel) & Financial Audit',
    duration: '5-6 Weeks',
    difficulty: 'Advanced',
    overview: 'Evaluating internal strengths/weaknesses and external competitive environments. Examines Porter’s Five Forces of industry attractiveness, macro PESTLE headwinds, and sustainable core competencies.',
    examWeight: '20% of Paper 3',
    synopticLinks: ['Strategic Direction', 'Market Structures', 'Competitive Advantage'],
    keyConcepts: [
      {
        term: 'Porter’s Five Forces of Industry Attractiveness',
        definition: '1. Threat of New Entrants, 2. Bargaining Power of Buyers, 3. Bargaining Power of Suppliers, 4. Threat of Substitutes, 5. Rivalry among Existing Competitors.',
        importance: 'Determines the baseline profitability potential of an entire industry sector.',
        examinerTip: 'When buyer power is high and substitutes are readily available (e.g. airline booking aggregators), industry price margins get crushed.'
      },
      {
        term: 'Core Competencies (Prahalad & Hamel)',
        definition: 'A harmonized combination of unique resources and skills that provide distinctive customer value, are difficult for rivals to replicate, and can be extended across multiple markets.',
        importance: 'The true engine of long-term sustainable competitive advantage.',
        examinerTip: 'Avoid confusing standard operational resources (having modern IT) with true core competencies (e.g. Honda’s engine design prowess).'
      }
    ],
    subTopics: [
      {
        id: 'bus-swot-pestle-synthesis',
        title: 'Synthesizing SWOT with PESTLE for Exam Essays',
        summary: 'Top-band exam essays use PESTLE external forces (Political, Economic, Social, Tech, Legal, Environmental) to populate SWOT Opportunities and Threats.',
        keyPoints: [
          'Economic: Rising interest rates weaken consumer discretionary spending.',
          'Technological: AI automation creates cost-efficiency opportunities but threatens legacy business models.'
        ]
      }
    ]
  },
  {
    id: 'bus-strategic-direction',
    subject: 'business',
    code: 'BUS-07',
    title: 'Choosing Strategic Direction & Growth',
    subtitle: 'Ansoff Matrix, Porter’s Generic Strategies, Bowman’s Strategic Clock & Inorganic Growth',
    duration: '6-8 Weeks',
    difficulty: 'Synoptic',
    overview: 'Setting long-term strategic direction. Evaluates growth options via Ansoff Matrix (Market Penetration, Market Development, Product Development, Diversification), Porter’s Generic Strategies (Cost Leadership vs Differentiation), and Organic vs Inorganic growth (M&A).',
    examWeight: '25% of Papers 1, 2 & 3',
    synopticLinks: ['Decision Trees', 'Corporate Culture', 'International Business'],
    keyConcepts: [
      {
        term: 'Ansoff Matrix Growth Strategies',
        definition: 'Market Penetration (Existing Products/Existing Markets - lowest risk), Product Development (New Products/Existing Markets), Market Development (Existing Products/New Geographies/Segments), Diversification (New Products/New Markets - highest risk).',
        importance: 'Framework for assessing growth vectors relative to operational risk.',
        examinerTip: 'Unrelated Conglomerate Diversification carries the highest failure rate because management lacks domain expertise and operational synergies.'
      },
      {
        term: 'Porter’s Generic Strategies & "Stuck in the Middle"',
        definition: 'Firms must choose either Cost Leadership (lowest operational cost base e.g. Ryanair) or Differentiation (unique value justifying premium pricing e.g. Apple) across broad or focused scopes.',
        importance: 'Firms that fail to achieve either become "stuck in the middle" with no clear competitive advantage.',
        examinerTip: 'Trying to be high quality while selling at discount prices without a structural cost advantage destroys operating margins.'
      }
    ],
    subTopics: [
      {
        id: 'bus-mergers-acquisitions',
        title: 'Inorganic Growth: Mergers, Takeovers & Synergies',
        summary: 'Horizontal integration (merging with a competitor), Vertical Forward/Backward integration, and Conglomerate mergers.',
        keyPoints: [
          'Revenue Synergies: Cross-selling products to an enlarged customer database.',
          'Cost Synergies: Eliminating duplicate head office functions and achieving bulk purchasing discounts.',
          'Over 60% of M&As fail due to cultural clashes, overestimating synergies, and integration friction.'
        ]
      }
    ]
  },
  {
    id: 'bus-managing-change',
    subject: 'business',
    code: 'BUS-08',
    title: 'Managing Strategic Change & Implementation',
    subtitle: 'Kotter’s 8-Step Change, Lewin’s Force Field Analysis, Handy’s Culture & Network Analysis (CPA)',
    duration: '5-7 Weeks',
    difficulty: 'Synoptic',
    overview: 'Executing strategic transformations, overcoming employee resistance, restructuring corporate culture (Charles Handy’s Power, Role, Task, Person cultures), and project management using Critical Path Analysis (CPA).',
    examWeight: '20% of Paper 3',
    synopticLinks: ['Leadership Styles', 'Workforce Planning', 'Operations Management'],
    keyConcepts: [
      {
        term: 'Lewin’s Force Field Analysis',
        definition: 'A decision-making tool weighing Driving Forces (forces pushing for change e.g. new technology, losses) against Restraining Forces (forces resisting change e.g. fear of unknown, union contracts).',
        importance: 'Change only succeeds when driving forces overpower restraining forces, or when restraining forces are systematically unthawed.',
        examinerTip: 'Top evaluators explain that reducing restraining forces (through consultation and training) is often more effective than forcefully increasing driving pressure.'
      },
      {
        term: 'Critical Path Analysis (CPA) & Float Time',
        definition: 'Project network diagram identifying the sequence of dependent tasks that determines the shortest possible project completion time (Zero Total Float). Total Float = LFT - Duration - EST.',
        importance: 'Enables operations managers to allocate resources and execute Just-In-Time project delivery.',
        examinerTip: 'Any delay to an activity on the Critical Path directly delays the entire project completion date!'
      }
    ],
    subTopics: [
      {
        id: 'bus-handy-cultures',
        title: 'Charles Handy’s 4 Cultural Archetypes',
        summary: 'Understanding corporate culture alignment: Power Culture (Web/Autocratic founder), Role Culture (Temple/Bureaucratic rules), Task Culture (Matrix/Teams focused on project goals), Person Culture (Cluster/Autonomous professionals).',
        keyPoints: [
          'M&A failure is frequently traced to forcing a Task/Power culture onto an established Role culture.'
        ]
      }
    ]
  },

  // ==========================================
  // 📈 ECONOMICS CURRICULUM (8 Core Micro & Macro Modules)
  // ==========================================
  {
    id: 'econ-scarcity-price-mechanism',
    subject: 'economics',
    code: 'ECN-01',
    title: 'The Economic Problem & Price Mechanism',
    subtitle: 'Scarcity, Opportunity Cost, PPF Curves, Specialisation & Functions of Price',
    duration: '4-6 Weeks',
    difficulty: 'Foundation',
    overview: 'The fundamental economic problem: infinite human wants vs scarce economic resources. Explores Production Possibility Frontiers (PPFs), opportunity cost, Adam Smith’s division of labour, and the rationing, signaling, and incentive functions of price.',
    examWeight: '15% of Microeconomics',
    synopticLinks: ['Market Failure', 'Trade Theory', 'Macroeconomic Growth'],
    keyConcepts: [
      {
        term: 'Opportunity Cost & PPF Shifts',
        definition: 'The next best alternative forgone when a choice is made. A PPF shows the maximum combinations of two goods an economy can produce when all resources are fully and efficiently employed.',
        importance: 'Illustrates trade-offs between capital goods (future growth) and consumer goods (current living standards).',
        examinerTip: 'A point inside the PPF represents productive inefficiency (unemployed resources). An outward shift requires an increase in the quantity or quality of factors of production (CELL).'
      },
      {
        term: 'The Three Functions of the Price Mechanism',
        definition: '1. Rationing function (prices rise to allocate scarce supply), 2. Signaling function (price changes signal where resources are needed), 3. Incentive function (higher prices incentivize producers to supply more for profit).',
        importance: 'The invisible hand mechanism that coordinates free market resource allocation without government direction.',
        examinerTip: 'When governments introduce price caps (e.g. rent controls), they break the signaling and incentive functions, generating persistent excess demand (shortages).'
      }
    ],
    subTopics: [
      {
        id: 'econ-specialisation-division',
        title: 'Specialisation & Division of Labour (Adam Smith)',
        summary: 'Breaking down a manufacturing process into distinct sequential tasks performed by dedicated specialized workers.',
        keyPoints: [
          'Advantages: Massive increases in labor productivity, lower unit production costs, reduced training time.',
          'Disadvantages: Worker alienation and monotony, higher absenteeism, vulnerability if a key specialist is absent.'
        ]
      }
    ]
  },
  {
    id: 'econ-elasticities-consumer',
    subject: 'economics',
    code: 'ECN-02',
    title: 'Elasticities of Demand & Supply',
    subtitle: 'PED, YED, XED, PES, Total Revenue Rule & Behavioural Economics Nudges',
    duration: '6-8 Weeks',
    difficulty: 'Core',
    overview: 'Quantitative microeconomics measuring responsiveness of quantity demanded/supplied to changes in price, consumer income, and competitor prices. Examines the total revenue rule, taxation incidence, and behavioral economics heuristics.',
    examWeight: '20% of Microeconomics',
    synopticLinks: ['Business Pricing', 'Indirect Taxation', 'International Trade Terms'],
    keyConcepts: [
      {
        term: 'Price Elasticity of Demand (PED) & Total Revenue',
        definition: 'PED = % Change in Quantity Demanded / % Change in Price. When PED is inelastic (|PED| < 1), increasing price increases Total Revenue. When PED is elastic (|PED| > 1), increasing price decreases Total Revenue.',
        importance: 'Dictates business pricing power and government tax yield on demerit goods.',
        examinerTip: 'Goods with few substitutes, high addiction/habit, and low proportion of income (cigarettes, petrol) have highly price-inelastic demand.'
      },
      {
        term: 'Income Elasticity (YED) & Cross Elasticity (XED)',
        definition: 'YED > 0 = Normal good; YED > 1 = Luxury good; YED < 0 = Inferior good (demand drops as income rises). XED > 0 = Substitutes (positive slope); XED < 0 = Complements.',
        importance: 'Predicts how sales fluctuate across macroeconomic business cycles and competitor price wars.',
        examinerTip: 'In a recession (falling real incomes), discount supermarkets thrive because budget groceries have negative YED (inferior goods).'
      }
    ],
    subTopics: [
      {
        id: 'econ-tax-incidence',
        title: 'Indirect Tax Incidence & Deadweight Loss',
        summary: 'When a specific or ad valorem indirect tax is placed on a good, the tax burden falls predominantly on whoever is more price-inelastic.',
        keyPoints: [
          'Inelastic Demand: Consumers bear the majority of the tax burden (large price rise, small quantity drop).',
          'Elastic Demand: Producers absorb the majority of the tax burden in reduced profit margins.'
        ]
      }
    ]
  },
  {
    id: 'econ-market-failure-externalities',
    subject: 'economics',
    code: 'ECN-03',
    title: 'Market Failure & Government Intervention',
    subtitle: 'Negative/Positive Externalities, Public Goods, Merit/Demerit Goods & Government Failure',
    duration: '6-8 Weeks',
    difficulty: 'Advanced',
    overview: 'When the free market mechanism fails to achieve allocative efficiency (Marginal Social Cost = Marginal Social Benefit). Examines negative production externalities (pollution), positive consumption externalities (vaccines/education), non-excludable public goods, and unintended government failure.',
    examWeight: '25% of Microeconomics',
    synopticLinks: ['Pigouvian Taxation', 'Subsidies', 'Environmental Economics'],
    keyConcepts: [
      {
        term: 'Negative Production Externalities (MSC > MPC)',
        definition: 'Third-party spillover costs created by production (e.g. factory carbon emissions, chemical dumping) ignored by private firms, leading to free market overproduction and Deadweight Welfare Loss.',
        importance: 'The theoretical justification for carbon taxes, pollution permits, and environmental regulation.',
        examinerTip: 'Always draw the social cost diagram showing MSC above MPC. The deadweight loss triangle points to the socially optimum output where MSC = MSB.'
      },
      {
        term: 'Public Goods & The Free Rider Problem',
        definition: 'Goods that are Non-Excludable (cannot prevent non-payers from benefiting) and Non-Rivalrous (one person’s consumption does not reduce availability for others) e.g. national defence, street lighting, flood defences.',
        importance: 'Free markets completely fail to provide pure public goods because rational consumers will not pay, forcing direct state provision.',
        examinerTip: 'Merit goods (healthcare, schooling) are NOT public goods — they are rival and excludable, but under-consumed due to information failure.'
      }
    ],
    subTopics: [
      {
        id: 'econ-govt-failure-mechanisms',
        title: 'Causes of Government Failure',
        summary: 'When state intervention worsens economic allocation or creates net welfare loss.',
        keyPoints: [
          'Information Failure / Imperfect Knowledge: Government miscalculates the exact optimal tax rate.',
          'Excessive Administrative Costs: High enforcement costs exceed welfare gains (e.g. bureaucracy of permit trading).',
          'Unintended Consequences: Alcohol minimum unit pricing driving black market smuggling or counterfeit goods.',
          'Regulatory Capture: Regulatory bodies acting in the interest of the dominant corporations they supervise.'
        ]
      }
    ]
  },
  {
    id: 'econ-costs-market-structures',
    subject: 'economics',
    code: 'ECN-04',
    title: 'Costs, Revenues & Market Structures',
    subtitle: 'Perfect Competition, Monopolistic Competition, Oligopoly (Game Theory) & Monopoly',
    duration: '8-10 Weeks',
    difficulty: 'Advanced',
    overview: 'Theory of the firm: Diminishing returns, Short-Run vs Long-Run Average Costs, Economies of Scale, Productive/Allocative/Dynamic Efficiency, and the spectrum of market structures from Perfect Competition to Pure Monopoly and Contestable Markets.',
    examWeight: '30% of Microeconomics',
    synopticLinks: ['Business Strategy', 'Pricing Models', 'Competition Policy'],
    keyConcepts: [
      {
        term: 'Efficiency Benchmarks: Allocative vs Productive vs Dynamic',
        definition: 'Allocative Efficiency: Price = Marginal Cost (P=MC). Productive Efficiency: Minimum point on Short-Run/Long-Run Average Cost curve (ATC min). Dynamic Efficiency: Supernormal profits reinvested into R&D and innovation.',
        importance: 'Used to evaluate the economic welfare delivered by different market structures.',
        examinerTip: 'A pure monopolist is neither productively nor allocatively efficient, but can be dynamically efficient by financing breakthrough patent innovations from monopoly profits.'
      },
      {
        term: 'Oligopoly, Interdependence & Kinked Demand Curve',
        definition: 'A market dominated by a few large interdependent firms. The Kinked Demand curve explains price stickiness: rivals match price cuts (inelastic) but ignore price hikes (elastic).',
        importance: 'Leads to non-price competition (branding, loyalty schemes, advertising) and cartel collusion risks.',
        examinerTip: 'Use the Prisoner’s Dilemma payoff matrix to demonstrate why tacit collusion is tempted by cheating with secret price discounts.'
      }
    ],
    subTopics: [
      {
        id: 'econ-natural-monopoly',
        title: 'Natural Monopoly & Contestability Theory',
        summary: 'When massive infrastructure economies of scale make it economically efficient for a single supplier to serve the entire market (water pipes, rail tracks, national electric grid).',
        keyPoints: [
          'High sunk costs act as an insurmountable barrier to entry.',
          'Requires price regulation (e.g. RPI - X formula) to prevent monopoly deadweight pricing.'
        ]
      }
    ]
  },
  {
    id: 'econ-macro-model-ad-as',
    subject: 'economics',
    code: 'ECN-05',
    title: 'The Macroeconomic Model: AD/AS & The Multiplier',
    subtitle: 'Circular Flow of Income, Aggregate Demand (C+I+G+(X-M)), Short-Run vs Long-Run AS & Multiplier',
    duration: '6-8 Weeks',
    difficulty: 'Core',
    overview: 'The fundamental macroeconomic model. Circular flow of income with injections (I, G, X) and withdrawals (S, T, M). Determinants of Aggregate Demand components, Keynesian vs Classical LRAS curves, and the Keynesian Multiplier effect.',
    examWeight: '20% of Macroeconomics',
    synopticLinks: ['Fiscal Policy', 'Monetary Policy', 'Economic Growth'],
    keyConcepts: [
      {
        term: 'The Keynesian National Income Multiplier',
        definition: 'Multiplier (k) = 1 / (1 - MPC) = 1 / MPW, where MPW = MPS + MPT + MPM. Measures the ultimate change in GDP resulting from an initial injection of spending.',
        importance: 'Demonstrates how government infrastructure spending can create amplified real economic growth.',
        examinerTip: 'In an open economy with high marginal propensity to import (MPM) and high taxation (MPT), the domestic multiplier is significantly dampened!'
      },
      {
        term: 'Classical vs Keynesian LRAS Debate',
        definition: 'Classical LRAS is perfectly vertical at full employment (Yfe) — AD increases only cause inflation in the long run. Keynesian LRAS has 3 phases (elastic with spare capacity, bottleneck phase, and vertical full capacity).',
        importance: 'Explains differing political philosophies on state intervention vs free market supply-side solutions.',
        examinerTip: 'When answering essay questions, always draw Keynesian spare capacity when arguing that fiscal stimulus boosts real output without triggering inflation.'
      }
    ],
    subTopics: [
      {
        id: 'econ-ad-components-shifts',
        title: 'Determinants of Aggregate Demand Components',
        summary: 'AD = Consumption (60-65%) + Investment (15-20%) + Government Spending (20%) + Net Exports (X - M).',
        keyPoints: [
          'Consumption: Influenced by interest rates, consumer confidence, wealth effect (housing prices), and real disposable incomes.',
          'Investment: Influenced by business confidence (Animal Spirits), corporation tax, interest rates, and capacity utilisation.'
        ]
      }
    ]
  },
  {
    id: 'econ-macro-objectives',
    subject: 'economics',
    code: 'ECN-06',
    title: 'Macroeconomic Objectives & Performance',
    subtitle: 'Economic Growth, Unemployment (Cyclical/Structural), Inflation (CPI) & Balance of Payments',
    duration: '6-8 Weeks',
    difficulty: 'Core',
    overview: 'The 4 major government macroeconomic goals: 1. Sustainable real economic growth, 2. Low and stable inflation (2% target), 3. Low unemployment / full employment, 4. Satisfactory balance of payments on current account, plus environmental sustainability and income equality (Gini coefficient).',
    examWeight: '25% of Macroeconomics',
    synopticLinks: ['Policy Conflicts', 'Inflation Indexing', 'Exchange Rates'],
    keyConcepts: [
      {
        term: 'Cost-Push vs Demand-Pull Inflation',
        definition: 'Demand-Pull: Excessive AD shifting right faster than AS ("too much money chasing too few goods"). Cost-Push: Inward shift of SRAS driven by soaring global commodity prices, wage spikes, or imported oil shocks.',
        importance: 'Determines the appropriate monetary/fiscal policy response.',
        examinerTip: 'Raising interest rates cures Demand-Pull inflation, but using high interest rates against Cost-Push energy shocks risks triggering a severe economic recession (Stagflation).'
      },
      {
        term: 'Types of Unemployment & The Natural Rate (NRU)',
        definition: 'Frictional (between jobs), Structural (skills mismatch due to deindustrialisation), Cyclical / Demand-Deficient (lack of AD during recession), Seasonal.',
        importance: 'Structural unemployment cannot be cured by monetary stimulus — it requires supply-side education and retraining policies.',
        examinerTip: 'Hysteresis occurs when long-term unemployed workers lose job readiness and become permanently unemployable, shifting the LRAS inward.'
      }
    ],
    subTopics: [
      {
        id: 'econ-macro-trade-offs',
        title: 'Macroeconomic Policy Conflicts & Phillips Curve',
        summary: 'Key trade-offs: Economic Growth vs Inflation, Unemployment vs Inflation (Short-Run Phillips Curve), Economic Growth vs Current Account Deficit, Growth vs Environmental Quality.',
        keyPoints: [
          'Short-run stimulus reducing unemployment often creates wage pressure, accelerating inflation.',
          'Booming domestic consumer spending sucks in manufactured imports, widening the trade deficit.'
        ]
      }
    ]
  },
  {
    id: 'econ-macro-policy',
    subject: 'economics',
    code: 'ECN-07',
    title: 'Macroeconomic Policy Instruments',
    subtitle: 'Monetary Policy (Base Rate & QE), Fiscal Policy (Deficits & Debt) & Supply-Side Policies',
    duration: '6-8 Weeks',
    difficulty: 'Advanced',
    overview: 'Comprehensive evaluation of demand-side policies (Bank of England Monetary Policy Committee transmission mechanism, Quantitative Easing/QT, expansionary vs contractionary fiscal policy, national debt) versus interventionist and market-led supply-side reforms.',
    examWeight: '25% of Papers 2 & 3',
    synopticLinks: ['Central Bank Mandates', 'Crowding Out', 'Productivity'],
    keyConcepts: [
      {
        term: 'Monetary Policy Transmission Mechanism',
        definition: 'How central bank base rate changes pass through commercial banks to mortgage rates, asset prices, exchange rates, and business confidence to alter Aggregate Demand and inflation.',
        importance: 'Primary macroeconomic instrument in developed economies.',
        examinerTip: 'There is an estimated 18 to 24 month time lag before a base rate change achieves its maximum impact on the real economy and CPI inflation.'
      },
      {
        term: 'Supply-Side Policies: Market-Led vs Interventionist',
        definition: 'Market-led: Deregulation, lowering corporation taxes, reducing trade union power, privatization. Interventionist: Government spending on STEM education, transport infrastructure (rail, gigabit broadband), R&D tax credits.',
        importance: 'The only sustainable way to achieve non-inflationary long-term economic growth by shifting the LRAS rightward.',
        examinerTip: 'Interventionist supply-side policies carry heavy fiscal costs and long gestation time lags (e.g. building HS2 or high-speed fiber takes a decade).'
      }
    ],
    subTopics: [
      {
        id: 'econ-fiscal-crowding-out',
        title: 'Fiscal Deficits, National Debt & Financial Crowding Out',
        summary: 'When heavy government borrowing drives up bond yields and interest rates, squeezing out private sector corporate investment.',
        keyPoints: [
          'Automatic Stabilizers: In a recession, welfare spending automatically rises and tax tax yields fall, cushioning the downturn.',
          'Discretionary Fiscal Policy: Active policy decisions such as cutting VAT or launching energy bill subsidies.'
        ]
      }
    ]
  },
  {
    id: 'econ-trade-global-markets',
    subject: 'economics',
    code: 'ECN-08',
    title: 'International Trade, Globalization & Finance',
    subtitle: 'Comparative Advantage, Tariffs/Quotas, Exchange Rates (Marshall-Lerner & J-Curve) & Financial Crisis',
    duration: '6-8 Weeks',
    difficulty: 'Synoptic',
    overview: 'Trade theory: David Ricardo’s Comparative Advantage, terms of trade, protectionism tools (tariffs, quotas, export subsidies), floating vs fixed exchange rate regimes, current account rebalancing, and financial sector systemic risk (moral hazard, subprime crises).',
    examWeight: '25-30% of Paper 3',
    synopticLinks: ['Balance of Payments', 'Exchange Rates', 'Protectionism'],
    keyConcepts: [
      {
        term: 'Law of Comparative Advantage',
        definition: 'A country should specialize in producing goods and services where it has the lowest Opportunity Cost, and trade for other goods, leading to increased total global output and consumption beyond individual PPFs.',
        importance: 'The foundational economic proof advocating for free global trade.',
        examinerTip: 'Absolute advantage is producing more units with the same inputs; Comparative advantage is having a LOWER opportunity cost ratio.'
      },
      {
        term: 'Marshall-Lerner Condition & The J-Curve Effect',
        definition: 'A currency depreciation only improves the current account balance if the sum of price elasticities of demand for exports and imports is greater than 1 (|PEDx + PEDm| > 1). In the short run, trade contracts are fixed, so the deficit initially worsens before improving (J-Curve).',
        importance: 'Crucial for analyzing the real-world impact of currency devaluations on trade balances.',
        examinerTip: 'In the short run, import demand is highly price-inelastic, causing import expenditure to rise immediately before consumers and firms switch to domestic substitutes.'
      }
    ],
    subTopics: [
      {
        id: 'econ-financial-markets-regulation',
        title: 'Financial Markets, Systemic Risk & Moral Hazard',
        summary: 'Commercial banks vs Investment banks, systemic liquidity failure, and why central banks act as Lenders of Last Resort.',
        keyPoints: [
          'Moral Hazard: Bailout guarantees encourage commercial banks to engage in excessive subprime risk-taking.',
          'Macroprudential Regulation (Bank of England PRA/FCA): Setting minimum tier 1 capital and liquidity ratios to buffer against shocks.'
        ]
      }
    ]
  }
];
