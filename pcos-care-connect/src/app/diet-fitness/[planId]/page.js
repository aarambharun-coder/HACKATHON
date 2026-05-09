'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Badge, Button, PageHeader } from '@/components/UI';
import { motion } from 'framer-motion';

const PLANS = {
  'low-gi': {
    id: 'low-gi',
    name: 'PCOS-Friendly Low GI Diet',
    emoji: '🌾',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.8,
    gradient: 'from-green-500 to-emerald-600',
    color: 'green',
    tagline: 'Stabilise blood sugar, regulate insulin, and manage weight sustainably.',
    overview: 'The Low GI (Glycaemic Index) diet focuses on foods that release glucose slowly into the bloodstream, preventing insulin spikes which are a core driver of PCOS. Over 4 weeks you will reset your relationship with carbohydrates, stabilise energy levels, and start seeing improvements in hormonal balance.',
    weeklyPlan: [
      {
        week: 'Week 1', theme: 'Stabilise Blood Sugar',
        days: [
          { day: 'Monday', meals: { breakfast: 'Steel-cut oats with berries & chia seeds', lunch: 'Grilled chicken salad with olive oil dressing', dinner: 'Baked salmon with roasted broccoli & quinoa', snack: 'Apple slices with almond butter' } },
          { day: 'Tuesday', meals: { breakfast: 'Greek yogurt with walnuts & honey', lunch: 'Lentil soup with whole grain bread', dinner: 'Stir-fried tofu & vegetables with brown rice', snack: 'Handful of mixed nuts' } },
          { day: 'Wednesday', meals: { breakfast: 'Veggie omelette (2 eggs, spinach, tomato)', lunch: 'Turkey & avocado wrap in whole wheat tortilla', dinner: 'Grilled chicken with sweet potato & green beans', snack: 'Carrot sticks with hummus' } },
          { day: 'Thursday', meals: { breakfast: 'Smoothie: spinach, banana, flaxseed, almond milk', lunch: 'Chickpea & vegetable curry with basmati rice', dinner: 'Pan-seared fish with steamed asparagus & barley', snack: 'Rice cake with nut butter' } },
          { day: 'Friday', meals: { breakfast: 'Whole grain toast with avocado & poached egg', lunch: 'Quinoa salad with cucumber, feta & olives', dinner: 'Baked chicken thighs with roasted cauliflower', snack: 'Orange and a few almonds' } },
          { day: 'Saturday', meals: { breakfast: 'Oat pancakes with fresh berries (no syrup)', lunch: 'Grilled prawn salad with lemon dressing', dinner: 'Lentil dhal with brown rice', snack: 'Greek yogurt with seeds' } },
          { day: 'Sunday', meals: { breakfast: 'Overnight oats with apple & cinnamon', lunch: 'Bean & vegetable soup with rye bread', dinner: 'Grilled salmon with quinoa & roasted peppers', snack: 'Celery with peanut butter' } },
        ],
      },
      {
        week: 'Week 2', theme: 'Reduce Inflammation',
        days: [
          { day: 'Monday', meals: { breakfast: 'Turmeric oatmeal with flaxseeds', lunch: 'Grilled mackerel with mixed green salad', dinner: 'Chicken & vegetable stew with whole grain bread', snack: 'Blueberries & walnuts' } },
          { day: 'Tuesday', meals: { breakfast: 'Spinach & egg muffins (meal prep)', lunch: 'Edamame & brown rice bowl with sesame dressing', dinner: 'Baked cod with sweet potato wedges', snack: 'Apple with almond butter' } },
          { day: 'Wednesday', meals: { breakfast: 'Banana oat smoothie with protein powder', lunch: 'Grilled chicken wraps with avocado & salsa', dinner: 'Beef & vegetable stir-fry with noodles', snack: 'Trail mix (no added sugar)' } },
          { day: 'Thursday', meals: { breakfast: 'Yogurt parfait with granola & strawberries', lunch: 'Tuna & sweetcorn salad sandwich on rye', dinner: 'Prawn & vegetable curry with cauliflower rice', snack: 'Pear & cashews' } },
          { day: 'Friday', meals: { breakfast: 'Scrambled eggs with smoked salmon & spinach', lunch: 'Lentil & vegetable soup', dinner: 'Turkey meatballs with zucchini noodles', snack: 'Cottage cheese with fruit' } },
          { day: 'Saturday', meals: { breakfast: 'Whole grain waffles with fresh fruit', lunch: 'Buddha bowl: quinoa, roasted vegetables, tahini', dinner: 'Grilled chicken with asparagus & brown rice', snack: 'Dates stuffed with almond butter' } },
          { day: 'Sunday', meals: { breakfast: 'Poached eggs on whole grain toast with tomato', lunch: 'Minestrone soup', dinner: 'Baked sea bass with roasted Mediterranean vegetables', snack: 'Mixed berries' } },
        ],
      },
    ],
    groceryList: {
      proteins: ['Chicken breast', 'Salmon', 'Eggs', 'Greek yogurt', 'Lentils', 'Chickpeas', 'Tofu', 'Tuna (canned in water)'],
      carbs: ['Steel-cut oats', 'Brown rice', 'Quinoa', 'Sweet potatoes', 'Whole grain bread', 'Barley'],
      vegetables: ['Broccoli', 'Spinach', 'Kale', 'Bell peppers', 'Cauliflower', 'Zucchini', 'Asparagus', 'Tomatoes'],
      fruits: ['Berries (blueberries, strawberries)', 'Apples', 'Oranges', 'Bananas (in moderation)', 'Avocados'],
      fats: ['Extra virgin olive oil', 'Almonds', 'Walnuts', 'Chia seeds', 'Flaxseeds', 'Almond butter'],
      other: ['Turmeric', 'Cinnamon', 'Ginger', 'Garlic', 'Lemon', 'Apple cider vinegar'],
    },
    tips: ['Eat every 3–4 hours to prevent blood sugar crashes', 'Always pair carbs with protein or fat', 'Choose whole fruit over fruit juice', 'Drink warm water with lemon every morning', 'Add cinnamon to oatmeal — it improves insulin sensitivity'],
    supplements: ['Inositol (Myo-Inositol + D-Chiro)', 'Vitamin D3', 'Omega-3 fatty acids', 'Magnesium glycinate', 'Zinc'],
  },

  'high-protein': {
    id: 'high-protein',
    name: 'High Protein PCOS Plan',
    emoji: '💪',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.7,
    gradient: 'from-blue-500 to-cyan-600',
    color: 'blue',
    tagline: 'Build muscle, reduce androgens, and improve fertility with high-protein nutrition.',
    overview: 'A high-protein diet is one of the most effective strategies for PCOS management. Protein keeps you fuller longer, reduces cravings, builds lean muscle mass (which improves insulin sensitivity), and helps regulate androgen levels. Over 6 weeks, you will transform your body composition and hormonal profile.',
    weeklyPlan: [
      {
        week: 'Week 1–2', theme: 'Foundation — Protein Basics',
        days: [
          { day: 'Monday', meals: { breakfast: 'Protein smoothie: whey/plant protein, banana, almond milk', lunch: 'Grilled chicken breast with quinoa & roasted veg', dinner: 'Baked salmon with lentils & steamed greens', snack: 'Hard-boiled eggs (2) with cherry tomatoes' } },
          { day: 'Tuesday', meals: { breakfast: '3-egg omelette with spinach, mushrooms & feta', lunch: 'Greek yogurt protein bowl with seeds & berries', dinner: 'Turkey stir-fry with broccoli & brown rice', snack: 'Cottage cheese with cucumber' } },
          { day: 'Wednesday', meals: { breakfast: 'Overnight oats with protein powder & chia', lunch: 'Tuna avocado salad on rye bread', dinner: 'Chicken & bean chilli with cauliflower rice', snack: 'Protein bar (natural, low sugar)' } },
          { day: 'Thursday', meals: { breakfast: 'Scrambled eggs with smoked salmon on toast', lunch: 'Lentil & vegetable soup with chicken', dinner: 'Prawn stir-fry with edamame & noodles', snack: 'Greek yogurt & almonds' } },
          { day: 'Friday', meals: { breakfast: 'High-protein pancakes with berries', lunch: 'Chicken Caesar salad (light dressing)', dinner: 'Beef mince with sweet potato & kale', snack: 'Hummus with vegetable sticks' } },
          { day: 'Saturday', meals: { breakfast: 'Tofu scramble with turmeric & vegetables', lunch: 'Prawn & avocado salad', dinner: 'Baked chicken thighs with roasted root vegetables', snack: 'Mixed nuts & seeds' } },
          { day: 'Sunday', meals: { breakfast: 'Protein waffles with Greek yogurt', lunch: 'Chickpea Buddha bowl', dinner: 'Grilled fish with sweet potato mash', snack: 'Apple with peanut butter' } },
        ],
      },
    ],
    groceryList: {
      proteins: ['Chicken breast', 'Salmon', 'Tuna', 'Eggs', 'Greek yogurt (full fat)', 'Cottage cheese', 'Whey/plant protein powder', 'Tempeh', 'Edamame', 'Lentils', 'Chickpeas'],
      carbs: ['Quinoa', 'Brown rice', 'Sweet potatoes', 'Oats', 'Whole grain bread'],
      vegetables: ['Broccoli', 'Spinach', 'Kale', 'Mushrooms', 'Bell peppers', 'Zucchini', 'Cauliflower'],
      fruits: ['Berries', 'Apples', 'Bananas', 'Avocados'],
      fats: ['Olive oil', 'Almonds', 'Walnuts', 'Chia seeds', 'Peanut butter'],
      other: ['Turmeric', 'Ginger', 'Garlic', 'Apple cider vinegar', 'Low-sodium soy sauce'],
    },
    tips: ['Aim for 1.2–1.6g protein per kg body weight', 'Have protein at every meal including breakfast', 'Prioritise whole food protein over supplements', 'Track your protein intake for the first 2 weeks', 'Post-workout protein within 30 minutes is optimal'],
    supplements: ['Whey or plant-based protein powder', 'Creatine monohydrate', 'BCAA (if training intensely)', 'Iron (if deficient — check with doctor)', 'Vitamin B12 (especially for plant-based eaters)'],
  },

  'anti-inflammatory': {
    id: 'anti-inflammatory',
    name: 'Anti-Inflammatory Diet',
    emoji: '🫐',
    level: 'Advanced',
    duration: '8 weeks',
    rating: 4.9,
    gradient: 'from-purple-500 to-violet-600',
    color: 'purple',
    tagline: 'Target root-cause inflammation to balance hormones at a cellular level.',
    overview: 'Chronic low-grade inflammation drives many PCOS symptoms. This advanced 8-week plan uses evidence-based anti-inflammatory superfoods — rich in omega-3s, antioxidants, and polyphenols — to reduce inflammation, restore hormonal balance, and improve overall wellbeing from the inside out.',
    weeklyPlan: [
      {
        week: 'Week 1–2', theme: 'Eliminate Inflammatory Foods',
        days: [
          { day: 'Monday', meals: { breakfast: 'Açaí bowl with mixed berries & chia', lunch: 'Grilled mackerel on a bed of spinach with lemon', dinner: 'Turmeric chicken with roasted rainbow vegetables', snack: 'Walnuts & dark chocolate (85%+)' } },
          { day: 'Tuesday', meals: { breakfast: 'Green smoothie: kale, ginger, cucumber, lemon', lunch: 'Salmon & avocado sushi roll bowl', dinner: 'Wild-caught prawn stir-fry with bok choy', snack: 'Blueberries with a handful of almonds' } },
          { day: 'Wednesday', meals: { breakfast: 'Turmeric golden milk oatmeal', lunch: 'Sardine & tomato salad on rye', dinner: 'Baked trout with roasted beetroot & quinoa', snack: 'Celery with almond butter' } },
          { day: 'Thursday', meals: { breakfast: 'Matcha smoothie with banana & hemp seeds', lunch: 'Anti-inflammatory lentil soup with ginger', dinner: 'Chicken & vegetable broth with leafy greens', snack: 'Pomegranate seeds & pistachios' } },
          { day: 'Friday', meals: { breakfast: 'Berry & spinach protein smoothie', lunch: 'Grilled salmon with mango & avocado salsa', dinner: 'Turkey & kale stew with black beans', snack: 'Green tea & a handful of mixed seeds' } },
          { day: 'Saturday', meals: { breakfast: 'Poached eggs with smoked salmon on rye', lunch: 'Rainbow salad with extra virgin olive oil', dinner: 'Baked cod with cauliflower mash & olive tapenade', snack: 'Dark berries & Brazil nuts' } },
          { day: 'Sunday', meals: { breakfast: 'Overnight oats with ginger, apple & flax', lunch: 'Miso soup with tofu & seaweed', dinner: 'Herb-roasted chicken with roasted garlic vegetables', snack: 'Herbal tea (spearmint or chamomile)' } },
        ],
      },
    ],
    groceryList: {
      proteins: ['Wild-caught salmon', 'Mackerel', 'Sardines', 'Trout', 'Chicken (organic if possible)', 'Eggs (free-range)', 'Tofu', 'Edamame', 'Lentils', 'Black beans'],
      carbs: ['Quinoa', 'Brown rice', 'Oats', 'Sweet potatoes', 'Rye bread'],
      vegetables: ['Kale', 'Spinach', 'Broccoli', 'Bok choy', 'Beetroot', 'Cauliflower', 'Tomatoes', 'Garlic', 'Ginger', 'Turmeric (fresh)'],
      fruits: ['Blueberries', 'Strawberries', 'Açaí', 'Pomegranate', 'Mango', 'Avocado', 'Lemon'],
      fats: ['Extra virgin olive oil', 'Walnuts', 'Almonds', 'Brazil nuts', 'Chia seeds', 'Hemp seeds', 'Flaxseeds'],
      other: ['Dark chocolate (85%+)', 'Matcha powder', 'Miso paste', 'Apple cider vinegar', 'Seaweed', 'Green tea', 'Spearmint tea'],
    },
    tips: ['Eliminate processed foods completely in Week 1', 'Cook with extra virgin olive oil or avocado oil only', 'Aim for 2–3 servings of fatty fish per week', 'Spearmint tea (2 cups/day) has been shown to reduce androgens', 'Avoid alcohol and excessive caffeine throughout the plan'],
    supplements: ['Omega-3 (EPA+DHA fish oil, 2g/day)', 'Curcumin / Turmeric extract', 'Vitamin D3 + K2', 'N-Acetyl Cysteine (NAC)', 'Resveratrol', 'Magnesium glycinate'],
  },
};

