import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = import.meta.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export types for use throughout the app
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: 'OWNER' | 'PROMENEUR';
          phone: string | null;
          avatar_url: string | null;
          bio: string | null;
          location: string | null;
          is_verified: boolean;
          background_checked: boolean;
          average_rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Row']>;
      };
      pets: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          type: string;
          breed: string | null;
          age: number | null;
          weight: number | null;
          photo_url: string | null;
          bio: string | null;
          vaccinations: string[];
          allergies: string[];
          medical_history: string | null;
          last_vet_visit: string | null;
          vet_name: string | null;
          vet_phone: string | null;
          dietary_needs: string | null;
          exercise_level: string | null;
          temperament: string | null;
          special_needs: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pets']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['pets']['Row']>;
      };
      bookings: {
        Row: {
          id: string;
          booking_number: string;
          owner_id: string;
          promeneur_id: string;
          pet_id: string;
          service_type: string;
          start_date: string;
          end_date: string;
          duration: number;
          base_price: number;
          additional_services: string[];
          additional_price: number;
          total_price: number;
          notes: string | null;
          status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
          payment_status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Row']>;
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          amount: number;
          payment_method: 'CARD' | 'PAYPAL' | 'BANK_TRANSFER';
          transaction_id: string | null;
          status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['payments']['Row']>;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          content: string;
          attachment_url: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['messages']['Row']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'BOOKING' | 'MESSAGE' | 'REVIEW' | 'PAYMENT' | 'SYSTEM';
          title: string;
          description: string;
          link: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notifications']['Row']>;
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          author_id: string;
          promeneur_id: string;
          rating: number;
          comment: string;
          photo_urls: string[];
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Row']>;
      };
      earnings: {
        Row: {
          id: string;
          promeneur_id: string;
          booking_id: string | null;
          amount: number;
          type: 'SERVICE' | 'TIP' | 'REFUND' | 'WITHDRAWAL';
          description: string | null;
          status: 'PENDING' | 'AVAILABLE' | 'WITHDRAWN';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['earnings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['earnings']['Row']>;
      };
      service_photos: {
        Row: {
          id: string;
          booking_id: string;
          url: string;
          caption: string | null;
          sent: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['service_photos']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['service_photos']['Row']>;
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          type: 'ID_CARD' | 'PASSPORT' | 'BACKGROUND_CHECK' | 'ADDRESS_PROOF';
          url: string;
          status: 'PENDING' | 'VERIFIED' | 'REJECTED';
          verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['documents']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['documents']['Row']>;
      };
      availability: {
        Row: {
          id: string;
          promeneur_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['availability']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['availability']['Row']>;
      };
    };
  };
};

