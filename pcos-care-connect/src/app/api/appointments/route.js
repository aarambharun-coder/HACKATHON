import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Appointment from '@/models/Appointment';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const token = extractTokenFromHeaders(req.headers);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // Build filter based on user role
    let filter = {};

    if (decoded.role === 'patient') {
      filter.patient = decoded.userId;
    } else if (decoded.role === 'doctor') {
      filter.doctor = decoded.userId;
    } else if (decoded.role === 'hospital_admin') {
      filter.hospital = decoded.hospitalId;
    }

    if (status) filter.status = status;

    const total = await Appointment.countDocuments(filter);

    const appointments = await Appointment.find(filter)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialization')
      .populate('hospital', 'name city')
      .limit(limit)
      .skip(skip)
      .sort({ appointmentDate: -1 });

    return NextResponse.json(
      {
        appointments,
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
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { message: 'Failed to get appointments', error: error.message },
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
        { message: 'Only patients can book appointments' },
        { status: 403 }
      );
    }

    await connectDB();

    const { doctorId, hospitalId, appointmentDate, startTime, consultationType, reason, symptoms } =
      await req.json();

    const appointment = await Appointment.create({
      patient: decoded.userId,
      doctor: doctorId,
      hospital: hospitalId,
      appointmentDate,
      startTime,
      consultationType,
      reason,
      symptoms,
      status: 'scheduled',
    });

    await appointment.populate('doctor', 'name specialization');
    await appointment.populate('hospital', 'name');

    return NextResponse.json(
      { message: 'Appointment booked successfully', appointment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Book appointment error:', error);
    return NextResponse.json(
      { message: 'Failed to book appointment', error: error.message },
      { status: 500 }
    );
  }
}
