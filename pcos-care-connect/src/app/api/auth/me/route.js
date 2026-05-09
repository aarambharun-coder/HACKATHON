import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const token = extractTokenFromHeaders(req.headers);

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      state: user.state,
      city: user.city,
      avatar: user.avatar,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
    };

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Failed to get user', error: error.message },
      { status: 500 }
    );
  }
}
