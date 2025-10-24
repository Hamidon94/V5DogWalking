import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface CreateBookingPayload {
  ownerId: string;
  sitterId: string;
  petId: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  duration: number;
  basePrice: number;
  additionalServices?: string[];
  additionalPrice?: number;
  notes?: string;
}

class SupabaseBookingService {
  /**
   * Create a new booking
   */
  public async createBooking(payload: CreateBookingPayload) {
    try {
      const bookingNumber = `BK-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${uuidv4().substring(0, 5).toUpperCase()}`;
      const totalPrice = payload.basePrice + (payload.additionalPrice || 0);

      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            booking_number: bookingNumber,
            owner_id: payload.ownerId,
            sitter_id: payload.sitterId,
            pet_id: payload.petId,
            service_type: payload.serviceType,
            start_date: payload.startDate,
            end_date: payload.endDate,
            duration: payload.duration,
            base_price: payload.basePrice,
            additional_services: payload.additionalServices || [],
            additional_price: payload.additionalPrice || 0,
            total_price: totalPrice,
            notes: payload.notes,
            status: 'PENDING',
            payment_status: 'PENDING',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get bookings for a user
   */
  public async getUserBookings(userId: string, role: string) {
    try {
      let query = supabase.from('bookings').select('*');

      if (role === 'OWNER') {
        query = query.eq('owner_id', userId);
      } else if (role === 'SITTER') {
        query = query.eq('sitter_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get booking by ID
   */
  public async getBookingById(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update booking status
   */
  public async updateBookingStatus(bookingId: string, status: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel booking
   */
  public async cancelBooking(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'CANCELLED' })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SupabaseBookingService();

