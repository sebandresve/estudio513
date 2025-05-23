import Booking from '../models/Booking.js'

const createBooking = async (req, res) => {
  const { date, hour, duration } = req.body
  const userId = req.user.id

  try {
    // Verificar que no haya una reserva en ese horario
    const existing = await Booking.findOne({ date, hour })
    if (existing) {
      return res.status(400).json({ message: 'Este horario ya está reservado.' })
    }

    const booking = await Booking.create({ user: userId, date, hour, duration })
    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la reserva.' })
  }
}

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ date: 1 })
    res.status(200).json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tus reservas.' })
  }
}

const getAllBookings = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso no autorizado.' })
  }

  try {
    const bookings = await Booking.find().populate('user', 'name email').sort({ date: 1 })
    res.status(200).json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener todas las reservas.' })
  }
}

export { createBooking, getMyBookings, getAllBookings }
