import { supabase } from '../lib/supabase';

class SupabaseMessagingService {
  /**
   * Send a message
   */
  public async sendMessage(senderId: string, recipientId: string, content: string, attachmentUrl?: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: senderId,
            recipient_id: recipientId,
            content,
            attachment_url: attachmentUrl,
            is_read: false,
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
   * Get conversation between two users
   */
  public async getConversation(userId1: string, userId2: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark message as read
   */
  public async markMessageAsRead(messageId: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create notification
   */
  public async createNotification(userId: string, type: string, title: string, description: string, link?: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: userId,
            type,
            title,
            description,
            link,
            is_read: false,
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
   * Get user notifications
   */
  public async getUserNotifications(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  public async markNotificationAsRead(notificationId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create review
   */
  public async createReview(bookingId: string, authorId: string, sitterId: string, rating: number, comment: string, photoUrls?: string[]) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            booking_id: bookingId,
            author_id: authorId,
            sitter_id: sitterId,
            rating,
            comment,
            photo_urls: photoUrls || [],
            is_verified: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Update sitter's average rating
      const reviews = await supabase
        .from('reviews')
        .select('rating')
        .eq('sitter_id', sitterId);

      if (!reviews.error && reviews.data) {
        const avgRating = reviews.data.reduce((sum, r) => sum + r.rating, 0) / reviews.data.length;
        await supabase
          .from('users')
          .update({ average_rating: parseFloat(avgRating.toFixed(1)) })
          .eq('id', sitterId);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get reviews for sitter
   */
  public async getReviewsForSitter(sitterId: string) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('sitter_id', sitterId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SupabaseMessagingService();

