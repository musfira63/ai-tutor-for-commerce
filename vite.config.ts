import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-server',
    configureServer(server) {
      server.middlewares.use('/api/gemini/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const messages = data.messages || [];
            const mode = data.mode || 'general';
            const context = data.context || '';

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'GEMINI_API_KEY is not configured in the environment.' 
              }));
              return;
            }

            const ai = new GoogleGenAI({
              apiKey: apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const systemPrompt = `You are the Lead Cambridge International (9706) & A-Level Senior Accounting Examiner & AI Tutor.
Your purpose is to provide authoritative, rigorous, step-by-step guidance on Financial Accounting, Cost & Management Accounting, International Accounting Standards (IAS/IFRS), and Business Finance.

Mode: ${mode.toUpperCase()}
${context ? `Active Context / Syllabus Topic: ${context}` : ''}

Key Knowledge Pillars:
1. Double-Entry & Verification: Ledgers, Books of Prime Entry, Trial Balance errors (affecting vs not affecting TB), Suspense Accounts, Bank Reconciliation, Sales/Purchases Ledger Control Accounts.
2. Non-Current Assets: Straight-line, Reducing Balance, Revaluation, 4-step Asset Disposal protocol, Part-exchange entries.
3. Financial Statements: Sole Traders, Partnerships (Partnership Act 1890 defaults, Goodwill, Revaluation, Dissolution Realisation account), Limited Companies (Shares, Premium, Bonus/Rights issues, Reserves, Debentures, IAS 7 Cash Flows).
4. Specialized Formats: Manufacturing Accounts (Prime Cost, Factory Overheads, Work in Progress, Factory Profit, PUP Provision for Unrealised Profit elimination under IAS 2), Clubs & Societies (Receipts & Payments, Subscriptions T-Account reconstruction, Accumulated Fund), Mergers & Acquisitions (Purchase Consideration, Goodwill on acquisition under IAS 38).
5. IAS Standards: IAS 1, IAS 2 (lower of cost and NRV), IAS 7, IAS 8, IAS 10 (Adjusting vs Non-Adjusting), IAS 16, IAS 36, IAS 37 (Provisions vs Contingent Liabilities), IAS 38.
6. Cost & Management Accounting: Marginal vs Absorption Costing (profit reconciliation), Overhead absorption rates (OAR), Under/Over-absorption, CVP/Break-even, Limiting Factors, Make-or-Buy, Special Orders, Activity-Based Costing (ABC) cost driver rates, Standard Costing & Variances (Material, Labour, Fixed Overheads), Functional & Master Budgets, Flexible Budgeting variance reconciliation, Capital Investment Appraisal (Payback, ARR per Cambridge 9706 formula, NPV, IRR).
7. Official Cambridge 9706 Formula Appendix: Profitability (Gross Margin, Mark-up, Net Margin, ROCE, Expenses to Revenue), Liquidity (Current, Acid Test), Efficiency (NCATO, Receivables days, Payables days, Inventory days/rate), Solvency (Working Capital Cycle, Net Working Assets to Revenue %, Gearing %, Interest Cover), Investment/Stock Exchange (EPS, P/E Ratio, DPS, Dividend Yield %, Dividend Cover).
8. Ethics & Audit: IESBA 5 Principles (Integrity, Objectivity, Competence, Confidentiality, Behaviour), Internal vs External Audit, Qualified vs Unqualified reports, Stewardship & True and Fair View.

Formatting Requirements:
- State exact DEBIT (Dr) and CREDIT (Cr) journal entries and clear Markdown T-Accounts where applicable.
- For calculations, show step-by-step arithmetic, state formulas, highlight units (£, %, days, times), and point out common examiner traps.
- Use the AJIM framework (Answer, Justification, It depends on, Most important factor) for evaluative/discussion questions.`;

            const contents = messages.map((m: { role: string; content: string }) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            }));

            if (contents.length === 0) {
              contents.push({
                role: 'user',
                parts: [{ text: 'Hello! Please introduce your capabilities as the A-Level Accounting AI Assistant.' }],
              });
            }

            const response = await ai.models.generateContent({
              model: 'gemini-3.7-flash',
              contents: contents,
              config: {
                systemInstruction: systemPrompt,
                temperature: 0.4,
              },
            });

            const text = response.text || 'No response generated.';

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply: text }));
          } catch (err: unknown) {
            console.error('Gemini API Error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error processing request';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: errorMessage }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
