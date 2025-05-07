import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isProtectedPath = path.startsWith('/admin');
  
  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }    
  }
  
  return NextResponse.next();
}
