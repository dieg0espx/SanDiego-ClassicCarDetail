import { updateSession } from './lib/supabase-middleware'

export async function middleware(request) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Temporarily disable middleware to test dashboard access
     */
    // '/dashboard/:path*',
    // '/profile/:path*',
    // '/account/:path*',
  ],
}
