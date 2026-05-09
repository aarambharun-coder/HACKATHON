'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button, PageHeader } from '@/components/UI';
import { motion } from 'framer-motion';

const DIET_PLANS = [
  {
    id: 'low-gi',
    name: 'PCOS-Friendly Low GI Diet',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.8,
    emoji: '🌾',
    color: 'from-green-500/10 to-emerald-500/5',
    border: 'border-green-200',
    tag: 'Most Popular',
    tagColor: 'bg-green-100 text-green-700',
    meals: ['Oatmeal', 'Grilled Chicken', 'Broccoli', 'Green Salad', 'Almonds'],
    benefits: ['Regulate insulin levels', 'Stable energy throughout day', 'Sustainable weight management'],
    desc: 'Perfect for beginners — focuses on low glycaemic index foods to stabilise blood sugar and reduce insulin resistance.',
  },
  {
    id: 'high-protein',
    name: 'High Protein PCOS Plan',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.7,
    emoji: '💪',
    color: 'from-blue-500/10 to-cyan-500/5',
    border: 'border-blue-200',
    tag: 'Best for Weight Loss',
    tagColor: 'bg-blue-100 text-blue-700',
    meals: ['Eggs', 'Fatty Fish', 'Lentils', 'Greek Yogurt', 'Nuts'],
    benefits: ['Build lean muscle mass', 'Reduce androgen levels', 'Improve fertility outcomes'],
    desc: 'High-protein approach to curb cravings, build muscle, and improve hormonal balance over 6 weeks.',
  },
  {
    id: 'anti-inflammatory',
    name: 'Anti-Inflammatory Diet',
    level: 'Advanced',
    duration: '8 weeks',
    rating: 4.9,
    emoji: '🫐',
    color: 'from-purple-500/10 to-violet-500/5',
    border: 'border-purple-200',
    tag: 'Highly Rated',
    tagColor: 'bg-purple-100 text-purple-700',
    meals: ['Fatty Fish', 'Berries', 'Extra Virgin Olive Oil', 'Leafy Greens', 'Turmeric'],
    benefits: ['Reduce systemic inflammation', 'Balance hormones naturally', 'Boost immune system'],
    desc: 'An advanced 8-week plan using anti-inflammatory superfoods to address root causes of PCOS at a cellular level.',
  },
];

const FITNESS_PLANS = [
  { day: 'Monday', exercise: 'Strength Training (Lower Body)', duration: '30 min', intensity: 'Moderate', description: 'Squats, lunges, glute bridges', icon: '🏋️' },
  { day: 'Tuesday', exercise: 'Yoga & Stretching', duration: '45 min', intensity: 'Low', description: 'Stress relief, flexibility, hormonal balance', icon: '🧘' },
  { day: 'Wednesday', exercise: 'Cardio — Brisk Walk / Cycle', duration: '30 min', intensity: 'Moderate', description: 'Improve cardiovascular health & insulin sensitivity', icon: '🚴' },
  { day: 'Thursday', exercise: 'Strength Training (Upper Body)', duration: '30 min', intensity: 'Moderate', description: 'Push-ups, rows, shoulder press', icon: '💪' },
  { day: 'Friday', exercise: 'Swimming / Water Aerobics', duration: '30 min', intensity: 'Low-Moderate', description: 'Full body, low impact — joint friendly', icon: '🏊' },
  { day: 'Saturday', exercise: 'Pilates / HIIT', duration: '45 min', intensity: 'Moderate-High', description: 'Core strengthening and metabolism boost', icon: '⚡' },
  { day: 'Sunday', exercise: 'Rest & Light Activity', duration: '15 min', intensity: 'Very Light', description: 'Recovery day — meditation or gentle walking', icon: '🌿' },
];

const intensityColor = { Low: 'success', 'Low-Moderate': 'info', Moderate: 'warning', 'Moderate-High': 'secondary', 'Very Light': 'primary' };