export default function DietPlanDetailPage() {
  const { planId } = useParams();
  const router = useRouter();
  const plan = PLANS[planId];

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-2xl font-bold mb-3">Plan not found</h2>
          <Link href="/diet-fitness"><Button>← Back to Plans</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHeader
        title={`${plan.emoji} ${plan.name}`}
        subtitle={plan.tagline}
        gradient={plan.gradient}
      />

      <section className="container-max py-10">
        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Level', value: plan.level, icon: '📊' },
            { label: 'Duration', value: plan.duration, icon: '📅' },
            { label: 'Rating', value: `⭐ ${plan.rating}`, icon: '🏆' },
            { label: 'Reviews', value: '1,200+', icon: '💬' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card hover={false} variant="elevated">
              <h2 className="text-xl font-bold mb-3">📋 Plan Overview</h2>
              <p className="text-gray-600 leading-relaxed">{plan.overview}</p>
            </Card>

            {/* Weekly Meal Plan */}
            {plan.weeklyPlan.map((week, wi) => (
              <Card key={wi} hover={false} variant="elevated">
                <h2 className="text-xl font-bold mb-1">{week.week}: {week.theme}</h2>
                <p className="text-sm text-gray-500 mb-5">Sample daily meal structure for this week</p>
                <div className="space-y-4">
                  {week.days.map((day, di) => (
                    <motion.div key={di} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: di * 0.04 }}
                      className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 px-4 py-2.5 font-bold text-gray-800 text-sm">
                        📅 {day.day}
                      </div>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { label: '🌅 Breakfast', value: day.meals.breakfast },
                          { label: '☀️ Lunch', value: day.meals.lunch },
                          { label: '🌙 Dinner', value: day.meals.dinner },
                          { label: '🍎 Snack', value: day.meals.snack },
                        ].map((meal) => (
                          <div key={meal.label}>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{meal.label}</p>
                            <p className="text-sm text-gray-700">{meal.value}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Back button */}
            <Link href="/diet-fitness">
              <Button variant="outline" className="w-full">← Back to All Plans</Button>
            </Link>

            {/* Grocery List */}
            <Card hover={false} variant="elevated">
              <h3 className="font-bold text-gray-900 mb-4">🛒 Grocery List</h3>
              {Object.entries(plan.groceryList).map(([cat, items]) => (
                <div key={cat} className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 capitalize">{cat}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span key={item} className="text-xs bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 text-gray-600">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </Card>

            {/* Tips */}
            <Card hover={false} className="bg-amber-50 border-amber-200">
              <h3 className="font-bold text-amber-900 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2">
                {plan.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">→</span> {tip}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Supplements */}
            <Card hover={false} variant="elevated">
              <h3 className="font-bold text-gray-900 mb-3">💊 Recommended Supplements</h3>
              <ul className="space-y-2">
                {plan.supplements.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-3">* Always consult your doctor before starting supplements.</p>
            </Card>

            {/* AI Assistant CTA */}
            <Link href="/ai-assistant">
              <Card hover={false} className="bg-gradient-to-br from-secondary/5 to-purple-50 border-secondary/20 cursor-pointer">
                <p className="text-2xl mb-2">🤖</p>
                <h3 className="font-bold text-gray-900 mb-1">Have questions?</h3>
                <p className="text-sm text-gray-500 mb-3">Ask our AI assistant about this diet plan, substitutions, or PCOS nutrition.</p>
                <Button variant="outline" className="w-full" size="sm">Ask AI Assistant →</Button>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
