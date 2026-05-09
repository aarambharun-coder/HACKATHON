import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
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
    phone: { type: String, trim: true },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', ''],
    },
    state: { type: String, trim: true },
    city:  { type: String, trim: true },
    address: String,

    // Patient-specific fields
    medicalHistory: String,
    allergies:   [String],
    medications: [String],

    // Doctor / Hospital Admin fields
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
    qualification:   String,
    specialization:  String,
    experience:      Number,
    licenseNumber:   String,
    languages:       [String],
    consultationFee: Number,
    bio:             String,

    avatar:     String,
    isVerified: { type: Boolean, default: false },
    isActive:   { type: Boolean, default: true },
    lastLogin:  Date,
  },
  { timestamps: true }
);

// Prevent OverwriteModelError on hot-reload in Next.js dev mode
export default mongoose.models.User || mongoose.model('User', userSchema);
