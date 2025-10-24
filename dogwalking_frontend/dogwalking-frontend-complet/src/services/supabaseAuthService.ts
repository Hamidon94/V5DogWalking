import { supabase } from '../lib/supabase';
import { AuthError, User } from '@supabase/supabase-js';

interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'OWNER' | 'SITTER' | 'ADMIN';
  phone?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

class SupabaseAuthService {
  /**
   * Register a new user
   */
  public async register(payload: RegisterPayload) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error('User creation failed');

      // Create user profile in database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: payload.email,
            first_name: payload.firstName,
            last_name: payload.lastName,
            role: payload.role,
            phone: payload.phone,
            is_verified: false,
            background_checked: false,
            average_rating: 0,
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      return {
        user: userData,
        message: 'User registered successfully. Please check your email to verify your account.',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   */
  public async login(payload: LoginPayload) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) throw error;

      // Get user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      return {
        user: userData,
        session: data.session,
        message: 'Login successful',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   */
  public async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { message: 'Logout successful' };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user
   */
  public async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  public async getCurrentUserProfile() {
    try {
      const user = await this.getCurrentUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user profile
   */
  public async updateUserProfile(userId: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Change password
   */
  public async changePassword(newPassword: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password
   */
  public async resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { message: 'Password reset email sent' };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email
   */
  public async verifyEmail(token: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });

      if (error) throw error;
      return { message: 'Email verified successfully' };
    } catch (error) {
      throw error;
    }
  }
}

export default new SupabaseAuthService();

