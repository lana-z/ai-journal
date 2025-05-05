import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define paths that are protected (require authentication)
  const isProtectedPath = path.startsWith('/admin');
  
  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // Redirect to login if not authenticated
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Check if user has admin role
    if (token.role !== 'ADMIN') {
      // Return access denied page or redirect
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}
