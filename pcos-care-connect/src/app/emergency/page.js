'use client';

import { Card, Button, Badge } from '@/components/UI';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EmergencyPage() {
  const emergencyNumbers = [
    { service: 'Ambulance', number: '102', description: 'National ambulance service' },
    { service: 'Emergency', number: '100', description: 'Police emergency' },
    { service: 'Fire', number: '101', description: 'Fire department' },
    { service: 'Women Helpline', number: '1091', description: 'Women emergency helpline' },
    { service: 'PCOS Care Connect', number: '1-800-PCOS-HELP', description: 'Our 24/7 support line' },
  ];

  const emergencyHospitals = [
    {
      name: 'Apollo Emergency Center',
      location: 'Mumbai',
      phone: '+91-11-4166-9999',
      distance: '2.3 km',
      wait: '5 min',
    },
    {
      name: 'Max Healthcare Emergency',
      location: 'Mumbai',
      phone: '+91-22-6107-5555',
      distance: '3.1 km',
      wait: '8 min',
    },
    {
      name: 'Fortis Emergency',
      location: 'Mumbai',
      phone: '+91-22-6107-6666',
      distance: '1.8 km',
      wait: '3 min',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="container-max">
          <h1 className="text-4xl font-bold mb-2">🚨 Emergency Support</h1>
          <p className="text-lg opacity-90">Quick access to emergency services and nearby hospitals</p>
        </div>
      </section>

      {/* Critical Alert */}
      <section className="container-max py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg mb-8"
        >
          <p className="text-red-900 font-bold text-lg mb-2">
            🚑 In a medical emergency, always call 102 for ambulance
          </p>
          <p className="text-red-800">
            This platform is for general health support. For life-threatening situations, contact emergency services immediately.
          </p>
        </motion.div>
      </section>

      {/* Emergency Numbers */}
      <section className="container-max py-12">
        <h2 className="text-3xl font-bold mb-8">📞 Emergency Numbers</h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {emergencyNumbers.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="text-4xl mb-3">
                  {item.service === 'Ambulance' && '🚑'}
                  {item.service === 'Emergency' && '🚔'}
                  {item.service === 'Fire' && '🚒'}
                  {item.service === 'Women Helpline' && '👩'}
                  {item.service === 'PCOS Care Connect' && '❤️'}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.service}</h3>
                <p className="text-3xl font-bold text-red-600 mb-3">{item.number}</p>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <Button
                  className="w-full"
                  onClick={() => {
                    window.location.href = `tel:${item.number}`;
                  }}
                >
                  Call Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Nearby Emergency Hospitals */}
      <section className="container-max py-12">
        <h2 className="text-3xl font-bold mb-8">🏥 Nearby Emergency Hospitals</h2>

        <div className="space-y-4">
          {emergencyHospitals.map((hospital, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
                    <p className="text-sm text-gray-600">{hospital.location}</p>
                  </div>
                  <Badge variant="success">🚑 Active</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-600">Distance</p>
                    <p className="font-bold">{hospital.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Avg Wait</p>
                    <p className="font-bold">{hospital.wait}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Status</p>
                    <Badge variant="success">Available</Badge>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${hospital.phone}`}
                  >
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                  >
                    Get Directions
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emergency Checklist */}
      <section className="container-max py-12">
        <Card>
          <h2 className="text-2xl font-bold mb-6">✓ Emergency Checklist</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-lg">Before Emergency</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Keep emergency numbers saved</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Have medical history ready</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">List current medications</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Identify nearest hospitals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Share location with contacts</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">During Emergency</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">1</span>
                  <span className="text-gray-700">Stay calm and call 102</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">2</span>
                  <span className="text-gray-700">Describe symptoms clearly</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">3</span>
                  <span className="text-gray-700">Provide exact location</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">4</span>
                  <span className="text-gray-700">Follow operator instructions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">5</span>
                  <span className="text-gray-700">Don't hang up until told</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Contact Support */}
      <section className="container-max py-12">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-6">
              Our support team is available 24/7 to help with non-emergency health concerns
            </p>
            <Button size="lg">
              💬 Chat with Support
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
