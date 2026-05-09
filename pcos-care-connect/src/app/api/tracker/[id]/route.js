import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Tracker from '@/models/Tracker';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
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

    const tracker = await Tracker.findById(params.id);

    if (!tracker || tracker.patient.toString() !== decoded.userId.toString()) {
      return NextResponse.json(
        { message: 'Tracker entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tracker, { status: 200 });
  } catch (error) {
    console.error('Get tracker entry error:', error);
    return NextResponse.json(
      { message: 'Failed to get tracker entry', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
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
    const tracker = await Tracker.findByIdAndUpdate(params.id, data, { new: true });

    if (!tracker || tracker.patient.toString() !== decoded.userId.toString()) {
      return NextResponse.json(
        { message: 'Tracker entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Tracker updated successfully', tracker },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update tracker error:', error);
    return NextResponse.json(
      { message: 'Failed to update tracker', error: error.message },
      { status: 500 }
    );
  }
}
