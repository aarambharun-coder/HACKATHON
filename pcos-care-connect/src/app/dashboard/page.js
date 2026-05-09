'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button, Badge, Loading, StatCard, PageHeader, EmptyState } from '@/components/UI';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [trackerData, setTrackerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token || !savedUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(savedUser));
    fetchDashboardData(token);
  }, [router]);

  const fetchDashboardData = async (token) => {
    try {
      const [apRes, trackerRes] = await Promise.all([
        fetch('/api/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/tracker', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (apRes.ok) {
        const data = await apRes.json();
        setAppointments(data.appointments || []);
      }

      if (trackerRes.ok) {
        const data = await trackerRes.json();
        setTrackerData(data.tracker || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="container-max">
            <div className="h-10 w-72 bg-white/20 rounded-lg animate-pulse mb-3" />
            <div className="h-5 w-48 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        <div className="container-max py-12">
          <Loading text="Loading your dashboard..." />
        </div>
      </main>
    );
  }

  if (!user) return null;

  const upcomingAppointments = appointments.filter(
    (a) => new Date(a.appointmentDate) > new Date() && a.status === 'scheduled'
  );
  const completedAppointments = appointments.filter((a) => a.status === 'completed');

  const quickLinks = [
    { href: '/hospitals', icon: '🏥', label: 'Find Hospitals', color: 'from-pink-500/10 to-rose-500/5' },
    { href: '/diet-fitness', icon: '🥗', label: 'Diet Plans', color: 'from-green-500/10 to-emerald-500/5' },
    { href: '/tracker', icon: '📊', label: 'Health Tracker', color: 'from-purple-500/10 to-violet-500/5' },
    { href: '/ai-assistant', icon: '🤖', label: 'AI Assistant', color: 'from-amber-500/10 to-orange-500/5' },
    { href: '/emergency', icon: '🚨', label: 'Emergency', color: 'from-red-500/10 to-rose-500/5' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHeader
        title={`Welcome back, ${user.name?.split(' ')[0]}! 👋`}
        subtitle="Track your health journey and manage your PCOS care"
        gradient="from-primary via-pink-500 to-secondary"
      />

      <section className="container-max py-8 md:py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard icon="📅" label="Upcoming" value={upcomingAppointments.length} color="primary" delay={0} />
          <StatCard icon="✅" label="Completed" value={completedAppointments.length} color="green" delay={0.1} />
          <StatCard icon="📊" label="Tracking Entries" value={trackerData.length} color="blue" delay={0.2} />
          <StatCard icon="💪" label="Health Score" value="85%" color="purple" delay={0.3} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <Card variant="elevated" hover={false}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <Link href="/hospitals">
                  <Button size="sm">Find Hospital</Button>
                </Link>
              </div>

              {upcomingAppointments.length === 0 ? (
                <EmptyState
                  icon="📅"
                  title="No upcoming appointments"
                  description="Find a doctor and book your first appointment"
                  action={
                    <Link href="/hospitals">
                      <Button>Find Hospitals</Button>
                    </Link>
                  }
                />
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.slice(0, 3).map((apt, idx) => (
                    <motion.div
                      key={apt._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-5 bg-gray-50/50 border border-gray-100 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{apt.doctor?.name}</h3>
                        <Badge variant="primary">{apt.consultationType}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{apt.doctor?.specialization}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        📅 {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.startTime}
                      </p>
                      <p className="text-sm text-gray-500">🏥 {apt.hospital?.name}</p>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="flex-1">Join</Button>
                        <Button size="sm" variant="outline" className="flex-1">Reschedule</Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>

            {/* Health Tracking */}
            <Card variant="elevated" hover={false}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Health Tracking</h2>
                <Link href="/tracker">
                  <Button size="sm" variant="outline">View All</Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { href: '/tracker', icon: '📅', title: 'Cycle Tracker', desc: 'Track menstrual cycle', color: 'border-primary/20 hover:bg-primary/5' },
                  { href: '/tracker', icon: '😊', title: 'Mood Tracker', desc: 'Log your emotions', color: 'border-secondary/20 hover:bg-secondary/5' },
                  { href: '/tracker', icon: '💪', title: 'Symptoms', desc: 'Log symptoms daily', color: 'border-accent/20 hover:bg-accent/5' },
                ].map((item, idx) => (
                  <Link key={idx} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 border-2 ${item.color} rounded-xl cursor-pointer transition-all text-center`}
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card variant="elevated" hover={false}>
              <h2 className="text-lg font-bold mb-5 text-gray-900">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, idx) => (
                  <Link key={idx} href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 bg-gradient-to-br ${link.color} rounded-xl text-center cursor-pointer transition-all border border-gray-100/50`}
                    >
                      <div className="text-2xl mb-1">{link.icon}</div>
                      <p className="text-xs font-medium text-gray-700">{link.label}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Profile Card */}
            <Card variant="elevated" hover={false}>
              <h2 className="text-lg font-bold mb-4 text-gray-900">Profile</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-primary/20">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {user.city && user.state && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span>
                    <span>{user.city}, {user.state}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🎭</span>
                  <span className="capitalize">{user.role || 'Patient'}</span>
                </div>
              </div>
              <Link href="/profile">
                <Button variant="outline" className="w-full" size="sm">
                  ✏️ Edit Profile
                </Button>
              </Link>
            </Card>

            {/* Health Tip */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10" hover={false}>
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-bold text-gray-900 mb-2">Daily Health Tip</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Regular physical activity for 30 minutes daily can help manage
                insulin resistance — a key factor in PCOS management.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
