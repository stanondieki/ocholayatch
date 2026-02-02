import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Booking from '../models/Booking.model';
import Yacht from '../models/Yacht.model';

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      yachtId,
      startDate,
      endDate,
      guests,
      paymentMethod,
      specialRequests,
      guestInfo,
      cryptoDetails,
    } = req.body;

    // Get yacht details
    const yacht = await Yacht.findById(yachtId);
    if (!yacht) {
      return res.status(404).json({ success: false, message: 'Yacht not found' });
    }

    // Calculate days and price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerDay = yacht.price;
    const subtotal = pricePerDay * days;
    const serviceFee = subtotal * 0.1; // 10% service fee
    const totalPrice = subtotal + serviceFee;

    // Generate unique booking ID
    const bookingId = `OY-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Create booking
    const booking = new Booking({
      bookingId,
      user: (req as any).userId || null,
      yacht: yachtId,
      yachtName: yacht.name,
      yachtImage: yacht.image,
      startDate: start,
      endDate: end,
      guests,
      days,
      pricePerDay,
      serviceFee,
      totalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === 'card' ? 'paid' : 'pending',
      status: paymentMethod === 'card' ? 'confirmed' : 'pending',
      specialRequests,
      guestInfo,
      cryptoDetails,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get user's bookings
export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter: any = {};
    
    // If user is authenticated, show their bookings
    if ((req as any).userId) {
      filter.user = (req as any).userId;
    } else if (req.query.email) {
      // Allow guest users to find bookings by email
      filter['guestInfo.email'] = req.query.email;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('yacht', 'name image location category')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Booking.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOne({
      $or: [
        { _id: req.params.id },
        { bookingId: req.params.id },
      ],
    }).populate('yacht', 'name image images location category amenities');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update booking status
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status, paymentStatus } = req.body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Cancel booking
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if booking can be cancelled
    if (booking.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel completed booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all bookings (Admin)
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query;

    const filter: any = {};
    if (status && status !== 'all') filter.status = status;
    if (paymentStatus && paymentStatus !== 'all') filter.paymentStatus = paymentStatus;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('user', 'firstName lastName email')
        .populate('yacht', 'name image location')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Booking.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Check yacht availability
export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { yachtId, startDate, endDate } = req.query;

    const conflictingBookings = await Booking.find({
      yacht: yachtId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        {
          startDate: { $lte: new Date(endDate as string) },
          endDate: { $gte: new Date(startDate as string) },
        },
      ],
    });

    const isAvailable = conflictingBookings.length === 0;

    res.json({
      success: true,
      data: {
        available: isAvailable,
        conflictingDates: conflictingBookings.map(b => ({
          startDate: b.startDate,
          endDate: b.endDate,
        })),
      },
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
