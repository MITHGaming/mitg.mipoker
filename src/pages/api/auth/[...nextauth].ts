import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import env from '@/environment';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientSecret: env.googleProvider.clientSecret,
      clientId: env.googleProvider.clientId,
      authorization: {
        params: {
          prompt: `consent`,
          access_type: `offline`,
          response_type: `code`,
        },
      },
    }),
  ],
  secret: env.nextAuth.secret,
});