export default function DietFitnessPage() {
  const [activeTab, setActiveTab] = useState('diet');
  const [activePlanId, setActivePlanId] = useState(null);

  const activePlan = DIET_PLANS.find(p => p.id === activePlanId);

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHeader
        title="🥗 Diet & Fitness Plans"
        subtitle="Personalised nutrition and exercise recommendations for PCOS management"
        gradient="from-green-500 via-emerald-500 to-teal-500"
      />

      <section className="container-max py-10">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-8 max-w-xs">
          {[{ id: 'diet', icon: '🍎', label: 'Diet Plans' }, { id: 'fitness', icon: '💪', label: 'Fitness' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* DIET TAB */}
        {activeTab === 'diet' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Active Plan Banner */}
            {activePlan && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activePlan.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Currently Active Plan</p>
                    <p className="font-bold text-gray-900">{activePlan.name}</p>
                    <p className="text-sm text-gray-500">{activePlan.duration} · {activePlan.level}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/diet-fitness/${activePlan.id}`}>
                    <Button size="sm">View My Plan →</Button>
                  </Link>
                  <Button size="sm" variant="outline" onClick={() => setActivePlanId(null)}>Stop Plan</Button>
                </div>
              </motion.div>
            )}

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {DIET_PLANS.map((plan, i) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className={`bg-gradient-to-br ${plan.color} border-2 ${activePlanId === plan.id ? plan.border : 'border-gray-100'} rounded-2xl p-6 h-full flex flex-col hover:shadow-premium hover:-translate-y-1 transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{plan.emoji}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${plan.tagColor}`}>{plan.tag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 flex-1">{plan.desc}</p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <Badge variant="primary">{plan.level}</Badge>
                      <Badge variant="secondary">{plan.duration}</Badge>
                      <Badge variant="success">⭐ {plan.rating}</Badge>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Key Foods</p>
                      <div className="flex flex-wrap gap-1.5">
                        {plan.meals.map((m) => <span key={m} className="text-xs bg-white/70 border border-gray-200 rounded-full px-2.5 py-1 text-gray-600">{m}</span>)}
                      </div>
                    </div>
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Benefits</p>
                      <ul className="space-y-1">
                        {plan.benefits.map((b) => (
                          <li key={b} className="text-xs text-gray-600 flex items-center gap-2">
                            <span className="text-emerald-500 font-bold">✓</span> {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {activePlanId === plan.id ? (
                      <Link href={`/diet-fitness/${plan.id}`}>
                        <Button className="w-full" variant="secondary">📋 View Plan Details →</Button>
                      </Link>
                    ) : (
                      <Link href={`/diet-fitness/${plan.id}`}>
                        <Button className="w-full" onClick={() => setActivePlanId(plan.id)}>
                          🚀 Start Plan
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Nutrition Tips */}
            <Card hover={false} variant="elevated">
              <h2 className="text-xl font-bold mb-5">💡 Nutrition Tips for PCOS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="font-bold text-green-800 mb-3">✅ Do's</p>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    {['Eat whole grains and high-fibre foods', 'Include lean proteins at every meal', 'Have healthy fats (avocado, olive oil)', 'Drink 2–3 litres of water daily', 'Eat at regular intervals to stabilise blood sugar'].map(t => <li key={t}>• {t}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="font-bold text-red-700 mb-3">❌ Don'ts</p>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    {['Avoid refined sugars and white flour', 'Skip processed and packaged foods', 'Limit saturated and trans fats', 'Avoid excessive caffeine (max 1 cup/day)', "Don't skip meals — especially breakfast"].map(t => <li key={t}>• {t}</li>)}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* FITNESS TAB */}
        {activeTab === 'fitness' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {activePlan && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl flex items-center gap-3 mb-2">
                <span className="text-2xl">{activePlan.emoji}</span>
                <div>
                  <p className="text-xs text-blue-600 font-semibold uppercase">Active Diet Plan paired with this schedule</p>
                  <p className="font-bold text-gray-800">{activePlan.name}</p>
                </div>
                <Link href={`/diet-fitness/${activePlan.id}`} className="ml-auto">
                  <Button size="sm" variant="outline">View Diet Plan →</Button>
                </Link>
              </div>
            )}

            <Card hover={false} variant="elevated">
              <h2 className="text-xl font-bold mb-6">📅 Weekly Fitness Schedule</h2>
              <div className="space-y-3">
                {FITNESS_PLANS.map((day, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50/80 transition group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-xl shrink-0">
                      {day.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-gray-500 text-xs uppercase tracking-wider">{day.day}</p>
                        <Badge variant={intensityColor[day.intensity] || 'primary'} size="sm">{day.intensity}</Badge>
                      </div>
                      <p className="font-bold text-gray-900 group-hover:text-primary transition text-sm">{day.exercise}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{day.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-gray-700">⏱ {day.duration}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card hover={false} variant="elevated">
              <h2 className="text-xl font-bold mb-5">🏃 Fitness Tips for PCOS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="font-bold mb-3 text-gray-800">Best Exercises</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {['Brisk walking (30 min/day)', 'Swimming and water aerobics', 'Cycling (indoor or outdoor)', 'Strength training 2–3x/week', 'Yoga and Pilates for stress relief'].map(t => <li key={t} className="flex items-center gap-2"><span className="text-emerald-500">✓</span>{t}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-3 text-gray-800">Key Guidelines</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {['Aim for 150 min/week moderate activity', 'Start slow and build gradually', 'Rest days are equally important', 'Stay well hydrated before & after', 'Consult your doctor before starting'].map(t => <li key={t} className="flex items-center gap-2"><span className="text-blue-500">•</span>{t}</li>)}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </section>
    </main>
  );
}
