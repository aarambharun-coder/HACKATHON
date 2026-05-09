import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Appointment from '@/models/Appointment';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const appointment = await Appointment.findById(params.id)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialization qualification')
      .populate('hospital', 'name address city state');

    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.error('Get appointment error:', error);
    return NextResponse.json(
      { message: 'Failed to get appointment', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
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

    const { status, notes, prescription, diagnosis, followUpDate } = await req.json();

    const appointment = await Appointment.findById(params.id);

    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Authorization check
    if (
      decoded.role === 'doctor' &&
      appointment.doctor.toString() !== decoded.userId.toString()
    ) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;
    if (prescription) appointment.prescription = prescription;
    if (diagnosis) appointment.diagnosis = diagnosis;
    if (followUpDate) appointment.followUpDate = followUpDate;

    await appointment.save();

    return NextResponse.json(
      { message: 'Appointment updated successfully', appointment },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update appointment error:', error);
    return NextResponse.json(
      { message: 'Failed to update appointment', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
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

    const appointment = await Appointment.findById(params.id);

    if (!appointment) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Authorization check
    if (decoded.role === 'patient' && appointment.patient.toString() !== decoded.userId.toString()) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    appointment.status = 'cancelled';
    appointment.cancelledBy = decoded.role === 'patient' ? 'patient' : 'doctor';
    await appointment.save();

    return NextResponse.json(
      { message: 'Appointment cancelled successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cancel appointment error:', error);
    return NextResponse.json(
      { message: 'Failed to cancel appointment', error: error.message },
      { status: 500 }
    );
  }
}
