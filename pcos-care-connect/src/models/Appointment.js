import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    
    appointmentDate: {
      type: Date,
      required: true,
    },
    startTime: String,
    endTime: String,
    
    consultationType: {
      type: String,
      enum: ['in-person', 'telemedicine', 'follow-up'],
      default: 'in-person',
    },
    
    reason: String,
    notes: String,
    symptoms: [String],
    
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled', 'no-show'],
      default: 'scheduled',
    },
    
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    
    consultationFee: Number,
    
    prescription: String,
    diagnosis: String,
    followUpDate: Date,
    
    reminderSent: Boolean,
    
    cancellationReason: String,
    cancelledBy: {
      type: String,
      enum: ['patient', 'doctor', 'hospital'],
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ patient: 1, appointmentDate: 1 });
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ hospital: 1, appointmentDate: 1 });

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
