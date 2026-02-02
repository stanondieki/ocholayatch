import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getAllBookings,
  checkAvailability,
} from '../controllers/booking.controller';
import { authenticate, optionalAuth, adminOnly } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/check-availability', checkAvailability);

// Routes that work with or without authentication
router.post('/', optionalAuth, createBooking);
router.get('/my-bookings', optionalAuth, getMyBookings);
router.get('/:id', getBookingById);

// Protected routes
router.put('/:id/cancel', authenticate, cancelBooking);

// Admin routes
router.get('/', authenticate, adminOnly, getAllBookings);
router.put('/:id/status', authenticate, adminOnly, updateBookingStatus);

export default router;
