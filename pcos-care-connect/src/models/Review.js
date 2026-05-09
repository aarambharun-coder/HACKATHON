import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
    
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    
    title: String,
    
    comment: String,
    
    verifiedVisit: Boolean,
    
    categories: {
      cleanliness: Number,
      staffBehavior: Number,
      doctorExpertise: Number,
      waitTime: Number,
      valueForMoney: Number,
    },
    
    likes: {
      type: Number,
      default: 0,
    },
    
    isHelpful: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

reviewSchema.index({ doctor: 1 });
reviewSchema.index({ hospital: 1 });
reviewSchema.index({ reviewer: 1 });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
