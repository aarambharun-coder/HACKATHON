import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Hospital from '@/models/Hospital';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const specialty = searchParams.get('specialty');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Build filter
    let filter = { isActive: true, isVerified: true };

    if (state) filter.state = state;
    if (city) filter.city = city;
    if (specialty) filter.specialties = specialty;

    // Get total count
    const total = await Hospital.countDocuments(filter);

    // Get hospitals
    const hospitals = await Hospital.find(filter)
      .select('-adminUser')
      .limit(limit)
      .skip(skip)
      .sort({ rating: -1, createdAt: -1 });

    return NextResponse.json(
      {
        hospitals,
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
    console.error('Get hospitals error:', error);
    return NextResponse.json(
      { message: 'Failed to get hospitals', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // This should be protected and admin-only
    const { extractTokenFromHeaders, verifyToken } = await import('@/lib/auth');
    const token = extractTokenFromHeaders(req.headers);
    const decoded = verifyToken(token);

    if (!decoded || (decoded.role !== 'hospital_admin' && decoded.role !== 'super_admin')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    await connectDB();

    const data = await req.json();

    const hospital = await Hospital.create({
      ...data,
      adminUser: decoded.userId,
    });

    return NextResponse.json(
      { message: 'Hospital created successfully', hospital },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create hospital error:', error);
    return NextResponse.json(
      { message: 'Failed to create hospital', error: error.message },
      { status: 500 }
    );
  }
}
