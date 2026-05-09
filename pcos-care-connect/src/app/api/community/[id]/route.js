import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CommunityPost from '@/models/CommunityPost';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const post = await CommunityPost.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar -password');

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { message: 'Failed to get post', error: error.message },
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

    const post = await CommunityPost.findById(params.id);

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    if (post.author && post.author.toString() !== decoded.userId.toString()) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { title, content, category } = await req.json();

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;

    await post.save();
    await post.populate('author', 'name avatar -password');

    return NextResponse.json(
      { message: 'Post updated successfully', post },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { message: 'Failed to update post', error: error.message },
      { status: 500 }
    );
  }
}
