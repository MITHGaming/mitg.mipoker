import NextAuth from 'next-auth';
import env from '@/environment';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { miPokerAdapter } from '@/lib/NextAuth/Adapter/miPoker';
import jwt from 'jsonwebtoken';

export default NextAuth({
  adapter: miPokerAdapter(),
  providers: [
    DiscordProvider({
      clientId: env.discordProvider.clientId,
      clientSecret: env.discordProvider.clientSecret,
    }),
    GithubProvider({
      clientId: env.githubProvider.clientId,
      clientSecret: env.githubProvider.clientSecret,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      const isUserSignedIn = user ? true : false;
      if (isUserSignedIn) {
        token.id = user?.id;
        token.role = user?.role.name;
        token.roleId = user?.role.id;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }): Promise<any> => {
      const encodedToken = jwt.sign(token, env.nextAuth.secret);
      const newSession = {
        user: {
          ...session.user,
          avatar: token?.avatar,
          id: token?.id,
        },
        auth: {
          role: token?.role,
          roleId: token?.roleId,
          token: encodedToken,
        },
        expires: session.expires,
      };

      return Promise.resolve(newSession);
    },
  },
  secret: env.nextAuth.secret,
  jwt: {
    encode: async ({ secret, token, maxAge }): Promise<any> => {
      const jwtClaims = {
        id: token?.sub || token?.id,
        name: token?.name,
        avatar: token?.picture || token?.avatar,
        email: token?.email,
        state: token?.state,
        role: token?.role,
        roleId: token?.roleId,
      };

      const newToken = jwt.sign(jwtClaims, secret, { expiresIn: maxAge });

      return Promise.resolve(newToken);
    },
    decode: async ({ secret, token }): Promise<any> => {
      const decoded = jwt.verify(token || ``, secret);

      return Promise.resolve(decoded);
    },
  },
  session: {
    strategy: `jwt`,
    maxAge: 168 * 60 * 60, // 1 week
  },
  pages: {
    //signIn: `/signin`,
  },
  theme: {
    colorScheme: `dark`,
  },
});
