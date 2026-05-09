'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Loading } from '@/components/UI';
import { motion } from 'framer-motion';
import { INDIAN_STATES, CITIES_BY_STATE } from '@/lib/constants';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({});
  const [cities, setCities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (formData.state) {
      setCities(CITIES_BY_STATE[formData.state] || []);
    }
  }, [formData.state]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
      setFormData(data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          gender: formData.gender,
          state: formData.state,
          city: formData.city,
          address: formData.address,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify(formData));
      }, 500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (!user) return <div className="text-center py-12">User not found</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container-max max-w-2xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </motion.div>

        {/* Profile Form */}
        <Card>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
              >
                {success}
              </motion.div>
            )}

            {/* Profile Avatar */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.role}</p>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Name */}
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />

            {/* Phone */}
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />

            {/* Date of Birth */}
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth?.split('T')[0] || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
            />

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold mb-2">Gender</label>
              <select
                value={formData.gender || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Select gender...</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-bold mb-2">State</label>
              <select
                value={formData.state || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    state: e.target.value,
                    city: '',
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Select state...</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            {cities.length > 0 && (
              <div>
                <label className="block text-sm font-bold mb-2">City</label>
                <select
                  value={formData.city || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Select city...</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Address */}
            <div>
              <label className="block text-sm font-bold mb-2">Address</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="flex-1"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Change Password Section */}
        <Card className="mt-6">
          <h2 className="text-xl font-bold mb-4">Security</h2>
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
        </Card>
      </div>
    </main>
  );
}
