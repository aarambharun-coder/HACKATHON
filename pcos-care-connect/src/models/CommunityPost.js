import mongoose from 'mongoose';

const communityPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    postType: {
      type: String,
      enum: ['question', 'story', 'tip', 'discussion'],
      default: 'discussion',
    },
    
    title: {
      type: String,
      required: true,
    },
    
    content: {
      type: String,
      required: true,
    },
    
    tags: [String],
    
    category: {
      type: String,
      enum: ['symptoms', 'treatment', 'diet', 'fitness', 'mental-health', 'fertility', 'lifestyle', 'general'],
    },
    
    likes: {
      type: Number,
      default: 0,
    },
    
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    
    views: {
      type: Number,
      default: 0,
    },
    
    commentCount: {
      type: Number,
      default: 0,
    },
    
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    
    isPinned: Boolean,
    
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
    },
    
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: String,
        likes: Number,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

communityPostSchema.index({ author: 1, createdAt: -1 });
communityPostSchema.index({ category: 1, createdAt: -1 });
communityPostSchema.index({ tags: 1 });

export default mongoose.models.CommunityPost || mongoose.model('CommunityPost', communityPostSchema);
