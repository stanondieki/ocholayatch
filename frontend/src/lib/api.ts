const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// ==================== YACHT API ====================
export const yachtApi = {
  // Get all yachts with filters
  getYachts: (params?: {
    search?: string;
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minCapacity?: number;
    featured?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return apiRequest<{
      success: boolean;
      data: any[];
      pagination: { page: number; limit: number; total: number; pages: number };
    }>(`/yachts${query ? `?${query}` : ''}`);
  },

  // Get featured yachts
  getFeaturedYachts: (limit = 6) =>
    apiRequest<{ success: boolean; data: any[] }>(`/yachts/featured?limit=${limit}`),

  // Get single yacht
  getYachtById: (id: string) =>
    apiRequest<{ success: boolean; data: any }>(`/yachts/${id}`),

  // Get categories
  getCategories: () =>
    apiRequest<{ success: boolean; data: string[] }>('/yachts/categories'),

  // Get locations
  getLocations: () =>
    apiRequest<{ success: boolean; data: string[] }>('/yachts/locations'),
};

// ==================== AUTH API ====================
export const authApi = {
  // Register
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) =>
    apiRequest<{
      success: boolean;
      message: string;
      data: { user: any; token: string };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Login
  login: (email: string, password: string) =>
    apiRequest<{
      success: boolean;
      message: string;
      data: { user: any; token: string };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Get profile
  getProfile: () =>
    apiRequest<{ success: boolean; data: any }>('/auth/profile'),

  // Update profile
  updateProfile: (data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) =>
    apiRequest<{ success: boolean; data: any }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Change password
  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest<{ success: boolean; message: string }>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// ==================== BOOKING API ====================
export const bookingApi = {
  // Create booking
  createBooking: (data: {
    yachtId: string | number;
    startDate: string;
    endDate: string;
    guests: number;
    totalPrice?: number;
    paymentMethod: 'card' | 'crypto';
    specialRequests?: string;
    guestInfo?: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    cryptoDetails?: {
      currency: string;
      address: string;
    };
  }) =>
    apiRequest<{ success: boolean; message: string; data: any }>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get my bookings
  getMyBookings: (params?: { status?: string; email?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return apiRequest<{
      success: boolean;
      data: any[];
      pagination: { page: number; limit: number; total: number; pages: number };
    }>(`/bookings/my-bookings${query ? `?${query}` : ''}`);
  },

  // Get booking by ID
  getBookingById: (id: string) =>
    apiRequest<{ success: boolean; data: any }>(`/bookings/${id}`),

  // Cancel booking
  cancelBooking: (id: string) =>
    apiRequest<{ success: boolean; message: string; data: any }>(`/bookings/${id}/cancel`, {
      method: 'PUT',
    }),

  // Check availability
  checkAvailability: (yachtId: string, startDate: string, endDate: string) =>
    apiRequest<{
      success: boolean;
      data: { available: boolean; conflictingDates: any[] };
    }>(`/bookings/check-availability?yachtId=${yachtId}&startDate=${startDate}&endDate=${endDate}`),
};

// ==================== CONTACT API ====================
export const contactApi = {
  // Submit contact form
  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    interest?: string;
  }) =>
    apiRequest<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Subscribe to newsletter
  subscribeNewsletter: (email: string) =>
    apiRequest<{ success: boolean; message: string }>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Unsubscribe from newsletter
  unsubscribeNewsletter: (email: string) =>
    apiRequest<{ success: boolean; message: string }>('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// ==================== AUTH HELPERS ====================
export const authHelpers = {
  // Store token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  // Get token
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  // Remove token
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  // Check if logged in
  isLoggedIn: () => {
    return !!authHelpers.getToken();
  },

  // Store user data
  setUser: (user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Get user data
  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // Clear user data
  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  // Logout
  logout: () => {
    authHelpers.removeToken();
    authHelpers.clearUser();
  },
};

export default {
  yacht: yachtApi,
  auth: authApi,
  booking: bookingApi,
  contact: contactApi,
  authHelpers,
};
