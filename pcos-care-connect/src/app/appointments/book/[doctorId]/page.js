'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Badge, Loading } from '@/components/UI';
import { motion } from 'framer-motion';

export default function BookAppointmentPage({ params }) {
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    appointmentDate: '',
    startTime: '',
    consultationType: 'in-person',
    reason: '',
    symptoms: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const symptoms = [
    'Irregular Periods',
    'Hirsutism',
    'Weight Gain',
    'Acne',
    'Hair Loss',
    'Infertility',
    'Fatigue',
    'Mood Swings',
  ];

  useEffect(() => {
    fetchDoctorAndHospital();
    generateTimeSlots();
  }, [params.doctorId]);

  const fetchDoctorAndHospital = async () => {
    try {
      const doctorRes = await fetch(`/api/doctors/${params.doctorId}`);
      const doctorData = await doctorRes.json();
      setDoctor(doctorData);

      if (doctorData.hospital) {
        setHospital(doctorData.hospital);
      }
    } catch (err) {
      console.error('Failed to fetch doctor:', err);
      setError('Failed to load doctor information');
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    setAvailableSlots(slots);
  };

  const toggleSymptom = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!formData.appointmentDate || !formData.startTime) {
      setError('Please select appointment date and time');
      return;
    }

    if (!formData.reason.trim()) {
      setError('Please provide appointment reason');
      return;
    }

    setBookingLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: params.doctorId,
          hospitalId: hospital._id,
          appointmentDate: formData.appointmentDate,
          startTime: formData.startTime,
          endTime: `${parseInt(formData.startTime.split(':')[0]) + 1}:${
            formData.startTime.split(':')[1]
          }`,
          consultationType: formData.consultationType,
          reason: formData.reason,
          symptoms: formData.symptoms,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to book appointment');
      }

      setSuccess('Appointment booked successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!doctor) return <div className="text-center py-12">Doctor not found</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container-max max-w-2xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule a consultation with {doctor.name}</p>
        </motion.div>

        {/* Doctor Card */}
        <Card className="mb-8">
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {doctor.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{doctor.name}</h2>
              <p className="text-primary font-semibold mb-2">{doctor.specialization}</p>
              <p className="text-sm text-gray-600 mb-3">{doctor.experience} years experience</p>
              {hospital && (
                <p className="text-sm text-gray-700">
                  📍 {hospital.name} • {hospital.city}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₹{doctor.consultationFee}</p>
              <p className="text-xs text-gray-600">Consultation Fee</p>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <Card>
          <form onSubmit={handleBooking} className="space-y-6">
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

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Appointment Date"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    appointmentDate: e.target.value,
                  }))
                }
                required
              />

              <div>
                <label className="block text-sm font-bold mb-2">Time Slot</label>
                <select
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Select time...</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-sm font-bold mb-2">Consultation Type</label>
              <div className="grid grid-cols-3 gap-3">
                {['in-person', 'telemedicine', 'follow-up'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        consultationType: type,
                      }))
                    }
                    className={`p-3 rounded-lg border-2 transition ${
                      formData.consultationType === type
                        ? 'border-primary bg-primary bg-opacity-10'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    {type === 'in-person' && '🏥 In-Person'}
                    {type === 'telemedicine' && '📹 Video Call'}
                    {type === 'follow-up' && '📋 Follow-up'}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-bold mb-2">Reason for Visit</label>
              <textarea
                value={formData.reason}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                placeholder="Describe your symptoms and concerns..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-bold mb-3">Current Symptoms</label>
              <div className="grid grid-cols-2 gap-2">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-2 rounded-lg text-sm transition ${
                      formData.symptoms.includes(symptom)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formData.symptoms.includes(symptom) ? '✓ ' : ''} {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={bookingLoading}
              className="w-full"
            >
              {bookingLoading ? 'Booking...' : 'Confirm Booking'}
            </Button>

            <p className="text-xs text-gray-600 text-center">
              By booking an appointment, you agree to our terms and conditions
            </p>
          </form>
        </Card>
      </div>
    </main>
  );
}
