import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { comparePassword } from '@/lib/password';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Normalise email before lookup
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login (non-blocking)
    User.findByIdAndUpdate(user._id, { lastLogin: new Date() }).catch(() => {});

    const token = generateToken({ userId: user._id, role: user.role });

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: {
          _id:    user._id,
          name:   user.name,
          email:  user.email,
          role:   user.role,
          phone:  user.phone,
          state:  user.state,
          city:   user.city,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
