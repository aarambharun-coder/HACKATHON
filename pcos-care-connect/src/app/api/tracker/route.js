import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Tracker from '@/models/Tracker';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const token = extractTokenFromHeaders(req.headers);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'patient') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '30');

    const skip = (page - 1) * limit;

    let filter = { patient: decoded.userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const total = await Tracker.countDocuments(filter);

    const tracker = await Tracker.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ date: -1 });

    return NextResponse.json(
      {
        tracker,
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
    console.error('Get tracker error:', error);
    return NextResponse.json(
      { message: 'Failed to get tracker data', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const token = extractTokenFromHeaders(req.headers);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'patient') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await req.json();

    const tracker = await Tracker.create({
      ...data,
      patient: decoded.userId,
      date: data.date || new Date(),
    });

    return NextResponse.json(
      { message: 'Tracking data saved successfully', tracker },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create tracker error:', error);
    return NextResponse.json(
      { message: 'Failed to save tracking data', error: error.message },
      { status: 500 }
    );
  }
}
