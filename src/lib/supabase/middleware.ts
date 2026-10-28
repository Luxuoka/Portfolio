import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isProtectedAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Guard: if env vars are missing, do not crash the middleware
  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) are missing.'
    );

    // If trying to access admin without env configured, redirect to login
    if (isProtectedAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // IMPORTANT: Use getUser() as required, not getSession()
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminUserId = process.env.ADMIN_USER_ID;
    const isAdmin = Boolean(user && adminUserId && user.id === adminUserId);

    // 1. Protect all /admin routes
    if (isProtectedAdminRoute) {
      if (!isAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirectTo', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }

    // 2. If logged in admin visits /login, redirect to /admin
    if (isLoginPage && isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  } catch (err) {
    console.error('Error in middleware updateSession:', err);
    // If it's an admin route and an error occurred checking session, redirect to login
    if (isProtectedAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
