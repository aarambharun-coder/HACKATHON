import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'hospital_admin', 'super_admin'],
      default: 'patient',
    },
    phone: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    state: String,
    city: String,
    address: String,
    
    // Patient-specific fields
    medicalHistory: String,
    allergies: [String],
    medications: [String],
    
    // Doctor-specific fields
    qualification: String,
    specialization: String,
    experience: Number,
    licenseNumber: String,
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
    languages: [String],
    consultationFee: Number,
    bio: String,
    
    // Hospital Admin specific
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
    
    avatar: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
