import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a compassionate and knowledgeable PCOS (Polycystic Ovary Syndrome) health assistant called "PCOS Care AI". 

Your role:
- Provide accurate, evidence-based information about PCOS/PCOD
- Help users understand symptoms, treatments, lifestyle changes, and management strategies
- Offer empathetic support and encouragement
- Suggest when to seek professional medical help

Guidelines:
- Keep responses concise (2-4 paragraphs max)
- Use simple, easy-to-understand language
- Include actionable tips when relevant
- Always remind users that your advice is informational, not a substitute for professional medical care
- Use bullet points for lists
- Be warm, supportive, and non-judgmental
- Cover topics like: symptoms, diet, exercise, fertility, mental health, medications, hormonal balance, weight management, skin/hair issues

IMPORTANT: Always end with a brief disclaimer if giving health-related advice.`;

// Specific Q&A pairs matched before broad keywords
const SPECIFIC_QA = [
  { match: ['how long do pcos symptoms last','how long symptoms'], answer: '**How Long Do PCOS Symptoms Last?**\n\nPCOS is a chronic condition — symptoms do not simply go away on their own. However, with the right management:\n\n• **Irregular periods** can regulate within 3–6 months of lifestyle changes or medication\n• **Acne** often improves in 3–6 months with treatment\n• **Excess hair growth** is slower to improve — up to 6–12 months with anti-androgens\n• **Weight-related symptoms** improve gradually with consistent diet and exercise\n\nMany women see significant improvement within 6 months of a structured PCOS management plan.\n\n*Consult your doctor for a personalised treatment timeline.*' },
  { match: ['symptoms get worse','pcos worsen','pcos progress'], answer: '**Can PCOS Symptoms Get Worse?**\n\nYes, PCOS symptoms can worsen if left unmanaged:\n\n• **Insulin resistance** can progress to Type 2 diabetes if not addressed\n• **Hormonal imbalances** deepen with weight gain and chronic stress\n• **Irregular periods** may become more severe over time\n• **Fertility challenges** increase with age and unmanaged PCOS\n\n**What helps prevent worsening:**\n• Early diagnosis and consistent treatment\n• Healthy diet and regular exercise\n• Stress management and quality sleep\n• Regular check-ups every 6–12 months\n\n*Early intervention is key — the sooner you act, the better the outcomes.*' },
  { match: ['immediate medical attention','emergency symptom','serious symptom'], answer: '**PCOS Symptoms Needing Immediate Medical Attention:**\n\nSeek emergency care if you experience:\n\n• **Severe pelvic or abdominal pain** — may indicate ovarian torsion or ruptured cyst\n• **Very heavy bleeding** soaking more than 1 pad per hour\n• **Sudden shortness of breath** or chest pain\n• **Signs of ovarian hyperstimulation** (if on fertility drugs): bloating, nausea, rapid weight gain\n\nSee a doctor soon (within days) for:\n• Periods absent for 3+ months\n• Blood sugar over 200 mg/dL consistently\n• Severe depression or anxiety\n\n*Call emergency services or go to the ER for severe symptoms.*' },
  { match: ['track pcos symptoms','how to track','symptom tracker'], answer: '**How to Track PCOS Symptoms Effectively:**\n\nTracking helps you understand patterns and share data with your doctor.\n\n**What to track daily:**\n• Menstrual cycle dates, flow intensity, spotting\n• Mood and energy levels (1–10 scale)\n• Sleep hours and quality\n• Food intake and any digestive issues\n• Exercise type and duration\n• Weight and measurements\n\n**Tools to use:**\n• PCOS Care Connect tracker (built right into this app!)\n• Period tracking apps like Flo or Clue\n• A simple journal or notes app\n\n**How often:** Daily for symptoms, weekly for weight, monthly for cycle summary.\n\n*Bring your 3-month tracker data to your next doctor visit.*' },
  { match: ['sample meal plan','weekly meal','meal plan for week'], answer: '**Sample 7-Day PCOS Meal Plan:**\n\n**Monday:** Oatmeal + berries | Grilled chicken salad | Salmon + quinoa + broccoli\n**Tuesday:** Greek yogurt + nuts | Lentil soup + rye bread | Tofu stir-fry + brown rice\n**Wednesday:** Veggie omelette | Turkey avocado wrap | Chicken + sweet potato\n**Thursday:** Spinach smoothie | Chickpea curry + rice | Fish + asparagus + barley\n**Friday:** Avocado toast + egg | Quinoa salad + feta | Baked chicken + cauliflower\n**Saturday:** Oat pancakes | Prawn salad | Lentil dhal + brown rice\n**Sunday:** Overnight oats | Bean soup | Salmon + roasted peppers + quinoa\n\n**Snacks:** Almonds, apple, carrot + hummus, Greek yogurt\n\n*Aim for 3 meals + 2 snacks. Never skip breakfast!*' },
  { match: ['dairy bad for pcos','dairy and pcos','should i avoid dairy'], answer: '**Dairy and PCOS: Should You Avoid It?**\n\nThe evidence is mixed, but here\'s what we know:\n\n**Why some women reduce dairy:**\n• Dairy can spike IGF-1 (insulin-like growth factor), which may worsen acne\n• Full-fat dairy may increase androgen levels in some women\n• Some women report reduced bloating and clearer skin after cutting dairy\n\n**Why dairy may be fine for others:**\n• Greek yogurt provides protein and probiotics beneficial for PCOS\n• Calcium and Vitamin D in dairy support bone health\n• Low-fat dairy has less hormonal impact\n\n**Recommendation:** Try eliminating dairy for 4 weeks and monitor symptoms. If no change, dairy is likely fine for you.\n\n*This is highly individual — track your response.*' },
  { match: ['intermittent fasting','if pcos','fasting pcos'], answer: '**Intermittent Fasting and PCOS:**\n\nIntermittent fasting (IF) can be beneficial but requires care with PCOS.\n\n**Potential benefits:**\n• Improves insulin sensitivity\n• Supports weight management\n• Reduces inflammation\n• May help regulate menstrual cycles\n\n**Concerns for PCOS:**\n• Skipping meals can spike cortisol, worsening hormonal imbalance\n• May disrupt HPA axis in some women\n• Not suitable if you have a history of disordered eating\n\n**Safer approach for PCOS:**\n• 14:10 window (eat within 10 hours, fast 14 hours)\n• Always break your fast with protein + complex carbs\n• Avoid IF during the luteal phase if it causes mood issues\n\n*Consult your doctor before starting IF, especially if on medication.*' },
  { match: ['how many times exercise','how often exercise','exercise frequency'], answer: '**How Often Should You Exercise With PCOS?**\n\nThe NHS and PCOS guidelines recommend:\n\n• **150 minutes** of moderate exercise per week (about 30 min/day, 5 days)\n• **2–3 days** of strength training per week\n• **1–2 days** of yoga or low-intensity movement\n• **At least 1 rest day** — recovery is crucial\n\n**Sample weekly plan:**\n• Mon: Strength training (30 min)\n• Tue: Yoga or Pilates (40 min)\n• Wed: Brisk walk/cycle (30 min)\n• Thu: Strength training (30 min)\n• Fri: Swim or dance (30 min)\n• Sat: HIIT or Pilates (40 min)\n• Sun: Rest or gentle walk\n\n*Consistency over intensity — even 20 minutes daily makes a difference.*' },
  { match: ['hiit good for pcos','hiit bad','is hiit safe'], answer: '**Is HIIT Good or Bad for PCOS?**\n\nHIIT (High-Intensity Interval Training) has a nuanced relationship with PCOS.\n\n**Benefits:**\n• Highly effective at improving insulin sensitivity\n• Burns more calories in less time\n• Boosts metabolism for hours post-workout\n\n**Risks if overdone:**\n• Spikes cortisol, which can worsen hormonal imbalance\n• Too much HIIT can disrupt menstrual cycles\n• May cause fatigue and inflammation if done daily\n\n**Recommendation:**\n• Limit HIIT to **1–2 sessions per week**\n• Keep sessions under 30 minutes\n• Pair with yoga or walking on other days\n• Listen to your body — stop if you feel drained for days after\n\n*Balance is key: HIIT works best as part of a varied routine.*' },
  { match: ['can yoga help pcos','yoga for pcos','yoga alone'], answer: '**Can Yoga Help Manage PCOS?**\n\nYes — yoga has significant evidence-backed benefits for PCOS:\n\n**What research shows:**\n• Reduces cortisol and stress hormones by up to 30%\n• Improves insulin sensitivity\n• Regulates menstrual cycles in some women\n• Reduces anxiety and depression associated with PCOS\n• Specific poses stimulate the ovaries and improve blood flow\n\n**Best yoga styles for PCOS:**\n• **Hatha yoga** — balancing and restorative\n• **Yin yoga** — deep stretching, stress relief\n• **Restorative yoga** — gentle, hormonal balance\n\n**Beneficial poses:**\n• Butterfly pose (Baddha Konasana)\n• Reclining bound angle\n• Legs up the wall\n• Child\'s pose\n\nYoga alone may not be sufficient — combine with cardio and strength training for best results.\n\n*Even 20 minutes of yoga daily can meaningfully reduce PCOS symptoms.*' },
  { match: ['metformin side effect','metformin pcos','taking metformin'], answer: '**Metformin for PCOS — Side Effects & What to Expect:**\n\n**Common side effects (usually temporary):**\n• Nausea and stomach upset (most common)\n• Diarrhea or loose stools\n• Loss of appetite\n• Metallic taste in mouth\n\n**How to minimise side effects:**\n• Take with food, never on an empty stomach\n• Start with a low dose and increase gradually\n• Take the extended-release (XR) version — gentler on stomach\n\n**Benefits for PCOS:**\n• Reduces insulin resistance\n• May help restore ovulation\n• Supports weight management\n• Lowers androgen levels over time\n\n**Serious but rare:** Lactic acidosis — seek help if you feel unusual muscle pain or weakness.\n\n*Give Metformin 3–6 months to show full benefits. Report persistent side effects to your doctor.*' },
  { match: ['how long take birth control','birth control pcos','how long on pill'], answer: '**How Long Should You Take Birth Control for PCOS?**\n\nThis depends on your goals:\n\n**For symptom management (acne, irregular periods, excess hair):**\n• Typically prescribed long-term — sometimes years\n• Works while you take it; symptoms often return when stopped\n\n**For contraception + PCOS management:**\n• Can be taken continuously until you want to conceive\n\n**When you stop:**\n• Periods may take 1–3 months to return\n• PCOS symptoms may resume — work with your doctor on a plan\n\n**Never stop suddenly without consulting your doctor.**\n\n*The combined pill (estrogen + progestin) is most commonly prescribed for PCOS.*' },
  { match: ['natural alternative','natural treatment pcos','without medication'], answer: '**Natural Alternatives for PCOS Management:**\n\n**Diet changes:**\n• Low-GI diet reduces insulin resistance significantly\n• Anti-inflammatory foods (berries, fatty fish, turmeric)\n• Eliminate processed sugar and refined carbs\n\n**Supplements with evidence:**\n• **Inositol (Myo + D-Chiro)** — improves insulin sensitivity and ovulation\n• **Vitamin D3** — deficiency worsens PCOS\n• **Omega-3 fatty acids** — reduces inflammation and androgens\n• **Spearmint tea** — shown to reduce testosterone levels\n• **Magnesium** — improves sleep and reduces cortisol\n\n**Lifestyle:**\n• Exercise 5 days/week\n• Sleep 7–9 hours nightly\n• Stress management (yoga, meditation)\n• Maintain healthy weight\n\n*Natural approaches work best for mild PCOS. Severe cases often still require medical treatment.*' },
  { match: ['cortisol pcos','stress hormone','cortisol affect'], answer: '**How Cortisol Affects PCOS:**\n\nCortisol is your primary stress hormone — and it directly impacts PCOS:\n\n**The cortisol-PCOS cycle:**\n• Chronic stress → high cortisol → increased insulin resistance\n• High cortisol → adrenal glands produce more androgens\n• More androgens → worse PCOS symptoms (acne, hair growth, irregular periods)\n• Poor sleep → high cortisol → worse insulin sensitivity\n\n**Signs your cortisol is too high:**\n• Difficulty sleeping despite exhaustion\n• Weight gain around the abdomen\n• Mood swings and anxiety\n• Craving sugary, salty foods\n• Frequent infections\n\n**How to lower cortisol naturally:**\n• Meditation (10 min/day reduces cortisol by 20%)\n• Yoga — especially Yin and Restorative\n• 7–9 hours of sleep\n• Reduce caffeine (max 1 cup/day)\n• Spend time in nature\n\n*Managing stress is as important as diet and exercise for PCOS.*' },
  { match: ['why hard lose weight','pcos weight loss difficult','cant lose weight'], answer: '**Why Is It Hard to Lose Weight With PCOS?**\n\nThis is one of the most common frustrations — and it\'s not your fault.\n\n**Biological reasons:**\n• **Insulin resistance** — cells don\'t absorb glucose properly, so body stores more fat\n• **High androgens** — male hormones promote fat storage, especially belly fat\n• **Leptin resistance** — hunger signals malfunction; you feel hungry even after eating\n• **Slower metabolism** — PCOS can reduce your basal metabolic rate\n• **Inflammation** — chronic low-grade inflammation promotes weight gain\n\n**What actually works:**\n• Low-GI diet (not just low calorie)\n• Strength training 2–3x/week to build insulin-sensitive muscle\n• 7–9 hours of quality sleep\n• Manage stress (cortisol stores fat)\n• Work with an endocrinologist, not just general advice\n\n*Even 5% weight loss can significantly improve PCOS symptoms and restore ovulation.*' },
  { match: ['spearmint tea','spearmint pcos','mint tea'], answer: '**Spearmint Tea for PCOS:**\n\nSpearmint tea is one of the most well-researched natural remedies for PCOS.\n\n**What research shows:**\n• Drinking 2 cups/day for 30 days reduced free testosterone by up to 30% in one study\n• Reduces hirsutism (excess hair growth) over 3–6 months\n• Has anti-androgenic properties\n• Also helps with digestion and bloating\n\n**How to use:**\n• Steep 1 tsp dried spearmint leaves in hot water for 5 minutes\n• Drink 1–2 cups per day\n• Best results seen after 1–3 months of consistent use\n\n**Safe for most people.** Avoid if pregnant or trying to conceive without medical guidance.\n\n*Pair with other PCOS lifestyle changes for best results.*' },
  { match: ['laser hair removal pcos','laser treatment','hair removal'], answer: '**Laser Hair Removal for PCOS:**\n\nLaser hair removal is safe and effective for women with PCOS-related hirsutism.\n\n**How it works:**\n• Laser targets melanin (pigment) in hair follicles\n• Destroys follicle to prevent regrowth\n• Works best on dark hair against lighter skin\n\n**What to expect with PCOS:**\n• Requires more sessions than average (6–10 vs 4–6) because PCOS keeps stimulating new follicles\n• Maintenance sessions needed every 6–12 months\n• Works best when combined with anti-androgen medication (Spironolactone)\n\n**Cost:** ₹2,000–₹8,000 per session depending on the area.\n\n**Alternatives:**\n• Electrolysis (permanent, works on all hair types)\n• Eflornithine cream (slows regrowth)\n• Waxing or threading (temporary)\n\n*Address the hormonal root cause alongside cosmetic treatment.*' },
  { match: ['pcos types','types of pcos','what type pcos'], answer: '**The 4 Main Types of PCOS:**\n\n**1. Insulin-Resistant PCOS (most common — ~70% of cases)**\n• Caused by high insulin levels driving androgen production\n• Key signs: weight gain, sugar cravings, skin tags, dark patches\n• Best managed with: low-GI diet, exercise, Metformin\n\n**2. Adrenal PCOS (~10% of cases)**\n• Caused by abnormal stress response in adrenal glands\n• Key signs: high DHEA-S levels, stress-sensitive\n• Best managed with: stress reduction, adaptogens, avoiding overexercise\n\n**3. Post-Pill PCOS**\n• Hormonal disruption after stopping oral contraceptives\n• Usually temporary (3–6 months)\n• Best managed with: patience, diet support, seed cycling\n\n**4. Inflammatory PCOS**\n• Chronic inflammation triggers androgen production\n• Key signs: fatigue, headaches, bowel issues, skin problems\n• Best managed with: anti-inflammatory diet, gut health focus\n\n*Identifying your type helps personalise your treatment. Ask your doctor for a full hormone panel.*' },
  { match: ['how is pcos diagnosed','diagnose pcos','pcos diagnosis','rotterdam criteria'], answer: '**How Is PCOS Diagnosed?**\n\nDoctors use the **Rotterdam Criteria** — you need at least 2 of these 3:\n\n1. **Irregular or absent periods** (fewer than 8 cycles/year)\n2. **High androgen levels** — either:\n   - Blood test showing elevated testosterone or DHEA-S\n   - Physical signs: acne, excess facial/body hair\n3. **Polycystic ovaries on ultrasound** — 20+ follicles per ovary\n\n**Tests your doctor will order:**\n• Blood tests: LH, FSH, testosterone, DHEA-S, AMH, fasting insulin, glucose\n• Thyroid function (to rule out thyroid disorders)\n• Pelvic ultrasound\n• Blood pressure and BMI assessment\n\n**Important:** You can have PCOS without cysts on your ovaries. The name is misleading.\n\n*See a gynecologist or endocrinologist for proper diagnosis.*' },
  { match: ['pcos cured','pcos cure','is pcos permanent','pcos go away'], answer: '**Can PCOS Be Cured Permanently?**\n\nCurrently, PCOS cannot be completely cured — but it can be very effectively managed.\n\n**The good news:**\n• Symptoms can become minimal or almost unnoticeable with the right management\n• Many women experience significant improvement with lifestyle changes\n• Hormonal balance can be restored, allowing regular periods and natural fertility\n• PCOS symptoms often improve after menopause\n\n**What "managing PCOS" means:**\n• Regular periods through diet + exercise or medication\n• Normal androgen levels\n• Healthy weight and metabolism\n• Successful pregnancy when desired\n\n**Emerging research:**\n• Some researchers believe certain types (like post-pill PCOS) can resolve completely\n• Gut microbiome treatments are being studied\n\n*Focus on management, not cure. Many women with PCOS live completely normal, healthy lives.*' },
  { match: ['pregnant with pcos','conceive pcos','pcos and pregnancy','getting pregnant'], answer: '**Getting Pregnant With PCOS:**\n\nPCOS is the leading cause of female infertility — but also one of the most treatable.\n\n**Good news:**\n• Most women with PCOS can and do conceive\n• Many conceive naturally, especially with lifestyle changes\n\n**Steps to improve fertility:**\n1. **Lose weight if overweight** — even 5% weight loss can restore ovulation\n2. **Track ovulation** — use OPK tests or BBT charting\n3. **See a reproductive endocrinologist** after 6–12 months of trying\n\n**Medical options:**\n• **Letrozole** — first-line ovulation induction (better than Clomid for PCOS)\n• **Metformin** — improves ovulation in insulin-resistant PCOS\n• **Clomiphene (Clomid)** — stimulates ovulation\n• **IUI** — insemination with medications\n• **IVF** — for complex cases\n\n**Timeline:** 60–70% of women with PCOS conceive within 12 months of treatment.\n\n*See a fertility specialist — you have excellent chances with proper treatment.*' },
  { match: ['ivf success pcos','ivf pcos','pcos ivf'], answer: '**IVF Success Rates for PCOS:**\n\nWomen with PCOS generally have **good to excellent IVF outcomes**.\n\n**Success rates:**\n• PCOS patients often produce more eggs per retrieval cycle\n• Live birth rates per cycle: approximately 40–50% under age 35\n• Slightly lower for older patients but still strong\n\n**Challenges unique to PCOS:**\n• **OHSS risk** (Ovarian Hyperstimulation Syndrome) — more common in PCOS\n• May need lower stimulation doses\n• Freeze-all strategy often recommended to reduce OHSS risk\n\n**Before IVF:**\n• Try lifestyle changes and oral medications first\n• Optimise weight (BMI 18–30 ideal for IVF)\n• Take folic acid for 3 months before\n\n**Cost in India:** ₹1.5–3 lakh per cycle depending on clinic and city.\n\n*Discuss your specific case with a reproductive endocrinologist.*' },
  { match: ['weight loss improve','how much weight loss','5 percent weight'], answer: '**How Much Weight Loss Helps PCOS?**\n\nEven modest weight loss has dramatic effects on PCOS:\n\n**5–10% body weight loss can:**\n• Restore ovulation and regular periods in 55–100% of overweight women\n• Reduce testosterone levels by 10–20%\n• Improve insulin sensitivity significantly\n• Reduce acne and excess hair growth\n• Improve mood and energy levels\n• Increase pregnancy rates\n\n**Example:** If you weigh 70 kg, losing just 3.5–7 kg can transform your PCOS symptoms.\n\n**Best approach for sustainable loss:**\n• Aim for 0.5 kg per week (not faster)\n• Combine low-GI diet with strength training\n• Don\'t crash diet — it spikes cortisol and makes PCOS worse\n\n*Quality of weight loss matters more than speed.*' },
];

// Fallback keyword-based responses when no API key is configured
function getFallbackResponse(message) {
  const msg = message.toLowerCase();

  // Check specific Q&A first
  for (const qa of SPECIFIC_QA) {
    if (qa.match.some(m => msg.includes(m))) return qa.answer;
  }


  const responses = {
    symptoms: "**Common PCOS Symptoms:**\n\n• **Irregular periods** — Infrequent, prolonged, or absent menstrual cycles\n• **Excess androgen** — Elevated male hormones causing acne, facial/body hair\n• **Polycystic ovaries** — Enlarged ovaries with follicles surrounding eggs\n• **Weight gain** — Especially around the abdomen\n• **Hair thinning** — On the scalp\n• **Skin darkening** — In body creases (neck, groin)\n• **Fatigue & mood changes**\n\nIf you're experiencing multiple symptoms, I'd recommend consulting a gynecologist or endocrinologist for proper diagnosis through blood tests and ultrasound.\n\n*This is general information — please consult your healthcare provider for personalized advice.*",
    
    diet: "**PCOS-Friendly Diet Tips:**\n\n• **Anti-inflammatory foods** — Berries, fatty fish, leafy greens, turmeric\n• **Low glycemic index (GI) foods** — Whole grains, legumes, nuts, seeds\n• **Lean proteins** — Chicken, fish, eggs, tofu, lentils\n• **Healthy fats** — Avocado, olive oil, nuts, flaxseeds\n• **Fiber-rich foods** — Vegetables, beans, oats\n\n**Foods to limit:**\n• Refined carbs (white bread, pasta, pastries)\n• Sugary drinks and processed foods\n• Excessive dairy (may worsen symptoms for some)\n\nConsider working with a nutritionist who specializes in PCOS for a personalized meal plan.\n\n*This is general information — please consult your healthcare provider for personalized advice.*",
    
    exercise: "**Exercise Recommendations for PCOS:**\n\nRegular physical activity helps manage insulin resistance, reduce androgens, and improve mood.\n\n• **Cardio** (30 min, 3-5x/week) — Walking, swimming, cycling, dancing\n• **Strength training** (2-3x/week) — Improves insulin sensitivity and metabolism\n• **Yoga & Pilates** — Reduces stress and cortisol, improves flexibility\n• **HIIT** (1-2x/week) — Short bursts of intense activity, very effective for PCOS\n\n**Tips:**\n• Start slow if you're new to exercise\n• Consistency matters more than intensity\n• Find activities you enjoy!\n• Aim for 150 minutes of moderate exercise per week\n\n*Always consult your doctor before starting a new exercise routine.*",
    
    fertility: "**PCOS & Fertility:**\n\nPCOS is one of the most common causes of infertility, but the good news is that it's also one of the most treatable.\n\n**Treatment options:**\n• **Lifestyle changes** — Weight loss of even 5-10% can restore ovulation\n• **Medications** — Letrozole or Clomiphene to induce ovulation\n• **Metformin** — Helps with insulin resistance and may improve ovulation\n• **IUI** — Intrauterine insemination combined with medication\n• **IVF** — In vitro fertilization for more complex cases\n\n**Natural support:**\n• Maintain healthy weight\n• Manage stress levels\n• Take prenatal vitamins (especially folate)\n• Track ovulation cycles\n\nMany women with PCOS conceive successfully with proper treatment. Consult a reproductive endocrinologist for personalized guidance.\n\n*This is general information — please consult your healthcare provider for personalized advice.*",
    
    medication: "**Common PCOS Medications:**\n\n• **Metformin** — Improves insulin sensitivity, may help with weight and ovulation\n• **Combined oral contraceptives** — Regulate periods, reduce androgens, clear acne\n• **Spironolactone** — Anti-androgen for excess hair growth and acne\n• **Letrozole/Clomiphene** — Ovulation induction for fertility\n• **Inositol** (supplement) — May improve insulin sensitivity and egg quality\n\n**Important notes:**\n• Never start/stop medications without consulting your doctor\n• Medications work best combined with lifestyle changes\n• Regular follow-ups are essential to monitor side effects\n• Each person's treatment plan should be individualized\n\n*Always take medications as prescribed by your healthcare provider.*",
    
    stress: "**Managing Stress with PCOS:**\n\nStress increases cortisol, which can worsen insulin resistance and hormonal imbalances in PCOS.\n\n**Stress management techniques:**\n• **Meditation** — Even 10 minutes daily can significantly reduce cortisol\n• **Deep breathing** — 4-7-8 technique: inhale 4s, hold 7s, exhale 8s\n• **Yoga** — Combines physical activity with mindfulness\n• **Journaling** — Process emotions and track triggers\n• **Sleep hygiene** — 7-9 hours of quality sleep\n• **Social support** — Connect with PCOS communities\n• **Professional help** — Consider therapy if anxiety/depression persists\n\n**Quick stress busters:**\n• Nature walks\n• Warm baths\n• Creative hobbies\n• Limiting social media\n\nYour mental health is just as important as your physical health. Don't hesitate to seek professional support.\n\n*This is general information — please consult your healthcare provider for personalized advice.*",

    weight: "**Weight Management with PCOS:**\n\nPCOS makes weight loss harder due to insulin resistance and hormonal imbalances, but it's absolutely possible.\n\n**Strategies:**\n• **Focus on insulin management** — Low-GI foods, regular meals, avoid skipping breakfast\n• **Strength training** — Builds muscle, boosts metabolism\n• **Anti-inflammatory diet** — Reduces bloating and inflammation\n• **Sleep** — Poor sleep increases ghrelin (hunger hormone)\n• **Stress management** — High cortisol promotes belly fat storage\n\n**Realistic expectations:**\n• Aim for 1-2 lbs per week\n• Even 5-10% weight loss can significantly improve symptoms\n• Focus on body composition, not just the scale\n• Be patient and kind to yourself\n\n*Consult a nutritionist or endocrinologist for a personalized weight management plan.*",
    
    skin: "**PCOS Skin & Hair Issues:**\n\n**Acne management:**\n• Gentle, non-comedogenic skincare routine\n• Topical retinoids or benzoyl peroxide\n• Spironolactone (prescribed) for hormonal acne\n• Diet: reduce dairy and high-GI foods\n\n**Excess hair growth (hirsutism):**\n• Spironolactone or oral contraceptives\n• Laser hair removal or electrolysis\n• Topical eflornithine cream\n\n**Hair thinning:**\n• Minoxidil (topical)\n• Biotin and zinc supplements\n• Gentle hair care practices\n• Address underlying hormonal imbalance\n\n**Skin darkening (Acanthosis nigricans):**\n• Improving insulin resistance is key\n• Topical retinoids may help\n\nConsult a dermatologist who understands hormonal conditions for the best treatment plan.\n\n*This is general information — please consult your healthcare provider for personalized advice.*",
  };

  if (msg.includes('symptom') || msg.includes('sign')) return responses.symptoms;
  if (msg.includes('diet') || msg.includes('food') || msg.includes('eat') || msg.includes('nutrition')) return responses.diet;
  if (msg.includes('exercise') || msg.includes('workout') || msg.includes('fitness') || msg.includes('yoga')) return responses.exercise;
  if (msg.includes('fertil') || msg.includes('pregnan') || msg.includes('conceiv') || msg.includes('baby')) return responses.fertility;
  if (msg.includes('medic') || msg.includes('drug') || msg.includes('pill') || msg.includes('metformin')) return responses.medication;
  if (msg.includes('stress') || msg.includes('anxiety') || msg.includes('mental') || msg.includes('depress') || msg.includes('mood')) return responses.stress;
  if (msg.includes('weight') || msg.includes('lose') || msg.includes('gain') || msg.includes('fat') || msg.includes('slim')) return responses.weight;
  if (msg.includes('skin') || msg.includes('acne') || msg.includes('hair') || msg.includes('hirsut')) return responses.skin;

  return "Thank you for your question! I can help you with information about:\n\n• **Symptoms** — Understanding PCOS signs\n• **Diet & Nutrition** — Foods that help manage PCOS\n• **Exercise** — Best workouts for PCOS\n• **Fertility** — Conception and treatment options\n• **Medications** — Common PCOS treatments\n• **Stress & Mental Health** — Coping strategies\n• **Weight Management** — Healthy approaches\n• **Skin & Hair** — Managing acne, hair growth, and thinning\n\nFeel free to ask about any of these topics, or describe what you're experiencing and I'll do my best to help!\n\n*Remember: I provide general information only. Always consult your healthcare provider for medical advice.*";
}

// POST /api/ai-chat - Handle AI chat messages
export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is configured, use the real LLM
    if (apiKey) {
      try {
        // Build conversation history for context
        const contents = [];
        
        // Add recent history (last 10 messages for context)
        const recentHistory = history.slice(-10);
        for (const msg of recentHistory) {
          contents.push({
            role: msg.type === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          });
        }

        // Add current message
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              contents,
              generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 1024,
              },
              safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (aiText) {
            return NextResponse.json({ response: aiText, source: 'gemini' });
          }
        }

        // If Gemini fails, fall through to fallback
        console.warn('Gemini API call failed, using fallback responses');
      } catch (apiError) {
        console.error('Gemini API error:', apiError);
      }
    }

    // Fallback: Use keyword-based responses
    const fallbackResponse = getFallbackResponse(message);
    return NextResponse.json({ response: fallbackResponse, source: 'fallback' });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
