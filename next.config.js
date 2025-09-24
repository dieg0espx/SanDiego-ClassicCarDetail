/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14, no experimental flag needed
  experimental: {
    // Suppress Edge Runtime warnings for Supabase
    serverComponentsExternalPackages: ['@supabase/supabase-js', '@supabase/ssr', '@supabase/realtime-js']
  }
}

module.exports = nextConfig
