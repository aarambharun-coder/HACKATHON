import mongoose from 'mongoose';
import connectDB from '../lib/db';
import User from '../models/User';
import Hospital from '../models/Hospital';
import { hashPassword } from '../lib/password';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Hospital.deleteMany({});

    console.log('Creating sample hospitals...');

    const hospitals = await Hospital.insertMany([
      {
        name: 'Apollo Hospitals',
        email: 'apollo@hospitals.com',
        phone: '+91-11-4166-1111',
        address: '100, Bunder Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        latitude: 19.0176,
        longitude: 72.8479,
        registrationNumber: 'REG-APOLLO-001',
        licenseNumber: 'LIC-001',
        specialties: ['Gynecology', 'Endocrinology', 'Nutrition', 'Cardiology'],
        departments: ['PCOS Care', 'Fertility', 'Cardiology', 'Endocrinology'],
        totalBeds: 500,
        availableBeds: 120,
        icuBeds: 50,
        emergencyServices: true,
        emergencyPhone: '+91-11-4166-9999',
        operatingHours: { opening: '24/7', closing: '24/7' },
        ambulanceService: true,
        ambulancePhones: ['+91-11-4166-8888'],
        rating: 4.8,
        reviewCount: 245,
        website: 'https://www.apollohospitals.com',
        isVerified: true,
        isActive: true,
      },
      {
        name: 'Fortis Healthcare',
        email: 'fortis@healthcare.com',
        phone: '+91-22-6107-1234',
        address: 'Mulund, Eastern Express Highway',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400080',
        latitude: 19.1678,
        longitude: 72.9489,
        registrationNumber: 'REG-FORTIS-001',
        licenseNumber: 'LIC-002',
        specialties: ['Gynecology', 'Endocrinology', 'Mental Health', 'Fitness & Wellness'],
        departments: ['Women Health', 'PCOS Clinic', 'Mental Wellness'],
        totalBeds: 350,
        availableBeds: 85,
        icuBeds: 30,
        emergencyServices: true,
        emergencyPhone: '+91-22-6107-5555',
        operatingHours: { opening: '24/7', closing: '24/7' },
        ambulanceService: true,
        ambulancePhones: ['+91-22-6107-6666'],
        rating: 4.6,
        reviewCount: 189,
        website: 'https://www.fortishealthcare.com',
        isVerified: true,
        isActive: true,
      },
      {
        name: 'Max Healthcare',
        email: 'max@healthcare.com',
        phone: '+91-40-6666-1234',
        address: 'Hyderabad Diagnostics Center',
        city: 'Hyderabad',
        state: 'Telangana',
        zipCode: '500001',
        latitude: 17.3850,
        longitude: 78.4867,
        registrationNumber: 'REG-MAX-001',
        licenseNumber: 'LIC-003',
        specialties: ['Gynecology', 'Endocrinology', 'Nutrition', 'Dermatology'],
        departments: ['PCOS Care', 'Endocrinology', 'Nutrition'],
        totalBeds: 400,
        availableBeds: 95,
        icuBeds: 40,
        emergencyServices: true,
        emergencyPhone: '+91-40-6666-9999',
        operatingHours: { opening: '24/7', closing: '24/7' },
        ambulanceService: true,
        ambulancePhones: ['+91-40-6666-7777'],
        rating: 4.7,
        reviewCount: 210,
        website: 'https://www.maxhealthcare.com',
        isVerified: true,
        isActive: true,
      },
    ]);

    console.log('Creating sample users...');

    const hashedPassword = await hashPassword('password123');

    const users = await User.insertMany([
      {
        name: 'Priya Sharma',
        email: 'patient@test.com',
        password: hashedPassword,
        role: 'patient',
        phone: '+91-9876543210',
        gender: 'female',
        state: 'Maharashtra',
        city: 'Mumbai',
        dateOfBirth: new Date('1995-03-15'),
        isVerified: true,
        isActive: true,
        avatar: 'https://via.placeholder.com/150',
      },
      {
        name: 'Dr. Anjali Verma',
        email: 'doctor@test.com',
        password: hashedPassword,
        role: 'doctor',
        phone: '+91-8765432109',
        gender: 'female',
        state: 'Maharashtra',
        city: 'Mumbai',
        specialization: 'Gynecology',
        qualification: 'MD Gynecology',
        experience: 12,
        licenseNumber: 'MCI-DOC-001',
        languages: ['English', 'Hindi', 'Marathi'],
        consultationFee: 500,
        bio: 'Experienced gynecologist specializing in PCOS management and fertility',
        hospital: hospitals[0]._id,
        isVerified: true,
        isActive: true,
        avatar: 'https://via.placeholder.com/150',
      },
      {
        name: 'Dr. Rajesh Kumar',
        email: 'endocrinologist@test.com',
        password: hashedPassword,
        role: 'doctor',
        phone: '+91-7654321098',
        gender: 'male',
        state: 'Maharashtra',
        city: 'Mumbai',
        specialization: 'Endocrinology',
        qualification: 'MD Endocrinology, DM Endocrinology',
        experience: 15,
        licenseNumber: 'MCI-DOC-002',
        languages: ['English', 'Hindi'],
        consultationFee: 600,
        bio: 'Specialist in hormonal disorders and PCOS treatment',
        hospital: hospitals[1]._id,
        isVerified: true,
        isActive: true,
        avatar: 'https://via.placeholder.com/150',
      },
      {
        name: 'Meera Nutritionist',
        email: 'nutritionist@test.com',
        password: hashedPassword,
        role: 'doctor',
        phone: '+91-6543210987',
        gender: 'female',
        state: 'Telangana',
        city: 'Hyderabad',
        specialization: 'Nutrition',
        qualification: 'MSc Clinical Nutrition',
        experience: 8,
        licenseNumber: 'NUT-001',
        languages: ['English', 'Hindi', 'Telugu'],
        consultationFee: 400,
        bio: 'Nutritionist specializing in PCOS diet management',
        hospital: hospitals[2]._id,
        isVerified: true,
        isActive: true,
        avatar: 'https://via.placeholder.com/150',
      },
      {
        name: 'Hospital Admin',
        email: 'admin@apollohospitals.com',
        password: hashedPassword,
        role: 'hospital_admin',
        phone: '+91-5432109876',
        hospital: hospitals[0]._id,
        isVerified: true,
        isActive: true,
      },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`
    Sample Login Credentials:
    
    Patient Account:
    Email: patient@test.com
    Password: password123
    
    Doctor Account:
    Email: doctor@test.com
    Password: password123
    
    Hospital Admin Account:
    Email: admin@apollohospitals.com
    Password: password123
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
