'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Badge, Button, Loading } from '@/components/UI';
import { useRouter } from 'next/navigation';

export default function HospitalDetailPage({ params }) {
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchHospital();
  }, [params.id]);

  const fetchHospital = async () => {
    try {
      const res = await fetch(`/api/hospitals/${params.id}`);
      const data = await res.json();
      setHospital(data);
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Failed to fetch hospital:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!hospital) return <div className="text-center py-12">Hospital not found</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-md">
        <div className="container-max py-8">
          <button onClick={() => router.back()} className="text-primary mb-4 hover:underline">
            ← Back
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">{hospital.name}</h1>
              <p className="text-gray-600 text-lg">{hospital.address}</p>
              <p className="text-gray-600">{hospital.city}, {hospital.state} {hospital.zipCode}</p>
            </div>
            <Badge variant="success" className="text-lg px-4 py-2">{hospital.rating.toFixed(1)} ⭐</Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-max py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* About */}
            <Card className="mb-8">
              <h2 className="text-2xl font-bold mb-6">About Hospital</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Registration Number</p>
                  <p className="text-lg font-semibold">{hospital.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Number</p>
                  <p className="text-lg font-semibold">{hospital.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Beds</p>
                  <p className="text-lg font-semibold">{hospital.totalBeds}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Beds</p>
                  <p className="text-lg font-semibold text-green-600">{hospital.availableBeds}</p>
                </div>
              </div>
            </Card>

            {/* Specialties */}
            <Card className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Specialties & Services</h2>
              <div className="grid grid-cols-2 gap-4">
                {hospital.specialties?.map((spec) => (
                  <div key={spec} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Services */}
            <Card className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Key Services</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span>{hospital.emergencyServices ? '🚨' : '❌'}</span>
                  <span>24/7 Emergency Services</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{hospital.ambulanceService ? '🚑' : '❌'}</span>
                  <span>Ambulance Service</span>
                </div>
              </div>
            </Card>

            {/* Doctors */}
            <Card>
              <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
              {doctors.length === 0 ? (
                <p className="text-gray-600">No doctors listed yet</p>
              ) : (
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                      {doctor.consultationFee && (
                        <p className="text-primary font-semibold text-sm mt-2">₹{doctor.consultationFee}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Quick Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold mb-6">Quick Information</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-gray-900 break-all">{hospital.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-gray-900">{hospital.phone}</p>
                </div>

                {hospital.emergencyPhone && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Emergency</p>
                    <p className="text-red-600 font-semibold">{hospital.emergencyPhone}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-1">Operating Hours</p>
                  <p className="text-gray-900">
                    {hospital.operatingHours?.opening} - {hospital.operatingHours?.closing}
                  </p>
                </div>
              </div>

              <Button className="w-full mb-3">Book Appointment</Button>
              <Button variant="outline" className="w-full">
                View on Map
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
