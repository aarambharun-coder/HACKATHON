import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const specialization = searchParams.get('specialization');
    const hospitalId = searchParams.get('hospitalId');
    const city = searchParams.get('city');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Build filter
    let filter = { role: 'doctor', isActive: true, isVerified: true };

    if (specialization) filter.specialization = specialization;
    if (hospitalId) filter.hospital = hospitalId;
    if (city) filter.city = city;

    // Get total count
    const total = await User.countDocuments(filter);

    // Get doctors
    const doctors = await User.find(filter)
      .select('-password')
      .limit(limit)
      .skip(skip)
      .populate('hospital', 'name city state');

    return NextResponse.json(
      {
        doctors,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get doctors error:', error);
    return NextResponse.json(
      { message: 'Failed to get doctors', error: error.message },
      { status: 500 }
    );
  }
}
