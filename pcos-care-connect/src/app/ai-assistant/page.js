'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Button, PageHeader } from '@/components/UI';
import { motion, AnimatePresence } from 'framer-motion';

// Follow-up question suggestions based on topic keywords
const FOLLOWUP_MAP = {
  symptoms: [
    'How long do PCOS symptoms last?',
    'Can PCOS symptoms get worse over time?',
    'Which symptoms need immediate medical attention?',
    'How do I track my PCOS symptoms effectively?',
  ],
  diet: [
    'What is a sample PCOS meal plan for a week?',
    'Are dairy products bad for PCOS?',
    'Can intermittent fasting help with PCOS?',
    'What supplements help with PCOS?',
  ],
  exercise: [
    'How many times a week should I exercise with PCOS?',
    'Is HIIT good or bad for PCOS?',
    'Can yoga alone help manage PCOS?',
    'What time of day is best to exercise with PCOS?',
  ],
  fertility: [
    'What medications help with PCOS fertility?',
    'How long does it take to conceive with PCOS?',
    'Does weight loss improve PCOS fertility?',
    'What is IVF success rate for PCOS patients?',
  ],
  medication: [
    'What are the side effects of Metformin?',
    'How long should I take birth control for PCOS?',
    'Are there natural alternatives to PCOS medications?',
    'Can I stop PCOS medication on my own?',
  ],
  stress: [
    'How does cortisol affect PCOS?',
    'What meditation techniques work best for PCOS?',
    'Can therapy help with PCOS-related depression?',
    'How does poor sleep worsen PCOS?',
  ],
  weight: [
    'Why is it harder to lose weight with PCOS?',
    'What is the best diet for PCOS weight loss?',
    'How much weight loss improves PCOS symptoms?',
    'Does muscle building help with PCOS?',
  ],
  skin: [
    'What skincare routine works for PCOS acne?',
    'Does spearmint tea reduce PCOS hair growth?',
    'What vitamins help with PCOS hair loss?',
    'Is laser hair removal safe with PCOS?',
  ],
  default: [
    'What are the main types of PCOS?',
    'How is PCOS diagnosed by a doctor?',
    'Can PCOS be cured permanently?',
    'What lifestyle changes help the most with PCOS?',
  ],
};

function getFollowups(message) {
  const m = (message || '').toLowerCase();
  if (m.includes('symptom') || m.includes('sign') || m.includes('irregular')) return FOLLOWUP_MAP.symptoms;
  if (m.includes('diet') || m.includes('food') || m.includes('eat') || m.includes('meal')) return FOLLOWUP_MAP.diet;
  if (m.includes('exercise') || m.includes('workout') || m.includes('yoga') || m.includes('fitness')) return FOLLOWUP_MAP.exercise;
  if (m.includes('fertil') || m.includes('pregnant') || m.includes('baby') || m.includes('conceiv')) return FOLLOWUP_MAP.fertility;
  if (m.includes('medic') || m.includes('metformin') || m.includes('pill') || m.includes('tablet')) return FOLLOWUP_MAP.medication;
  if (m.includes('stress') || m.includes('anxiety') || m.includes('depress') || m.includes('mental')) return FOLLOWUP_MAP.stress;
  if (m.includes('weight') || m.includes('fat') || m.includes('lose') || m.includes('slim')) return FOLLOWUP_MAP.weight;
  if (m.includes('skin') || m.includes('acne') || m.includes('hair') || m.includes('hirsut')) return FOLLOWUP_MAP.skin;
  return FOLLOWUP_MAP.default;
}

