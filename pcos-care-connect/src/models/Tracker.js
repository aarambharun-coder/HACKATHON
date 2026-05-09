import mongoose from 'mongoose';

const trackerSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Menstrual Cycle Tracking
    lastPeriodStart: Date,
    cycleLength: Number,
    periodDuration: Number,
    periodIntensity: {
      type: String,
      enum: ['light', 'moderate', 'heavy'],
    },
    
    // Daily Tracking
    date: {
      type: Date,
      required: true,
    },
    
    symptoms: [String],
    mood: {
      type: String,
      enum: ['excellent', 'good', 'okay', 'bad', 'terrible'],
    },
    moodNotes: String,
    
    weight: Number,
    bloodPressure: String,
    bloodSugar: Number,
    
    waterIntake: Number, // in liters
    sleepHours: Number,
    sleepQuality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
    },
    
    exercise: {
      type: String,
      enum: ['none', 'light', 'moderate', 'intense'],
    },
    exerciseDuration: Number, // in minutes
    
    diet: String, // description of diet
    
    painLevel: Number, // 1-10 scale
    painLocation: String,
    
    medications: [
      {
        name: String,
        dosage: String,
        taken: Boolean,
      },
    ],
    
    notes: String,
  },
  { timestamps: true }
);

trackerSchema.index({ patient: 1, date: -1 });

export default mongoose.models.Tracker || mongoose.model('Tracker', trackerSchema);
