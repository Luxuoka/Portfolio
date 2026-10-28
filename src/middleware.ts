import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only run middleware for admin dashboard and login routes.
     * Public pages (/, /projects, /services, /contact) do not require
     * auth session checks, preventing unnecessary edge middleware invocation.
     */
    '/admin/:path*',
    '/login',
  ],
};