function AIMarkdown({ text }) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];

  const renderInline = (t) => t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={`l${elements.length}`} className="list-disc pl-5 space-y-1.5 my-2">
          {listItems.map((item, i) => (
            <li key={i} className="text-sm" dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('• ') || t.startsWith('- ') || t.startsWith('* ')) {
      listItems.push(t.substring(2));
    } else {
      flushList();
      if (t) elements.push(
        <p key={`p${i}`} className="text-sm mb-1.5 last:mb-0" dangerouslySetInnerHTML={{ __html: renderInline(t) }} />
      );
    }
  });
  flushList();
  return <div className="ai-markdown space-y-0.5">{elements}</div>;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! 👋 I'm your **PCOS Health Assistant**. I can help you with:\n\n• PCOS symptoms & diagnosis\n• Diet & nutrition tips\n• Exercise recommendations\n• Fertility guidance\n• Medication information\n• Stress & mental health\n• Weight management\n• Skin & hair care\n\nHow can I help you today?",
      followups: null,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || loading) return;

    const userMsg = { id: Date.now(), type: 'user', text: msgText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText, history: messages.slice(-10) }),
      });
      const data = await res.json();
      const followups = getFollowups(msgText);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: data.response || "I'm sorry, I couldn't process that. Please try again.",
          followups,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: 'bot', text: "Connection error. Please try again.", followups: FOLLOWUP_MAP.default },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(); };

  const INITIAL_SUGGESTIONS = [
    { text: 'What are PCOS symptoms?', icon: '🩺' },
    { text: 'Best diet for PCOS?', icon: '🥗' },
    { text: 'Exercise tips for PCOS', icon: '🏃‍♀️' },
    { text: 'Can I get pregnant with PCOS?', icon: '👶' },
    { text: 'How to manage stress?', icon: '🧘' },
    { text: 'PCOS medications info', icon: '💊' },
    { text: 'Weight management tips', icon: '⚖️' },
    { text: 'Skin and hair care for PCOS', icon: '✨' },
  ];

  const showInitialSuggestions = messages.length <= 1;

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHeader
        title="🤖 AI Health Assistant"
        subtitle="Get instant, evidence-based answers to your PCOS health questions"
        gradient="from-purple-600 via-violet-600 to-pink-600"
      />

      <section className="container-max py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          <Card hover={false} className="flex flex-col p-0 overflow-hidden" style={{ height: 'calc(100vh - 260px)', minHeight: '520px' }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                      {msg.type === 'bot' && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow">AI</div>
                      )}
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-primary to-primary-dark text-white rounded-br-md shadow-md shadow-primary/20'
                          : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-bl-md'
                      }`}>
                        {msg.type === 'bot' ? <AIMarkdown text={msg.text} /> : <p className="text-sm">{msg.text}</p>}
                      </div>
                      {msg.type === 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow">You</div>
                      )}
                    </div>

                    {/* Follow-up suggestions after bot messages */}
                    {msg.type === 'bot' && msg.followups && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="ml-10 mt-2"
                      >
                        <p className="text-xs text-gray-400 mb-2 font-medium">💡 You might also want to ask:</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.followups.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => sendMessage(q)}
                              disabled={loading}
                              className="text-xs px-3 py-1.5 bg-white border border-secondary/20 text-secondary hover:bg-secondary/5 hover:border-secondary/40 rounded-full transition-all font-medium disabled:opacity-40"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow">AI</div>
                  <div className="bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 p-4">
              {showInitialSuggestions && (
                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Quick questions</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {INITIAL_SUGGESTIONS.map((s, i) => (
                      <button key={i} onClick={() => sendMessage(s.text)}
                        className="text-xs p-2.5 text-left bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-gray-100 rounded-xl transition text-gray-600 hover:text-gray-800 flex items-center gap-1.5">
                        <span>{s.icon}</span>
                        <span className="line-clamp-1">{s.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about PCOS…"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm"
                />
                <Button type="submit" disabled={loading || !input.trim()} className="shrink-0">
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : 'Send →'}
                </Button>
              </form>
            </div>
          </Card>

          {/* Info row */}
          <Card className="mt-5" variant="elevated">
            <div className="grid grid-cols-3 divide-x divide-gray-100 text-center">
              {[
                { icon: '🧠', label: 'AI-Powered', desc: 'Evidence-based PCOS knowledge' },
                { icon: '⚡', label: 'Instant Answers', desc: 'Responses in seconds' },
                { icon: '🔒', label: 'Private & Secure', desc: 'Your conversations are confidential' },
              ].map((item, i) => (
                <div key={i} className="px-4 py-2">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="font-semibold text-xs text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs text-blue-700 text-center">
                <strong>⚕️ Disclaimer:</strong> General health information only — not a substitute for professional medical advice.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
