import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/models/Review';
import { authMiddleware, errorResponse, successResponse } from '@/lib/middleware';

// GET /api/reviews - Fetch reviews with optional filters
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const doctor = searchParams.get('doctor');
    const hospital = searchParams.get('hospital');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (doctor) filter.doctor = doctor;
    if (hospital) filter.hospital = hospital;

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate('reviewer', 'name avatar')
        .populate('doctor', 'name specialization')
        .populate('hospital', 'name city')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments(filter),
    ]);

    // Calculate average rating
    const avgResult = await Review.aggregate([
      { $match: filter },
      { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);

    const averageRating = avgResult.length > 0 ? Math.round(avgResult[0].avgRating * 10) / 10 : 0;

    return successResponse({
      reviews,
      averageRating,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return errorResponse('Failed to fetch reviews', 500);
  }
}

// POST /api/reviews - Create a new review
export async function POST(req) {
  try {
    await connectDB();

    const decoded = await authMiddleware(req);
    if (!decoded) {
      return errorResponse('Authentication required', 401);
    }

    const body = await req.json();
    const { doctor, hospital, rating, title, comment, categories, verifiedVisit } = body;

    if (!rating || rating < 1 || rating > 5) {
      return errorResponse('Rating must be between 1 and 5');
    }

    if (!doctor && !hospital) {
      return errorResponse('Please specify a doctor or hospital to review');
    }

    // Check for duplicate review
    const existingReview = await Review.findOne({
      reviewer: decoded.userId,
      ...(doctor ? { doctor } : { hospital }),
    });

    if (existingReview) {
      return errorResponse('You have already reviewed this doctor/hospital', 409);
    }

    const review = await Review.create({
      reviewer: decoded.userId,
      doctor: doctor || undefined,
      hospital: hospital || undefined,
      rating,
      title,
      comment,
      categories,
      verifiedVisit: verifiedVisit || false,
    });

    const populated = await Review.findById(review._id)
      .populate('reviewer', 'name avatar');

    return successResponse(
      { message: 'Review submitted successfully', review: populated },
      201
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return errorResponse('Failed to submit review', 500);
  }
}
