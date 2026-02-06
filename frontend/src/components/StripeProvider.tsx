'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode } from 'react';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripeProviderProps {
  children: ReactNode;
  clientSecret?: string;
}

export function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const options = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: 'night' as const,
          variables: {
            colorPrimary: '#9333ea',
            colorBackground: '#1a1a2e',
            colorText: '#ffffff',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '12px',
            spacingUnit: '4px',
          },
          rules: {
            '.Input': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '16px 20px',
              fontSize: '16px',
            },
            '.Input:focus': {
              borderColor: '#9333ea',
              boxShadow: '0 0 0 2px rgba(147, 51, 234, 0.3)',
            },
            '.Label': {
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            },
            '.Tab': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            '.Tab--selected': {
              backgroundColor: 'rgba(147, 51, 234, 0.2)',
              borderColor: '#9333ea',
            },
          },
        },
      }
    : undefined;

  if (!clientSecret) {
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}

export { stripePromise };
