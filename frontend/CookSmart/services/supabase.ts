// services/supabase.ts
import * as dotenv from 'dotenv';
dotenv.config(); 
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Now you can access process.env variables
const supabaseUrl = process.env.SUPABASE_URL as string;  // Ensure type safety by asserting the type
const supabaseKey = process.env.SUPABASE_KEY as string;  // Ensure type safety

// Create Supabase client instance
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
      const { data, error } = await supabase
        .from('profiles')  // Replace with a real table name
        .select('*')
        .limit(1);
      
      if (error) {
        console.error('Connection error:', error);
      } else {
        console.log('Successfully connected to Supabase!');
        console.log('Test data:', data);
      }
    } catch (err) {
      console.error('Unexpected connection error:', err);
    }
  }
  
  // Call the test (or export it to call elsewhere)
  testConnection();

export default supabase;