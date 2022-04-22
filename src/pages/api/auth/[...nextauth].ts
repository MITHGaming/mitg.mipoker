import NextAuth from 'next-auth';
import env from '@/environment';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { miPokerAdapter } from '@/lib/NextAuth/Adapter/miPoker';

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
    session: async ({
      session,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }): Promise<any> => {
      const newSession = {
        user: {
          ...session.user,
          id: user.id,
        },
        expires: session.expires,
      };

      return Promise.resolve(newSession);
    },
  },
  secret: env.nextAuth.secret,
  session: {
    strategy: `database`,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    updateAge: 1000 * 60 * 60 * 24, // 1 day
  },
  pages: {
    signIn: `/signin`,
  },
});
