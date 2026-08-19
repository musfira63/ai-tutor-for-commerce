import { CaseStudy, CriticalEvaluationScenario } from '../types';

export const caseStudies: CaseStudy[] = [
  // ==========================================
  // 📘 ACCOUNTING CASE STUDY
  // ==========================================
  {
    id: 'cs-acc-1',
    subject: 'accounting',
    title: 'Precision Component Engineering Ltd: Standard Costing & Variance Crisis',
    company: 'Precision Components Ltd',
    industry: 'High-Precision Automotive Parts',
    context: 'Precision Components Ltd supplies high-tolerance transmission gears to European automobile manufacturers. In Year 2, facing rising steel costs, the newly appointed purchasing manager switched to an overseas budget steel supplier offering 15% discounts. While direct material costs fell, production experienced record machine jams, scrap rates spiked to 12%, and customer defect returns triggered a penalty clause.',
    financialData: [
      { metric: 'Revenue (£m)', year1: '24.0', year2: '23.5', year3: '22.0' },
      { metric: 'Direct Material Standard Cost (£m)', year1: '8.0', year2: '8.0', year3: '8.0' },
      { metric: 'Direct Material Actual Cost (£m)', year1: '8.1', year2: '7.1', year3: '8.6' },
      { metric: 'Material Price Variance (£k)', year1: '-100 (A)', year2: '+900 (F)', year3: '-600 (A)' },
      { metric: 'Material Usage Variance (£k)', year1: '-50 (A)', year2: '-850 (A)', year3: '-400 (A)' },
      { metric: 'Labour Efficiency Variance (£k)', year1: '+20 (F)', year2: '-420 (A)', year3: '-150 (A)' },
      { metric: 'Operating Profit (£m)', year1: '3.6', year2: '2.4', year3: '1.8' }
    ],
    qualitativeFactors: [
      'Customer satisfaction rating collapsed from 96% in Year 1 to 78% in Year 2 due to gear metal fatigue.',
      'Shop-floor machine operators worked 600 hours of emergency overtime to re-machine defective gear blanks.',
      'The company faces a £350,000 warranty claim from its primary client in Germany.'
    ],
    questions: [
      {
        id: 'q-acc-cs-1',
        marks: 20,
        commandWord: 'Evaluate',
        question: 'Evaluate the operational and financial impact of the purchasing strategy adopted by Precision Components Ltd in Year 2, and recommend whether standard costing performance measures should be reformed.',
        guidance: 'Synthesize the +£900k Favourable Material Price Variance with the -£850k Adverse Usage and -£420k Adverse Labour Efficiency variances. Apply AJIM evaluation structure.',
        modelAnswerGradeC: 'Precision Components Ltd saved £900,000 on material price because the variance was favourable. However, they wasted £850,000 in materials because the usage variance was adverse, so the net saving was only £50,000. In addition, workers took longer so labour efficiency was adverse by £420,000. Overall profit fell from £3.6m to £2.4m. The purchasing manager did a bad job and they should fire the supplier.',
        modelAnswerGradeAStar: `ANALYTICAL DECONSTRUCTION:\nAlthough the purchasing manager achieved an apparent £900k Favourable Material Price Variance by sourcing discounted steel, this isolated metric masked catastrophic downstream operational failure. Sub-standard tensile strength triggered an Adverse Material Usage Variance of -£850k (scrap rate 12%) and an Adverse Labour Efficiency Variance of -£420k as machinists struggled with metal jams and rework. Consequently, the apparent £900k material saving produced a net direct manufacturing loss of -£370k (£900k F - £850k A - £420k A).\n\nSYNOPTIC STRATEGIC IMPACT:\nBeyond direct variances, operating profit fell by 33.3% (£3.6m to £2.4m) due to £350k customer warranty penalties and reputational damage (customer satisfaction dropped to 78%). In high-precision engineering where B2B switching costs are high but quality non-negotiable, sub-standard inputs threaten long-term contract renewal.\n\nAJIM EVALUATIVE CONCLUSION:\n• A (Direct Answer): Precision Components Ltd must immediately terminate the budget overseas steel contract and reform its variance appraisal system.\n• J (Justification): The net variance deficit (-£370k) and customer defection risk far outweigh the short-term price discount.\n• I (It Depends On): The recovery depends on whether existing automotive buyers can be reassured via ISO 9001 quality audits before they switch to German competitors.\n• M (Most Important): Crucially, standard costing reward systems must be restructured: purchasing managers should be evaluated on Total Cost of Quality and Net Variance rather than standalone Material Price Variances.`,
        examinerCommentary: 'Grade A* response demonstrates deep chain of analysis connecting the three variance figures, evaluates the systemic organizational failure of evaluating managers in silos, and concludes with a decisive AJIM recommendation with strategic nuance.',
        markingCriteria: {
          ao1_knowledge: 'Accurate understanding of price vs usage vs labour variances and standard costing.',
          ao2_application: 'Full numerical integration of £900k F, -£850k A, -£420k A, and warranty penalties.',
          ao3_analysis: 'Coherent chains tracing low-cost inputs to machine jams, rework overtime, and operating profit decline.',
          ao4_evaluation: 'Level 4 AJIM conclusion reforming corporate incentive structures and quality governance.'
        }
      }
    ]
  },

  // ==========================================
  // 🏢 BUSINESS STUDIES CASE STUDY
  // ==========================================
  {
    id: 'cs-bus-1',
    subject: 'business',
    title: 'Velocity Mobility Group: Strategic Investment & Expansion Dilemma',
    company: 'Velocity Mobility Plc',
    industry: 'Electric Urban Vehicles & Micro-Mobility',
    context: 'Velocity Mobility Plc is evaluating two major strategic growth options to maintain market share against low-cost Asian competitors. Option 1: Expand into German ride-share fleet manufacturing (Ansoff: Market Development). Option 2: Develop a solid-state high-density battery platform (Ansoff: Product Development). Board directors are divided over high gearing vs technological obsolescence.',
    financialData: [
      { metric: 'Current Revenue (£m)', year1: '140.0', year2: '162.0', year3: '180.0' },
      { metric: 'Operating Profit Margin (%)', year1: '12.4%', year2: '10.5%', year3: '8.8%' },
      { metric: 'Gearing Ratio (%)', year1: '42.0%', year2: '58.0%', year3: '64.0%' },
      { metric: 'Current Ratio', year1: '1.65 : 1', year2: '1.25 : 1', year3: '1.05 : 1' },
      { metric: 'Option 1 (Market Dev) Net Present Value (£m @ 10%)', year1: '+£14.2m', year2: '-', year3: '-' },
      { metric: 'Option 2 (R&D Battery) Net Present Value (£m @ 10%)', year1: '+£28.5m', year2: '-', year3: '-' }
    ],
    qualitativeFactors: [
      'Velocity’s gearing has climbed to 64% following a £45m bond issue.',
      'Option 1 utilizes existing factory capacity and tooling; time to market is 8 months.',
      'Option 2 requires hiring 40 specialized electrochemical engineers and carries a 35% probability of technological delay.',
      'European trade regulators are considering tariffs on imported foreign EV components.'
    ],
    questions: [
      {
        id: 'q-bus-cs-1',
        marks: 25,
        commandWord: 'Recommend',
        question: 'Evaluate the financial and strategic merits of Option 1 vs Option 2, and recommend which strategic growth option Velocity Mobility Plc should choose.',
        guidance: 'Balance quantitative investment appraisal (NPV, Gearing, Liquidity) with qualitative strategic risk (Ansoff, Core Competencies, Time-to-Market). Use AJIM.',
        modelAnswerGradeC: 'Option 2 is much better because it has a higher Net Present Value of £28.5m compared to £14.2m for Option 1. Making new batteries is innovative and will help them beat competitors. Even though gearing is 64%, they can borrow more money from the bank. Therefore they should choose Option 2.',
        modelAnswerGradeAStar: `STRATEGIC & FINANCIAL APPRAISAL:\nOn a purely quantitative basis, Option 2 appears superior with an NPV of +£28.5m compared to +£14.2m for Option 1. However, this headline NPV fails to account for Velocity’s acute financial fragility: Gearing has surged to 64% and the Current Ratio has deteriorated to 1.05:1. Undertaking Option 2 (high R&D capital expenditure with a 35% risk of delay) would severely exacerbate liquidity strain and increase debt default exposure if interest rates rise.\n\nRISK & CAPABILITY ALIGNMENT (ANSOFF):\nOption 1 (Market Development) aligns with Velocity’s existing manufacturing capacity and supply chain infrastructure, requiring only 8 months to generate cash inflows. Given that operating margins have compressed from 12.4% to 8.8%, rapid cash generation is vital to de-gear the balance sheet. Conversely, Option 2 requires unproven technical competencies in electrochemical engineering where Velocity possesses no distinctive competitive moat.\n\nAJIM EVALUATION & RECOMMENDATION:\n• A (Recommendation): Velocity Mobility Plc should execute Option 1 (German Fleet Expansion) and postpone Option 2 until gearing drops below 45%.\n• J (Justification): Option 1 provides immediate, lower-risk cash inflows that stabilize working capital (Current Ratio 1.05:1) without requiring dilutive equity issues or high-risk R&D debt.\n• I (It Depends On): This recommendation depends on European trade policy: if strict battery localisation rules are passed, Velocity can license battery technology rather than funding in-house R&D.\n• M (Most Important Synthesis): In corporate turnaround strategy, financial solvency and survival must precede aggressive technological diversification. De-gearing through Option 1 preserves shareholder value.`,
        examinerCommentary: 'Exemplary Grade A* answer that avoids the trap of blindly choosing the highest NPV. Contextualises the decision within balance sheet vulnerability (64% gearing) and applies Ansoff risk analysis cleanly.',
        markingCriteria: {
          ao1_knowledge: 'Command of investment appraisal, gearing, liquidity, and Ansoff matrix.',
          ao2_application: 'Precise contextual data application: 64% gearing, 1.05:1 current ratio, £28.5m vs £14.2m NPV.',
          ao3_analysis: 'Well-developed chains contrasting short payback cash flow against high-risk R&D delay.',
          ao4_evaluation: 'Sophisticated AJIM evaluation balancing corporate survival against growth ambitions.'
        }
      }
    ]
  },

  // ==========================================
  // 📈 ECONOMICS CASE STUDY
  // ==========================================
  {
    id: 'cs-econ-1',
    subject: 'economics',
    title: 'The Critical Mineral Transition: Market Failure & Resource Protectionism',
    company: 'National Energy Transition Review',
    industry: 'Lithium, Cobalt & Battery Supply Chains',
    context: 'Global demand for battery-grade lithium carbonate has surged by 400% driven by EV subsidies and Net Zero mandates. Lithium extraction in arid regions generates severe negative production externalities: depletion of agricultural water tables, chemical leaching, and soil contamination. Several resource-rich emerging economies have banned raw mineral exports to force multinational miners to invest in domestic refining.',
    financialData: [
      { metric: 'Global Lithium Demand (k tonnes)', year1: '320', year2: '580', year3: '950' },
      { metric: 'Average Price per Tonne ($)', year1: '$12,000', year2: '$48,000', year3: '$28,000' },
      { metric: 'Price Elasticity of Supply (PES)', year1: '0.25 (Inelastic)', year2: '0.30 (Inelastic)', year3: '0.45' },
      { metric: 'Estimated Negative Externality Cost ($/t)', year1: '$4,200', year2: '$5,800', year3: '$6,500' }
    ],
    qualitativeFactors: [
      'Brine evaporation extraction requires 2.2 million litres of fresh water per tonne of lithium produced.',
      'Indigenous farming communities face water rationing and soil salinization.',
      'Developing nation governments lack environmental monitoring agencies, leading to regulatory capture.',
      'High price volatility creates boom-and-bust capital expenditure cycles for mining firms.'
    ],
    questions: [
      {
        id: 'q-econ-cs-1',
        marks: 25,
        commandWord: 'Evaluate',
        question: 'Evaluate the economic case for government intervention (such as Pigouvian pollution taxes or trade export bans) in the market for critical battery minerals.',
        guidance: 'Analyze market failure (MSC > MPC, deadweight loss) vs potential government failure (unintended consequences, smuggling, regulatory capture). Use AJIM.',
        modelAnswerGradeC: 'The lithium market has market failure because extracting lithium causes pollution and uses up water. This means Marginal Social Cost is higher than Marginal Private Cost. The government should put a big tax on lithium companies to pay for the pollution. Also countries should ban exports so they can make money refining it. This will make the market efficient.',
        modelAnswerGradeAStar: `MICROECONOMIC THEORETICAL ANALYSIS:\nIn an unregulated free market, mining corporations only account for Marginal Private Costs (MPC), completely disregarding external third-party costs ($5,800/tonne) of water table depletion and chemical run-off. Consequently, market output (Qm) exceeds the socially optimal output (Qso) where MSC = MSB, generating a significant Deadweight Welfare Loss triangle.\n\nA Pigouvian tax equal to the marginal external cost ($5,800/t) internalises the externality by shifting the private supply curve (MPC) upward to coincide with MSC. This restores allocative efficiency and generates state revenue to fund local water desalination infrastructure.\n\nEVALUATION OF GOVERNMENT FAILURE & TRADE BANS:\nHowever, state intervention carries severe risks of government failure:\n1. Information Asymmetry: Regulators cannot accurately quantify dynamic ecological degradation across shifting water tables, risking setting tax rates too high (stifling EV transition) or too low.\n2. Inelastic Supply & Substitution: Because PES is highly price-inelastic (0.25 to 0.30) due to 7-year mine development lead times, taxes will simply be passed downstream to EV automakers, raising green vehicle retail prices and slowing consumer decarbonisation.\n3. Export Bans & Rent Seeking: Blanket raw export bans frequently create domestic monopsony pricing, disincentivising FDI and fostering black-market mineral smuggling.\n\nAJIM CONCLUSION:\n• A (Evaluation): Governments should implement a hybrid policy: combining targeted water-usage extraction levies with tradable environmental quotas, rather than disruptive raw export bans.\n• J (Justification): A targeted Pigouvian water levy directly targets the root market failure (hydrological scarcity) while avoiding deadweight distortions in global trade.\n• I (It Depends On): The success depends on international regulatory alignment to prevent "pollution havens" where mining firms migrate to jurisdictions with zero environmental enforcement.\n• M (Most Important Synthesis): The most critical economic policy balance is aligning microeconomic environmental correction with macroeconomic industrial Net Zero targets without causing stagflationary green commodity bottlenecks.`,
        examinerCommentary: 'Masterclass Grade A* answer featuring rigorous microeconomic externality theory, MSC/MSB diagrams, elasticities (PES 0.25), and balanced evaluation of government failure vs environmental market failure.',
        markingCriteria: {
          ao1_knowledge: 'Precise use of MSC, MPC, MSB, Deadweight Loss, Pigouvian taxes, and PES.',
          ao2_application: 'Direct integration of case data: $5,800/t external cost, 2.2m litres of water, PES 0.25.',
          ao3_analysis: 'Deep chains examining downstream consumer price incidence and regulatory failure.',
          ao4_evaluation: 'Sophisticated AJIM synthesis proposing optimal hybrid policy frameworks.'
        }
      }
    ]
  }
];

