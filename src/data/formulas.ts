import { FormulaItem } from '../types';

export const financeFormulas: FormulaItem[] = [
  // ==========================================
  // 📘 ACCOUNTING FORMULAS
  // ==========================================
  {
    id: 'roce',
    subject: 'accounting',
    name: 'Return on Capital Employed (ROCE)',
    category: 'Financial Accounting',
    formula: '(Operating Profit / Capital Employed) × 100',
    symbolicFormula: '\\text{ROCE} = \\frac{\\text{Operating Profit}}{\\text{Total Assets} - \\text{Current Liabilities}} \\times 100',
    unit: '%',
    explanation: 'Measures how efficiently a business generates operating profit from every £100 of total long-term capital invested.',
    idealTarget: '> 15% (must beat cost of debt borrowing)',
    whatHigherMeans: 'Superior efficiency in converting capital assets into operating earnings.',
    whatLowerMeans: 'Underperforming assets or capital tied up in unproductive non-current resources.',
    examinerTip: 'Always compare ROCE against current commercial bank interest rates or the firm’s Weighted Average Cost of Capital (WACC).',
    inputs: [
      { key: 'operatingProfit', label: 'Operating Profit (£)', defaultValue: 150000, prefix: '£' },
      { key: 'capitalEmployed', label: 'Capital Employed (£)', defaultValue: 750000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const op = inputs.operatingProfit || 0;
      const ce = inputs.capitalEmployed || 1;
      const res = (op / ce) * 100;
      const formatted = `${res.toFixed(2)}%`;
      return {
        result: res,
        formatted,
        status: res >= 15 ? 'good' : res >= 8 ? 'neutral' : 'warning',
        note: res >= 15 ? 'Healthy return on capital deployed.' : 'Return is below prime investment hurdle benchmarks.'
      };
    }
  },
  {
    id: 'straight-line-depreciation',
    subject: 'accounting',
    name: 'Straight-Line Depreciation (Fixed Instalment)',
    category: 'Financial Accounting',
    formula: '(Cost - Estimated Residual Value) / Useful Economic Life (Years)',
    symbolicFormula: '\\text{Annual Depreciation} = \\frac{\\text{Cost} - \\text{Residual Scrap Value}}{\\text{Useful Life (Years)}}',
    unit: '£/year',
    explanation: 'Allocates an equal annual depreciation expense across the asset’s useful life. Best suited for assets providing uniform economic benefits (e.g. fixtures, fittings, buildings).',
    idealTarget: 'Uniform annual charge matching asset wear',
    whatHigherMeans: 'Higher annual operating cost charged to Income Statement, reducing taxable net profit.',
    whatLowerMeans: 'Longer estimated useful life or higher residual salvage value assumes lower annual deterioration.',
    examinerTip: 'Ensure residual scrap value is deducted before dividing by useful life years or multiplying by straight-line percentage rate.',
    inputs: [
      { key: 'cost', label: 'Original Historical Cost (£)', defaultValue: 50000, prefix: '£' },
      { key: 'residualValue', label: 'Estimated Residual Value (£)', defaultValue: 5000, prefix: '£' },
      { key: 'usefulLife', label: 'Useful Life (Years)', defaultValue: 5, suffix: 'yrs' }
    ],
    calculate: (inputs) => {
      const cost = inputs.cost || 0;
      const res = inputs.residualValue || 0;
      const life = inputs.usefulLife || 1;
      const annualDepr = Math.max(0, (cost - res) / life);
      const rate = ((annualDepr / (cost || 1)) * 100).toFixed(1);
      return {
        result: annualDepr,
        formatted: `£${annualDepr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / yr (${rate}%)`,
        status: 'good',
        note: `Annual P&L expense charge: £${annualDepr.toLocaleString()}. Asset is fully written down to £${res.toLocaleString()} after ${life} years.`
      };
    }
  },
  {
    id: 'reducing-balance-depreciation',
    subject: 'accounting',
    name: 'Reducing (Diminishing) Balance Depreciation',
    category: 'Financial Accounting',
    formula: 'Carrying Amount (Net Book Value) × Depreciation Rate %',
    symbolicFormula: '\\text{Depreciation Charge} = \\text{Carrying Amount (NBV at start of year)} \\times r\\%',
    unit: '£',
    explanation: 'Charges higher depreciation in early years and progressively lower charges in later years. Ideal for assets losing value rapidly or having rising maintenance costs (e.g. motor vehicles, technology, high-speed machinery).',
    idealTarget: 'Matches high early productivity with high early depreciation',
    whatHigherMeans: 'Heavier upfront profit suppression in Year 1-2, creating a smoother total cost curve when combined with later repairs.',
    whatLowerMeans: 'Preserves higher Net Book Value in early balance sheets.',
    examinerTip: 'CRITICAL: Never deduct residual value from cost when applying the reducing balance percentage rate!',
    inputs: [
      { key: 'carryingAmount', label: 'Current Net Book Value / Cost (£)', defaultValue: 40000, prefix: '£' },
      { key: 'rate', label: 'Depreciation Rate (%)', defaultValue: 25, suffix: '%' }
    ],
    calculate: (inputs) => {
      const nbv = inputs.carryingAmount || 0;
      const rate = inputs.rate || 0;
      const charge = nbv * (rate / 100);
      const closingNbv = nbv - charge;
      return {
        result: charge,
        formatted: `£${charge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        status: 'good',
        note: `Depreciation for this year: £${charge.toLocaleString()}. Closing Net Book Value carried forward: £${closingNbv.toLocaleString()}.`
      };
    }
  },
  {
    id: 'profit-loss-disposal',
    subject: 'accounting',
    name: 'Profit / Loss on Asset Disposal',
    category: 'Financial Accounting',
    formula: 'Disposal Proceeds (or Trade-in Allowance) - Net Book Value at Disposal Date',
    symbolicFormula: '\\text{Profit/(Loss) on Disposal} = \\text{Sale Proceeds} - (\\text{Cost} - \\text{Accumulated Depreciation})',
    unit: '£',
    explanation: 'Calculates the difference between the net sales proceeds (or part-exchange allowance) and the asset’s carrying amount (Net Book Value). Profit is credited to Income Statement (Other Income); Loss is debited as an operating expense.',
    idealTarget: '£0 (signifies perfect historical depreciation estimation)',
    whatHigherMeans: 'Asset was over-depreciated in prior years; selling price exceeded remaining book value (Profit on Disposal).',
    whatLowerMeans: 'Asset was under-depreciated or suffered sudden obsolescence/damage (Loss on Disposal).',
    examinerTip: 'Remember the 4-step ledger protocol: 1. Dr Disposal, Cr Asset Cost; 2. Dr Provision for Depr, Cr Disposal; 3. Dr Bank/Part-Exchange, Cr Disposal; 4. Balancing figure to Income Statement.',
    inputs: [
      { key: 'originalCost', label: 'Original Historical Cost (£)', defaultValue: 30000, prefix: '£' },
      { key: 'accumulatedDepr', label: 'Accumulated Depreciation (£)', defaultValue: 18000, prefix: '£' },
      { key: 'proceeds', label: 'Sale Proceeds / Trade-in Value (£)', defaultValue: 15000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const cost = inputs.originalCost || 0;
      const accDepr = inputs.accumulatedDepr || 0;
      const proceeds = inputs.proceeds || 0;
      const nbv = Math.max(0, cost - accDepr);
      const profitOrLoss = proceeds - nbv;
      const isProfit = profitOrLoss >= 0;
      return {
        result: profitOrLoss,
        formatted: `${isProfit ? '+' : '-'}£${Math.abs(profitOrLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${isProfit ? 'Profit' : 'Loss'})`,
        status: isProfit ? 'good' : 'warning',
        note: `Net Book Value at disposal: £${nbv.toLocaleString()}. Sale proceeds: £${proceeds.toLocaleString()}. Result: ${isProfit ? 'Profit on Disposal credited to P&L (Other Income)' : 'Loss on Disposal debited to P&L (Operating Expense)'}.`
      };
    }
  },
  {
    id: 'current-ratio',
    subject: 'accounting',
    name: 'Current Ratio (Working Capital Ratio)',
    category: 'Financial Accounting',
    formula: 'Current Assets / Current Liabilities',
    symbolicFormula: '\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}',
    unit: ': 1',
    explanation: 'Tests short-term liquidity: the firm’s ability to settle debts due within one year using short-term assets.',
    idealTarget: '1.5 : 1 to 2.0 : 1',
    whatHigherMeans: 'Strong buffer of safety against short-term payment defaults, though >2.5:1 suggests excessive idle stock or cash.',
    whatLowerMeans: 'Liquidity crunch risk; vulnerable to supplier credit cut-offs and sudden cash outflows.',
    examinerTip: 'Supermarkets can survive on a ratio under 1:1 because they generate instant cash from customers and enjoy 60-day supplier credit.',
    inputs: [
      { key: 'currentAssets', label: 'Current Assets (£)', defaultValue: 240000, prefix: '£' },
      { key: 'currentLiabilities', label: 'Current Liabilities (£)', defaultValue: 150000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const ca = inputs.currentAssets || 0;
      const cl = inputs.currentLiabilities || 1;
      const res = ca / cl;
      const formatted = `${res.toFixed(2)} : 1`;
      return {
        result: res,
        formatted,
        status: res >= 1.5 && res <= 2.2 ? 'good' : res < 1.0 ? 'poor' : 'neutral',
        note: res < 1.0 ? 'Severe liquidity deficit: current liabilities exceed liquid assets.' : res > 2.5 ? 'Excessive idle working capital.' : 'Optimal liquidity safety corridor.'
      };
    }
  },
  {
    id: 'acid-test',
    subject: 'accounting',
    name: 'Acid Test (Quick Ratio)',
    category: 'Financial Accounting',
    formula: '(Current Assets - Inventory) / Current Liabilities',
    symbolicFormula: '\\text{Acid Test} = \\frac{\\text{Current Assets} - \\text{Inventories}}{\\text{Current Liabilities}}',
    unit: ': 1',
    explanation: 'The strictest test of immediate solvency, stripping out illiquid unsold inventories that cannot be quickly converted into cash.',
    idealTarget: '1.0 : 1 (or 0.8 : 1 in fast-stock sectors)',
    whatHigherMeans: 'Excellent immediate liquidity; can pay all short-term debts tomorrow without needing to make new sales.',
    whatLowerMeans: 'Heavy reliance on selling off inventory to meet immediate supplier bills.',
    examinerTip: 'If Current Ratio is 2.5:1 but Acid Test is only 0.4:1, the firm is stockpiling slow-moving or obsolete inventory!',
    inputs: [
      { key: 'currentAssets', label: 'Current Assets (£)', defaultValue: 240000, prefix: '£' },
      { key: 'inventory', label: 'Inventories (£)', defaultValue: 110000, prefix: '£' },
      { key: 'currentLiabilities', label: 'Current Liabilities (£)', defaultValue: 150000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const ca = inputs.currentAssets || 0;
      const inv = inputs.inventory || 0;
      const cl = inputs.currentLiabilities || 1;
      const res = (ca - inv) / cl;
      const formatted = `${res.toFixed(2)} : 1`;
      return {
        result: res,
        formatted,
        status: res >= 1.0 ? 'good' : res >= 0.75 ? 'neutral' : 'warning',
        note: res >= 1.0 ? 'Immediate short-term solvency secured.' : 'Requires inventory liquidation to settle obligations.'
      };
    }
  },
  {
    id: 'gearing-ratio',
    subject: 'accounting',
    name: 'Gearing Ratio (Capital Structure)',
    category: 'Financial Accounting',
    formula: '(Non-Current Liabilities / Capital Employed) × 100',
    symbolicFormula: '\\text{Gearing} = \\frac{\\text{Long-Term Debt}}{\\text{Total Equity} + \\text{Long-Term Debt}} \\times 100',
    unit: '%',
    explanation: 'Measures the proportion of long-term capital financed by interest-bearing loans and debentures vs shareholder equity.',
    idealTarget: '25% - 50% (Under 50% = Low Gearing)',
    whatHigherMeans: 'High vulnerability to interest rate hikes and mandatory debt covenants; high financial risk.',
    whatLowerMeans: 'Low financial risk and greater borrowing capacity for future capital expenditure.',
    examinerTip: 'High gearing magnifies returns to equity shareholders during economic booms, but increases bankruptcy risk during recessions.',
    inputs: [
      { key: 'ncl', label: 'Non-Current Liabilities (£)', defaultValue: 320000, prefix: '£' },
      { key: 'capitalEmployed', label: 'Capital Employed (£)', defaultValue: 800000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const debt = inputs.ncl || 0;
      const ce = inputs.capitalEmployed || 1;
      const res = (debt / ce) * 100;
      const formatted = `${res.toFixed(2)}%`;
      return {
        result: res,
        formatted,
        status: res > 50 ? 'warning' : res >= 20 ? 'good' : 'neutral',
        note: res > 50 ? 'Highly geared firm (>50%): elevated vulnerability to interest rate cycles.' : 'Low-to-moderate gearing structure.'
      };
    }
  },
  {
    id: 'material-price-variance',
    subject: 'accounting',
    name: 'Direct Material Price Variance',
    category: 'Management Accounting & Costing',
    formula: '(Standard Price - Actual Price) × Actual Quantity Purchased',
    symbolicFormula: '\\text{MPV} = (SP - AP) \\times AQ',
    unit: '£',
    explanation: 'Measures purchasing efficiency by comparing the standard budgeted unit price of materials against actual price paid.',
    idealTarget: '£0 or Favourable (F)',
    whatHigherMeans: 'Purchased materials cheaper than budget (Favourable), though may risk sub-standard quality.',
    whatLowerMeans: 'Paid more than standard budget (Adverse), due to inflation or emergency supplier orders.',
    examinerTip: 'Always state whether the final answer is (F) Favourable or (A) Adverse!',
    inputs: [
      { key: 'sp', label: 'Standard Price per kg (£)', defaultValue: 12, prefix: '£' },
      { key: 'ap', label: 'Actual Price per kg (£)', defaultValue: 13.5, prefix: '£' },
      { key: 'aq', label: 'Actual Quantity (kg)', defaultValue: 5000, suffix: 'kg' }
    ],
    calculate: (inputs) => {
      const sp = inputs.sp || 0;
      const ap = inputs.ap || 0;
      const aq = inputs.aq || 0;
      const val = (sp - ap) * aq;
      const isFav = val >= 0;
      const formatted = `£${Math.abs(val).toLocaleString()} ${isFav ? '(F - Favourable)' : '(A - Adverse)'}`;
      return {
        result: val,
        formatted,
        status: isFav ? 'good' : 'warning',
        note: isFav ? 'Purchased raw materials below budgeted standard price.' : 'Paid £' + Math.abs(val).toLocaleString() + ' above budgeted standard price.'
      };
    }
  },
  {
    id: 'material-usage-variance',
    subject: 'accounting',
    name: 'Direct Material Usage Variance',
    category: 'Management Accounting & Costing',
    formula: '(Standard Quantity for Actual Output - Actual Quantity Used) × Standard Price',
    symbolicFormula: '\\text{MUV} = (SQ - AQ) \\times SP',
    unit: '£',
    explanation: 'Measures shop floor production efficiency by isolating material wastage, scraps, or machine errors.',
    idealTarget: '£0 or Favourable (F)',
    whatHigherMeans: 'Used fewer raw materials than standard allowance for actual volume produced.',
    whatLowerMeans: 'Excess material wastage, defect scrap, or machine malfunction (Adverse).',
    examinerTip: 'Multiply the physical unit variance by the STANDARD price, not the actual price, to avoid contaminating usage with price effects.',
    inputs: [
      { key: 'sq', label: 'Standard Qty Allowed (kg)', defaultValue: 6000, suffix: 'kg' },
      { key: 'aq', label: 'Actual Qty Used (kg)', defaultValue: 6400, suffix: 'kg' },
      { key: 'sp', label: 'Standard Price (£)', defaultValue: 10, prefix: '£' }
    ],
    calculate: (inputs) => {
      const sq = inputs.sq || 0;
      const aq = inputs.aq || 0;
      const sp = inputs.sp || 0;
      const val = (sq - aq) * sp;
      const isFav = val >= 0;
      const formatted = `£${Math.abs(val).toLocaleString()} ${isFav ? '(F - Favourable)' : '(A - Adverse)'}`;
      return {
        result: val,
        formatted,
        status: isFav ? 'good' : 'warning',
        note: isFav ? 'Efficient material usage with minimal scrap waste.' : 'Excess material consumption on the production line.'
      };
    }
  },
  {
    id: 'gross-profit-margin',
    subject: 'accounting',
    name: 'Gross Profit Margin (%)',
    category: 'Financial Accounting',
    formula: '(Gross Profit / Revenue) × 100',
    symbolicFormula: '\\text{Gross Profit Margin (\\%)} = \\frac{\\text{Gross Profit}}{\\text{Revenue}} \\times 100',
    unit: '%',
    explanation: 'Measures the percentage of sales revenue remaining after deducting direct production cost of sales.',
    idealTarget: '30% - 50% depending on industry sector',
    whatHigherMeans: 'Strong pricing power or effective purchase cost control for raw materials / inventory.',
    whatLowerMeans: 'Higher supplier cost of goods sold, price discounts, or inventory theft/damage.',
    examinerTip: 'Do not confuse Margin (Gross Profit / Revenue) with Mark-up (Gross Profit / Cost of Sales)!',
    inputs: [
      { key: 'grossProfit', label: 'Gross Profit (£)', defaultValue: 120000, prefix: '£' },
      { key: 'revenue', label: 'Revenue / Turnover (£)', defaultValue: 300000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const gp = inputs.grossProfit || 0;
      const rev = inputs.revenue || 1;
      const res = (gp / rev) * 100;
      return {
        result: res,
        formatted: `${res.toFixed(2)}%`,
        status: res >= 40 ? 'good' : res >= 20 ? 'neutral' : 'warning',
        note: `Gross Profit Margin of ${res.toFixed(2)}% means £${(res / 100).toFixed(2)} gross profit is generated per £1 of sales.`
      };
    }
  },
  {
    id: 'mark-up',
    subject: 'accounting',
    name: 'Mark-Up (%)',
    category: 'Financial Accounting',
    formula: '(Gross Profit / Cost of Sales) × 100',
    symbolicFormula: '\\text{Mark-up (\\%)} = \\frac{\\text{Gross Profit}}{\\text{Cost of Sales}} \\times 100',
    unit: '%',
    explanation: 'Calculates the profit added as a percentage on top of the cost price of goods sold.',
    idealTarget: 'Higher mark-up without depressing sales volumes',
    whatHigherMeans: 'Goods are sold at a substantial premium above acquisition cost.',
    whatLowerMeans: 'Low margin per unit; requires high volume turnover to generate sufficient total profit.',
    examinerTip: 'If Mark-up is 25% (1/4), Margin is 20% (1/5). Formula conversion: Margin = Mark-up / (100 + Mark-up).',
    inputs: [
      { key: 'grossProfit', label: 'Gross Profit (£)', defaultValue: 60000, prefix: '£' },
      { key: 'costOfSales', label: 'Cost of Sales (£)', defaultValue: 180000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const gp = inputs.grossProfit || 0;
      const cos = inputs.costOfSales || 1;
      const res = (gp / cos) * 100;
      return {
        result: res,
        formatted: `${res.toFixed(2)}%`,
        status: res >= 33.33 ? 'good' : 'neutral',
        note: `Mark-up is ${res.toFixed(2)}%. Selling price is £${((gp + cos) / 1000).toFixed(1)}k on cost of £${(cos / 1000).toFixed(1)}k.`
      };
    }
  },
  {
    id: 'profit-margin',
    subject: 'accounting',
    name: 'Profit Margin (%) / Net Margin',
    category: 'Financial Accounting',
    formula: '(Profit for the Year / Revenue) × 100',
    symbolicFormula: '\\text{Profit Margin (\\%)} = \\frac{\\text{Profit for the Year}}{\\text{Revenue}} \\times 100',
    unit: '%',
    explanation: 'Measures overall operational profitability after deducting all cost of sales and operating overhead expenses from revenue.',
    idealTarget: '> 10% (can also be expressed after interest)',
    whatHigherMeans: 'Excellent overhead cost control and strong net earnings conversion.',
    whatLowerMeans: 'Excessive administrative, selling, or distribution overhead expenses draining gross profit.',
    examinerTip: 'Cambridge 9706 syllabus notes this can also be expressed as Profit for the year (after interest) / Revenue × 100.',
    inputs: [
      { key: 'netProfit', label: 'Profit for the Year (£)', defaultValue: 45000, prefix: '£' },
      { key: 'revenue', label: 'Revenue (£)', defaultValue: 300000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const np = inputs.netProfit || 0;
      const rev = inputs.revenue || 1;
      const res = (np / rev) * 100;
      return {
        result: res,
        formatted: `${res.toFixed(2)}%`,
        status: res >= 15 ? 'good' : res >= 8 ? 'neutral' : 'warning',
        note: `Net Profit Margin: ${res.toFixed(2)}% of total revenue is retained as profit for the business.`
      };
    }
  },
  {
    id: 'expenses-to-revenue',
    subject: 'accounting',
    name: 'Operating Expenses to Revenue Ratio (%)',
    category: 'Financial Accounting',
    formula: '(Operating Expenses / Revenue) × 100',
    symbolicFormula: '\\text{Operating Expenses to Revenue (\\%)} = \\frac{\\text{Operating Expenses}}{\\text{Revenue}} \\times 100',
    unit: '%',
    explanation: 'Assesses the overhead cost burden of the business relative to its turnover volume.',
    idealTarget: '< 25% (lower is better)',
    whatHigherMeans: 'Overheads (admin, marketing, rent, depreciation) are consuming a disproportionate share of turnover.',
    whatLowerMeans: 'Tight overhead cost discipline and lean operational structure.',
    examinerTip: 'Cambridge 9706 accepts both total expenses to revenue and operating expenses to revenue.',
    inputs: [
      { key: 'expenses', label: 'Operating Expenses (£)', defaultValue: 75000, prefix: '£' },
      { key: 'revenue', label: 'Revenue (£)', defaultValue: 300000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const exp = inputs.expenses || 0;
      const rev = inputs.revenue || 1;
      const res = (exp / rev) * 100;
      return {
        result: res,
        formatted: `${res.toFixed(2)}%`,
        status: res <= 25 ? 'good' : res <= 35 ? 'neutral' : 'warning',
        note: `Operating expenses represent ${res.toFixed(2)}% of total sales revenue.`
      };
    }
  },
  {
    id: 'trade-receivables-turnover',
    subject: 'accounting',
    name: 'Trade Receivables Turnover (Days)',
    category: 'Financial Accounting',
    formula: '(Trade Receivables / Credit Sales) × 365 days',
    symbolicFormula: '\\text{Receivables Turnover (Days)} = \\frac{\\text{Trade Receivables}}{\\text{Credit Sales}} \\times 365',
    unit: 'Days',
    explanation: 'The average number of days taken by trade credit customers to settle outstanding invoices.',
    idealTarget: '30 - 45 Days (or within agreed credit terms)',
    whatHigherMeans: 'Slow customer collections, higher risk of irrecoverable bad debts, and cash tied up in working capital.',
    whatLowerMeans: 'Prompt collection, excellent credit control, or early settlement discount incentives.',
    examinerTip: 'Always multiply by 365 days as specified in the Cambridge 9706 formula appendix.',
    inputs: [
      { key: 'receivables', label: 'Trade Receivables (£)', defaultValue: 35000, prefix: '£' },
      { key: 'creditSales', label: 'Credit Sales (£)', defaultValue: 280000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const rec = inputs.receivables || 0;
      const sales = inputs.creditSales || 1;
      const res = (rec / sales) * 365;
      return {
        result: res,
        formatted: `${res.toFixed(1)} days`,
        status: res <= 45 ? 'good' : res <= 60 ? 'neutral' : 'warning',
        note: `Customers take an average of ${res.toFixed(1)} days to pay their debts.`
      };
    }
  },
  {
    id: 'trade-payables-turnover',
    subject: 'accounting',
    name: 'Trade Payables Turnover (Days)',
    category: 'Financial Accounting',
    formula: '(Trade Payables / Credit Purchases) × 365 days',
    symbolicFormula: '\\text{Payables Turnover (Days)} = \\frac{\\text{Trade Payables}}{\\text{Credit Purchases}} \\times 365',
    unit: 'Days',
    explanation: 'The average number of days taken by the business to pay its trade suppliers for credit purchases.',
    idealTarget: '30 - 60 Days (balancing cash flow with supplier goodwill)',
    whatHigherMeans: 'Business is leaning on supplier credit to finance operations; risk of losing prompt-payment discounts or damaged supplier trust.',
    whatLowerMeans: 'Paying suppliers quickly; benefits from early cash discounts but uses own cash reserves.',
    examinerTip: 'Ensure denominator uses Credit Purchases (or Cost of Sales if purchases not provided).',
    inputs: [
      { key: 'payables', label: 'Trade Payables (£)', defaultValue: 24000, prefix: '£' },
      { key: 'creditPurchases', label: 'Credit Purchases (£)', defaultValue: 160000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const pay = inputs.payables || 0;
      const pur = inputs.creditPurchases || 1;
      const res = (pay / pur) * 365;
      return {
        result: res,
        formatted: `${res.toFixed(1)} days`,
        status: res <= 60 ? 'good' : 'neutral',
        note: `Takes on average ${res.toFixed(1)} days to settle trade supplier invoices.`
      };
    }
  },
  {
    id: 'inventory-turnover-days',
    subject: 'accounting',
    name: 'Inventory Turnover (Days) & Rate (Times)',
    category: 'Financial Accounting',
    formula: '(Average Inventory / Cost of Sales) × 365 days  |  (Cost of Sales / Average Inventory)',
    symbolicFormula: '\\text{Inventory Turnover (Days)} = \\frac{\\text{Average Inventory}}{\\text{Cost of Sales}} \\times 365',
    unit: 'Days / Times',
    explanation: 'Measures stock management velocity: how many days inventory sits in warehouse before being sold, and how many times stock is replaced per year.',
    idealTarget: '30 - 60 days (or 6 - 12 times/year depending on product perishability)',
    whatHigherMeans: 'Higher days = slow-moving stock, risk of obsolescence, high storage and insurance holding costs.',
    whatLowerMeans: 'Higher rate (times) = rapid inventory turnover and lean working capital.',
    examinerTip: 'Cambridge 9706 requires calculating either Days = (Average Inventory / Cost of Sales) * 365 OR Rate = Cost of Sales / Average Inventory.',
    inputs: [
      { key: 'avgInventory', label: 'Average Inventory (£)', defaultValue: 30000, prefix: '£' },
      { key: 'costOfSales', label: 'Cost of Sales (£)', defaultValue: 180000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const inv = inputs.avgInventory || 0;
      const cos = inputs.costOfSales || 1;
      const days = (inv / cos) * 365;
      const times = cos / (inv || 1);
      return {
        result: days,
        formatted: `${days.toFixed(1)} days (${times.toFixed(1)} times/yr)`,
        status: days <= 60 ? 'good' : 'warning',
        note: `Inventory turns over every ${days.toFixed(1)} days (${times.toFixed(1)} times per year).`
      };
    }
  },
  {
    id: 'non-current-asset-turnover',
    subject: 'accounting',
    name: 'Non-Current Asset Turnover (Times)',
    category: 'Financial Accounting',
    formula: 'Net Revenue / Total Net Book Value of Non-Current Assets',
    symbolicFormula: '\\text{NCATO} = \\frac{\\text{Net Revenue}}{\\text{Total Net Book Value of Non-Current Assets}}',
    unit: 'Times',
    explanation: 'Measures asset efficiency: how many pounds of turnover are generated per £1 invested in non-current assets.',
    idealTarget: '> 2.0 times',
    whatHigherMeans: 'High productivity of fixed assets; intensive equipment utilization.',
    whatLowerMeans: 'Over-investment in idle machinery or under-utilised property.',
    examinerTip: 'Denominator must use the Net Book Value (carrying value after accumulated depreciation), not original historical cost.',
    inputs: [
      { key: 'revenue', label: 'Net Revenue (£)', defaultValue: 500000, prefix: '£' },
      { key: 'netBookValue', label: 'NBV of Non-Current Assets (£)', defaultValue: 200000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const rev = inputs.revenue || 0;
      const nbv = inputs.netBookValue || 1;
      const res = rev / nbv;
      return {
        result: res,
        formatted: `${res.toFixed(2)} times`,
        status: res >= 2.0 ? 'good' : 'neutral',
        note: `Generates £${res.toFixed(2)} of sales revenue for every £1 of net non-current assets.`
      };
    }
  },
  {
    id: 'working-capital-cycle',
    subject: 'accounting',
    name: 'Working Capital Cycle (Cash Operating Cycle)',
    category: 'Financial Accounting',
    formula: 'Receivables Days + Inventory Days - Payables Days',
    symbolicFormula: '\\text{WCC (Days)} = \\text{Trade Receivables Days} + \\text{Inventory Days} - \\text{Trade Payables Days}',
    unit: 'Days',
    explanation: 'Calculates the net time lag between paying cash for raw materials/stock and receiving cash from customers.',
    idealTarget: '30 - 60 days (shorter reduces overdraft financing needs)',
    whatHigherMeans: 'Longer working capital cycle requires external short-term borrowing (bank overdraft) to fund operations.',
    whatLowerMeans: 'Lean cash conversion cycle; can even be negative in retail businesses collecting cash upfront.',
    examinerTip: 'Cambridge 9706 A-Level specific formula: Trade receivables turnover (days) + Inventory turnover (days) - Trade payables turnover (days).',
    inputs: [
      { key: 'recDays', label: 'Trade Receivables Days', defaultValue: 45, suffix: 'days' },
      { key: 'invDays', label: 'Inventory Turnover Days', defaultValue: 50, suffix: 'days' },
      { key: 'payDays', label: 'Trade Payables Days', defaultValue: 40, suffix: 'days' }
    ],
    calculate: (inputs) => {
      const rec = inputs.recDays || 0;
      const inv = inputs.invDays || 0;
      const pay = inputs.payDays || 0;
      const cycle = rec + inv - pay;
      return {
        result: cycle,
        formatted: `${cycle.toFixed(1)} days`,
        status: cycle <= 50 ? 'good' : 'warning',
        note: `Working capital cash conversion cycle is ${cycle.toFixed(1)} days.`
      };
    }
  },
  {
    id: 'net-working-assets-to-revenue',
    subject: 'accounting',
    name: 'Net Working Assets to Revenue (%)',
    category: 'Financial Accounting',
    formula: '(Net Working Assets / Revenue) × 100',
    symbolicFormula: '\\text{Net Working Assets to Revenue (\\%)} = \\frac{\\text{Inventories} + \\text{Receivables} - \\text{Payables}}{\\text{Revenue}} \\times 100',
    unit: '%',
    explanation: 'Measures the proportion of revenue tied up in operational working capital (Inventories + Receivables - Payables).',
    idealTarget: '10% - 20%',
    whatHigherMeans: 'Too much capital locked in operating cycle relative to turnover.',
    whatLowerMeans: 'Efficient working capital management with minimal capital tied up in stock and debtor balances.',
    examinerTip: 'Cambridge 9706 Definition: Net working assets = Inventories + Trade Receivables - Trade Payables.',
    inputs: [
      { key: 'inventories', label: 'Inventories (£)', defaultValue: 40000, prefix: '£' },
      { key: 'receivables', label: 'Trade Receivables (£)', defaultValue: 35000, prefix: '£' },
      { key: 'payables', label: 'Trade Payables (£)', defaultValue: 25000, prefix: '£' },
      { key: 'revenue', label: 'Revenue (£)', defaultValue: 300000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const inv = inputs.inventories || 0;
      const rec = inputs.receivables || 0;
      const pay = inputs.payables || 0;
      const rev = inputs.revenue || 1;
      const nwa = inv + rec - pay;
      const res = (nwa / rev) * 100;
      return {
        result: res,
        formatted: `${res.toFixed(2)}% (NWA: £${nwa.toLocaleString()})`,
        status: res <= 20 ? 'good' : 'neutral',
        note: `Net working assets of £${nwa.toLocaleString()} represent ${res.toFixed(2)}% of revenue.`
      };
    }
  },
  {
    id: 'interest-cover',
    subject: 'accounting',
    name: 'Interest Cover (Times)',
    category: 'Financial Accounting',
    formula: 'Profit from Operations / Interest Payable',
    symbolicFormula: '\\text{Interest Cover} = \\frac{\\text{Operating Profit (Profit from Operations)}}{\\text{Finance Cost / Interest Payable}}',
    unit: 'Times',
    explanation: 'Measures solvency safety: how many times the operating profit covers mandatory loan and debenture interest payments.',
    idealTarget: '> 3.0 times (under 1.5x is critical danger zone)',
    whatHigherMeans: 'Comfortable safety cushion; low risk of defaulting on debt interest even if trading profits drop.',
    whatLowerMeans: 'High risk of debt default; small drop in operating profit could make interest payments unaffordable.',
    examinerTip: 'Use Profit from operations (operating profit before interest and tax), not net profit after interest!',
    inputs: [
      { key: 'operatingProfit', label: 'Profit from Operations (£)', defaultValue: 120000, prefix: '£' },
      { key: 'interest', label: 'Interest Payable (£)', defaultValue: 25000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const op = inputs.operatingProfit || 0;
      const int = inputs.interest || 1;
      const res = op / int;
      return {
        result: res,
        formatted: `${res.toFixed(2)} times`,
        status: res >= 4.0 ? 'good' : res >= 2.0 ? 'neutral' : 'poor',
        note: res >= 3.0 ? 'Safe interest coverage buffer.' : 'Tight interest coverage; elevated default risk.'
      };
    }
  },
  {
    id: 'earnings-per-share',
    subject: 'accounting',
    name: 'Earnings Per Share (EPS)',
    category: 'Financial Accounting',
    formula: 'Profit for the Year / Number of Issued Ordinary Shares',
    symbolicFormula: '\\text{EPS} = \\frac{\\text{Profit for the Year (attributable to equity)}}{\\text{Number of Issued Ordinary Shares}}',
    unit: '£ / share',
    explanation: 'Calculates the net profit earned on each ordinary share in issue, the core metric for stock exchange valuation.',
    idealTarget: 'Consistent growth year-on-year',
    whatHigherMeans: 'Greater earning power per share; supports higher dividend payouts and share price appreciation.',
    whatLowerMeans: 'Diluted earnings or declining profitability.',
    examinerTip: 'Bonus issues increase share quantity without new capital, diluting historical EPS; rights issues bring cash inflow.',
    inputs: [
      { key: 'profit', label: 'Profit for the Year (£)', defaultValue: 150000, prefix: '£' },
      { key: 'shares', label: 'Number of Issued Shares', defaultValue: 500000 }
    ],
    calculate: (inputs) => {
      const p = inputs.profit || 0;
      const s = inputs.shares || 1;
      const res = p / s;
      const pence = (res * 100).toFixed(1);
      return {
        result: res,
        formatted: `£${res.toFixed(3)} (${pence}p per share)`,
        status: 'good',
        note: `Each ordinary share generates £${res.toFixed(3)} (${pence}p) of net earnings.`
      };
    }
  },
  {
    id: 'price-earnings-ratio',
    subject: 'accounting',
    name: 'Price / Earnings (P/E) Ratio',
    category: 'Financial Accounting',
    formula: 'Market Price per Share / Earnings per Share (EPS)',
    symbolicFormula: '\\text{P/E Ratio} = \\frac{\\text{Market Price per Share}}{\\text{EPS}}',
    unit: 'Ratio',
    explanation: 'Reflects market confidence: how many pounds investors are willing to pay for every £1 of current corporate earnings.',
    idealTarget: '12 - 25 (higher indicates high expected future growth)',
    whatHigherMeans: 'Investors expect strong future earnings growth or perceive the company as low risk.',
    whatLowerMeans: 'Market views company as mature, risky, or having declining future growth prospects.',
    examinerTip: 'A high P/E ratio means the share is priced expensively relative to its current profits.',
    inputs: [
      { key: 'marketPrice', label: 'Market Price per Share (£)', defaultValue: 4.50, prefix: '£' },
      { key: 'eps', label: 'Earnings per Share (£)', defaultValue: 0.30, prefix: '£' }
    ],
    calculate: (inputs) => {
      const price = inputs.marketPrice || 0;
      const eps = inputs.eps || 0.01;
      const res = price / eps;
      return {
        result: res,
        formatted: `${res.toFixed(1)} : 1`,
        status: res >= 12 && res <= 25 ? 'good' : 'neutral',
        note: `Investors are paying ${res.toFixed(1)} times annual earnings to buy shares.`
      };
    }
  },
  {
    id: 'dividend-per-share',
    subject: 'accounting',
    name: 'Dividend Per Share (DPS) & Dividend Yield (%)',
    category: 'Financial Accounting',
    formula: 'Annual Ordinary Dividend / Number of Issued Shares  |  (DPS / Market Price) × 100',
    symbolicFormula: '\\text{DPS} = \\frac{\\text{Interim Paid} + \\text{Final Proposed Dividend}}{\\text{Number of Ordinary Shares}}',
    unit: '£ / share & %',
    explanation: 'DPS is the cash dividend received per share. Dividend Yield expresses the dividend as a return percentage of current market share price.',
    idealTarget: '3% - 6% yield',
    whatHigherMeans: 'Attractive cash income stream for income-seeking investors.',
    whatLowerMeans: 'Low yield; company may be reinvesting profits for high capital growth.',
    examinerTip: 'Cambridge 9706 note: Annual ordinary dividend = Interim dividend paid + Final dividend proposed.',
    inputs: [
      { key: 'totalDividends', label: 'Annual Ordinary Dividends (£)', defaultValue: 60000, prefix: '£' },
      { key: 'shares', label: 'Number of Issued Shares', defaultValue: 500000 },
      { key: 'marketPrice', label: 'Market Price per Share (£)', defaultValue: 3.00, prefix: '£' }
    ],
    calculate: (inputs) => {
      const div = inputs.totalDividends || 0;
      const sh = inputs.shares || 1;
      const mp = inputs.marketPrice || 1;
      const dps = div / sh;
      const yieldPct = (dps / mp) * 100;
      return {
        result: dps,
        formatted: `DPS: £${dps.toFixed(2)} (${(dps * 100).toFixed(0)}p) | Yield: ${yieldPct.toFixed(2)}%`,
        status: yieldPct >= 3 ? 'good' : 'neutral',
        note: `Annual ordinary dividend of ${(dps * 100).toFixed(0)}p per share yields ${yieldPct.toFixed(2)}% on market price.`
      };
    }
  },
  {
    id: 'dividend-cover',
    subject: 'accounting',
    name: 'Dividend Cover (Times)',
    category: 'Financial Accounting',
    formula: 'Profit for the Year Available / Annual Ordinary Dividend',
    symbolicFormula: '\\text{Dividend Cover} = \\frac{\\text{Profit for the Year available to ordinary shareholders}}{\\text{Annual Ordinary Dividend}}',
    unit: 'Times',
    explanation: 'Measures how many times the annual ordinary dividend could be paid out of the current year’s profit.',
    idealTarget: '2.0 - 3.0 times',
    whatHigherMeans: 'High dividend security and large profit retention for internal expansion; safe from future profit dips.',
    whatLowerMeans: 'Low dividend cover (<1.5x) signals dividends are at risk if trading profits fall.',
    examinerTip: 'Dividend cover = EPS / DPS. If Dividend Cover is less than 1.0, the company is paying dividends out of past retained reserves!',
    inputs: [
      { key: 'profit', label: 'Profit for the Year (£)', defaultValue: 120000, prefix: '£' },
      { key: 'dividends', label: 'Annual Ordinary Dividend (£)', defaultValue: 40000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const p = inputs.profit || 0;
      const d = inputs.dividends || 1;
      const res = p / d;
      return {
        result: res,
        formatted: `${res.toFixed(2)} times`,
        status: res >= 2.0 ? 'good' : res >= 1.2 ? 'neutral' : 'warning',
        note: res >= 2.0 ? 'Safe dividend cover: profits cover ordinary dividend 2x or more.' : 'Low dividend cover: vulnerable to dividend cuts.'
      };
    }
  },
  {
    id: 'accounting-rate-of-return',
    subject: 'accounting',
    name: 'Accounting Rate of Return (ARR) (%)',
    category: 'Management Accounting & Costing',
    formula: '(Average Annual Accounting Profit / Average Investment) × 100',
    symbolicFormula: '\\text{ARR (\\%)} = \\frac{\\text{Average Annual Profit}}{\\frac{\\text{Initial Capital Outlay}}{2}} \\times 100',
    unit: '%',
    explanation: 'Evaluates capital investment proposals by expressing expected average accounting net profit as a percentage of average investment.',
    idealTarget: '> Target Hurdle Rate (e.g. 15% - 20%)',
    whatHigherMeans: 'Project delivers higher return on capital; should be accepted if ARR > Target Rate.',
    whatLowerMeans: 'Return does not meet company minimum threshold.',
    examinerTip: 'Cambridge 9706 syllabus note: Average investment = Initial investment / 2 (questions involving residual value at end of project will not be set).',
    inputs: [
      { key: 'totalProfit', label: 'Total Project Accounting Profit (£)', defaultValue: 90000, prefix: '£' },
      { key: 'projectLife', label: 'Project Lifespan (Years)', defaultValue: 5, suffix: 'yrs' },
      { key: 'initialCost', label: 'Initial Investment Outlay (£)', defaultValue: 100000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const totProf = inputs.totalProfit || 0;
      const life = inputs.projectLife || 1;
      const cost = inputs.initialCost || 1;
      const avgAnnualProfit = totProf / life;
      const avgInvestment = cost / 2;
      const arr = (avgAnnualProfit / avgInvestment) * 100;
      return {
        result: arr,
        formatted: `${arr.toFixed(2)}% per annum`,
        status: arr >= 15 ? 'good' : 'neutral',
        note: `Average Annual Profit: £${avgAnnualProfit.toLocaleString()}/yr on Average Investment £${avgInvestment.toLocaleString()}. ARR = ${arr.toFixed(2)}%.`
      };
    }
  },
  {
    id: 'activity-based-costing-rate',
    subject: 'accounting',
    name: 'Activity-Based Costing (ABC) Cost Driver Rate',
    category: 'Management Accounting & Costing',
    formula: 'Cost Pool Total (£) / Total Cost Driver Volume',
    symbolicFormula: '\\text{ABC Rate} = \\frac{\\text{Cost Pool Overhead (\\pounds)}}{\\text{Total Driver Volume (e.g. setups, orders, inspections)}}',
    unit: '£ / driver',
    explanation: 'Calculates the specific overhead rate per unit of activity (e.g. per machine setup, per purchase order, per quality inspection) to avoid arbitrary volume subsidisation.',
    idealTarget: 'Accurate cost causation allocation',
    whatHigherMeans: 'High activity cost per transaction; identifies processes requiring streamlining.',
    whatLowerMeans: 'Efficient activity execution.',
    examinerTip: 'ABC is superior to traditional OAR when overheads are high and products use resources in non-volume-proportional ways.',
    inputs: [
      { key: 'poolCost', label: 'Cost Pool Overhead (£)', defaultValue: 60000, prefix: '£' },
      { key: 'driverVolume', label: 'Total Activity Driver Volume', defaultValue: 150, suffix: 'setups' }
    ],
    calculate: (inputs) => {
      const cost = inputs.poolCost || 0;
      const vol = inputs.driverVolume || 1;
      const rate = cost / vol;
      return {
        result: rate,
        formatted: `£${rate.toFixed(2)} per setup/driver`,
        status: 'good',
        note: `Each activity transaction consumes £${rate.toFixed(2)} of overhead cost.`
      };
    }
  },
  {
    id: 'labour-rate-efficiency-variance',
    subject: 'accounting',
    name: 'Direct Labour Rate & Efficiency Variances',
    category: 'Management Accounting & Costing',
    formula: 'Rate: (SR - AR) × AH  |  Efficiency: (SH - AH) × SR',
    symbolicFormula: '\\text{LRV} = (SR - AR) \\times AH \\quad | \\quad \\text{LEV} = (SH - AH) \\times SR',
    unit: '£',
    explanation: 'Isolates whether labor cost differences were caused by wage changes (Rate Variance) or shopfloor worker productivity (Efficiency Variance).',
    idealTarget: '£0 or Favourable (F)',
    whatHigherMeans: 'Favourable: paid lower hourly rates or completed production in fewer hours than standard allowed.',
    whatLowerMeans: 'Adverse: overtime premiums, unbudgeted wage increases, or labor downtime/delays.',
    examinerTip: 'Multiply the hours variance by the STANDARD rate to calculate labour efficiency variance!',
    inputs: [
      { key: 'stdRate', label: 'Standard Rate per hour (£)', defaultValue: 15, prefix: '£' },
      { key: 'actRate', label: 'Actual Rate per hour (£)', defaultValue: 16.50, prefix: '£' },
      { key: 'stdHours', label: 'Standard Hours for Actual Output', defaultValue: 1000, suffix: 'hrs' },
      { key: 'actHours', label: 'Actual Hours Worked', defaultValue: 920, suffix: 'hrs' }
    ],
    calculate: (inputs) => {
      const sr = inputs.stdRate || 0;
      const ar = inputs.actRate || 0;
      const sh = inputs.stdHours || 0;
      const ah = inputs.actHours || 0;
      const rateVar = (sr - ar) * ah;
      const effVar = (sh - ah) * sr;
      const totLabVar = rateVar + effVar;
      return {
        result: totLabVar,
        formatted: `Rate: £${Math.abs(rateVar).toLocaleString()} ${rateVar >= 0 ? '(F)' : '(A)'} | Eff: £${Math.abs(effVar).toLocaleString()} ${effVar >= 0 ? '(F)' : '(A)'}`,
        status: totLabVar >= 0 ? 'good' : 'warning',
        note: `Total Labour Variance: £${Math.abs(totLabVar).toLocaleString()} ${totLabVar >= 0 ? 'Favourable' : 'Adverse'}. Higher skilled wages (-£${Math.abs(rateVar).toLocaleString()} A) yielded faster assembly (+£${Math.abs(effVar).toLocaleString()} F).`
      };
    }
  },
  {
    id: 'fixed-overhead-variances',
    subject: 'accounting',
    name: 'Fixed Overhead Expenditure & Volume Variances',
    category: 'Management Accounting & Costing',
    formula: 'Expenditure: Budgeted FO - Actual FO  |  Volume: (Actual Output - Budgeted Output) × FOAR',
    symbolicFormula: '\\text{FO Exp Var} = \\text{Budgeted} - \\text{Actual} \\quad | \\quad \\text{FO Vol Var} = (\\text{Act Units} - \\text{Bud Units}) \\times \\text{FOAR}',
    unit: '£',
    explanation: 'Expenditure variance measures deviations in actual spending on fixed overheads. Volume variance measures the cost impact of producing more or fewer units than budgeted.',
    idealTarget: '£0 or Favourable (F)',
    whatHigherMeans: 'Favourable volume variance: produced above budget, absorbing more fixed costs across output.',
    whatLowerMeans: 'Adverse volume variance: under-production leaving fixed overheads under-absorbed.',
    examinerTip: 'Fixed Overhead Volume Variance can be further broken into Capacity Variance and Efficiency Variance.',
    inputs: [
      { key: 'budgetFO', label: 'Budgeted Fixed Overhead (£)', defaultValue: 50000, prefix: '£' },
      { key: 'actualFO', label: 'Actual Fixed Overhead (£)', defaultValue: 52000, prefix: '£' },
      { key: 'budgetUnits', label: 'Budgeted Units', defaultValue: 10000 },
      { key: 'actualUnits', label: 'Actual Units Produced', defaultValue: 11000 }
    ],
    calculate: (inputs) => {
      const bFO = inputs.budgetFO || 0;
      const aFO = inputs.actualFO || 0;
      const bUnits = inputs.budgetUnits || 1;
      const aUnits = inputs.actualUnits || 0;
      const foar = bFO / bUnits;
      const expVar = bFO - aFO;
      const volVar = (aUnits - bUnits) * foar;
      const totFOVar = expVar + volVar;
      return {
        result: totFOVar,
        formatted: `Exp: £${Math.abs(expVar).toLocaleString()} ${expVar >= 0 ? '(F)' : '(A)'} | Vol: £${Math.abs(volVar).toLocaleString()} ${volVar >= 0 ? '(F)' : '(A)'}`,
        status: totFOVar >= 0 ? 'good' : 'warning',
        note: `FOAR: £${foar.toFixed(2)}/unit. Over-absorption of +£${volVar.toLocaleString()} volume offsets -£${Math.abs(expVar).toLocaleString()} expenditure excess.`
      };
    }
  },

  // ==========================================
  // 🏢 BUSINESS STUDIES FORMULAS
  // ==========================================
  {
    id: 'break-even-output',
    subject: 'business',
    name: 'Break-Even Output Quantity',
    category: 'Business Strategy & Finance',
    formula: 'Fixed Costs / (Selling Price - Variable Cost per unit)',
    symbolicFormula: '\\text{BEP} = \\frac{\\text{Fixed Costs}}{\\text{Contribution per Unit}}',
    unit: 'Units',
    explanation: 'The exact level of output where Total Revenue equals Total Costs (Zero Profit, Zero Loss).',
    idealTarget: 'Significantly below expected sales demand',
    whatHigherMeans: 'Higher sales volume required before breaking even; elevated operating leverage risk.',
    whatLowerMeans: 'Safety margin expands; business achieves profitability at lower sales volumes.',
    examinerTip: 'Always round UP to the next whole unit in business calculations, as you cannot sell a fraction of a product!',
    inputs: [
      { key: 'fc', label: 'Total Fixed Costs (£)', defaultValue: 120000, prefix: '£' },
      { key: 'price', label: 'Selling Price (£)', defaultValue: 50, prefix: '£' },
      { key: 'vc', label: 'Variable Cost per unit (£)', defaultValue: 20, prefix: '£' }
    ],
    calculate: (inputs) => {
      const fc = inputs.fc || 0;
      const p = inputs.price || 1;
      const vc = inputs.vc || 0;
      const contrib = p - vc;
      if (contrib <= 0) {
        return {
          result: 0,
          formatted: 'Impossible (Price <= Variable Cost)',
          status: 'poor',
          note: 'Negative or zero contribution per unit: each unit sold creates an operating loss!'
        };
      }
      const res = Math.ceil(fc / contrib);
      const formatted = `${res.toLocaleString()} units`;
      return {
        result: res,
        formatted,
        status: 'neutral',
        note: `Requires ${res.toLocaleString()} units to cover fixed overheads of £${fc.toLocaleString()}.`
      };
    }
  },
  {
    id: 'capacity-utilisation',
    subject: 'business',
    name: 'Capacity Utilisation Rate',
    category: 'Business Operations & Workforce',
    formula: '(Actual Output / Maximum Possible Output) × 100',
    symbolicFormula: '\\text{Capacity Utilisation} = \\frac{\\text{Actual Output}}{\\text{Maximum Capacity}} \\times 100',
    unit: '%',
    explanation: 'Measures the proportion of maximum production capacity currently in productive use.',
    idealTarget: '85% - 90% (Sweet spot between unit cost efficiency and operational flexibility)',
    whatHigherMeans: 'Lower average fixed costs per unit; however, 100% risks breakdowns, staff stress, and inability to accept sudden orders.',
    whatLowerMeans: 'High idle capacity causing higher average fixed overhead costs per unit.',
    examinerTip: 'Explain that rationalising capacity (subcontracting or selling factory space) lowers fixed costs and raises utilisation.',
    inputs: [
      { key: 'actual', label: 'Actual Output (units)', defaultValue: 42500, suffix: 'units' },
      { key: 'maxCap', label: 'Maximum Capacity (units)', defaultValue: 50000, suffix: 'units' }
    ],
    calculate: (inputs) => {
      const act = inputs.actual || 0;
      const max = inputs.maxCap || 1;
      const res = (act / max) * 100;
      const formatted = `${res.toFixed(1)}%`;
      return {
        result: res,
        formatted,
        status: res >= 80 && res <= 92 ? 'good' : res > 95 ? 'warning' : 'neutral',
        note: res >= 80 && res <= 92 ? 'Optimal operating zone balancing efficiency and flexibility.' : res > 95 ? 'Risk of machine wear and worker exhaustion.' : 'Under-utilised capacity.'
      };
    }
  },
  {
    id: 'labour-productivity',
    subject: 'business',
    name: 'Labour Productivity per Worker',
    category: 'Business Operations & Workforce',
    formula: 'Total Output Produced / Total Number of Employees',
    symbolicFormula: '\\text{Labour Productivity} = \\frac{\\text{Total Output}}{\\text{Number of Workers}}',
    unit: 'Units / Worker',
    explanation: 'Measures workforce efficiency by calculating output generated per employee over a specific time period.',
    idealTarget: 'Continuous upward trend',
    whatHigherMeans: 'Higher output per worker reduces direct labor costs per unit and boosts competitive pricing power.',
    whatLowerMeans: 'Low motivation, inadequate training, poor equipment, or surplus staffing.',
    examinerTip: 'Link labour productivity to Herzberg motivators and Kaizen training schemes in essay evaluations.',
    inputs: [
      { key: 'output', label: 'Total Output (units)', defaultValue: 80000, suffix: 'units' },
      { key: 'workers', label: 'Total Employees', defaultValue: 160 }
    ],
    calculate: (inputs) => {
      const out = inputs.output || 0;
      const w = inputs.workers || 1;
      const res = out / w;
      const formatted = `${res.toFixed(1)} units/worker`;
      return {
        result: res,
        formatted,
        status: 'good',
        note: `Each employee produces ${res.toFixed(1)} units on average.`
      };
    }
  },
  {
    id: 'decision-tree-emv',
    subject: 'business',
    name: 'Decision Tree Net Gain & EMV',
    category: 'Business Strategy & Finance',
    formula: 'Expected Monetary Value (EMV) - Initial Capital Cost',
    symbolicFormula: '\\text{Net Gain} = \\sum (\\text{Probability} \\times \\text{Payoff}) - \\text{Initial Cost}',
    unit: '£',
    explanation: 'Calculates the probability-weighted financial return of a strategic investment choice minus initial investment outlay.',
    idealTarget: 'Highest Positive Net Gain',
    whatHigherMeans: 'Project delivers higher risk-adjusted expected financial returns.',
    whatLowerMeans: 'Lower expected return or high chance of heavy loss.',
    examinerTip: 'In exams, note that probabilities are subjective estimates and do not account for external competitor reactions.',
    inputs: [
      { key: 'probSuccess', label: 'Success Probability (0-1)', defaultValue: 0.7 },
      { key: 'payoffSuccess', label: 'Success Payoff (£)', defaultValue: 600000, prefix: '£' },
      { key: 'payoffFail', label: 'Failure Payoff (£)', defaultValue: 100000, prefix: '£' },
      { key: 'cost', label: 'Initial Project Cost (£)', defaultValue: 300000, prefix: '£' }
    ],
    calculate: (inputs) => {
      const pSuccess = Math.min(1, Math.max(0, inputs.probSuccess || 0));
      const pFail = 1 - pSuccess;
      const paySuccess = inputs.payoffSuccess || 0;
      const payFail = inputs.payoffFail || 0;
      const cost = inputs.cost || 0;
      const emv = (pSuccess * paySuccess) + (pFail * payFail);
      const netGain = emv - cost;
      const formatted = `EMV: £${emv.toLocaleString()} | Net Gain: £${netGain.toLocaleString()}`;
      return {
        result: netGain,
        formatted,
        status: netGain > 0 ? 'good' : 'warning',
        note: netGain > 0 ? `Positive net gain of £${netGain.toLocaleString()} supports project approval.` : 'Negative net gain indicates project is not economically viable.'
      };
    }
  },

  // ==========================================
  // 📈 ECONOMICS FORMULAS
  // ==========================================
  {
    id: 'ped-formula',
    subject: 'economics',
    name: 'Price Elasticity of Demand (PED)',
    category: 'Microeconomics & Elasticities',
    formula: '% Change in Quantity Demanded / % Change in Price',
    symbolicFormula: '\\text{PED} = \\frac{\\% \\Delta Q_D}{\\% \\Delta P} = \\frac{\\frac{\\Delta Q}{Q_1}}{\\frac{\\Delta P}{P_1}} \\times 100',
    unit: 'Coefficient',
    explanation: 'Measures the responsiveness of consumer quantity demanded to a percentage change in the product’s price.',
    idealTarget: '|PED| < 1 (Inelastic) gives pricing power; |PED| > 1 (Elastic) favours price cuts.',
    whatHigherMeans: '|PED| > 1 (Price Elastic): Consumers are highly sensitive to price changes; price cuts boost Total Revenue.',
    whatLowerMeans: '|PED| < 1 (Price Inelastic): Necessity or brand loyalty; price hikes increase Total Revenue.',
    examinerTip: 'PED is almost always a negative number due to the law of demand. Always explain what the absolute magnitude (|PED|) means!',
    inputs: [
      { key: 'pctChangeQ', label: '% Change in Qty Demanded', defaultValue: -15, suffix: '%' },
      { key: 'pctChangeP', label: '% Change in Price', defaultValue: 10, suffix: '%' }
    ],
    calculate: (inputs) => {
      const dq = inputs.pctChangeQ || 0;
      const dp = inputs.pctChangeP || 1;
      const res = dq / dp;
      const absRes = Math.abs(res);
      const formatted = `${res.toFixed(2)} (${absRes > 1 ? 'Price Elastic' : absRes < 1 ? 'Price Inelastic' : 'Unitary'})`;
      return {
        result: res,
        formatted,
        status: absRes < 1 ? 'good' : 'neutral',
        note: absRes < 1 ? 'Inelastic demand: raising price expands total firm revenue.' : 'Elastic demand: raising price leads to a proportionately larger drop in sales.'
      };
    }
  },
  {
    id: 'keynesian-multiplier',
    subject: 'economics',
    name: 'Keynesian National Income Multiplier (k)',
    category: 'Macroeconomics & International',
    formula: '1 / (1 - MPC) = 1 / (MPS + MPT + MPM)',
    symbolicFormula: 'k = \\frac{1}{1 - \\text{MPC}} = \\frac{1}{\\text{MPW}}',
    unit: 'Multiplier (x)',
    explanation: 'Calculates the total multiplied change in National Income (Real GDP) resulting from an initial autonomous injection of government spending or investment.',
    idealTarget: 'k > 1.5x in developed economies',
    whatHigherMeans: 'Larger ripple effect of fiscal stimulus across the domestic circular flow of income.',
    whatLowerMeans: 'High leakage through savings, taxes, and import spending dampens fiscal impact.',
    examinerTip: 'In an open economy, the multiplier is reduced because money leaks out of the circular flow into imports (MPM) and taxes (MPT).',
    inputs: [
      { key: 'mpc', label: 'Marginal Propensity to Consume (MPC)', defaultValue: 0.75 }
    ],
    calculate: (inputs) => {
      const mpc = Math.min(0.99, Math.max(0.01, inputs.mpc || 0.5));
      const k = 1 / (1 - mpc);
      const formatted = `${k.toFixed(2)}x Multiplier`;
      return {
        result: k,
        formatted,
        status: k >= 2.0 ? 'good' : 'neutral',
        note: `An initial injection of £10bn generates £${(10 * k).toFixed(1)}bn in total cumulative GDP.`
      };
    }
  },
  {
    id: 'terms-of-trade',
    subject: 'economics',
    name: 'Terms of Trade Index',
    category: 'Macroeconomics & International',
    formula: '(Index of Export Prices / Index of Import Prices) × 100',
    symbolicFormula: '\\text{Terms of Trade} = \\frac{\\text{Export Price Index}}{\\text{Import Price Index}} \\times 100',
    unit: 'Index Points',
    explanation: 'Measures the relative price of a country’s exports compared to its imports; indicates how many units of imports can be bought per unit of exports.',
    idealTarget: '> 100 (Improving Terms of Trade)',
    whatHigherMeans: 'Favourable movement: A country can purchase more imports for the same volume of exports.',
    whatLowerMeans: 'Deteriorating terms of trade: Country must export a greater volume of goods to finance identical import levels.',
    examinerTip: 'An increase in export prices improves the terms of trade, but if export demand is elastic, export volume and total revenues will decline!',
    inputs: [
      { key: 'exportIndex', label: 'Export Price Index', defaultValue: 125 },
      { key: 'importIndex', label: 'Import Price Index', defaultValue: 105 }
    ],
    calculate: (inputs) => {
      const exp = inputs.exportIndex || 100;
      const imp = inputs.importIndex || 100;
      const tot = (exp / imp) * 100;
      const formatted = `${tot.toFixed(2)} Index Points`;
      return {
        result: tot,
        formatted,
        status: tot > 100 ? 'good' : 'warning',
        note: tot > 100 ? 'Terms of trade improved: export purchasing power is strong.' : 'Terms of trade deteriorated.'
      };
    }
  }
];
