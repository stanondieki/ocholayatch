import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  handleWebhook,
  getPaymentStatus,
} from '../controllers/payment.controller';
import { auth, optionalAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Create payment intent (requires optional auth - guest checkout allowed)
router.post('/create-intent', optionalAuth, createPaymentIntent);

// Confirm payment
router.post('/confirm', optionalAuth, confirmPayment);

// Get payment status
router.get('/status/:paymentIntentId', optionalAuth, getPaymentStatus);

// Stripe webhook (no auth needed, Stripe verifies via signature)
// Note: This route needs raw body, handled in index.ts
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
