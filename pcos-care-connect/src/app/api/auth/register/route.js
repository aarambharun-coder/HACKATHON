import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/password';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, name, role = 'patient', phone, gender, state, city } = await req.json();

    // Basic validation
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

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email already exists. Please sign in.' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user — only pass defined fields
    const userData = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    };
    if (phone)  userData.phone  = phone.trim();
    if (gender) userData.gender = gender;
    if (state)  userData.state  = state.trim();
    if (city)   userData.city   = city.trim();

    const user = await User.create(userData);

    // Generate token
    const token = generateToken({ userId: user._id, role: user.role });

    return NextResponse.json(
      {
        message: 'Account created successfully! Please sign in.',
        token,
        user: {
          _id:   user._id,
          name:  user.name,
          email: user.email,
          role:  user.role,
          phone: user.phone,
          state: user.state,
          city:  user.city,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'An account with this email already exists. Please sign in.' },
        { status: 409 }
      );
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message).join(', ');
      return NextResponse.json(
        { message: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
