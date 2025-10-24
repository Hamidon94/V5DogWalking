import { supabase } from '../lib/supabase';

interface CreatePetPayload {
  ownerId: string;
  name: string;
  type: string;
  breed?: string;
  age?: number;
  weight?: number;
  photoUrl?: string;
  bio?: string;
  vaccinations?: string[];
  allergies?: string[];
  medicalHistory?: string;
  dietaryNeeds?: string;
  exerciseLevel?: string;
  temperament?: string;
  specialNeeds?: string;
}

class SupabasePetService {
  /**
   * Create a new pet
   */
  public async createPet(payload: CreatePetPayload) {
    try {
      const { data, error } = await supabase
        .from('pets')
        .insert([
          {
            owner_id: payload.ownerId,
            name: payload.name,
            type: payload.type,
            breed: payload.breed,
            age: payload.age,
            weight: payload.weight,
            photo_url: payload.photoUrl,
            bio: payload.bio,
            vaccinations: payload.vaccinations || [],
            allergies: payload.allergies || [],
            medical_history: payload.medicalHistory,
            dietary_needs: payload.dietaryNeeds,
            exercise_level: payload.exerciseLevel,
            temperament: payload.temperament,
            special_needs: payload.specialNeeds,
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
   * Get pet by ID
   */
  public async getPetById(petId: string) {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', petId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all pets for an owner
   */
  public async getOwnerPets(ownerId: string) {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', ownerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update pet
   */
  public async updatePet(petId: string, updates: Partial<CreatePetPayload>) {
    try {
      const { data, error } = await supabase
        .from('pets')
        .update(updates)
        .eq('id', petId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete pet
   */
  public async deletePet(petId: string) {
    try {
      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', petId);

      if (error) throw error;
      return { message: 'Pet deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add vaccination to pet
   */
  public async addVaccination(petId: string, vaccination: string) {
    try {
      const pet = await this.getPetById(petId);
      const vaccinations = [...(pet.vaccinations || []), vaccination];

      const { data, error } = await supabase
        .from('pets')
        .update({ vaccinations })
        .eq('id', petId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add allergy to pet
   */
  public async addAllergy(petId: string, allergy: string) {
    try {
      const pet = await this.getPetById(petId);
      const allergies = [...(pet.allergies || []), allergy];

      const { data, error } = await supabase
        .from('pets')
        .update({ allergies })
        .eq('id', petId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update pet photo
   */
  public async updatePetPhoto(petId: string, photoUrl: string) {
    try {
      const { data, error } = await supabase
        .from('pets')
        .update({ photo_url: photoUrl })
        .eq('id', petId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SupabasePetService();

