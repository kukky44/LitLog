import NextAuth from 'next-auth';
import { config } from '@/src/app/lib/auth';

const authHandler = NextAuth({
  ...config
});

export { authHandler as GET, authHandler as POST }