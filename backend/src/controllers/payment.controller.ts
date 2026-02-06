import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Booking from '../models/Booking.model';

// Load environment variables
dotenv.config();

// Initialize Stripe lazily to ensure env vars are loaded
let stripeInstance: Stripe | null = null;

const getStripe = (): Stripe => {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeInstance = new Stripe(secretKey);
  }
  return stripeInstance;
};

// Create a payment intent for card payments
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'usd', bookingId, metadata = {} } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required',
      });
    }

    const stripe = getStripe();

    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      metadata: {
        bookingId: bookingId || '',
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment intent',
    });
  }
};

// Confirm payment and update booking status
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, bookingId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID is required',
      });
    }

    const stripe = getStripe();

    // Retrieve the payment intent to verify status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update booking if bookingId provided
      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, {
          paymentStatus: 'paid',
          status: 'confirmed',
          stripePaymentIntentId: paymentIntentId,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Payment confirmed successfully',
        status: paymentIntent.status,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not yet completed',
        status: paymentIntent.status,
      });
    }
  } catch (error: any) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to confirm payment',
    });
  }
};

// Stripe Webhook handler
export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    const stripe = getStripe();

    if (!webhookSecret) {
      // For testing without webhook secret
      event = req.body;
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Update booking if metadata contains bookingId
      if (paymentIntent.metadata.bookingId) {
        await Booking.findByIdAndUpdate(paymentIntent.metadata.bookingId, {
          paymentStatus: 'paid',
          status: 'confirmed',
          stripePaymentIntentId: paymentIntent.id,
        });
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      
      if (failedPayment.metadata.bookingId) {
        await Booking.findByIdAndUpdate(failedPayment.metadata.bookingId, {
          paymentStatus: 'failed',
          status: 'cancelled',
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Get payment status
export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.params;

    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.status(200).json({
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error: any) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get payment status',
    });
  }
};
