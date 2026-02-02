interface InvoiceProps {
  booking: {
    id: string;
    yacht: {
      id: number;
      name: string;
      location: string;
      price: number;
    };
    startDate: string;
    endDate: string;
    guests: number;
    totalPrice: number;
    days: number;
    paymentMethod: 'card' | 'crypto';
    bookingDate: string;
    status: 'confirmed' | 'pending' | 'cancelled';
  };
}

export function Invoice({ booking }: InvoiceProps) {
  const subtotal = booking.totalPrice;
  const serviceFee = booking.totalPrice * 0.1;
  const total = booking.totalPrice * 1.1;

  return (
    <div
      id="invoice-template"
      style={{
        all: 'initial',
        width: '794px',
        minHeight: '1123px',
        background: 'rgb(15, 23, 42)',
        padding: '60px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: 'rgb(255, 255, 255)',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block',
      }}
    >
      {/* Background Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          right: '100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      ></div>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgb(147, 51, 234)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ color: 'rgb(255, 255, 255)', fontSize: '24px' }}>⚓</div>
              </div>
              <h1
                style={{
                  fontSize: '42px',
                  fontWeight: '700',
                  margin: '0',
                  color: 'rgb(167, 139, 250)',
                  letterSpacing: '-0.02em',
                }}
              >
                OcholaYachts
              </h1>
            </div>
            <p style={{ margin: '0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: '1.5' }}>
              Luxury Yacht Rentals
            </p>
            <p style={{ margin: '4px 0 0 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: '1.5' }}>
              contact@ocholayachts.com
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: 'rgb(255, 255, 255)',
                letterSpacing: '0.05em',
              }}
            >
              INVOICE
            </h2>
            <p style={{ margin: '0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: '1.5' }}>
              Invoice #{booking.id.slice(0, 12).toUpperCase()}
            </p>
            <p style={{ margin: '4px 0 0 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: '1.5' }}>
              Date: {new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background:
              booking.status === 'confirmed'
                ? 'rgb(16, 185, 129)'
                : booking.status === 'pending'
                ? 'rgb(245, 158, 11)'
                : 'rgb(239, 68, 68)',
            borderRadius: '24px',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '40px',
            color: 'rgb(255, 255, 255)',
          }}
        >
          {booking.status}
        </div>

        {/* Yacht Details */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '40px',
          }}
        >
          <h3 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 24px 0', color: 'rgb(255, 255, 255)', lineHeight: '1.2' }}>
            {booking.yacht.name}
          </h3>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', marginBottom: '8px', lineHeight: '1.5' }}>
            📍 {booking.yacht.location}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.5' }}>
                Check-in
              </div>
              <div style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontWeight: '500', lineHeight: '1.5' }}>
                {new Date(booking.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.5' }}>
                Check-out
              </div>
              <div style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontWeight: '500', lineHeight: '1.5' }}>
                {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.5' }}>
                Duration
              </div>
              <div style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontWeight: '500', lineHeight: '1.5' }}>
                {booking.days} Days
              </div>
            </div>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.5' }}>
                Guests
              </div>
              <div style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontWeight: '500', lineHeight: '1.5' }}>
                {booking.guests} People
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '40px',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 24px 0', color: 'rgb(255, 255, 255)', lineHeight: '1.2' }}>
            Payment Summary
          </h3>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>Daily Rate</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginTop: '2px', lineHeight: '1.5' }}>
                ${booking.yacht.price.toLocaleString()} × {booking.days} days
              </div>
            </div>
            <div style={{ color: 'rgb(255, 255, 255)', fontSize: '18px', fontWeight: '500', lineHeight: '1.5' }}>
              ${subtotal.toLocaleString()}
            </div>
          </div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>Service Fee (10%)</div>
            <div style={{ color: 'rgb(255, 255, 255)', fontSize: '18px', fontWeight: '500', lineHeight: '1.5' }}>
              ${serviceFee.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '2px solid rgba(147, 51, 234, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ color: 'rgb(255, 255, 255)', fontSize: '20px', fontWeight: '600', lineHeight: '1.5' }}>Total Amount</div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: '700',
                color: 'rgb(167, 139, 250)',
                lineHeight: '1.2',
              }}
            >
              ${total.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '24px 32px',
            marginBottom: '40px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>Payment Method</div>
            <div style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontWeight: '500', lineHeight: '1.5' }}>
              {booking.paymentMethod === 'card' ? '💳 Credit Card' : '₿ Cryptocurrency'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '60px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 12px 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: '1.5' }}>
            Thank you for choosing OcholaYachts for your luxury yacht experience
          </p>
          <p style={{ margin: '0', color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px', lineHeight: '1.5' }}>
            For inquiries, please contact us at support@ocholayachts.com or call +1 (555) 123-4567
          </p>
          <div
            style={{
              marginTop: '24px',
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgb(147, 51, 234)',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'rgb(255, 255, 255)',
            }}
          >
            Premium Yacht Rentals
          </div>
        </div>
      </div>
    </div>
  );
}
