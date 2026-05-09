import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CommunityPost from '@/models/CommunityPost';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function POST(req, { params }) {
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

    const { action } = await req.json(); // 'like' or 'unlike'

    const post = await CommunityPost.findById(params.id);

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    const userLiked = post.likedBy.includes(decoded.userId);

    if (action === 'like' && !userLiked) {
      post.likedBy.push(decoded.userId);
      post.likes += 1;
    } else if (action === 'unlike' && userLiked) {
      post.likedBy = post.likedBy.filter((id) => id.toString() !== decoded.userId.toString());
      post.likes -= 1;
    }

    await post.save();

    return NextResponse.json(
      { message: 'Post updated successfully', post },
      { status: 200 }
    );
  } catch (error) {
    console.error('Like post error:', error);
    return NextResponse.json(
      { message: 'Failed to update post', error: error.message },
      { status: 500 }
    );
  }
}
