import { supabase } from './supabase.js';

const TABLE = 'availability';
const GALLERY_TABLE = 'gallery';
const ROW_ID = 1;

// In-memory fallback state when database is not connected
let inMemoryBookedDates = [];
let inMemoryGalleryPhotos = null;

export async function readAvailability() {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('booked_dates')
      .eq('id', ROW_ID)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        await seedAvailability();
        return { bookedDates: [] };
      }
      throw error;
    }

    return { bookedDates: data.booked_dates ?? [] };
  } catch (err) {
    console.warn('Supabase availability read warning:', err.message || err);
    return { bookedDates: inMemoryBookedDates };
  }
}

export async function writeAvailability(data) {
  inMemoryBookedDates = data.bookedDates || [];
  try {
    const { error } = await supabase
      .from(TABLE)
      .upsert(
        { id: ROW_ID, booked_dates: data.bookedDates, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      );

    if (error) throw error;
  } catch (err) {
    console.warn('Supabase availability write warning (saved to in-memory):', err.message || err);
  }
}

async function seedAvailability() {
  try {
    await supabase
      .from(TABLE)
      .upsert({ id: ROW_ID, booked_dates: [] }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Supabase seed warning:', err.message || err);
  }
}

export async function readGallery() {
  try {
    const { data, error } = await supabase
      .from(GALLERY_TABLE)
      .select('photos')
      .eq('id', ROW_ID)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { photos: inMemoryGalleryPhotos };
      }
      throw error;
    }

    return { photos: data.photos ?? inMemoryGalleryPhotos };
  } catch (err) {
    console.warn('Supabase gallery read warning:', err.message || err);
    return { photos: inMemoryGalleryPhotos };
  }
}

export async function writeGallery(photos) {
  inMemoryGalleryPhotos = photos;
  try {
    const { error } = await supabase
      .from(GALLERY_TABLE)
      .upsert(
        { id: ROW_ID, photos, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      );

    if (error) throw error;
  } catch (err) {
    console.warn('Supabase gallery write warning (saved to in-memory):', err.message || err);
  }
}

