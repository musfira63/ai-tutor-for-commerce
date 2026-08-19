import React, { useState } from 'react';
import { SubjectType } from '../types';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Sparkles,
  Landmark,
  Briefcase,
  GitBranch,
  ShieldAlert,
  Sliders,
  Scale
} from 'lucide-react';

interface CalculatorsLabProps {
  selectedSubject?: SubjectType;
}

export const CalculatorsLab: React.FC<CalculatorsLabProps> = ({ selectedSubject: initialSubject = 'all' }) => {
  const [activeSubjectTab, setActiveSubjectTab] = useState<SubjectType>(initialSubject === 'all' ? 'accounting' : initialSubject);
  const [activeLab, setActiveLab] = useState<string>('ledger-balance');

  // ==========================================
  // ACCOUNTING SIMULATORS STATE
  // ==========================================
  // 1. General Ledger Duality
  const [ledgerEntries, setLedgerEntries] = useState<Array<{ id: number; desc: string; account: string; type: 'debit' | 'credit'; amount: number }>>([
    { id: 1, desc: 'Owner initial capital contribution', account: 'Bank / Capital', type: 'debit', amount: 50000 },
    { id: 2, desc: 'Equity capital registered', account: 'Capital Account', type: 'credit', amount: 50000 },
    { id: 3, desc: 'Purchased delivery van for cash', account: 'Motor Vehicles (Asset)', type: 'debit', amount: 18000 },
    { id: 4, desc: 'Cash paid for delivery van', account: 'Bank (Asset)', type: 'credit', amount: 18000 },
    { id: 5, desc: 'Purchased raw materials on credit', account: 'Purchases / Inventory', type: 'debit', amount: 12000 },
    { id: 6, desc: 'Trade supplier invoice', account: 'Trade Payables (Liability)', type: 'credit', amount: 12000 },
  ]);
  const [newDesc, setNewDesc] = useState('');
  const [newAcc, setNewAcc] = useState('');
  const [newType, setNewType] = useState<'debit' | 'credit'>('debit');
  const [newAmount, setNewAmount] = useState<number>(5000);

  const totalDebits = ledgerEntries.filter(e => e.type === 'debit').reduce((sum, e) => sum + e.amount, 0);
  const totalCredits = ledgerEntries.filter(e => e.type === 'credit').reduce((sum, e) => sum + e.amount, 0);
  const isLedgerBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  // 2. Standard Costing & Variances
  const [stdMaterialPrice, setStdMaterialPrice] = useState(10);
  const [actMaterialPrice, setActMaterialPrice] = useState(11.2);
  const [actMaterialQty, setActMaterialQty] = useState(4500);
  const [stdMaterialQtyAllowed, setStdMaterialQtyAllowed] = useState(4000);

  const [stdLabourRate, setStdLabourRate] = useState(15);
  const [actLabourRate, setActLabourRate] = useState(14.5);
  const [actLabourHours, setActLabourHours] = useState(1200);
  const [stdLabourHoursAllowed, setStdLabourHoursAllowed] = useState(1100);

  const matPriceVar = (stdMaterialPrice - actMaterialPrice) * actMaterialQty;
  const matUsageVar = (stdMaterialQtyAllowed - actMaterialQty) * stdMaterialPrice;
  const labRateVar = (stdLabourRate - actLabourRate) * actLabourHours;
  const labEffVar = (stdLabourHoursAllowed - actLabourHours) * stdLabourRate;
  const totalVariance = matPriceVar + matUsageVar + labRateVar + labEffVar;

  // 3. Provision for Depreciation & Asset Disposal State
  const [deprAssetName, setDeprAssetName] = useState('Commercial Delivery Van');
  const [deprAssetCost, setDeprAssetCost] = useState(48000);
  const [deprMethod, setDeprMethod] = useState<'straight-line' | 'reducing-balance'>('straight-line');
  const [deprResidualValue, setDeprResidualValue] = useState(6000);
  const [deprUsefulLife, setDeprUsefulLife] = useState(4);
  const [deprReducingRate, setDeprReducingRate] = useState(25);
  const [deprDisposalYear, setDeprDisposalYear] = useState(3);
  const [deprDisposalProceeds, setDeprDisposalProceeds] = useState(20000);
  const [deprProceedsType, setDeprProceedsType] = useState<'bank' | 'part-exchange'>('bank');

  // Compute Year-by-Year Depreciation Schedule
  const deprSchedule: Array<{
    year: number;
    openingNbv: number;
    deprCharge: number;
    accumulatedDepr: number;
    closingNbv: number;
  }> = [];

  let currentNbv = deprAssetCost;
  let runningAccDepr = 0;
  const maxYears = Math.max(deprUsefulLife, deprDisposalYear, 4);

  for (let yr = 1; yr <= maxYears; yr++) {
    const opening = currentNbv;
    let charge = 0;
    if (deprMethod === 'straight-line') {
      charge = Math.max(0, (deprAssetCost - deprResidualValue) / (deprUsefulLife || 1));
      charge = Math.min(charge, Math.max(0, currentNbv - deprResidualValue));
    } else {
      charge = currentNbv * (deprReducingRate / 100);
    }
    runningAccDepr += charge;
    const closing = Math.max(0, opening - charge);
    deprSchedule.push({
      year: yr,
      openingNbv: opening,
      deprCharge: charge,
      accumulatedDepr: runningAccDepr,
      closingNbv: closing
    });
    currentNbv = closing;
  }

  // Values at chosen disposal year
  const disposalScheduleRow = deprSchedule[deprDisposalYear - 1] || deprSchedule[0];
  const accDeprAtDisposal = disposalScheduleRow ? disposalScheduleRow.accumulatedDepr : 0;
  const nbvAtDisposal = Math.max(0, deprAssetCost - accDeprAtDisposal);
  const profitOrLossOnDisposal = deprDisposalProceeds - nbvAtDisposal;
  const isDisposalProfit = profitOrLossOnDisposal >= 0;

  // ==========================================
  // BUSINESS SIMULATORS STATE
  // ==========================================
  // 1. Decision Tree EMV Simulator
  const [dtCostA, setDtCostA] = useState(300000);
  const [dtProbSuccessA, setDtProbSuccessA] = useState(0.70);
  const [dtPayoffSuccessA, setDtPayoffSuccessA] = useState(800000);
  const [dtPayoffFailA, setDtPayoffFailA] = useState(150000);

  const [dtCostB, setDtCostB] = useState(150000);
  const [dtProbSuccessB, setDtProbSuccessB] = useState(0.85);
  const [dtPayoffSuccessB, setDtPayoffSuccessB] = useState(450000);
  const [dtPayoffFailB, setDtPayoffFailB] = useState(100000);

  const emvA = (dtProbSuccessA * dtPayoffSuccessA) + ((1 - dtProbSuccessA) * dtPayoffFailA);
  const netGainA = emvA - dtCostA;
  const emvB = (dtProbSuccessB * dtPayoffSuccessB) + ((1 - dtProbSuccessB) * dtPayoffFailB);
  const netGainB = emvB - dtCostB;

  // 2. Break-Even & Contribution
  const [bePrice, setBePrice] = useState(60);
  const [beVarCost, setBeVarCost] = useState(25);
  const [beFixedCost, setBeFixedCost] = useState(140000);
  const [beExpectedSales, setBeExpectedSales] = useState(6000);

  const beUnitContrib = bePrice - beVarCost;
  const breakEvenUnits = beUnitContrib > 0 ? Math.ceil(beFixedCost / beUnitContrib) : 0;
  const marginOfSafety = Math.max(0, beExpectedSales - breakEvenUnits);
  const totalRevAtExpected = beExpectedSales * bePrice;
  const totalCostAtExpected = beFixedCost + (beExpectedSales * beVarCost);
  const profitAtExpected = totalRevAtExpected - totalCostAtExpected;

  // ==========================================
  // ECONOMICS SIMULATORS STATE
  // ==========================================
  // 1. Supply, Demand & Tax Incidence
  const [baseEquilibriumPrice, setBaseEquilibriumPrice] = useState(50);
  const [baseEquilibriumQty, setBaseEquilibriumQty] = useState(1000);
  const [demandPed, setDemandPed] = useState(0.6); // Inelastic
  const [supplyPes, setSupplyPes] = useState(1.2); // Elastic
  const [specificTax, setSpecificTax] = useState(10); // £10 tax per unit

  // Incidence math: fraction of tax paid by consumer = PES / (PED + PES)
  const consumerTaxShare = (supplyPes / (demandPed + supplyPes)) * specificTax;
  const producerTaxShare = specificTax - consumerTaxShare;
  const newConsumerPrice = baseEquilibriumPrice + consumerTaxShare;
  const newProducerNetPrice = baseEquilibriumPrice - producerTaxShare;
  const newQuantity = Math.round(baseEquilibriumQty * (1 - (demandPed * (consumerTaxShare / baseEquilibriumPrice))));
  const totalTaxRevenue = newQuantity * specificTax;
  const deadweightLoss = 0.5 * (baseEquilibriumQty - newQuantity) * specificTax;

  // 2. Keynesian Multiplier & Macro Output Gap
  const [autonomousInjection, setAutonomousInjection] = useState(20); // £bn
  const [mpcVal, setMpcVal] = useState(0.75); // MPC = 0.75 => Multiplier = 4
  const [actualGdp, setActualGdp] = useState(2200); // £bn
  const [potentialYfe, setPotentialYfe] = useState(2300); // £bn

  const multiplierK = 1 / (1 - Math.min(0.95, Math.max(0.05, mpcVal)));
  const totalGdpImpact = autonomousInjection * multiplierK;
  const postStimulusGdp = actualGdp + totalGdpImpact;
  const outputGap = postStimulusGdp - potentialYfe;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                Interactive Decision Simulators
              </span>
              <span className="text-xs text-slate-500">Real-Time Mathematical Models</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              A-Level Quantitative Sandbox & Simulation Lab
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Experiment with general ledgers, standard costing variances, decision tree EMVs, break-even charts, and macroeconomic multipliers.
            </p>
          </div>

          {/* Subject Navigation Tabs inside Simulators */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => {
                setActiveSubjectTab('accounting');
                setActiveLab('ledger-balance');
              }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                activeSubjectTab === 'accounting'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Landmark className="h-3.5 w-3.5" />
              <span>Accounting Labs</span>
            </button>

            <button
              onClick={() => {
                setActiveSubjectTab('business');
                setActiveLab('decision-tree');
              }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                activeSubjectTab === 'business'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Business Labs</span>
            </button>

            <button
              onClick={() => {
                setActiveSubjectTab('economics');
                setActiveLab('tax-incidence');
              }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                activeSubjectTab === 'economics'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Economics Labs</span>
            </button>
          </div>
        </div>

        {/* Sub-Lab Selector Pills */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
          {activeSubjectTab === 'accounting' && (
            <>
              <button
                onClick={() => setActiveLab('ledger-balance')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeLab === 'ledger-balance'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1. General Ledger Duality & Trial Balance
              </button>
              <button
                onClick={() => setActiveLab('variance-flexer')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeLab === 'variance-flexer'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                2. Standard Costing & Variance Analysis Flexer
              </button>
              <button
                onClick={() => setActiveLab('depreciation-disposal')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeLab === 'depreciation-disposal'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3. Provision for Depreciation & Asset Disposal Engine
              </button>
            </>
          )}

          {activeSubjectTab === 'business' && (
            <>
              <button
                onClick={() => setActiveLab('decision-tree')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeLab === 'decision-tree'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1. Decision Tree Expected Monetary Value (EMV)
              </button>
              <button
                onClick={() => setActiveLab('breakeven-graph')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeLab === 'breakeven-graph'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                2. Dynamic Break-Even & Contribution Chart
              </button>
            </>
          )}

          {activeSubjectTab === 'economics' && (
            <>
              <button
                onClick={() => setActiveLab('tax-incidence')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeLab === 'tax-incidence'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1. Supply & Demand Elasticity & Tax Incidence
              </button>
              <button
                onClick={() => setActiveLab('multiplier-output-gap')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeLab === 'multiplier-output-gap'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                2. Keynesian Multiplier & Output Gap Simulator
              </button>
            </>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. ACCOUNTING: LEDGER & TRIAL BALANCE      */}
      {/* ========================================== */}
      {activeSubjectTab === 'accounting' && activeLab === 'ledger-balance' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Ledger Input Form */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900">Post New General Ledger Entry</h2>
                <span className="text-[11px] text-slate-500 font-mono">DEAD CLIC Rule</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block">Transaction Narrative:</label>
                  <input
                    type="text"
                    placeholder="e.g. Paid factory electricity bill"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block">Account Title:</label>
                  <input
                    type="text"
                    placeholder="e.g. Electricity Expense / Bank"
                    value={newAcc}
                    onChange={(e) => setNewAcc(e.target.value)}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block">Entry Type:</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as 'debit' | 'credit')}
                      className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="debit">Debit Entry (Dr)</option>
                      <option value="credit">Credit Entry (Cr)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block">Amount (£):</label>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(Number(e.target.value))}
                      className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!newDesc || !newAcc) return;
                    setLedgerEntries(prev => [
                      ...prev,
                      { id: Date.now(), desc: newDesc, account: newAcc, type: newType, amount: newAmount }
                    ]);
                    setNewDesc('');
                    setNewAcc('');
                  }}
                  className="w-full rounded-lg bg-blue-600 py-2 font-bold text-white hover:bg-blue-700 transition shadow-xs text-xs"
                >
                  + Post Ledger Transaction
                </button>
              </div>

              {/* Duality Cheat Sheet */}
              <div className="rounded-lg bg-blue-50/70 p-3 text-xs border border-blue-200">
                <span className="font-bold text-blue-950 block mb-1">Double-Entry Memory Rule:</span>
                <p className="text-blue-900 text-[11px]">
                  <strong>D.E.A.D:</strong> Debit increases <u>D</u>rawings, <u>E</u>xpenses, <u>A</u>ssets.<br/>
                  <strong>C.L.I.C:</strong> Credit increases <u>C</u>apital, <u>L</u>iabilities, <u>I</u>ncome.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Trial Balance */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Extracted Trial Balance</h2>
                  <p className="text-xs text-slate-500">Verify whether Total Debits equal Total Credits.</p>
                </div>

                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  isLedgerBalanced ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {isLedgerBalanced ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <span>{isLedgerBalanced ? 'Trial Balance Balanced' : `Out of Balance by £${Math.abs(totalDebits - totalCredits).toLocaleString()}`}</span>
                </div>
              </div>

              {/* Entries Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Transaction Narrative</th>
                      <th className="px-3 py-2">Account</th>
                      <th className="px-3 py-2 text-right">Debit (Dr) £</th>
                      <th className="px-3 py-2 text-right">Credit (Cr) £</th>
                      <th className="px-2 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {ledgerEntries.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-medium text-slate-800">{e.desc}</td>
                        <td className="px-3 py-2 text-slate-600 font-mono">{e.account}</td>
                        <td className="px-3 py-2 text-right font-mono font-semibold text-slate-900">
                          {e.type === 'debit' ? `£${e.amount.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-3 py-2 text-right font-mono font-semibold text-slate-900">
                          {e.type === 'credit' ? `£${e.amount.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={() => setLedgerEntries(prev => prev.filter(item => item.id !== e.id))}
                            className="text-slate-400 hover:text-rose-600 font-bold"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-900 text-white font-mono font-bold text-xs">
                    <tr>
                      <td colSpan={2} className="px-3 py-2 text-emerald-300 uppercase">
                        Trial Balance Totals
                      </td>
                      <td className="px-3 py-2 text-right text-emerald-400">
                        £{totalDebits.toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-right text-emerald-400">
                        £{totalCredits.toLocaleString()}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {!isLedgerBalanced && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900">
                  <strong>Examiner Error Alert: </strong>
                  The difference of £{Math.abs(totalDebits - totalCredits).toLocaleString()} must be posted to a temporary <strong>Suspense Account</strong> until correcting journal entries are discovered!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. ACCOUNTING: VARIANCE ANALYSIS FLEXER    */}
      {/* ========================================== */}
      {activeSubjectTab === 'accounting' && activeLab === 'variance-flexer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Direct Material Variances */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">1. Direct Material Variances</h3>
                <p className="text-xs text-slate-500">Isolates purchasing price changes from shop-floor material usage.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Standard Price (£/kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={stdMaterialPrice}
                    onChange={(e) => setStdMaterialPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Actual Price Paid (£/kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={actMaterialPrice}
                    onChange={(e) => setActMaterialPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Standard Qty Allowed (kg):</label>
                  <input
                    type="number"
                    value={stdMaterialQtyAllowed}
                    onChange={(e) => setStdMaterialQtyAllowed(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Actual Qty Used (kg):</label>
                  <input
                    type="number"
                    value={actMaterialQty}
                    onChange={(e) => setActMaterialQty(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Material Variance Badges */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-700">Material Price Variance (MPV):</span>
                  <span className={`font-mono font-bold ${matPriceVar >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    £{Math.abs(matPriceVar).toLocaleString()} {matPriceVar >= 0 ? '(F - Favourable)' : '(A - Adverse)'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-700">Material Usage Variance (MUV):</span>
                  <span className={`font-mono font-bold ${matUsageVar >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    £{Math.abs(matUsageVar).toLocaleString()} {matUsageVar >= 0 ? '(F - Favourable)' : '(A - Adverse)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Labour Variances */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">2. Direct Labour Variances</h3>
                <p className="text-xs text-slate-500">Separates hourly wage rate deviations from labor productivity.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Standard Wage Rate (£/hr):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={stdLabourRate}
                    onChange={(e) => setStdLabourRate(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Actual Wage Rate (£/hr):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={actLabourRate}
                    onChange={(e) => setActLabourRate(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Standard Hours Allowed:</label>
                  <input
                    type="number"
                    value={stdLabourHoursAllowed}
                    onChange={(e) => setStdLabourHoursAllowed(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Actual Hours Worked:</label>
                  <input
                    type="number"
                    value={actLabourHours}
                    onChange={(e) => setActLabourHours(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Labour Variance Badges */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-700">Labour Rate Variance (LRV):</span>
                  <span className={`font-mono font-bold ${labRateVar >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    £{Math.abs(labRateVar).toLocaleString()} {labRateVar >= 0 ? '(F - Favourable)' : '(A - Adverse)'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-700">Labour Efficiency Variance (LEV):</span>
                  <span className={`font-mono font-bold ${labEffVar >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    £{Math.abs(labEffVar).toLocaleString()} {labEffVar >= 0 ? '(F - Favourable)' : '(A - Adverse)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Synoptic Total Variance Banner */}
          <div className="rounded-xl bg-slate-900 p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400">Total Net Operating Cost Variance</span>
              <div className="text-2xl font-bold mt-0.5 font-mono">
                £{Math.abs(totalVariance).toLocaleString()} {totalVariance >= 0 ? '(Net Favourable)' : '(Net Adverse)'}
              </div>
            </div>
            <div className="text-xs text-slate-300 max-w-md">
              <strong>Examiner Synthesis: </strong>
              {matPriceVar > 0 && matUsageVar < 0
                ? 'Classic trade-off: Buying cheaper materials caused higher scrap waste and machine rework.'
                : 'Variances must be evaluated holistically across cross-departmental operations.'}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. ACCOUNTING: DEPRECIATION & DISPOSAL LAB */}
      {/* ========================================== */}
      {activeSubjectTab === 'accounting' && activeLab === 'depreciation-disposal' && (
        <div className="space-y-6">
          {/* Controls and Input Parameters */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="rounded bg-blue-600 px-2 py-0.5 text-xs font-bold text-white uppercase">
                  Accounting Lab 3
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Provision for Depreciation & Asset Disposal Ledger Simulator
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate Straight-Line vs Reducing Balance depreciation, generate annual schedules, and execute the 4-step Disposal Ledger protocol.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDeprMethod('straight-line');
                    setDeprAssetCost(48000);
                    setDeprResidualValue(6000);
                    setDeprUsefulLife(4);
                    setDeprDisposalYear(3);
                    setDeprDisposalProceeds(20000);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    deprMethod === 'straight-line' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Straight-Line Mode
                </button>
                <button
                  onClick={() => {
                    setDeprMethod('reducing-balance');
                    setDeprAssetCost(50000);
                    setDeprReducingRate(25);
                    setDeprDisposalYear(3);
                    setDeprDisposalProceeds(22000);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    deprMethod === 'reducing-balance' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Reducing Balance Mode
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Non-Current Asset Description:</label>
                <input
                  type="text"
                  value={deprAssetName}
                  onChange={(e) => setDeprAssetName(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Original Historical Cost (£):</label>
                <input
                  type="number"
                  step="1000"
                  value={deprAssetCost}
                  onChange={(e) => setDeprAssetCost(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 font-bold font-mono text-slate-900"
                />
              </div>

              {deprMethod === 'straight-line' ? (
                <>
                  <div>
                    <label className="font-semibold text-slate-700">Residual Scrap Value (£):</label>
                    <input
                      type="number"
                      step="500"
                      value={deprResidualValue}
                      onChange={(e) => setDeprResidualValue(Number(e.target.value))}
                      className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 font-bold font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Useful Economic Life (Years):</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={deprUsefulLife}
                      onChange={(e) => setDeprUsefulLife(Math.max(1, Number(e.target.value)))}
                      className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 font-bold font-mono text-slate-900"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="font-semibold text-slate-700">Reducing Balance Rate (% per annum):</label>
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={deprReducingRate}
                      onChange={(e) => setDeprReducingRate(Number(e.target.value))}
                      className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 font-bold font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Estimated Horizon (Years):</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={deprUsefulLife}
                      onChange={(e) => setDeprUsefulLife(Math.max(1, Number(e.target.value)))}
                      className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 font-bold font-mono text-slate-900"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Disposal Parameters Sub-Box */}
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
              <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600" />
                Asset Disposal & Realisation Parameters
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-medium text-slate-600">Disposal Takes Place in Year:</label>
                  <select
                    value={deprDisposalYear}
                    onChange={(e) => setDeprDisposalYear(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1.5 font-bold text-slate-900"
                  >
                    {deprSchedule.map((row) => (
                      <option key={row.year} value={row.year}>
                        End of Year {row.year} (Book Value: £{row.closingNbv.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-600">Disposal Proceeds / Trade-In (£):</label>
                  <input
                    type="number"
                    step="500"
                    value={deprDisposalProceeds}
                    onChange={(e) => setDeprDisposalProceeds(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1.5 font-bold font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-600">Proceeds Settlement Method:</label>
                  <select
                    value={deprProceedsType}
                    onChange={(e) => setDeprProceedsType(e.target.value as 'bank' | 'part-exchange')}
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1.5 font-semibold text-slate-900"
                  >
                    <option value="bank">Cash / Bank Received (Dr Bank)</option>
                    <option value="part-exchange">Part-Exchange Allowance (Dr New Asset Cost)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Calculation Result Banner */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Accumulated Depreciation (Yr {deprDisposalYear})</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                £{accDeprAtDisposal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Total economic cost charged to P&L to date
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Carrying Value / Net Book Value</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                £{nbvAtDisposal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Cost (£{deprAssetCost.toLocaleString()}) - Acc Depr (£{accDeprAtDisposal.toLocaleString()})
              </p>
            </div>

            <div className={`rounded-xl border p-4 shadow-sm ${
              isDisposalProfit ? 'bg-emerald-50/70 border-emerald-300' : 'bg-rose-50/70 border-rose-300'
            }`}>
              <span className={`text-[11px] font-bold uppercase ${isDisposalProfit ? 'text-emerald-800' : 'text-rose-800'}`}>
                {isDisposalProfit ? 'Profit on Disposal (Cr P&L)' : 'Loss on Disposal (Dr P&L)'}
              </span>
              <div className={`text-xl font-bold font-mono mt-1 ${isDisposalProfit ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isDisposalProfit ? '+' : '-'}£{Math.abs(profitOrLossOnDisposal).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </div>
              <p className={`text-[11px] mt-0.5 ${isDisposalProfit ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isDisposalProfit 
                  ? 'Proceeds exceed Net Book Value: Credited to Income Statement' 
                  : 'Proceeds below Net Book Value: Debited as Operating Expense'}
              </p>
            </div>
          </div>

          {/* Year-by-Year Depreciation Schedule Table */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                Year-by-Year Depreciation Schedule ({deprMethod === 'straight-line' ? 'Straight-Line' : `Reducing Balance @ ${deprReducingRate}%`})
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">
                Asset: {deprAssetName}
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2">Year</th>
                    <th className="px-3 py-2 text-right">Opening NBV (£)</th>
                    <th className="px-3 py-2 text-right">Annual Depr Charge (£)</th>
                    <th className="px-3 py-2 text-right">Cumulative Acc. Depr (£)</th>
                    <th className="px-3 py-2 text-right">Closing Net Book Value (£)</th>
                    <th className="px-3 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {deprSchedule.map((row) => {
                    const isDisposalRow = row.year === deprDisposalYear;
                    return (
                      <tr 
                        key={row.year} 
                        className={`transition ${
                          isDisposalRow ? 'bg-amber-50 font-semibold text-amber-950' : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="px-3 py-2 font-mono">Year {row.year}</td>
                        <td className="px-3 py-2 text-right font-mono">£{row.openingNbv.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 text-right font-mono text-blue-700 font-semibold">£{row.deprCharge.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 text-right font-mono text-slate-600">£{row.accumulatedDepr.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 text-right font-mono font-bold text-slate-900">£{row.closingNbv.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 text-center">
                          {isDisposalRow ? (
                            <span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900 uppercase">
                              Disposal Event
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">In Active Use</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Double-Entry Ledger Accounts (T-Accounts) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-600" />
                The 4-Step General Ledger T-Accounts (Disposal Protocol)
              </h4>
              <span className="text-xs text-slate-500 font-mono">Full Double-Entry Proof</span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* 1. Asset at Cost Account */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
                <div className="text-center font-bold text-xs uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1">
                  Non-Current Asset at Cost Account ({deprAssetName})
                </div>
                <div className="grid grid-cols-2 divide-x divide-slate-300 text-xs font-mono min-h-[110px]">
                  {/* Debit Side */}
                  <div className="pr-2 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Debit (Dr)</div>
                    <div className="flex justify-between text-slate-800">
                      <span>Bank / Supplier</span>
                      <span className="font-bold">£{deprAssetCost.toLocaleString()}</span>
                    </div>
                  </div>
                  {/* Credit Side */}
                  <div className="pl-2 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Credit (Cr)</div>
                    <div className="flex justify-between text-slate-800 bg-rose-50 p-1 rounded">
                      <span className="text-rose-900 font-semibold">[Step 1] Disposal A/c</span>
                      <span className="font-bold text-rose-900">£{deprAssetCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-1 text-[11px] text-slate-500 italic">
                  Note: Step 1 removes the original cost of £{deprAssetCost.toLocaleString()} from the Asset account into the Disposal account.
                </div>
              </div>

              {/* 2. Provision for Depreciation Account */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
                <div className="text-center font-bold text-xs uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1">
                  Provision for Depreciation Account
                </div>
                <div className="grid grid-cols-2 divide-x divide-slate-300 text-xs font-mono min-h-[110px]">
                  {/* Debit Side */}
                  <div className="pr-2 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Debit (Dr)</div>
                    <div className="flex justify-between text-slate-800 bg-blue-50 p-1 rounded">
                      <span className="text-blue-900 font-semibold">[Step 2] Disposal A/c</span>
                      <span className="font-bold text-blue-900">£{accDeprAtDisposal.toLocaleString()}</span>
                    </div>
                  </div>
                  {/* Credit Side */}
                  <div className="pl-2 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Credit (Cr)</div>
                    <div className="flex justify-between text-slate-700">
                      <span>Income Stmt (Yr 1..{deprDisposalYear})</span>
                      <span className="font-bold">£{accDeprAtDisposal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-1 text-[11px] text-slate-500 italic">
                  Note: Step 2 debits the provision account to remove £{accDeprAtDisposal.toLocaleString()} of accumulated depreciation.
                </div>
              </div>

              {/* 3. Disposal Account (The Central Master Clearing Account) */}
              <div className="lg:col-span-2 rounded-xl border-2 border-slate-900 bg-white p-5 shadow-sm space-y-3">
                <div className="text-center font-bold text-sm uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 flex items-center justify-center gap-2">
                  <Scale className="h-4 w-4 text-emerald-600" />
                  <span>Disposal of Non-Current Asset Account</span>
                </div>
                <div className="grid grid-cols-2 divide-x-2 divide-slate-900 text-xs font-mono min-h-[160px]">
                  {/* Debit Side */}
                  <div className="pr-3 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-1">
                      Debit (Dr)
                    </div>
                    <div className="flex justify-between text-slate-800">
                      <span>[Step 1] Asset at Cost</span>
                      <span className="font-bold">£{deprAssetCost.toLocaleString()}</span>
                    </div>
                    {isDisposalProfit && (
                      <div className="flex justify-between text-emerald-950 bg-emerald-100/70 p-1.5 rounded border border-emerald-300">
                        <span className="font-bold">[Step 4] Income Stmt (Profit on Disposal)</span>
                        <span className="font-bold">£{profitOrLossOnDisposal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-6 flex justify-between border-t-2 border-slate-900 font-bold text-slate-900">
                      <span>Total Debit</span>
                      <span>£{(isDisposalProfit ? deprAssetCost + profitOrLossOnDisposal : deprAssetCost).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Credit Side */}
                  <div className="pl-3 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-1">
                      Credit (Cr)
                    </div>
                    <div className="flex justify-between text-slate-800">
                      <span>[Step 2] Provision for Depreciation</span>
                      <span className="font-bold">£{accDeprAtDisposal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-800 bg-slate-50 p-1 rounded border border-slate-200">
                      <span className="font-semibold">[Step 3] {deprProceedsType === 'bank' ? 'Bank (Proceeds)' : 'New Asset (Part-Exch)'}</span>
                      <span className="font-bold">£{deprDisposalProceeds.toLocaleString()}</span>
                    </div>
                    {!isDisposalProfit && (
                      <div className="flex justify-between text-rose-950 bg-rose-100/70 p-1.5 rounded border border-rose-300">
                        <span className="font-bold">[Step 4] Income Stmt (Loss on Disposal)</span>
                        <span className="font-bold">£{Math.abs(profitOrLossOnDisposal).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-6 flex justify-between border-t-2 border-slate-900 font-bold text-slate-900">
                      <span>Total Credit</span>
                      <span>£{(isDisposalProfit ? accDeprAtDisposal + deprDisposalProceeds : accDeprAtDisposal + deprDisposalProceeds + Math.abs(profitOrLossOnDisposal)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded bg-slate-50 p-3 text-xs text-slate-700 border border-slate-200 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-slate-900">Examiner Double-Entry Rule: </strong>
                    The Disposal Account is completely cleared and closed with zero balance. The balancing figure represents 
                    {isDisposalProfit ? (
                      <span className="text-emerald-700 font-bold"> £{profitOrLossOnDisposal.toLocaleString()} Profit on Disposal transferred to the credit of the Income Statement (Other Income)</span>
                    ) : (
                      <span className="text-rose-700 font-bold"> £{Math.abs(profitOrLossOnDisposal).toLocaleString()} Loss on Disposal transferred to the debit of the Income Statement (Operating Expenses)</span>
                    )}.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Statements Presentation Extract */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-xs space-y-2">
              <div className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wider">
                Income Statement Extract (Year {deprDisposalYear})
              </div>
              <div className="space-y-1.5 font-mono">
                {isDisposalProfit ? (
                  <div className="flex justify-between text-emerald-700 font-semibold p-1.5 rounded bg-emerald-50">
                    <span>Add: Other Income (Profit on Disposal)</span>
                    <span>+£{profitOrLossOnDisposal.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-rose-700 font-semibold p-1.5 rounded bg-rose-50">
                    <span>Less: Operating Expenses (Loss on Disposal)</span>
                    <span>(£{Math.abs(profitOrLossOnDisposal).toLocaleString()})</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 p-1">
                  <span>Less: Depreciation Expense (Annual charge for active assets)</span>
                  <span>(Charged)</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-xs space-y-2">
              <div className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wider">
                Statement of Financial Position Extract
              </div>
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-800">
                  <span>Non-Current Asset Cost (Disposed asset removed)</span>
                  <span>-£{deprAssetCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-800">
                  <span>Less: Provision for Depreciation (Removed)</span>
                  <span>+£{accDeprAtDisposal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1">
                  <span>Net Book Value Impact</span>
                  <span>-£{nbvAtDisposal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Cash / Bank Proceeds Received</span>
                  <span>+£{deprDisposalProceeds.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. BUSINESS: DECISION TREE EMV             */}
      {/* ========================================== */}
      {activeSubjectTab === 'business' && activeLab === 'decision-tree' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Strategy A */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600">Option A</span>
                <h3 className="text-base font-bold text-slate-900">Heavy Capital Expansion</h3>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700 font-bold">
                Cost: £{dtCostA.toLocaleString()}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Initial Project Outlay (£):</label>
                <input
                  type="number"
                  value={dtCostA}
                  onChange={(e) => setDtCostA(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Success Probability (0-1):</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={dtProbSuccessA}
                    onChange={(e) => setDtProbSuccessA(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Success Payoff (£):</label>
                  <input
                    type="number"
                    value={dtPayoffSuccessA}
                    onChange={(e) => setDtPayoffSuccessA(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Failure Payoff (£):</label>
                <input
                  type="number"
                  value={dtPayoffFailA}
                  onChange={(e) => setDtPayoffFailA(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                />
              </div>

              {/* Results Box */}
              <div className="mt-4 rounded-lg bg-emerald-50 p-3 border border-emerald-200 text-xs">
                <div className="flex justify-between font-semibold text-emerald-950">
                  <span>Expected Monetary Value (EMV):</span>
                  <span className="font-mono font-bold">£{emvA.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-900 mt-1 pt-1 border-t border-emerald-200">
                  <span>Net Expected Gain:</span>
                  <span className="font-mono text-sm">£{netGainA.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy B */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600">Option B</span>
                <h3 className="text-base font-bold text-slate-900">Moderate Partnership / Joint Venture</h3>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700 font-bold">
                Cost: £{dtCostB.toLocaleString()}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Initial Project Outlay (£):</label>
                <input
                  type="number"
                  value={dtCostB}
                  onChange={(e) => setDtCostB(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Success Probability (0-1):</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={dtProbSuccessB}
                    onChange={(e) => setDtProbSuccessB(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Success Payoff (£):</label>
                  <input
                    type="number"
                    value={dtPayoffSuccessB}
                    onChange={(e) => setDtPayoffSuccessB(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Failure Payoff (£):</label>
                <input
                  type="number"
                  value={dtPayoffFailB}
                  onChange={(e) => setDtPayoffFailB(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                />
              </div>

              {/* Results Box */}
              <div className="mt-4 rounded-lg bg-blue-50 p-3 border border-blue-200 text-xs">
                <div className="flex justify-between font-semibold text-blue-950">
                  <span>Expected Monetary Value (EMV):</span>
                  <span className="font-mono font-bold">£{emvB.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-blue-900 mt-1 pt-1 border-t border-blue-200">
                  <span>Net Expected Gain:</span>
                  <span className="font-mono text-sm">£{netGainB.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. BUSINESS: BREAK-EVEN CHART              */}
      {/* ========================================== */}
      {activeSubjectTab === 'business' && activeLab === 'breakeven-graph' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Cost & Pricing Parameters</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Selling Price per unit (£):</span>
                    <span className="font-bold text-emerald-700">£{bePrice}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    value={bePrice}
                    onChange={(e) => setBePrice(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Variable Cost per unit (£):</span>
                    <span className="font-bold text-rose-700">£{beVarCost}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={beVarCost}
                    onChange={(e) => setBeVarCost(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Total Fixed Overheads (£):</span>
                    <span className="font-bold text-slate-900">£{beFixedCost.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="300000"
                    step="5000"
                    value={beFixedCost}
                    onChange={(e) => setBeFixedCost(Number(e.target.value))}
                    className="w-full accent-slate-800"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Expected Sales Forecast (units):</span>
                    <span className="font-bold text-blue-700">{beExpectedSales.toLocaleString()} units</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="12000"
                    step="200"
                    value={beExpectedSales}
                    onChange={(e) => setBeExpectedSales(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Diagnostic Box */}
              <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">Contribution per Unit:</span>
                  <strong className="text-slate-900 font-mono">£{beUnitContrib}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Break-Even Output:</span>
                  <strong className="text-emerald-700 font-mono">{breakEvenUnits.toLocaleString()} units</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Margin of Safety:</span>
                  <strong className="text-blue-700 font-mono">{marginOfSafety.toLocaleString()} units</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Forecast Net Profit:</span>
                  <strong className={`font-mono text-sm ${profitAtExpected >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    £{profitAtExpected.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Visual SVG Break-Even Chart */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Dynamic Break-Even SVG Chart</h3>
              <div className="h-64 w-full rounded-lg bg-slate-950 p-4 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="40" y2="170" stroke="#334155" strokeWidth="1.5" />
                  <line x1="40" y1="170" x2="380" y2="170" stroke="#334155" strokeWidth="1.5" />

                  {/* Fixed Cost Line (horizontal) */}
                  <line x1="40" y1="120" x2="380" y2="120" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
                  <text x="50" y="115" fill="#94a3b8" fontSize="9">Fixed Costs (£{beFixedCost / 1000}k)</text>

                  {/* Total Cost Line (Starts at Fixed Cost, goes up) */}
                  <line x1="40" y1="120" x2="380" y2="35" stroke="#f43f5e" strokeWidth="2" />
                  <text x="310" y="32" fill="#f43f5e" fontSize="9" fontWeight="bold">Total Cost (TC)</text>

                  {/* Total Revenue Line (Starts at 0, goes up steeper) */}
                  <line x1="40" y1="170" x2="380" y2="20" stroke="#10b981" strokeWidth="2" />
                  <text x="310" y="15" fill="#10b981" fontSize="9" fontWeight="bold">Total Revenue (TR)</text>

                  {/* Break Even Intersection Point */}
                  <circle cx="210" cy="80" r="5" fill="#f59e0b" />
                  <text x="175" y="70" fill="#f59e0b" fontSize="10" fontWeight="bold">BEP: {breakEvenUnits} units</text>
                </svg>
              </div>
              <p className="text-xs text-slate-500 italic">
                Above {breakEvenUnits.toLocaleString()} units, every additional sale contributes £{beUnitContrib} directly to net operating profit.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. ECONOMICS: SUPPLY & DEMAND TAX INCIDENCE*/}
      {/* ========================================== */}
      {activeSubjectTab === 'economics' && activeLab === 'tax-incidence' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Elasticity & Tax Variables</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Specific Indirect Tax (£/unit):</span>
                    <span className="font-bold text-purple-700">£{specificTax}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={specificTax}
                    onChange={(e) => setSpecificTax(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Demand Elasticity (|PED|):</span>
                    <span className="font-bold text-blue-700">{demandPed.toFixed(2)} ({demandPed < 1 ? 'Inelastic' : 'Elastic'})</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={demandPed}
                    onChange={(e) => setDemandPed(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Supply Elasticity (PES):</span>
                    <span className="font-bold text-emerald-700">{supplyPes.toFixed(2)} ({supplyPes > 1 ? 'Elastic' : 'Inelastic'})</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={supplyPes}
                    onChange={(e) => setSupplyPes(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* Tax Incidence Split */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between p-2 rounded bg-purple-50 border border-purple-200">
                  <span className="font-semibold text-purple-950">Consumer Tax Burden:</span>
                  <span className="font-mono font-bold text-purple-900">
                    £{consumerTaxShare.toFixed(2)} / unit ({((consumerTaxShare / specificTax) * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-700">Producer Tax Burden:</span>
                  <span className="font-mono font-bold text-slate-900">
                    £{producerTaxShare.toFixed(2)} / unit ({((producerTaxShare / specificTax) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Economic Welfare & Market Impact</h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block">New Equilibrium Quantity:</span>
                  <strong className="text-base text-slate-900 font-mono">{newQuantity} units</strong>
                </div>
                <div className="p-3 rounded bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-800 block">Total Government Tax Revenue:</span>
                  <strong className="text-base text-emerald-900 font-mono">£{totalTaxRevenue.toLocaleString()}</strong>
                </div>
                <div className="p-3 rounded bg-rose-50 border border-rose-200">
                  <span className="text-rose-800 block">Deadweight Welfare Loss (DWL):</span>
                  <strong className="text-base text-rose-900 font-mono">£{deadweightLoss.toFixed(0)}</strong>
                </div>
                <div className="p-3 rounded bg-blue-50 border border-blue-200">
                  <span className="text-blue-800 block">Consumer Price (P1):</span>
                  <strong className="text-base text-blue-900 font-mono">£{newConsumerPrice.toFixed(2)}</strong>
                </div>
              </div>

              <div className="rounded-lg bg-slate-900 p-4 text-xs text-slate-300">
                <strong className="text-emerald-400 font-bold uppercase block mb-1">
                  Examiner Theory Synthesis:
                </strong>
                {demandPed < supplyPes
                  ? 'Because consumer demand is more inelastic than supply, producers easily pass on the majority of the tax to buyers with minimal drop in sales volume (ideal for tobacco/fuel duties).'
                  : 'Because demand is elastic, producers absorb the majority of the tax burden in squeezed profit margins.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. ECONOMICS: KEYNESIAN MULTIPLIER         */}
      {/* ========================================== */}
      {activeSubjectTab === 'economics' && activeLab === 'multiplier-output-gap' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Macroeconomic Policy Parameters</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Autonomous Fiscal Injection (£bn):</label>
                <input
                  type="number"
                  value={autonomousInjection}
                  onChange={(e) => setAutonomousInjection(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Marginal Propensity to Consume (MPC):</span>
                  <span className="font-bold text-purple-700">{mpcVal.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={mpcVal}
                  onChange={(e) => setMpcVal(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Initial Real GDP (£bn):</label>
                  <input
                    type="number"
                    value={actualGdp}
                    onChange={(e) => setActualGdp(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Full Capacity Yfe (£bn):</label>
                  <input
                    type="number"
                    value={potentialYfe}
                    onChange={(e) => setPotentialYfe(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Multiplier Effect & National Income Outcome</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded bg-purple-50 border border-purple-200">
                <span className="font-semibold text-purple-950">Keynesian Multiplier (k):</span>
                <span className="font-mono font-bold text-lg text-purple-900">{multiplierK.toFixed(2)}x</span>
              </div>

              <div className="flex justify-between p-3 rounded bg-emerald-50 border border-emerald-200">
                <span className="font-semibold text-emerald-950">Total Cumulative Expansion in GDP:</span>
                <span className="font-mono font-bold text-lg text-emerald-900">+£{totalGdpImpact.toFixed(1)}bn</span>
              </div>

              <div className={`flex justify-between p-3 rounded border ${
                outputGap >= 0 ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
              }`}>
                <span className="font-semibold text-slate-800">
                  {outputGap >= 0 ? 'Positive Output Gap (Inflationary Pressure):' : 'Negative Output Gap (Spare Capacity):'}
                </span>
                <span className="font-mono font-bold text-base text-slate-900">
                  {outputGap >= 0 ? `+£${outputGap.toFixed(1)}bn` : `-£${Math.abs(outputGap).toFixed(1)}bn`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
