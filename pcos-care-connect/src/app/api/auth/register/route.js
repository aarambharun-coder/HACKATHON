import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { hashPassword, comparePassword } from '@/lib/password';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, name, role = 'patient', phone, gender, state, city } = await req.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Please provide email, password, and name' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      gender,
      state,
      city,
    });

    // Generate token
    const token = generateToken({ userId: user._id, role: user.role });

    // Return user data (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      state: user.state,
      city: user.city,
    };

    return NextResponse.json(
      {
        message: 'User registered successfully',
        token,
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Registration failed', error: error.message },
      { status: 500 }
    );
  }
}
