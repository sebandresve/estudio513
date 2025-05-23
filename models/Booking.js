import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Ej: "2025-05-25"
    required: true
  },
  hour: {
    type: String, // Ej: "14:00"
    required: true
  },
  duration: {
    type: Number, // En horas
    default: 1
  }
}, { timestamps: true })

bookingSchema.index({ date: 1, hour: 1 }, { unique: false })

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking
