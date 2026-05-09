'use client';

import Link from 'next/link';
import { Button, Card } from '@/components/UI';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    if (!num) return;

    let start = 0;
    const increment = num / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const suffix = target.replace(/[0-9,]/g, '');
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const features = [
    {
      icon: '🏥',
      title: 'Find Hospitals & Doctors',
      description: 'Discover verified hospitals and PCOS specialists near you',
      color: 'from-pink-500/10 to-rose-500/5',
    },
    {
      icon: '📅',
      title: 'Easy Appointments',
      description: 'Book appointments with top doctors in just a few clicks',
      color: 'from-blue-500/10 to-cyan-500/5',
    },
    {
      icon: '📊',
      title: 'Symptom Tracking',
      description: 'Track symptoms, cycles, mood, and wellness daily',
      color: 'from-purple-500/10 to-violet-500/5',
    },
    {
      icon: '🍎',
      title: 'Personalized Plans',
      description: 'Get customized diet and fitness plans for PCOS',
      color: 'from-green-500/10 to-emerald-500/5',
    },
    {
      icon: '🤖',
      title: 'AI Health Assistant',
      description: 'Get instant, personalized health recommendations 24/7',
      color: 'from-indigo-500/10 to-blue-500/5',
    },
  ];

  const symptoms = [
    'Irregular Periods',
    'Weight Gain',
    'Hair Loss/Growth',
    'Acne',
    'Fatigue',
    'Fertility Issues',
  ];

  const stats = [
    { value: '500+', label: 'Hospitals' },
    { value: '1000+', label: 'Doctors' },
    { value: '10000+', label: 'Happy Patients' },
    { value: '24/7', label: 'Support' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      text: 'PCOS Care Connect helped me find the right doctor and manage my symptoms effectively. The tracker is amazing!',
      avatar: 'P',
      rating: 5,
    },
    {
      name: 'Ananya Reddy',
      location: 'Hyderabad',
      text: 'The community support here is incredible. I no longer feel alone in my PCOS journey. Highly recommended!',
      avatar: 'A',
      rating: 5,
    },
    {
      name: 'Meera Patel',
      location: 'Ahmedabad',
      text: 'The AI assistant answers my questions instantly. The diet plans have really helped improve my health.',
      avatar: 'M',
      rating: 5,
    },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-pink-50 via-purple-50/50 to-blue-50 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl blob-2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />

        {/* Floating Decorative Elements */}
        <div className="absolute top-32 right-20 w-4 h-4 bg-primary/30 rounded-full animate-float hidden md:block" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-secondary/30 rounded-full animate-float-slow hidden md:block" />
        <div className="absolute top-48 left-1/3 w-2 h-2 bg-accent/40 rounded-full animate-float hidden md:block" style={{ animationDelay: '1s' }} />

        <div className="container-max relative z-10 py-20">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                India&apos;s #1 PCOS Care Platform
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Complete{' '}
                <span className="text-gradient-animated">PCOS Care</span>{' '}
                Companion
              </h1>

              <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                Connect with top hospitals, specialists, and support communities.
                Track symptoms, get personalized plans, and take control of your health.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto btn-shine">
                    Get Started Free →
                  </Button>
                </Link>
                <Link href="/hospitals">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    🏥 Find Hospitals
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 mt-10">
                <div className="flex -space-x-3">
                  {['P', 'A', 'M', 'S'].map((letter, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-md"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">10,000+ women</p>
                  <p className="text-sm text-gray-500">
                    trust PCOS Care Connect
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-premium-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Why Choose Us?
                </h3>
                <ul className="space-y-5">
                  {[
                    { text: 'Verified hospitals & PCOS specialists', icon: '🏥' },
                    { text: 'AI-powered health recommendations', icon: '🤖' },
                    { text: 'Complete symptom & cycle tracking', icon: '📊' },
                    { text: 'Personalized diet & fitness plans', icon: '🥗' },
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-lg shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PCOS Awareness Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
              Understanding PCOS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What is{' '}
              <span className="text-gradient">PCOS/PCOD</span>?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Polycystic Ovary Syndrome affects 1 in 10 women worldwide. Early
              detection and proper management can transform your quality of life.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full" variant="elevated">
                <h3 className="text-2xl font-bold mb-5 text-primary">
                  Common Symptoms
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:scale-125 transition" />
                      <span className="text-gray-700">{symptom}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full" variant="elevated">
                <h3 className="text-2xl font-bold mb-5 text-primary">
                  Why Early Detection Matters
                </h3>
                <ul className="space-y-4">
                  {[
                    'Prevents long-term health complications',
                    'Improves fertility and conception rates',
                    'Better metabolic and hormonal control',
                    'Reduces cardiovascular disease risk',
                    'Significantly enhances quality of life',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-gray-50/50">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive tools for complete PCOS management
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="text-center h-full group cursor-pointer">
                  <div
                    className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-primary via-pink-500 to-secondary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container-max relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-lg opacity-80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real stories from women who transformed their PCOS journey
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((t, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="h-full" variant="elevated">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-500 text-xs">{t.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-pink-50/30">
        <div className="container-max text-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Take Control of{' '}
              <span className="text-gradient">Your Health</span>?
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of women managing their PCOS journey with care,
              confidence, and community support.
            </p>
            <Link href="/signup">
              <Button size="xl" className="btn-shine animate-pulse-ring">
                Create Your Free Account →
              </Button>
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              No credit card required • Free forever
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">♀</span>
                </div>
                <span className="font-bold text-lg">PCOS Care Connect</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                India&apos;s most trusted PCOS healthcare platform. Connecting women
                with the care they deserve.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                {['𝕏', 'in', 'IG', 'YT'].map((icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer text-xs font-bold"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">
                Platform
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link href="/hospitals" className="hover:text-primary transition">
                    Find Hospitals
                  </Link>
                </li>
                <li>
                  <Link href="/tracker" className="hover:text-primary transition">
                    Health Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/ai-assistant" className="hover:text-primary transition">
                    AI Assistant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">
                Resources
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link href="/diet-fitness" className="hover:text-primary transition">
                    Diet Plans
                  </Link>
                </li>
                <li>
                  <Link href="/diet-fitness" className="hover:text-primary transition">
                    Fitness Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition">
                    About PCOS
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">
                Emergency
              </h4>
              <p className="text-gray-400 text-sm mb-2">24/7 Support Helpline</p>
              <p className="text-primary font-bold text-xl mb-4">1-800-PCOS-HELP</p>
              <Link href="/emergency">
                <Button variant="danger" size="sm" className="w-full">
                  🚨 Emergency Help
                </Button>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 PCOS Care Connect. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              🔒 Medical data is HIPAA-inspired encrypted
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
