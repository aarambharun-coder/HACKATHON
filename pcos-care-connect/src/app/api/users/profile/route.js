import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { authMiddleware, errorResponse, successResponse } from '@/lib/middleware';

// GET /api/users/profile - Get current user profile
export async function GET(req) {
  try {
    await connectDB();

    const decoded = await authMiddleware(req);
    if (!decoded) {
      return errorResponse('Authentication required', 401);
    }

    const user = await User.findById(decoded.userId)
      .select('-password')
      .populate('hospital', 'name city state');

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return errorResponse('Failed to fetch profile', 500);
  }
}

// PATCH /api/users/profile - Update user profile
export async function PATCH(req) {
  try {
    await connectDB();

    const decoded = await authMiddleware(req);
    if (!decoded) {
      return errorResponse('Authentication required', 401);
    }

    const body = await req.json();

    // Only allow updating specific fields
    const allowedFields = [
      'name', 'phone', 'gender', 'dateOfBirth', 'state', 'city',
      'address', 'medicalHistory', 'allergies', 'medications',
      'avatar', 'bio', 'languages',
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return errorResponse('No valid fields to update');
    }

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return errorResponse('Failed to update profile', 500);
  }
}
