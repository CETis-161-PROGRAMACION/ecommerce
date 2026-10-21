import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente de Supabase para la futura integración real del backend.
 *
 * La demostración actual usa datos locales (`src/data/` + `src/context/`), así
 * que este cliente es opcional: `getSupabase()` devuelve `null` cuando las
 * variables de entorno no están configuradas en lugar de romper la aplicación.
 */
export function getSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (!url || !publishableKey) {
    return null
  }

  return createClient(url, publishableKey)
}
