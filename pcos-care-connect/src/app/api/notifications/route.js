import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Notification from '@/models/Notification';
import { authMiddleware, errorResponse, successResponse } from '@/lib/middleware';

// GET /api/notifications - Fetch user notifications
export async function GET(req) {
  try {
    await connectDB();

    const decoded = await authMiddleware(req);
    if (!decoded) {
      return errorResponse('Authentication required', 401);
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const unreadOnly = searchParams.get('unread') === 'true';
    const skip = (page - 1) * limit;

    const filter = { recipient: decoded.userId };
    if (unreadOnly) filter.isRead = false;

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments(filter),
      Notification.countDocuments({ recipient: decoded.userId, isRead: false }),
    ]);

    return successResponse({
      notifications,
      unreadCount,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return errorResponse('Failed to fetch notifications', 500);
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(req) {
  try {
    await connectDB();

    const decoded = await authMiddleware(req);
    if (!decoded) {
      return errorResponse('Authentication required', 401);
    }

    const body = await req.json();
    const { notificationId, markAllRead } = body;

    if (markAllRead) {
      await Notification.updateMany(
        { recipient: decoded.userId, isRead: false },
        { $set: { isRead: true, readAt: new Date() } }
      );
      return successResponse({ message: 'All notifications marked as read' });
    }

    if (notificationId) {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: decoded.userId },
        { $set: { isRead: true, readAt: new Date() } },
        { new: true }
      );

      if (!notification) {
        return errorResponse('Notification not found', 404);
      }

      return successResponse({ message: 'Notification marked as read', notification });
    }

    return errorResponse('Please provide notificationId or set markAllRead to true');
  } catch (error) {
    console.error('Error updating notifications:', error);
    return errorResponse('Failed to update notifications', 500);
  }
}
