import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide hospital name'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: String,
    latitude: Number,
    longitude: Number,
    
    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    licenseNumber: String,
    
    specialties: [String],
    departments: [String],
    
    totalBeds: Number,
    availableBeds: Number,
    icuBeds: Number,
    
    emergencyServices: Boolean,
    emergencyPhone: String,
    
    operatingHours: {
      opening: String,
      closing: String,
    },
    
    ambulanceService: Boolean,
    ambulancePhones: [String],
    
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    
    adminUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    
    image: String,
    website: String,
    
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Add geospatial index for location-based queries
hospitalSchema.index({ latitude: 1, longitude: 1 });
hospitalSchema.index({ city: 1, state: 1 });

export default mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema);
