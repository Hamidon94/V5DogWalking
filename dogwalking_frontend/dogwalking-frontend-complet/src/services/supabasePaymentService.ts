import { supabase } from '../lib/supabase';

interface CreatePaymentPayload {
  bookingId: string;
  amount: number;
  paymentMethod: 'CARD' | 'PAYPAL' | 'BANK_TRANSFER';
}

class SupabasePaymentService {
  /**
   * Create a payment record
   */
  public async createPayment(payload: CreatePaymentPayload) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert([
          {
            booking_id: payload.bookingId,
            amount: payload.amount,
            payment_method: payload.paymentMethod,
            status: 'PENDING',
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
   * Process payment (simulated - would call Stripe/PayPal in production)
   */
  public async processPayment(paymentId: string, transactionId: string) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .update({
          status: 'COMPLETED',
          transaction_id: transactionId,
          paid_at: new Date().toISOString(),
        })
        .eq('id', paymentId)
        .select()
        .single();

      if (error) throw error;

      // Update booking payment status
      const payment = data;
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ payment_status: 'COMPLETED' })
        .eq('id', payment.booking_id);

      if (bookingError) throw bookingError;

      // Create earning record for sitter
      const booking = await supabase
        .from('bookings')
        .select('*')
        .eq('id', payment.booking_id)
        .single();

      if (booking.data) {
        await supabase
          .from('earnings')
          .insert([
            {
              sitter_id: booking.data.sitter_id,
              booking_id: payment.booking_id,
              amount: payment.amount * 0.8, // 80% to sitter, 20% platform fee
              type: 'SERVICE',
              status: 'AVAILABLE',
            },
          ]);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get payment by ID
   */
  public async getPaymentById(paymentId: string) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get payments for booking
   */
  public async getBookingPayments(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('booking_id', bookingId);

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refund payment
   */
  public async refundPayment(paymentId: string) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .update({ status: 'REFUNDED' })
        .eq('id', paymentId)
        .select()
        .single();

      if (error) throw error;

      // Update booking payment status
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ payment_status: 'REFUNDED' })
        .eq('id', data.booking_id);

      if (bookingError) throw bookingError;

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get sitter earnings
   */
  public async getSitterEarnings(sitterId: string) {
    try {
      const { data, error } = await supabase
        .from('earnings')
        .select('*')
        .eq('sitter_id', sitterId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get total available earnings for sitter
   */
  public async getTotalAvailableEarnings(sitterId: string) {
    try {
      const { data, error } = await supabase
        .from('earnings')
        .select('amount')
        .eq('sitter_id', sitterId)
        .eq('status', 'AVAILABLE');

      if (error) throw error;

      const total = data.reduce((sum, earning) => sum + earning.amount, 0);
      return total;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Request withdrawal
   */
  public async requestWithdrawal(sitterId: string, amount: number) {
    try {
      // Check available balance
      const availableBalance = await this.getTotalAvailableEarnings(sitterId);

      if (availableBalance < amount) {
        throw new Error('Insufficient available balance');
      }

      // Create withdrawal record
      const { data, error } = await supabase
        .from('earnings')
        .insert([
          {
            sitter_id: sitterId,
            amount: -amount,
            type: 'WITHDRAWAL',
            status: 'WITHDRAWN',
            description: `Withdrawal request for ${amount}€`,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Create notification
      await supabase
        .from('notifications')
        .insert([
          {
            user_id: sitterId,
            type: 'PAYMENT',
            title: 'Withdrawal Request',
            description: `Your withdrawal request of ${amount}€ has been submitted.`,
          },
        ]);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SupabasePaymentService();

