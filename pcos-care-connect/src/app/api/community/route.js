import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CommunityPost from '@/models/CommunityPost';
import { extractTokenFromHeaders, verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    let filter = { status: 'published' };

    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await CommunityPost.countDocuments(filter);

    const posts = await CommunityPost.find(filter)
      .populate('author', 'name avatar -password')
      .limit(limit)
      .skip(skip)
      .sort({ isPinned: -1, createdAt: -1 });

    return NextResponse.json(
      {
        posts,
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
    console.error('Get posts error:', error);
    return NextResponse.json(
      { message: 'Failed to get posts', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
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

    const { title, content, category, tags, postType, isAnonymous } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Please provide title and content' },
        { status: 400 }
      );
    }

    const post = await CommunityPost.create({
      author: isAnonymous ? null : decoded.userId,
      title,
      content,
      category,
      tags: tags || [],
      postType,
      isAnonymous,
      status: 'published',
    });

    await post.populate('author', 'name avatar -password');

    return NextResponse.json(
      { message: 'Post created successfully', post },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { message: 'Failed to create post', error: error.message },
      { status: 500 }
    );
  }
}
