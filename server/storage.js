import { supabase } from './supabase.js';

const TABLE = 'availability';
const ROW_ID = 1;

export async function readAvailability() {
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
}

export async function writeAvailability(data) {
  const { error } = await supabase
    .from(TABLE)
    .upsert(
      { id: ROW_ID, booked_dates: data.bookedDates, updated_at: new Date().toISOString() },
      { onConflict: 'id' }
    );

  if (error) throw error;
}

async function seedAvailability() {
  await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, booked_dates: [] }, { onConflict: 'id' });
}
