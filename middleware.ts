// // middleware.ts
// import { NextResponse } from 'next/server';
// import {authH}

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const isProtectedRoute = req.nextUrl.pathname.startsWith('/');
//   const isAuthRoute = ['/login', '/signup'].includes(req.nextUrl.pathname);

//   if (isProtectedRoute && !isLoggedIn && !isAuthRoute) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Optional: Redirect logged-in users away from login/signup
//   if (isAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// });

// export const config = {
//   matcher: ['/:path*']
// };