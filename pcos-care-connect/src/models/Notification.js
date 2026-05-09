import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    type: {
      type: String,
      enum: ['appointment', 'message', 'reminder', 'alert', 'system'],
    },
    
    title: String,
    
    message: {
      type: String,
      required: true,
    },
    
    link: String,
    
    relatedEntity: {
      entityType: String,
      entityId: mongoose.Schema.Types.ObjectId,
    },
    
    isRead: {
      type: Boolean,
      default: false,
    },
    
    readAt: Date,
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
