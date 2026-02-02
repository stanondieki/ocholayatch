// Simple booking store using localStorage
import { Yacht } from '@/types';

export interface BookingData {
  yacht: Yacht;
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  days: number;
}

export interface SavedBooking extends BookingData {
  id: string;
  paymentMethod: 'card' | 'crypto';
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const BOOKINGS_KEY = 'ocholaYachtsBookings';
const PENDING_BOOKING_KEY = 'ocholaYachtsPendingBooking';

// Get all saved bookings
export function getBookings(): SavedBooking[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(BOOKINGS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save a new booking
export function saveBooking(booking: SavedBooking): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

// Update booking status
export function updateBookingStatus(bookingId: string, status: SavedBooking['status']): void {
  const bookings = getBookings();
  const updated = bookings.map(b => 
    b.id === bookingId ? { ...b, status } : b
  );
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
}

// Delete a booking
export function deleteBooking(bookingId: string): void {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== bookingId);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
}

// Set pending booking (for checkout)
export function setPendingBooking(booking: BookingData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(booking));
}

// Get pending booking
export function getPendingBooking(): BookingData | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(PENDING_BOOKING_KEY);
  return data ? JSON.parse(data) : null;
}

// Clear pending booking
export function clearPendingBooking(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PENDING_BOOKING_KEY);
}

// Generate unique booking ID
export function generateBookingId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
