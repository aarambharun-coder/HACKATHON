'use client';

import { useState } from 'react';
import { Card, Button, Input, Badge, PageHeader } from '@/components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const SYMPTOMS = ['Irregular Periods','Heavy Bleeding','Hair Loss','Excess Hair Growth','Acne','Weight Gain','Fatigue','Mood Swings','Pelvic Pain','Bloating','Headaches','Sleep Issues','Anxiety','Brain Fog','Hot Flashes'];
const MOODS = [
  { label: 'Excellent', emoji: '😄', color: 'emerald' },
  { label: 'Good', emoji: '😊', color: 'green' },
  { label: 'Okay', emoji: '😐', color: 'yellow' },
  { label: 'Bad', emoji: '😞', color: 'orange' },
  { label: 'Terrible', emoji: '😢', color: 'red' },
];
const EMOTIONS = ['Happy','Calm','Anxious','Sad','Irritable','Hopeful','Overwhelmed','Grateful','Lonely','Motivated'];

export default function TrackerPage() {
  const [activeTab, setActiveTab] = useState('cycle');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [cycleData, setCycleData] = useState({ date: new Date().toISOString().split('T')[0], periodStatus: '', cycleLength: '', lastPeriodDate: '', flow: '', cramping: '' });
  const [symptomsData, setSymptomsData] = useState({ selected: [], notes: '' });
  const [healthData, setHealthData] = useState({ weight: '', bloodPressure: '', waterIntake: '', sleepHours: '', painLevel: 0, steps: '', temperature: '' });
  const [moodData, setMoodData] = useState({ mood: '', emotions: [], journalNote: '', energyLevel: 5, stressLevel: 5 });

  const tabs = [
    { id: 'cycle', label: 'Cycle Tracking', icon: '📅' },
    { id: 'symptoms', label: 'Symptoms', icon: '🩺' },
    { id: 'health', label: 'Health Metrics', icon: '💪' },
    { id: 'mood', label: 'Mood & Emotions', icon: '😊' },
  ];

  const completionStatus = {
    cycle: !!cycleData.periodStatus,
    symptoms: symptomsData.selected.length > 0,
    health: !!healthData.weight && !!healthData.sleepHours,
    mood: !!moodData.mood && moodData.emotions.length > 0,
  };

  const allComplete = Object.values(completionStatus).every(Boolean);
  const completedCount = Object.values(completionStatus).filter(Boolean).length;

  const toggleSymptom = (s) => setSymptomsData(p => ({ ...p, selected: p.selected.includes(s) ? p.selected.filter(x => x !== s) : [...p.selected, s] }));
  const toggleEmotion = (e) => setMoodData(p => ({ ...p, emotions: p.emotions.includes(e) ? p.emotions.filter(x => x !== e) : [...p.emotions, e] }));

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    setLoading(true);
    try {
      const body = { date: cycleData.date, symptoms: symptomsData.selected, mood: moodData.mood, weight: healthData.weight, bloodPressure: healthData.bloodPressure, waterIntake: healthData.waterIntake, sleepHours: healthData.sleepHours, painLevel: healthData.painLevel };
      const res = await fetch('/api/tracker', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      if (res.ok) setSaved(true);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const generateReport = () => {
    if (!allComplete) return;

    const reportDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const content = `
PCOS HEALTH TRACKER REPORT
Generated: ${reportDate}
${'='.repeat(50)}

CYCLE TRACKING
${'─'.repeat(30)}
Date: ${cycleData.date}
Period Status: ${cycleData.periodStatus}
Cycle Length: ${cycleData.cycleLength || 'Not specified'} days
Last Period Date: ${cycleData.lastPeriodDate || 'Not specified'}
Flow Intensity: ${cycleData.flow || 'Not specified'}
Cramping Level: ${cycleData.cramping || 'Not specified'}

SYMPTOMS REPORTED
${'─'.repeat(30)}
Symptoms: ${symptomsData.selected.join(', ') || 'None'}
Notes: ${symptomsData.notes || 'None'}

HEALTH METRICS
${'─'.repeat(30)}
Weight: ${healthData.weight || 'N/A'} kg
Blood Pressure: ${healthData.bloodPressure || 'N/A'}
Water Intake: ${healthData.waterIntake || 'N/A'} litres
Sleep Hours: ${healthData.sleepHours || 'N/A'} hrs
Pain Level: ${healthData.painLevel}/10
Steps Today: ${healthData.steps || 'N/A'}
Body Temperature: ${healthData.temperature || 'N/A'} °C

MOOD & EMOTIONS
${'─'.repeat(30)}
Overall Mood: ${moodData.mood}
Emotions: ${moodData.emotions.join(', ')}
Energy Level: ${moodData.energyLevel}/10
Stress Level: ${moodData.stressLevel}/10
Journal Note: ${moodData.journalNote || 'None'}

${'='.repeat(50)}
RECOMMENDATIONS
${'─'.repeat(30)}
• Share this report with your gynaecologist or endocrinologist
• Track consistently daily for pattern detection
• Note any medication changes alongside symptoms
• Bring printed report to your next appointment

${'='.repeat(50)}
Powered by PCOS Care Connect | www.pcoscareconnect.in
DISCLAIMER: This report is for personal tracking only. It is not a medical diagnosis.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PCOS_Report_${cycleData.date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHeader
        title="📊 PCOS Health Tracker"
        subtitle="Fill all 4 sections to unlock your downloadable health report"
        gradient="from-accent via-orange-500 to-amber-500"
      />

      <section className="container-max py-8">
        {/* Progress Bar */}
        <Card className="mb-6" hover={false}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Report Completion</h3>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${allComplete ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {completedCount}/4 Sections
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-accent to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tabs.map((tab) => (
              <div key={tab.id} className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${completionStatus[tab.id] ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-500'}`}>
                <span>{completionStatus[tab.id] ? '✅' : '⭕'}</span>
                <span className="font-medium truncate">{tab.label}</span>
              </div>
            ))}
          </div>
          {allComplete && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <p className="text-emerald-700 font-semibold text-sm">🎉 All sections complete! You can now download your health report.</p>
            </motion.div>
          )}
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap flex-1 justify-center transition-all duration-200 ${
                activeTab === tab.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {completionStatus[tab.id] && <span className="text-emerald-500 text-xs">✓</span>}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* CYCLE TAB */}
          {activeTab === 'cycle' && (
            <motion.div key="cycle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card hover={false}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">📅 Cycle Tracking</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                    <input type="date" value={cycleData.date} onChange={(e) => setCycleData(p => ({ ...p, date: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Period Status *</label>
                    <select value={cycleData.periodStatus} onChange={(e) => setCycleData(p => ({ ...p, periodStatus: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm">
                      <option value="">Select status</option>
                      {['No period', 'Period started', 'Light flow', 'Moderate flow', 'Heavy flow', 'Spotting', 'Period ended'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Period Date</label>
                    <input type="date" value={cycleData.lastPeriodDate} onChange={(e) => setCycleData(p => ({ ...p, lastPeriodDate: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cycle Length (days)</label>
                    <input type="number" placeholder="e.g. 28" value={cycleData.cycleLength} onChange={(e) => setCycleData(p => ({ ...p, cycleLength: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cramping Level</label>
                    <select value={cycleData.cramping} onChange={(e) => setCycleData(p => ({ ...p, cramping: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm">
                      <option value="">Select level</option>
                      {['None', 'Mild', 'Moderate', 'Severe'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <Button onClick={() => setActiveTab('symptoms')} className="w-full mt-6">
                  Next: Symptoms →
                </Button>
              </Card>
            </motion.div>
          )}

          {/* SYMPTOMS TAB */}
          {activeTab === 'symptoms' && (
            <motion.div key="symptoms" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card hover={false}>
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">🩺 Symptoms</h2>
                <p className="text-sm text-gray-500 mb-5">Select all symptoms you are experiencing today (select at least one)</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                  {SYMPTOMS.map((s) => (
                    <button key={s} type="button" onClick={() => toggleSymptom(s)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                        symptomsData.selected.includes(s)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 text-gray-700 hover:border-primary/40'
                      }`}>
                      {symptomsData.selected.includes(s) ? '✓ ' : ''}{s}
                    </button>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                  <textarea value={symptomsData.notes} onChange={(e) => setSymptomsData(p => ({ ...p, notes: e.target.value }))}
                    rows={3} placeholder="Any other symptoms or observations..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm resize-none" />
                </div>
                {symptomsData.selected.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {symptomsData.selected.map((s) => <Badge key={s} variant="primary">{s}</Badge>)}
                  </div>
                )}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setActiveTab('cycle')} className="flex-1">← Back</Button>
                  <Button onClick={() => setActiveTab('health')} className="flex-1">Next: Health Metrics →</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* HEALTH METRICS TAB */}
          {activeTab === 'health' && (
            <motion.div key="health" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card hover={false}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">💪 Health Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input type="number" label="Weight (kg) *" placeholder="e.g. 60" value={healthData.weight} onChange={(e) => setHealthData(p => ({ ...p, weight: e.target.value }))} />
                  <Input type="text" label="Blood Pressure" placeholder="e.g. 120/80" value={healthData.bloodPressure} onChange={(e) => setHealthData(p => ({ ...p, bloodPressure: e.target.value }))} />
                  <Input type="number" label="Water Intake (litres)" placeholder="e.g. 2" value={healthData.waterIntake} onChange={(e) => setHealthData(p => ({ ...p, waterIntake: e.target.value }))} />
                  <Input type="number" label="Sleep Hours *" placeholder="e.g. 8" value={healthData.sleepHours} onChange={(e) => setHealthData(p => ({ ...p, sleepHours: e.target.value }))} />
                  <Input type="number" label="Steps Today" placeholder="e.g. 8000" value={healthData.steps} onChange={(e) => setHealthData(p => ({ ...p, steps: e.target.value }))} />
                  <Input type="number" label="Body Temperature (°C)" placeholder="e.g. 36.6" value={healthData.temperature} onChange={(e) => setHealthData(p => ({ ...p, temperature: e.target.value }))} />
                </div>
                <div className="mb-5 mt-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Pain Level: <span className="text-primary font-bold">{healthData.painLevel}/10</span></label>
                  <input type="range" min="0" max="10" value={healthData.painLevel}
                    onChange={(e) => setHealthData(p => ({ ...p, painLevel: e.target.value }))}
                    className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>No Pain</span><span>Moderate</span><span>Severe</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setActiveTab('symptoms')} className="flex-1">← Back</Button>
                  <Button onClick={() => setActiveTab('mood')} className="flex-1">Next: Mood & Emotions →</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* MOOD TAB */}
          {activeTab === 'mood' && (
            <motion.div key="mood" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card hover={false}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">😊 Mood & Emotions</h2>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Overall Mood Today *</label>
                  <div className="grid grid-cols-5 gap-3">
                    {MOODS.map((m) => (
                      <button key={m.label} type="button" onClick={() => setMoodData(p => ({ ...p, mood: m.label.toLowerCase() }))}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          moodData.mood === m.label.toLowerCase()
                            ? 'border-primary bg-primary/5 scale-105 shadow-md'
                            : 'border-gray-200 hover:border-primary/40'
                        }`}>
                        <div className="text-2xl mb-1">{m.emoji}</div>
                        <div className="text-xs font-semibold text-gray-700">{m.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Emotions Felt Today * <span className="font-normal text-gray-400">(select all that apply)</span></label>
                  <div className="flex flex-wrap gap-2">
                    {EMOTIONS.map((e) => (
                      <button key={e} type="button" onClick={() => toggleEmotion(e)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                          moodData.emotions.includes(e)
                            ? 'border-secondary bg-secondary/10 text-secondary'
                            : 'border-gray-200 text-gray-600 hover:border-secondary/40'
                        }`}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Energy Level: <span className="text-secondary font-bold">{moodData.energyLevel}/10</span></label>
                    <input type="range" min="1" max="10" value={moodData.energyLevel} onChange={(e) => setMoodData(p => ({ ...p, energyLevel: e.target.value }))} className="w-full accent-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stress Level: <span className="text-red-500 font-bold">{moodData.stressLevel}/10</span></label>
                    <input type="range" min="1" max="10" value={moodData.stressLevel} onChange={(e) => setMoodData(p => ({ ...p, stressLevel: e.target.value }))} className="w-full accent-red-400" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Journal Note <span className="font-normal text-gray-400">(optional)</span></label>
                  <textarea value={moodData.journalNote} onChange={(e) => setMoodData(p => ({ ...p, journalNote: e.target.value }))}
                    rows={3} placeholder="How are you feeling today? Any thoughts you'd like to note..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm resize-none" />
                </div>

                <div className="flex gap-3 mb-4">
                  <Button variant="outline" onClick={() => setActiveTab('health')} className="flex-1">← Back</Button>
                  <Button onClick={handleSave} loading={loading} className="flex-1">
                    {saved ? '✅ Saved!' : '💾 Save Entry'}
                  </Button>
                </div>

                {/* Download Report */}
                <div className={`p-4 rounded-xl border-2 text-center transition-all ${allComplete ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    {allComplete ? '✅ All sections complete — ready to download!' : `⭕ Complete all 4 sections to unlock report (${completedCount}/4 done)`}
                  </p>
                  <Button
                    onClick={generateReport}
                    disabled={!allComplete}
                    variant={allComplete ? 'secondary' : 'ghost'}
                    className="w-full"
                  >
                    📥 Download Health Report (.txt)
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
