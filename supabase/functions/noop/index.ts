// Setup type definitions for Supabase Edge Functions
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(() => {
  return new Response(JSON.stringify({ message: "pong 🏓" }), {
    headers: { "Content-Type": "application/json" },
  })
})
