'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Badge, Loading, Button, PageHeader } from '@/components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { INDIAN_STATES, CITIES_BY_STATE, SPECIALTIES } from '@/lib/constants';

const TOP_HOSPITALS = {
  Maharashtra: {
    Mumbai: [
      { name: 'Kokilaben Dhirubhai Ambani Hospital', rating: 4.9, specialty: 'Gynecology & PCOS', phone: '+91-22-3066-1000', beds: 750, address: 'Andheri West, Mumbai' },
      { name: 'Lilavati Hospital & Research Centre', rating: 4.8, specialty: 'Endocrinology', phone: '+91-22-2675-1000', beds: 323, address: 'Bandra West, Mumbai' },
      { name: 'Hinduja Hospital', rating: 4.7, specialty: 'Women Health', phone: '+91-22-2445-2222', beds: 351, address: 'Mahim, Mumbai' },
    ],
    Pune: [
      { name: 'Jehangir Hospital', rating: 4.8, specialty: 'Gynecology', phone: '+91-20-6681-3000', beds: 300, address: 'Sassoon Road, Pune' },
      { name: 'Ruby Hall Clinic', rating: 4.7, specialty: 'Endocrinology', phone: '+91-20-6645-5555', beds: 450, address: 'Sassoon Road, Pune' },
    ],
  },
  Karnataka: {
    Bangalore: [
      { name: 'Manipal Hospital', rating: 4.9, specialty: 'PCOS & Fertility', phone: '+91-80-2502-4444', beds: 600, address: 'HAL Airport Road, Bangalore' },
      { name: 'Fortis Hospital Bannerghatta', rating: 4.8, specialty: 'Gynecology', phone: '+91-80-6621-4444', beds: 400, address: 'Bannerghatta Road, Bangalore' },
      { name: 'Apollo Hospitals Bannerghatta', rating: 4.7, specialty: 'Endocrinology', phone: '+91-80-2630-4050', beds: 350, address: 'Bannerghatta, Bangalore' },
    ],
  },
  'Tamil Nadu': {
    Chennai: [
      { name: 'Apollo Hospitals Chennai', rating: 4.9, specialty: 'PCOS Specialist', phone: '+91-44-2829-3333', beds: 550, address: 'Greams Road, Chennai' },
      { name: 'MIOT International', rating: 4.8, specialty: 'Gynecology', phone: '+91-44-4200-2288', beds: 400, address: 'Manapakkam, Chennai' },
    ],
  },
  Delhi: {
    'New Delhi': [
      { name: 'AIIMS New Delhi', rating: 5.0, specialty: 'All Specialties', phone: '+91-11-2658-8500', beds: 2478, address: 'Ansari Nagar, New Delhi' },
      { name: 'Sir Ganga Ram Hospital', rating: 4.9, specialty: 'Gynecology & PCOS', phone: '+91-11-2575-7575', beds: 675, address: 'Rajinder Nagar, New Delhi' },
    ],
  },
  Gujarat: {
    Ahmedabad: [
      { name: 'Apollo Hospitals Ahmedabad', rating: 4.8, specialty: 'PCOS Care', phone: '+91-79-6670-1800', beds: 350, address: 'Bhat, Ahmedabad' },
      { name: 'Sterling Hospital', rating: 4.7, specialty: 'Women Health', phone: '+91-79-4040-0400', beds: 400, address: 'Gurukul, Ahmedabad' },
    ],
  },
  Telangana: {
    Hyderabad: [
      { name: 'Yashoda Hospitals', rating: 4.9, specialty: 'PCOS Specialist', phone: '+91-40-4567-4567', beds: 750, address: 'Somajiguda, Hyderabad' },
      { name: 'CARE Hospitals', rating: 4.8, specialty: 'Gynecology & Endocrinology', phone: '+91-40-3041-8888', beds: 400, address: 'Banjara Hills, Hyderabad' },
    ],
  },
  'Uttar Pradesh': {
    Lucknow: [
      { name: 'Medanta Hospital Lucknow', rating: 4.8, specialty: 'PCOS & Fertility', phone: '+91-522-4505-050', beds: 450, address: 'Sector B, Lucknow' },
      { name: 'Sanjay Gandhi PGI', rating: 4.9, specialty: 'Endocrinology', phone: '+91-522-2668-700', beds: 960, address: 'Raebareli Road, Lucknow' },
    ],
  },
  Rajasthan: {
    Jaipur: [
      { name: 'Fortis Escorts Hospital', rating: 4.8, specialty: 'PCOS Care', phone: '+91-141-2547-000', beds: 350, address: 'Malviya Nagar, Jaipur' },
    ],
  },
  Punjab: {
    Chandigarh: [
      { name: 'PGI Chandigarh', rating: 4.9, specialty: 'All Specialties', phone: '+91-172-2756-565', beds: 1540, address: 'Sector 12, Chandigarh' },
    ],
  },
  'Andhra Pradesh': { Visakhapatnam: [{ name: 'Apollo Hospitals Vizag', rating: 4.8, specialty: 'PCOS Care', beds: 300, address: 'Visakhapatnam' }] },
  'Arunachal Pradesh': { Itanagar: [{ name: 'Tomo Riba Institute', rating: 4.5, specialty: 'General Care', beds: 200, address: 'Itanagar' }] },
  Assam: { Guwahati: [{ name: 'Apollo Excelcare', rating: 4.7, specialty: 'Women Health', beds: 250, address: 'Guwahati' }] },
  Bihar: { Patna: [{ name: 'IGIMS Patna', rating: 4.6, specialty: 'Gynecology', beds: 500, address: 'Patna' }] },
  Chhattisgarh: { Raipur: [{ name: 'AIIMS Raipur', rating: 4.8, specialty: 'Endocrinology', beds: 400, address: 'Raipur' }] },
  Goa: { Panaji: [{ name: 'Manipal Hospital Goa', rating: 4.6, specialty: 'PCOS & Fertility', beds: 250, address: 'Dona Paula, Goa' }] },
  Haryana: { Gurgaon: [{ name: 'Medanta The Medicity', rating: 4.9, specialty: 'PCOS Care', beds: 1250, address: 'Sector 38, Gurgaon' }] },
  'Himachal Pradesh': { Shimla: [{ name: 'IGMC Shimla', rating: 4.6, specialty: 'Women Health', beds: 300, address: 'Shimla' }] },
  Jharkhand: { Ranchi: [{ name: 'Medica Hospital', rating: 4.5, specialty: 'Gynecology', beds: 200, address: 'Ranchi' }] },
  Kerala: { Kochi: [{ name: 'Aster Medcity', rating: 4.8, specialty: 'Endocrinology', beds: 670, address: 'Kochi' }] },
  'Madhya Pradesh': { Indore: [{ name: 'Bombay Hospital', rating: 4.7, specialty: 'PCOS Specialist', beds: 400, address: 'Indore' }] },
  Manipur: { Imphal: [{ name: 'Shija Hospitals', rating: 4.5, specialty: 'Women Health', beds: 200, address: 'Imphal' }] },
  Meghalaya: { Shillong: [{ name: 'NEIGRIHMS', rating: 4.7, specialty: 'Endocrinology', beds: 500, address: 'Shillong' }] },
  Mizoram: { Aizawl: [{ name: 'Civil Hospital', rating: 4.4, specialty: 'General Care', beds: 300, address: 'Aizawl' }] },
  Nagaland: { Kohima: [{ name: 'Oking Hospital', rating: 4.5, specialty: 'Women Health', beds: 100, address: 'Kohima' }] },
  Odisha: { Bhubaneswar: [{ name: 'AIIMS Bhubaneswar', rating: 4.8, specialty: 'PCOS & Fertility', beds: 600, address: 'Bhubaneswar' }] },
  Sikkim: { Gangtok: [{ name: 'STNM Hospital', rating: 4.5, specialty: 'General Care', beds: 300, address: 'Gangtok' }] },
  Tripura: { Agartala: [{ name: 'AGMC', rating: 4.5, specialty: 'Gynecology', beds: 400, address: 'Agartala' }] },
  Uttarakhand: { Dehradun: [{ name: 'Max Super Speciality', rating: 4.7, specialty: 'Endocrinology', beds: 200, address: 'Dehradun' }] },
  'West Bengal': { Kolkata: [{ name: 'Apollo Gleneagles', rating: 4.8, specialty: 'PCOS Specialist', beds: 700, address: 'Kolkata' }] },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={`text-sm ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
      ))}
      <span className="text-sm font-bold text-gray-700 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function HospitalCard({ hospital, index, isStatic }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group"
    >
      {isStatic && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 mb-2">
          🏆 Top Recommended
        </span>
      )}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition leading-tight flex-1 pr-3">
          {hospital.name}
        </h3>
        <StarRating rating={hospital.rating} />
      </div>
      <p className="text-sm text-gray-500 mb-3">📍 {hospital.address || `${hospital.city}, ${hospital.state}`}</p>
      <Badge variant="primary" size="md" className="mb-3">
        🩺 {hospital.specialty || hospital.specialties?.[0] || 'PCOS Care'}
      </Badge>
      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
        {hospital.phone && (
          <a href={`tel:${hospital.phone}`} className="flex items-center gap-1 hover:text-primary transition">
            📞 {hospital.phone}
          </a>
        )}
        <span className="flex items-center gap-1 text-red-600 font-semibold">🚨 24/7 Emergency</span>
        {(hospital.beds || hospital.availableBeds) && (
          <span>🛏️ {hospital.availableBeds || hospital.beds} beds</span>
        )}
      </div>
      {hospital.specialties && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hospital.specialties.slice(0, 3).map((s) => (
            <Badge key={s} variant="secondary" size="sm">{s}</Badge>
          ))}
        </div>
      )}
      <Button className="w-full" size="sm">View Details →</Button>
    </motion.div>
  );
}

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [staticHospitals, setStaticHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ state: '', city: '', specialty: '' });
  const [cities, setCities] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (filters.state) {
      setCities(CITIES_BY_STATE[filters.state] || []);
      const stateData = TOP_HOSPITALS[filters.state];
      if (stateData) {
        if (filters.city && stateData[filters.city]) {
          setStaticHospitals(stateData[filters.city]);
        } else {
          setStaticHospitals(Object.values(stateData).flat().slice(0, 6));
        }
      } else setStaticHospitals([]);
    } else {
      setStaticHospitals([]);
      setCities([]);
    }
  }, [filters.state, filters.city]);

  const fetchHospitals = async () => {
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (filters.state) params.append('state', filters.state);
      if (filters.city) params.append('city', filters.city);
      if (filters.specialty) params.append('specialty', filters.specialty);
      const res = await fetch(`/api/hospitals?${params}`);
      const data = await res.json();
      setHospitals(data.hospitals || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    if (key === 'state') {
      setFilters({ state: value, city: '', specialty: filters.specialty });
      setHospitals([]);
      setSearched(false);
    } else {
      setFilters((p) => ({ ...p, [key]: value }));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHeader
        title="Find Top PCOS Hospitals"
        subtitle="Discover the highest-rated hospitals specialising in PCOS care across India"
        gradient="from-primary via-pink-500 to-rose-500"
      />

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40">
        <div className="container-max py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">State</label>
              <select value={filters.state} onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition">
                <option value="">All States</option>
                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">City</label>
              <select value={filters.city} onChange={(e) => handleChange('city', e.target.value)}
                disabled={!filters.state}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition disabled:opacity-50">
                <option value="">All Cities</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Specialty</label>
              <select value={filters.specialty} onChange={(e) => handleChange('specialty', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition">
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchHospitals} className="flex-1">🔍 Search</Button>
              <Button onClick={() => { setFilters({ state: '', city: '', specialty: '' }); setHospitals([]); setStaticHospitals([]); setSearched(false); }} variant="outline">✕</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-max py-10">
        {loading && <Loading text="Searching hospitals…" />}

        {/* DB Results */}
        {!loading && searched && hospitals.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-5">🏥 Search Results <span className="text-sm font-normal text-gray-400">({hospitals.length} found)</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((h, i) => (
                <Link key={h._id} href={`/hospitals/${h._id}`}>
                  <HospitalCard hospital={h} index={i} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Top Recommended — static */}
        <AnimatePresence>
          {staticHospitals.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">
                  🏆 Top Hospitals in <span className="text-gradient">{filters.city || filters.state}</span>
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>
              <p className="text-sm text-gray-400 text-center mb-7">Curated list of highest-rated PCOS-specialised hospitals</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staticHospitals.map((h, i) => <HospitalCard key={i} hospital={h} index={i} isStatic />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default empty */}
        {!filters.state && !searched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="text-7xl mb-6">🏥</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Find Hospitals Near You</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">Select your state to instantly see top-recommended PCOS hospitals.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Telangana', 'Gujarat'].map((s) => (
                <button key={s} onClick={() => handleChange('state', s)}
                  className="px-5 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary font-medium rounded-xl text-sm transition">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
