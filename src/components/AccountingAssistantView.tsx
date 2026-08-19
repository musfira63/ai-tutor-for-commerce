import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Trash2, 
  Download, 
  BookOpen, 
  Calculator, 
  Scale, 
  FileCheck2, 
  Award, 
  ArrowRight, 
  Lightbulb, 
  HelpCircle,
  Landmark,
  RefreshCw,
  Info,
  ChevronDown
} from 'lucide-react';
import { syllabusModules } from '../data/syllabus';

export type AssistantMode = 
  | 'tutor' 
  | 'double-entry' 
  | 'marking' 
  | 'ratios' 
  | 'ias-standards';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: AssistantMode;
  moduleContext?: string;
}

const PRESET_TOPICS = [
  {
    category: 'Financial Accounting & Ledgers',
    prompts: [
      {
        title: '4-Step Asset Disposal with Part-Exchange',
        query: 'Show the 4-step double entry journal entries and T-accounts for disposing of plant (cost £40,000, acc depreciation £26,000) part-exchanged for a new machine costing £55,000 with a trade-in allowance of £16,000 and the balance paid by bank.',
      },
      {
        title: 'Suspense Account Correction Entries',
        query: 'A trial balance failed to agree by £450 (credit short). Identify the correcting journal entries for: 1) Sales returns £225 credited to purchases returns; 2) Motor van repairs £600 debited to Motor Vehicles asset account; 3) Discount received £150 completely omitted from the books.',
      },
      {
        title: 'Partnership Admission & Goodwill Treatment',
        query: 'Partners A and B share profits 3:2. Partner C is admitted for a 1/5th share. Goodwill is valued at £50,000 but will NOT be maintained in the books. Show the journal entries to adjust goodwill through the partners\' capital accounts.',
      },
      {
        title: 'Bonus Issue vs Rights Issue Reserves',
        query: 'Explain the difference between a Bonus Issue and a Rights Issue of shares for a PLC. Which reserves can be used for a bonus issue under Cambridge 9706, and why is Revaluation Reserve prohibited?',
      },
    ],
  },
  {
    category: 'Specialized Entities (Manufacturing & Clubs)',
    prompts: [
      {
        title: 'Manufacturing Account & PUP Adjustment',
        query: 'A factory transfers goods to warehouse at a 20% mark-up on production cost. Production cost is £300,000. Closing finished goods inventory at transfer price is £48,000. Calculate the Provision for Unrealised Profit (PUP) to eliminate under IAS 2 and explain its balance sheet presentation.',
      },
      {
        title: 'Subscriptions T-Account Ledger Reconstruction',
        query: 'Reconstruct a sports club Subscriptions Account given: Opening Arrears £1,400; Opening Advance £900; Total cash received in bank during year £28,500; Bad subscriptions written off £200; Closing Advance £1,100; Closing Arrears £1,650. Calculate the subscription income for the Income & Expenditure Account.',
      },
      {
        title: 'Business Acquisition & Purchased Goodwill',
        query: 'Company X acquires a sole trader business for £250,000 purchase consideration (settled by £50,000 cash, 80,000 £1 ordinary shares at £2.00 each, and £40,000 7% debentures). Net identifiable assets revalued are £195,000. Calculate Purchased Goodwill and show the opening journal entries.',
      },
    ],
  },
  {
    category: 'Cost & Management Accounting (P4)',
    prompts: [
      {
        title: 'Standard Costing Variances Calculation',
        query: 'Standard material cost: 4 kg @ £5/kg = £20 per unit. Actual production: 1,000 units using 4,200 kg at a total cost of £22,260. Calculate the Material Price Variance and Material Usage Variance, stating if each is Favourable or Adverse.',
      },
      {
        title: 'Marginal vs Absorption Profit Reconciliation',
        query: 'Explain why profit under marginal costing differs from profit under absorption costing when inventory levels change. Provide the standard reconciliation formula and explain the effect of fixed production overhead absorption.',
      },
      {
        title: 'Cambridge 9706 ARR & Capital Appraisal',
        query: 'A machine costs £400,000 with a 5-year life and zero residual value. Total accounting profit over 5 years is £180,000. Calculate the Accounting Rate of Return (ARR) using the official Cambridge 9706 formula and evaluate against a 20% target hurdle rate.',
      },
      {
        title: 'Activity-Based Costing (ABC) vs Traditional OAR',
        query: 'Explain how Activity-Based Costing (ABC) prevents cross-subsidisation of high-volume standard products and low-volume complex products compared to traditional machine hour overhead absorption.',
      },
    ],
  },
  {
    category: 'IAS Standards & Professional Ethics',
    prompts: [
      {
        title: 'IAS 10: Adjusting vs Non-Adjusting Events',
        query: 'Distinguish between Adjusting and Non-Adjusting events under IAS 10 after the reporting period. How should a major customer bankruptcy vs proposed dividends be treated?',
      },
      {
        title: 'IAS 37: Provisions vs Contingent Liabilities',
        query: 'Outline the 3 criteria required to recognise a Provision under IAS 37. How does a provision differ from a Contingent Liability and a Contingent Asset?',
      },
      {
        title: 'IESBA 5 Ethical Principles for Accountants',
        query: 'Explain the 5 fundamental ethical principles of the IESBA code (Integrity, Objectivity, Professional Competence, Confidentiality, Professional Behaviour) and analyze self-interest vs intimidation threats in corporate reporting.',
      },
    ],
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'intro-msg',
    role: 'assistant',
    content: `👋 **Welcome to the A* Accounting AI Examiner & Tutor!**

I am specialized in the **Cambridge International AS & A Level Accounting (9706)**, **AQA (7127)**, **Edexcel (9AC0)**, and **OCR** specifications.

### How I can assist your revision:
* **Double-Entry & Journal Entries:** Get step-by-step T-accounts, suspense account adjustments, and disposal schedules.
* **Manufacturing & PUP:** Calculate and eliminate Provision for Unrealised Profit under IAS 2.
* **Cost & Management Accounting:** Solve variances (Price, Usage, Rate, Efficiency), Marginal vs Absorption profit reconciliations, and Cambridge ARR.
* **IAS Standards & Ethics:** IAS 1, 2, 7, 8, 10, 16, 36, 37, 38 & IESBA professional ethics.
* **Exam Marking & AJIM:** Test your answers against official A* mark scheme criteria.

*Choose a preset question below or type any accounting problem, balance sheet question, or scenario!*`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export const AccountingAssistantView: React.FC<{ selectedSubject?: string }> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<AssistantMode>('tutor');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const accountingModules = syllabusModules.filter(m => m.subject === 'accounting');

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: activeMode,
      moduleContext: selectedModule !== 'all' ? selectedModule : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Find selected module details if any
      const targetMod = accountingModules.find(m => m.id === selectedModule);
      const contextStr = targetMod 
        ? `${targetMod.code}: ${targetMod.title} - ${targetMod.overview}` 
        : 'All A-Level Accounting Syllabus Topics (Financial, Management, IAS Standards & Ethics)';

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          mode: activeMode,
          context: contextStr,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response received from the assistant.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: activeMode,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error('Failed to get answer:', err);
      const errMsg = err instanceof Error ? err.message : 'An error occurred while contacting the AI assistant.';
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Connection Error:** ${errMsg}\n\nPlease verify that your server has a valid \`GEMINI_API_KEY\` attached in the Settings > Secrets panel and try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm('Clear current conversation history?')) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  const handleExportNotes = () => {
    const exportContent = messages
      .map(m => `### ${m.role === 'user' ? '👤 Question' : '🎓 Examiner AI'} (${m.timestamp})\n\n${m.content}\n\n---\n`)
      .join('\n');
    
    const blob = new Blob([exportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `A-Level-Accounting-Study-Notes-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper to format text with Markdown-like bold, code, and bullet blocks
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // Header 3
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="pt-2 font-bold text-slate-900 text-base border-b border-slate-200 pb-1">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }
          // Header 2 or 1
          if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
            return (
              <h3 key={idx} className="pt-3 font-bold text-slate-950 text-lg">
                {trimmed.replace(/^[#]+\s/, '')}
              </h3>
            );
          }
          // Bullet point
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            const itemText = trimmed.replace(/^[\*\-•]\s/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="flex-1">{formatInlineMarkup(itemText)}</span>
              </div>
            );
          }
          // Numbered list item
          if (/^\d+\.\s/.test(trimmed)) {
            const match = trimmed.match(/^(\d+\.)\s(.*)$/);
            if (match) {
              return (
                <div key={idx} className="flex items-start gap-2 pl-2">
                  <span className="font-semibold text-blue-700 min-w-[20px]">{match[1]}</span>
                  <span className="flex-1">{formatInlineMarkup(match[2])}</span>
                </div>
              );
            }
          }
          // Table separator or pipe line
          if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            return (
              <div key={idx} className="font-mono text-xs overflow-x-auto bg-slate-50 p-1.5 rounded border border-slate-200 my-1">
                {trimmed}
              </div>
            );
          }
          // Empty line
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          return <p key={idx}>{formatInlineMarkup(line)}</p>;
        })}
      </div>
    );
  };

  // Helper for inline bold, code, debit/credit badges
  const formatInlineMarkup = (text: string) => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|Dr\b|Cr\b)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-blue-800 border border-slate-200">{part.slice(1, -1)}</code>;
      }
      if (part === 'Dr') {
        return <span key={index} className="rounded bg-blue-100 px-1.5 py-0.2 text-[11px] font-bold text-blue-800">Dr</span>;
      }
      if (part === 'Cr') {
        return <span key={index} className="rounded bg-emerald-100 px-1.5 py-0.2 text-[11px] font-bold text-emerald-800">Cr</span>;
      }
      return part;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner Header */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 shadow-inner">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Accounting AI Examiner & Master Tutor
                </h1>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-blue-200">
                Authoritative, step-by-step guidance mapped to Cambridge 9706, AQA, Edexcel & OCR specifications. Ask any transaction, T-account, IAS standard, or calculation!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportNotes}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition"
              title="Export conversation as study notes"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Notes</span>
            </button>
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-rose-900/60 hover:text-rose-200 hover:border-rose-700 transition"
              title="Clear conversation"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Mode Selector & Syllabus Filter Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector */}
          <div className="md:col-span-8 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-300 mr-1">Tutor Focus:</span>
            <button
              onClick={() => setActiveMode('tutor')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                activeMode === 'tutor'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Full Syllabus Tutor</span>
            </button>
            <button
              onClick={() => setActiveMode('double-entry')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                activeMode === 'double-entry'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Double-Entry & Ledgers</span>
            </button>
            <button
              onClick={() => setActiveMode('marking')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                activeMode === 'marking'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>Exam Marking (AJIM)</span>
            </button>
            <button
              onClick={() => setActiveMode('ratios')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                activeMode === 'ratios'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>9706 Ratios & Formulas</span>
            </button>
            <button
              onClick={() => setActiveMode('ias-standards')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                activeMode === 'ias-standards'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>IAS Standards & Ethics</span>
            </button>
          </div>

          {/* Module Filter Dropdown */}
          <div className="md:col-span-4 flex items-center justify-end gap-2">
            <label className="text-xs text-slate-300 whitespace-nowrap">Anchor Topic:</label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">Entire Accounting Syllabus (All 12 Modules)</option>
              {accountingModules.map(m => (
                <option key={m.id} value={m.id}>
                  {m.code}: {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Chat Workspace + Preset Question Bank */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 Cols): Chat Thread & Input */}
        <div className="lg:col-span-8 flex flex-col h-[700px] rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          
          {/* Chat Messages Scroll Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] rounded-2xl px-4 py-3.5 shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}
                >
                  {/* Message Meta header */}
                  <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-black/5 text-[11px]">
                    <span className={`font-semibold ${msg.role === 'user' ? 'text-blue-100' : 'text-blue-900'}`}>
                      {msg.role === 'user' ? 'You' : 'A* Accounting Examiner'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={msg.role === 'user' ? 'text-blue-200' : 'text-slate-500'}>
                        {msg.timestamp}
                      </span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="text-slate-500 hover:text-slate-700 transition"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Rendered Body */}
                  {msg.role === 'assistant' ? (
                    renderFormattedContent(msg.content)
                  ) : (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white font-bold text-xs shadow-xs">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs animate-pulse">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-2xs flex items-center gap-2 text-xs text-slate-500">
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                  <span>Computing double-entry schedules, calculating variances, and drafting examiner notes...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Box */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="relative flex flex-col gap-2">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask any question (e.g. 'How to calculate Provision for Unrealised Profit in manufacturing accounts?')..."
                  rows={2}
                  disabled={isLoading}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50/50 p-3 pr-24 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-2.5 bottom-3.5 flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                >
                  <span>Send</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for a new line</span>
                <span className="font-mono text-slate-500">Cambridge 9706 Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): High-Yield Preset Questions & Knowledge Navigator */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Preset Prompts Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span>High-Yield Exam Scenarios</span>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                1-Click Ask
              </span>
            </div>

            {/* Category Tabs */}
            <div className="mt-3 flex overflow-x-auto gap-1 pb-1">
              {PRESET_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategoryTab(i)}
                  className={`rounded-md px-2 py-1 text-[11px] font-medium whitespace-nowrap transition ${
                    selectedCategoryTab === i
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {topic.category.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Prompt List */}
            <div className="mt-3 space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {PRESET_TOPICS[selectedCategoryTab].prompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  disabled={isLoading}
                  className="w-full text-left rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-2xs transition group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-xs text-slate-900 group-hover:text-blue-700">
                      {p.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {p.query}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Syllabus Cheatsheet Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-200">
              <Info className="h-4 w-4 text-blue-600" />
              <span>Official 9706 Exam Key Rules</span>
            </div>
            
            <ul className="mt-3 space-y-2 text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-700">•</span>
                <span><strong>Bonus Issue Rule:</strong> Never use the Revaluation Reserve for a bonus issue (use Share Premium first).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-700">•</span>
                <span><strong>Partnership 1890:</strong> No salaries, no interest on capital/drawings, profits shared equally, 5% interest on loans.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-700">•</span>
                <span><strong>PUP Elimination:</strong> Finished goods closing inventory on SOFP = Transfer Value minus Closing PUP.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-700">•</span>
                <span><strong>ARR Formula:</strong> (Average annual profit / (Initial outlay / 2)) × 100.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
