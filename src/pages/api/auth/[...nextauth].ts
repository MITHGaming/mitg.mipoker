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
  secret: env.nextAuth.secret,
});
