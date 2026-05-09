import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const doctor = await User.findById(params.id)
      .select('-password')
      .populate('hospital', 'name city state');

    if (!doctor || doctor.role !== 'doctor') {
      return NextResponse.json(
        { message: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    console.error('Get doctor error:', error);
    return NextResponse.json(
      { message: 'Failed to get doctor', error: error.message },
      { status: 500 }
    );
  }
}
