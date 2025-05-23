import express from 'express'
import { createBooking, getMyBookings, getAllBookings } from '../controllers/bookingController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.post('/', requireAuth, createBooking)
router.get('/me', requireAuth, getMyBookings)
router.get('/all', requireAuth, getAllBookings)

export default router
