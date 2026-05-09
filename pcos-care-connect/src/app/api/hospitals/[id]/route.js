import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Hospital from '@/models/Hospital';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const hospital = await Hospital.findById(params.id).populate('doctors', '-password');

    if (!hospital) {
      return NextResponse.json(
        { message: 'Hospital not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(hospital, { status: 200 });
  } catch (error) {
    console.error('Get hospital error:', error);
    return NextResponse.json(
      { message: 'Failed to get hospital', error: error.message },
      { status: 500 }
    );
  }
}
