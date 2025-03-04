import { createClient } from '@supabase/supabase-js';

const isTestMode = new URLSearchParams(window.location.search).get('test') === 'true';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Экспортируем флаг тестового режима для использования в других частях приложения
export const isTestEnvironment = isTestMode; 