// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnLibrary = nextUrl.pathname.startsWith('/');
//       if (isOnLibrary) {
//         if (isLoggedIn) return true;
//         return false;
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [],
// } satisfies NextAuthConfig;