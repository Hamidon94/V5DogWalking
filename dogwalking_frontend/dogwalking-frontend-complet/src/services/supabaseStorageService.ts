import { supabase } from '../lib/supabase';

class SupabaseStorageService {
  /**
   * Upload avatar user
   */
  public async uploadAvatar(userId: string, file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return { url: publicData.publicUrl, path: filePath };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload pet photo
   */
  public async uploadPetPhoto(petId: string, file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${petId}-${Date.now()}.${fileExt}`;
      const filePath = `pet-photos/${fileName}`;

      const { data, error } = await supabase.storage
        .from('pet-photos')
        .upload(filePath, file, { upsert: true });

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from('pet-photos')
        .getPublicUrl(filePath);

      return { url: publicData.publicUrl, path: filePath };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload service photo
   */
  public async uploadServicePhoto(bookingId: string, file: File, caption?: string) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${bookingId}-${Date.now()}.${fileExt}`;
      const filePath = `service-photos/${fileName}`;

      const { data, error } = await supabase.storage
        .from('service-photos')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from('service-photos')
        .getPublicUrl(filePath);

      // Save to database
      const { data: photoData, error: dbError } = await supabase
        .from('service_photos')
        .insert([
          {
            booking_id: bookingId,
            url: publicData.publicUrl,
            caption,
            sent: false,
          },
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      return photoData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload document (ID, passport, background check, etc.)
   */
  public async uploadDocument(userId: string, documentType: string, file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${documentType}-${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save to database
      const { data: docData, error: dbError } = await supabase
        .from('documents')
        .insert([
          {
            user_id: userId,
            type: documentType,
            url: publicData.publicUrl,
            status: 'PENDING',
          },
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      return docData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get public URL for a file
   */
  public async getPublicUrl(bucket: string, filePath: string) {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete file
   */
  public async deleteFile(bucket: string, filePath: string) {
    try {
      const { error } = await supabase.storage.from(bucket).remove([filePath]);
      if (error) throw error;
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

export default new SupabaseStorageService();