export const criticalEvaluationScenarios: CriticalEvaluationScenario[] = [
  // Accounting: Window Dressing
  {
    id: 'sc-acc-1',
    subject: 'accounting',
    title: 'The Pre-Year-End Sale-and-Leaseback Maneuver',
    companyOrTopic: 'Meridian Logistics Plc',
    scenario: 'Two weeks before the financial year-end, Meridian Logistics sells its flagship central distribution hub (book value £14m) to an institutional property fund for £22m in cash, simultaneously signing a 20-year operating lease to rent it back at £1.8m per annum.',
    apparentBenefit: 'Injects £22m of instant cash, slashes reported gearing, and records an immediate £8m exceptional operating profit in the current year’s Income Statement.',
    realUnderlyingTruth: 'The underlying business operations are unchanged, but the company is now permanently saddled with an unavoidable £1.8m annual rent expense for 20 years (£36m total), permanently eroding future operating margins.',
    techniqueOrPhenomenon: 'Sale and Leaseback Window Dressing',
    howToDetectOrEvaluate: 'Check the Cash Flow Statement for non-recurring capital proceeds, and scrutinize Note 14 on Commitments Under Long-Term Leases to measure the future fixed rent liabilities.',
    stakeholderOrEconomicImpact: 'Prospective buyers or bank lenders are deceived into believing the firm achieved genuine operational organic profit growth.'
  },
  // Business: Greenwashing & PR Distraction
  {
    id: 'sc-bus-1',
    subject: 'business',
    title: 'Corporate Greenwashing & Carbon Offsetting PR',
    companyOrTopic: 'Global Express Air Cargo',
    scenario: 'Global Express Air Cargo launches an extensive £12m international marketing campaign advertising "Carbon Neutral Deliveries" by purchasing unverified forestry carbon offsets, while continuing to expand its fleet of high-emission cargo planes.',
    apparentBenefit: 'Enhances brand reputation, appeals to ESG investment funds, and justifies charging premium green shipping rates to retail clients.',
    realUnderlyingTruth: 'Over 85% of purchased carbon offset credits are found to be "phantom credits" that did not prevent deforestation, leaving actual operational carbon emissions 18% higher year-on-year.',
    techniqueOrPhenomenon: 'ESG Greenwashing & Asymmetric Information',
    howToDetectOrEvaluate: 'Compare audited Scope 1 and Scope 2 direct emissions in the Sustainability Report against marketing claims, and verify whether carbon credits comply with accredited Gold Standard certification.',
    stakeholderOrEconomicImpact: 'Exposes the business to severe Advertising Standards Authority (ASA) bans, brand boycott backlash, and potential legal fines under the Green Claims Code.'
  },
  // Economics: Regulatory Capture & Subsidy Distortion
  {
    id: 'sc-econ-1',
    subject: 'economics',
    title: 'Agricultural Subsidy Perversity & Market Distortion',
    companyOrTopic: 'Common Agricultural Price Floor Regime',
    scenario: 'A national government introduces a guaranteed minimum price floor (Pmin) above the free market equilibrium price to protect rural farming incomes, pledging to purchase and store all surplus produce.',
    apparentBenefit: 'Guarantees farm revenues, prevents small farm bankruptcies, and stabilizes domestic food supply security.',
    realUnderlyingTruth: 'Generates massive structural overproduction ("butter mountains" and "wine lakes"). Wealthy intensive mega-farms capture 80% of subsidies while small farms struggle. Disposal of food mountains by dumping on developing nations destroys overseas farming livelihoods.',
    techniqueOrPhenomenon: 'Government Failure: Price Floor Distortion & Rent Seeking',
    howToDetectOrEvaluate: 'Analyze government expenditure on storage and disposal costs, consumer deadweight loss through higher retail grocery prices, and trade distortion impacts on low-income countries.',
    stakeholderOrEconomicImpact: 'Creates net societal deadweight welfare loss, strains taxpayer budgets, and harms global food market efficiency.'
  }
];

// Alias for backwards compatibility
export const windowDressingScenarios = criticalEvaluationScenarios;
