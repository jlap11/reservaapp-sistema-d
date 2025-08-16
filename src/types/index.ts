export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
}

export interface Appointment {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  userId: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type CalendarView = 'month' | 'week' | 'day';